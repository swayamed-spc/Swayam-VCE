// Sub-events (workshops, hackathons, auctions) and per-event analytics for staff dashboards.
import { and, eq, sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { events, subEvents } from '../../db/schema.js'
import { camelRow } from '../../db/fragments.js'
import { isUuid } from '../../utils/isUuid.js'

const fail = (res, status, message) => res.status(status).json({ success: false, message })

const isWholeNumber = (v, min, max) => Number.isInteger(v) && v >= min && v <= max

// The event if it exists and the caller manages it; otherwise sends 404/403 and returns null
export async function managedEvent(req, res, eventId) {
  const [event] = isUuid(eventId) ? await db.select().from(events).where(eq(events.id, eventId)).limit(1) : []
  if (!event) {
    fail(res, 404, 'Event not found.')
    return null
  }
  if (req.user.role !== 'ADMIN' && event.createdBy !== req.user.id) {
    fail(res, 403, 'You can only manage events you created.')
    return null
  }
  return event
}

// Body: { title, venue, capacity, priceForPassHolders?, priceForStandalone?, startTime?, teamSize?, passHoldersOnly? }.
// Prices default to 0 (free); teamSize defaults to 1 (not a team competition); passHoldersOnly defaults to false.
// venue is any text: usually a name from the venues list, or a custom place such as a classroom.
// Returns { values } ready to insert or update, or { error }.
function readSubEvent(body, event) {
  const { title, venue, capacity, priceForPassHolders = 0, priceForStandalone = 0, startTime, endTime, teamSize = 1, passHoldersOnly = false } = body ?? {}
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 200) return { error: 'title is required (up to 200 characters).' }
  if (!isWholeNumber(capacity, 1, 100000)) return { error: 'capacity must be a whole number from 1 to 100000.' }
  if (!isWholeNumber(priceForPassHolders, 0, 100000) || !isWholeNumber(priceForStandalone, 0, 100000)) {
    return { error: 'priceForPassHolders and priceForStandalone must be whole numbers of rupees from 0 to 100000.' }
  }
  if (!isWholeNumber(teamSize, 1, 50)) return { error: 'teamSize must be a whole number from 1 to 50.' }
  if (typeof passHoldersOnly !== 'boolean') return { error: 'passHoldersOnly must be true or false.' }
  let start = null
  if (startTime != null) {
    start = typeof startTime === 'string' ? new Date(startTime) : null
    if (!start || Number.isNaN(start.getTime())) return { error: 'startTime must be an ISO date-time, e.g. 2026-11-21T09:00:00+05:30.' }
  }
  let end = null
  if (endTime != null) {
    end = typeof endTime === 'string' ? new Date(endTime) : null
    if (!end || Number.isNaN(end.getTime())) return { error: 'endTime must be an ISO date-time, e.g. 2026-11-21T13:00:00+05:30.' }
    if (!start) return { error: 'endTime needs a startTime.' }
    if (end <= start) return { error: 'endTime must be after startTime.' }
  }
  // Without a pass nobody can book, so the standalone price is not used
  const standalone = passHoldersOnly ? 0 : priceForStandalone
  // Sub-event payments go to the parent event's UPI QR
  if ((priceForPassHolders > 0 || standalone > 0) && !event.upiQrUrl) {
    return { error: "This event has no upiQrUrl, so students can't pay for a priced sub-event. Use free prices or add a QR first." }
  }
  if (typeof venue !== 'string' || !venue.trim() || venue.trim().length > 255) {
    return { error: 'venue is required: choose one from the list or type the place (up to 255 characters).' }
  }
  return {
    values: { title: title.trim(), venue: venue.trim(), capacity, priceForPassHolders, priceForStandalone: standalone, startTime: start, endTime: end, teamSize, passHoldersOnly },
  }
}

export async function createSubEvent(req, res) {
  const event = await managedEvent(req, res, req.params.eventId)
  if (!event) return
  const { values, error } = readSubEvent(req.body, event)
  if (error) return fail(res, 400, error)

  const [created] = await db.insert(subEvents).values({ eventId: event.id, ...values }).returning()
  res.status(201).json({ success: true, data: created })
}

