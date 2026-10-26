// Teams for team-competition sessions (sub_events.team_size > 1).
//
// Students book under their own team name, often short of the full size (a pass bought as a group of 7 still means
// booking the IPL Auction in teams of 3). Auto-grouping couples short teams into full ones: Team A (2) + Team B (1)
// makes one team of 3. The result is stored in group_id / group_name, never in team_id, which stays the booking and
// payment unit, so grouping can't change who pays or what staff approve.
//
// Only CONFIRMED + VERIFIED bookings that are not grouped yet take part, so running it again later only places
// newcomers and earlier leftovers; teams already formed stay as they are. Pending payments wait until approved.
import { sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { camelRow } from '../../db/fragments.js'
import { isUuid } from '../../utils/isUuid.js'
import { managedEvent } from './subEvents.controller.js'

const fail = (res, status, message) => res.status(status).json({ success: false, message })
export const NOT_ENOUGH = 'Sorry, not enough teammates to fulfill the team size requirement.'

// The session if it belongs to the event and the caller manages that event; otherwise sends an error and returns null
async function managedSession(req, res) {
  const event = await managedEvent(req, res, req.params.eventId)
  if (!event) return null
  const { subEventId } = req.params
  const { rows } = isUuid(subEventId)
    ? await db.execute(sql`select * from sub_events where id = ${subEventId}::uuid and event_id = ${event.id}::uuid`)
    : { rows: [] }
  if (!rows.length) {
    fail(res, 404, 'Sub-event not found for this event.')
    return null
  }
  return camelRow(rows[0])
}

// Every confirmed booking of the session with who it is
async function loadBookings(subEventId) {
  const { rows } = await db.execute(sql`
    select b.id, b.user_id, b.team_id, b.team_name, b.payment_status, b.group_id, b.group_name, b.created_at,
           u.email, u.name
    from sub_event_bookings b join users u on u.id = b.user_id
    where b.sub_event_id = ${subEventId}::uuid and b.status = 'CONFIRMED'
    order by b.created_at, b.id`)
  return rows.map(camelRow)
}

const person = (b) => ({ email: b.email, name: b.name, teamName: b.teamName })

// Bookings as the units students signed up in: a team (shared teamId) or one person
function toUnits(bookings) {
  const units = new Map()
  for (const b of bookings) {
    const key = b.teamId ?? b.id
    if (!units.has(key)) units.set(key, { key, name: b.teamName || b.name || b.email, createdAt: new Date(b.createdAt), members: [] })
    units.get(key).members.push(b)
  }
  return [...units.values()]
}

// Indexes of units whose sizes add up exactly to target (subset sum; earlier bookings are preferred), or null
function exactFill(units, target) {
  const reach = new Array(target + 1).fill(null) // reach[s] = indexes of units adding up to s
  reach[0] = []
  units.forEach((u, i) => {
    const size = u.members.length
    for (let s = target; s >= size; s--) {
      if (!reach[s] && reach[s - size]) reach[s] = [...reach[s - size], i]
    }
  })
  return reach[target]
}

// Plans full teams from short ones. The largest short teams are placed first (they are the hardest to fit), each
// topped up by an exact combination of others. Returns { groups: [[unit, ...]], leftovers: [unit, ...] }.
export function planGroups(shortUnits, teamSize) {
  let pool = [...shortUnits].sort((a, b) => b.members.length - a.members.length || a.createdAt - b.createdAt)
  const groups = []
  const leftovers = []
  while (pool.length) {
    const [anchor, ...rest] = pool
    const others = [...rest].sort((a, b) => a.createdAt - b.createdAt)
    const picked = exactFill(others, teamSize - anchor.members.length)
    if (!picked) {
      leftovers.push(anchor)
      pool = rest
      continue
    }
    const chosen = picked.map((i) => others[i])
    groups.push([anchor, ...chosen])
    pool = rest.filter((u) => !chosen.includes(u))
  }
  return { groups, leftovers }
}

// POST /api/events/:eventId/sub-events/:subEventId/auto-group (ADMIN, or EVENT_HEAD for their own events)
export async function autoGroup(req, res) {
  const sub = await managedSession(req, res)
  if (!sub) return
  const size = sub.teamSize ?? 1
  if (size < 2) return fail(res, 400, `${sub.title} is not a team competition (team size ${size}), so there is nothing to group.`)

  const bookings = await loadBookings(sub.id)
  const open = bookings.filter((b) => !b.groupId && b.paymentStatus === 'VERIFIED')
  const awaitingPayment = bookings.filter((b) => !b.groupId && b.paymentStatus === 'PENDING')
  const units = toUnits(open)
  const complete = units.filter((u) => u.members.length >= size) // over size only if teamSize was lowered later
  const { groups, leftovers } = planGroups(units.filter((u) => u.members.length < size), size)

  const assignments = [
    ...complete.map((u) => ({ id: crypto.randomUUID(), name: u.name, units: [u] })),
    ...groups.map((g) => ({ id: crypto.randomUUID(), name: g.map((u) => u.name).join(' + ').slice(0, 150), units: g })),
  ]
  const rows = assignments.flatMap((a) => a.units.flatMap((u) => u.members.map((m) => ({ bookingId: m.id, groupId: a.id, groupName: a.name }))))

  if (rows.length) {
    // One transaction: lock the session, then assign every row only if all of them are still ungrouped and paid up.
    // If anything changed since they were read (another run, a cancellation), nothing is written.
    const ids = sql.join(rows.map((r) => sql`${r.bookingId}::uuid`), sql`, `)
    const [, updated] = await db.batch([
      db.execute(sql`select id from sub_events where id = ${sub.id}::uuid for update`),
      db.execute(sql`
        update sub_event_bookings b set group_id = v.group_id, group_name = v.group_name, grouped_at = now()
        from (values ${sql.join(rows.map((r) => sql`(${r.bookingId}::uuid, ${r.groupId}::uuid, ${r.groupName}::varchar)`), sql`, `)})
          as v(id, group_id, group_name)
        where b.id = v.id
          and (select count(*) from sub_event_bookings x
               where x.id in (${ids}) and x.group_id is null and x.status = 'CONFIRMED' and x.payment_status = 'VERIFIED') = ${rows.length}
        returning b.id`),
    ])
    if (updated.rows.length !== rows.length) {
      return fail(res, 409, 'Bookings changed while grouping (someone else may have just grouped them). Run auto-group again.')
    }
  }

  const leftoverPeople = leftovers.flatMap((u) => u.members.map(person))
  res.json({
    success: true,
    ...(leftovers.length && { message: NOT_ENOUGH }),
    data: {
      teamSize: size,
      teamsFormed: assignments.map((a) => ({
        groupId: a.id,
        groupName: a.name,
        coupled: a.units.length > 1,
        members: a.units.flatMap((u) => u.members.map(person)),
      })),
      leftovers: leftovers.map((u) => ({ teamName: u.name, members: u.members.map(person) })),
      leftoverEmails: leftoverPeople.map((p) => p.email),
      awaitingPayment: awaitingPayment.map(person),
    },
  })
}

// GET /api/events/:eventId/sub-events/:subEventId/teams: the roster. Formed teams, then bookings not grouped yet.
export async function listTeams(req, res) {
  const sub = await managedSession(req, res)
  if (!sub) return
  const bookings = await loadBookings(sub.id)
  const formed = new Map()
  for (const b of bookings.filter((x) => x.groupId)) {
    if (!formed.has(b.groupId)) formed.set(b.groupId, { groupId: b.groupId, groupName: b.groupName, members: [] })
    formed.get(b.groupId).members.push(person(b))
  }
  const ungrouped = toUnits(bookings.filter((b) => !b.groupId)).map((u) => ({
    teamName: u.name,
    paid: u.members.every((m) => m.paymentStatus === 'VERIFIED'),
    members: u.members.map(person),
  }))
  res.json({ success: true, data: { teamSize: sub.teamSize ?? 1, teams: [...formed.values()], ungrouped } })
}
