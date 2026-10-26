// Emails sent when staff decide a payment. Fire and forget: called without await, never throws, never delays or
// changes the staff member's request.
import { inArray, sql } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'
import { frontendUrl, sendEmail } from '../../utils/email.js'

const when = (date) =>
  new Date(date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

// rows: the registrations or bookings just approved (camelCase), the leader and any teammates. Each member whose row
// is now VERIFIED gets their own message with a link to their master ticket.
export async function notifyApproved(noun, rows) {
  try {
    const approved = rows.filter((r) => r.paymentStatus === 'VERIFIED')
    if (!approved.length) return
    const people = await db.select({ id: users.id, email: users.email, name: users.name }).from(users).where(inArray(users.id, approved.map((r) => r.userId)))
    const { rows: info } = noun === 'booking'
      ? await db.execute(sql`select e.id as event_id, e.title as event_title, e.date, s.title as session_title, s.start_time
          from sub_events s join events e on e.id = s.event_id where s.id = ${approved[0].subEventId}::uuid`)
      : await db.execute(sql`select id as event_id, title as event_title, date from events where id = ${approved[0].eventId}::uuid`)
    if (!info.length) return
    const { event_id: eventId, event_title: eventTitle, date, session_title: sessionTitle, start_time: startTime } = info[0]
    const ticket = `${frontendUrl()}/tickets/${eventId}`

    await Promise.all(approved.map((row) => {
      const person = people.find((p) => p.id === row.userId)
      if (!person) return null
      const hi = `Hi ${person.name?.split(' ')[0] || 'there'},`
      const team = row.teamName ? ` (team ${row.teamName})` : ''
      return sessionTitle
        ? sendEmail({
            to: person.email,
            subject: `You're booked: ${sessionTitle}`,
            heading: 'Your session booking is confirmed',
            lines: [
              hi,
              `Your payment was verified and your place in ${sessionTitle} at ${eventTitle}${team} is confirmed${startTime ? `, ${when(startTime)}` : ''}.`,
              'Your event QR ticket gets you in. Show it at the session.',
            ],
            button: { label: 'View your ticket', url: ticket },
          })
        : sendEmail({
            to: person.email,
            subject: `Your ticket for ${eventTitle}`,
            heading: 'Payment confirmed: your ticket is ready',
            lines: [
              hi,
              `Your payment for ${eventTitle}${team} has been verified. See you on ${when(date)}.`,
              'Show your QR ticket at the entrance. It also admits you to any sessions you book.',
            ],
            button: { label: 'View your ticket', url: ticket },
          })
    }))
  } catch (err) {
    console.error('[email] payment notification failed:', err?.message ?? err)
  }
}