// PATCH, same body as creating (every field is sent again). Bookings already made keep their price and team; the new
// prices, team size and ticket-holder rule apply to bookings made from now on. Capacity follows the same rules as the
// capacity endpoint below: it may go under the seats taken, and nobody loses a booking.
export async function updateSubEvent(req, res) {
  const event = await managedEvent(req, res, req.params.eventId)
  if (!event) return
  const { subEventId } = req.params
  if (!isUuid(subEventId)) return fail(res, 404, 'Sub-event not found.')
  const { values, error } = readSubEvent(req.body, event)
  if (error) return fail(res, 400, error)

  const [updated] = await db
    .update(subEvents)
    .set(values)
    .where(and(eq(subEvents.id, subEventId), eq(subEvents.eventId, event.id)))
    .returning()
  if (!updated) return fail(res, 404, 'Sub-event not found for this event.')
  res.json({ success: true, data: updated })
}

// Body: { capacity }. Same rules as event capacity: any time, even below the seats already booked. Nobody loses a
// booking, but new bookings are refused and approvals past the new limit become REFUND_REQUIRED. The UPDATE takes the
// sub-event's row lock, so it waits for any booking or approval checking seats for this sub-event at that moment.
// DELETE /api/events/:eventId/sub-events/:subEventId. Same rules as deleting an event: event heads only while nobody
// has booked; admins may delete a booked session with { confirm: <session title> }, removing its bookings too.
export async function deleteSubEvent(req, res) {
  const event = await managedEvent(req, res, req.params.eventId)
  if (!event) return
  const { subEventId } = req.params
  const [sub] = isUuid(subEventId)
    ? await db.select().from(subEvents).where(and(eq(subEvents.id, subEventId), eq(subEvents.eventId, event.id))).limit(1)
    : []
  if (!sub) return fail(res, 404, 'Sub-event not found for this event.')

  const { rows } = await db.execute(sql`select count(*)::int as n from sub_event_bookings where sub_event_id = ${sub.id}::uuid`)
  const booked = rows[0].n
  if (booked) {
    const what = `${booked} booking${booked === 1 ? '' : 's'}`
    if (req.user.role !== 'ADMIN') return fail(res, 409, `${sub.title} has ${what}. Only an admin can delete a session people have booked.`)
    if (req.body?.confirm !== sub.title) {
      return fail(res, 409, `${sub.title} has ${what}. Deleting it removes them and their payment records. Confirm with the exact session title.`)
    }
  }
  const empty = booked ? sql`true` : sql`not exists (select 1 from sub_event_bookings where sub_event_id = ${sub.id}::uuid)`
  const results = await db.batch([
    db.execute(sql`select id from sub_events where id = ${sub.id}::uuid for update`),
    db.execute(sql`delete from sub_event_bookings where sub_event_id = ${sub.id}::uuid and ${empty}`),
    db.execute(sql`delete from sub_events where id = ${sub.id}::uuid and ${empty} returning id`),
  ])
  if (!results.at(-1).rows.length) return fail(res, 409, 'Someone booked this session just now, so it was not deleted.')
  res.json({ success: true, data: { id: sub.id, title: sub.title, deleted: { bookings: booked } } })
}

export async function updateSubEventCapacity(req, res) {
  const event = await managedEvent(req, res, req.params.eventId)
  if (!event) return
  const { subEventId } = req.params
  if (!isUuid(subEventId)) return fail(res, 404, 'Sub-event not found.')
  const { capacity } = req.body ?? {}
  if (!isWholeNumber(capacity, 1, 100000)) return fail(res, 400, 'capacity must be a whole number from 1 to 100000.')

  const [updated] = await db
    .update(subEvents)
    .set({ capacity })
    .where(and(eq(subEvents.id, subEventId), eq(subEvents.eventId, event.id)))
    .returning()
  if (!updated) return fail(res, 404, 'Sub-event not found for this event.')
  res.json({ success: true, data: updated })
}

// Public: what students can book, with seats left
export async function listSubEvents(req, res) {
  if (!isUuid(req.params.eventId)) return fail(res, 404, 'Event not found.')
  const { rows } = await db.execute(sql`
    select s.*, (s.capacity - count(b.id) filter (where b.status = 'CONFIRMED'))::int as seats_left
    from sub_events s left join sub_event_bookings b on b.sub_event_id = s.id
    where s.event_id = ${req.params.eventId}::uuid
    group by s.id
    order by s.start_time nulls last, s.created_at`)
  res.json({ success: true, data: rows.map(camelRow) })
}

