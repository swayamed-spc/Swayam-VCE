// Door scanning. The scanner app posts the student's master QR; the server does everything else.
import { sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { camelRow, canManageEvent } from '../../db/fragments.js'
import { isUuid } from '../../utils/isUuid.js'
import { verifyTicket } from '../../utils/generateTicket.js'

const fail = (res, status, message, data) => res.status(status).json({ success: false, message, ...(data && { data }) })

// Body: { qrPayload, subEventId?, eventId? }. qrPayload is always the student's master ticket (MAIN or STANDALONE).
// - No subEventId: main-event entry. Only a MAIN pass admits; sets registrations.attended_at.
// - subEventId: finds the ticket holder's booking for that sub-event and sets its attended_at. A MAIN pass must still be
//   a valid (CONFIRMED + VERIFIED) registration; a STANDALONE pass admits only to sub-events of its own event.
// - eventId (optional): the scanner's event. Tickets for any other event are refused.
// Each check-in is one UPDATE ... WHERE attended_at IS NULL, so a ticket scanned at two gates at once succeeds once.
// Only CONFIRMED + VERIFIED bookings/registrations get in. EVENT_HEADs can only scan for events they created.
export async function checkIn(req, res) {
  const { qrPayload, subEventId } = req.body ?? {}
  const ticket = verifyTicket(qrPayload)
  if (!ticket) return fail(res, 400, 'Invalid ticket: this QR code was not issued by Swayam.')
  if (subEventId != null && !isUuid(subEventId)) return fail(res, 400, 'subEventId must be a valid id.')
  if (req.body.eventId != null && !isUuid(req.body.eventId)) return fail(res, 400, 'eventId must be a valid id.')
  const eventId = req.body.eventId?.toLowerCase() // compared with ids from the database, which are lowercase
  const manages = canManageEvent(req.user, sql`e.created_by`)

  if (subEventId == null) return checkInMain(req, res, ticket, eventId, manages)

  // Whose booking to look for, given the kind of pass
  const holder =
    ticket.kind === 'MAIN'
      ? sql`exists (select 1 from registrations r where r.id = ${ticket.registrationId}::uuid and r.user_id = b.user_id
              and r.event_id = s.event_id and r.status = 'CONFIRMED' and r.payment_status = 'VERIFIED')`
      : sql`b.user_id = ${ticket.userId}::uuid and s.event_id = ${ticket.eventId}::uuid`

  const { rows } = await db.execute(sql`
    update sub_event_bookings b set attended_at = now()
    from sub_events s, events e, users u
    where b.sub_event_id = ${subEventId}::uuid and s.id = b.sub_event_id and e.id = s.event_id and u.id = b.user_id
      and ${holder}
      and b.status = 'CONFIRMED' and b.payment_status = 'VERIFIED' and b.attended_at is null
      and ${manages} ${eventId ? sql`and s.event_id = ${eventId}::uuid` : sql``}
    returning b.id as booking_id, b.attended_at, b.team_name, u.email, u.name, s.title as sub_event_title, e.title as event_title`)
  if (rows.length) return res.json({ success: true, message: 'Checked in.', data: { pass: ticket.kind, ...camelRow(rows[0]) } })

  // Not admitted: work out why, step by step, for the scanner screen
  let userId, ticketEventId
  if (ticket.kind === 'MAIN') {
    const { rows: regs } = await db.execute(sql`
      select user_id, event_id, status, payment_status from registrations where id = ${ticket.registrationId}::uuid`)
    if (!regs.length) return fail(res, 404, 'Ticket not found.')
    const reg = camelRow(regs[0])
    if (reg.status !== 'CONFIRMED' || reg.paymentStatus !== 'VERIFIED') {
      return fail(res, 409, `This main pass is no longer valid (${reg.status === 'CONFIRMED' ? reg.paymentStatus : 'cancelled'}). Do not admit.`)
    }
    ;({ userId, eventId: ticketEventId } = reg)
  } else {
    ;({ userId, eventId: ticketEventId } = ticket)
  }
  if (eventId && ticketEventId !== eventId) return fail(res, 409, 'This ticket is for a different event.')

  const { rows: subs } = await db.execute(sql`
    select s.event_id, ${manages} as manages from sub_events s join events e on e.id = s.event_id where s.id = ${subEventId}::uuid`)
  if (!subs.length) return fail(res, 404, 'Sub-event not found.')
  const sub = camelRow(subs[0])
  if (!sub.manages) return fail(res, 403, 'You can only check in students for events you created.')
  if (sub.eventId !== ticketEventId) return fail(res, 409, 'This ticket is for a different event.')

  const { rows: bookings } = await db.execute(sql`
    select b.status, b.payment_status, b.attended_at, u.email, u.name
    from sub_event_bookings b join users u on u.id = b.user_id
    where b.sub_event_id = ${subEventId}::uuid and b.user_id = ${userId}::uuid`)
  if (!bookings.length) return fail(res, 404, 'This student has not booked this sub-event.')
  return explainRow(res, camelRow(bookings[0]), 'booking')
}

async function checkInMain(req, res, ticket, eventId, manages) {
  if (ticket.kind === 'STANDALONE') {
    return fail(res, 409, 'This is a sub-event-only pass: it does not admit to the main event. Choose the sub-event you are scanning for.')
  }
  const id = ticket.registrationId
  const { rows } = await db.execute(sql`
    update registrations r set attended_at = now()
    from events e, users u
    where r.id = ${id}::uuid and e.id = r.event_id and u.id = r.user_id
      and r.status = 'CONFIRMED' and r.payment_status = 'VERIFIED' and r.attended_at is null
      and ${manages} ${eventId ? sql`and r.event_id = ${eventId}::uuid` : sql``}
    returning r.id as registration_id, r.attended_at, r.team_name, u.email, u.name, e.id as event_id, e.title as event_title`)
  if (rows.length) return res.json({ success: true, message: 'Checked in.', data: { pass: 'MAIN', ...camelRow(rows[0]) } })

  const { rows: found } = await db.execute(sql`
    select r.status, r.payment_status, r.attended_at, r.event_id, u.email, u.name, ${manages} as manages
    from registrations r join events e on e.id = r.event_id join users u on u.id = r.user_id
    where r.id = ${id}::uuid`)
  if (!found.length) return fail(res, 404, 'Ticket not found.')
  const row = camelRow(found[0])
  if (!row.manages) return fail(res, 403, 'You can only check in students for events you created.')
  if (eventId && row.eventId !== eventId) return fail(res, 409, 'This ticket is for a different event.')
  return explainRow(res, row, 'registration')
}

// A genuine ticket whose registration or booking can't be admitted right now
function explainRow(res, row, what) {
  if (row.status !== 'CONFIRMED') return fail(res, 409, `This ${what} has been cancelled.`)
  if (row.paymentStatus !== 'VERIFIED') return fail(res, 409, `Payment not verified (${row.paymentStatus}). Do not admit.`)
  return fail(res, 409, 'Already checked in.', { email: row.email, name: row.name, attendedAt: row.attendedAt })
}
