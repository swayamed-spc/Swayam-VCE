import { sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { camelRow } from '../../db/fragments.js'

// Public, read-only: seats taken per event, for the seat bars on the website. Counts CONFIRMED registrations, the same
// rule registration uses to decide whether an event is full (unpaid PENDING registrations hold a seat).
export async function getAvailability(req, res) {
  const { rows } = await db.execute(sql`
    select e.id as event_id, e.capacity,
      count(r.id) filter (where r.status = 'CONFIRMED')::int as seats_taken
    from events e left join registrations r on r.event_id = e.id
    group by e.id`)
  res.json({
    success: true,
    data: rows.map(camelRow).map((r) => ({ ...r, seatsLeft: Math.max(0, r.capacity - r.seatsTaken) })),
  })
}