// GET /api/events/:id/analytics (ADMIN, or the EVENT_HEAD who created the event).
// Revenue is the sum of totalAmountPaid on VERIFIED solo and team-leader rows (what staff approved), so refunded or
// refund-due money is not counted. Refund counts are per payment (a team counts once).
// checkIns: everyone checked in at the main entrance, latest first, with their ticket id (the registration id the
// master QR encodes). Team sessions also list their teams: formed groups, else the teams students booked as.
export async function getEventAnalytics(req, res) {
  const event = await managedEvent(req, res, req.params.id)
  if (!event) return

  const paying = sql.raw('(team_id is null or is_group_leader)')
  const [{ rows: main }, { rows: subs }, { rows: checkIns }, { rows: teamRows }] = await db.batch([
    db.execute(sql`
      select
        count(*) filter (where status = 'CONFIRMED')::int as seats_filled,
        count(*) filter (where status = 'CONFIRMED' and payment_status = 'VERIFIED')::int as tickets_sold,
        count(*) filter (where status = 'CONFIRMED' and payment_status = 'PENDING')::int as awaiting_payment,
        count(*) filter (where attended_at is not null)::int as main_event_attended,
        coalesce(sum(total_amount_paid) filter (where payment_status = 'VERIFIED' and ${paying}), 0)::int as revenue,
        count(*) filter (where payment_status = 'REFUND_REQUIRED' and ${paying})::int as refund_required_count,
        count(*) filter (where payment_status = 'REFUNDED' and ${paying})::int as refunded_count
      from registrations where event_id = ${event.id}::uuid`),
    db.execute(sql`
      select s.id, s.title, s.capacity, s.start_time, s.end_time, s.price_for_pass_holders, s.price_for_standalone, s.team_size, s.venue, s.pass_holders_only,
        count(b.id) filter (where b.status = 'CONFIRMED' and b.group_id is not null)::int as grouped_count,
        count(b.id) filter (where b.status = 'CONFIRMED')::int as bookings_count,
        count(b.id) filter (where b.status = 'CONFIRMED' and b.payment_status = 'VERIFIED')::int as verified_count,
        count(b.id) filter (where b.attended_at is not null)::int as attended_count,
        coalesce(sum(b.total_amount_paid) filter (where b.payment_status = 'VERIFIED' and (b.team_id is null or b.is_group_leader)), 0)::int as revenue,
        count(b.id) filter (where b.payment_status = 'REFUND_REQUIRED' and (b.team_id is null or b.is_group_leader))::int as refund_required_count
      from sub_events s left join sub_event_bookings b on b.sub_event_id = s.id
      where s.event_id = ${event.id}::uuid
      group by s.id
      order by s.start_time nulls last, s.created_at`),
    db.execute(sql`
      select r.id as ticket_id, r.attended_at as checked_in_at, r.team_name, u.name, u.email
      from registrations r join users u on u.id = r.user_id
      where r.event_id = ${event.id}::uuid and r.attended_at is not null
      order by r.attended_at desc`),
    db.execute(sql`
      select b.sub_event_id, coalesce(b.group_id, b.team_id, b.id) as team_key, b.group_id is not null as grouped,
        coalesce(b.group_name, b.team_name, u.name, u.email) as team_name, b.attended_at is not null as attended, u.name, u.email
      from sub_event_bookings b join sub_events s on s.id = b.sub_event_id join users u on u.id = b.user_id
      where s.event_id = ${event.id}::uuid and s.team_size > 1 and b.status = 'CONFIRMED'
      order by b.group_name nulls last, b.team_name, b.created_at`),
  ])

  const m = camelRow(main[0])
  const teamsBySession = {}
  for (const t of teamRows.map(camelRow)) {
    const teams = (teamsBySession[t.subEventId] ??= new Map())
    if (!teams.has(t.teamKey)) teams.set(t.teamKey, { name: t.teamName, grouped: t.grouped, members: [] })
    teams.get(t.teamKey).members.push({ name: t.name, email: t.email, attended: t.attended })
  }
  const subEventList = subs.map(camelRow).map((s) => (s.teamSize > 1 ? { ...s, teams: [...(teamsBySession[s.id]?.values() ?? [])] } : s))
  const subRevenue = subEventList.reduce((sum, s) => sum + s.revenue, 0)
  res.json({
    success: true,
    data: {
      eventId: event.id,
      title: event.title,
      totalSeats: event.capacity,
      seatsFilled: m.seatsFilled,
      seatsAvailable: Math.max(0, event.capacity - m.seatsFilled),
      ticketsSold: m.ticketsSold,
      awaitingPayment: m.awaitingPayment,
      mainEventAttended: m.mainEventAttended,
      mainEventRevenue: m.revenue,
      subEventRevenue: subRevenue,
      totalRevenue: m.revenue + subRevenue,
      refundRequiredCount: m.refundRequiredCount + subEventList.reduce((sum, s) => sum + s.refundRequiredCount, 0),
      refundedCount: m.refundedCount,
      subEvents: subEventList,
      checkIns: checkIns.map(camelRow),
    },
  })
}
