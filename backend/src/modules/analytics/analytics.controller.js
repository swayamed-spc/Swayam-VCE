import { sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { camelRow } from '../../db/fragments.js'

// Club-wide numbers for the admin dashboard. Revenue counts only VERIFIED payments (solo and team-leader rows),
// across main events and sub-events; tickets count every VERIFIED, CONFIRMED person.
export async function getOverview(req, res) {
  const paying = sql.raw('(team_id is null or is_group_leader)')
  const { rows } = await db.execute(sql`
    select
      (select count(*) from events)::int as total_events,
      (select count(*) from users)::int as total_users,
      ((select coalesce(sum(total_amount_paid), 0) from registrations where payment_status = 'VERIFIED' and ${paying})
        + (select coalesce(sum(total_amount_paid), 0) from sub_event_bookings where payment_status = 'VERIFIED' and ${paying}))::int
        as total_revenue,
      (select count(*) from registrations where status = 'CONFIRMED' and payment_status = 'VERIFIED')::int as total_tickets_sold,
      (select count(*) from sub_event_bookings where status = 'CONFIRMED' and payment_status = 'VERIFIED')::int
        as total_sub_event_bookings,
      ((select count(*) from registrations where status = 'CONFIRMED' and payment_status = 'PENDING' and ${paying})
        + (select count(*) from sub_event_bookings where status = 'CONFIRMED' and payment_status = 'PENDING' and ${paying}))::int
        as pending_payments,
      ((select count(*) from registrations where payment_status = 'REFUND_REQUIRED' and ${paying})
        + (select count(*) from sub_event_bookings where payment_status = 'REFUND_REQUIRED' and ${paying}))::int
        as refunds_due`)
  res.json({ success: true, data: camelRow(rows[0]) })
}
