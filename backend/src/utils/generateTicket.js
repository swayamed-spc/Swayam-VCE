// One master QR ticket per student per event: payload = base64url(subject) + "." + base64url(HMAC-SHA256(that, QR_SECRET)).
//   Main pass:       subject = the registration id. Admits to the main event and to every sub-event they booked.
//   Standalone pass: subject = "standalone:<eventId>:<userId>", for students with sub-event bookings but no main pass.
//                    Admits only to the sub-events of that event they booked.
// Nothing is stored: the same subject always gives the same payload, and only the server can make a valid one. What a
// ticket admits to is decided at scan time from the database, so cancelling a booking needs no ticket revocation.
// Changing QR_SECRET invalidates every ticket already issued.
import { createHmac, timingSafeEqual } from 'node:crypto'
import { isUuid } from './isUuid.js'

const sign = (data) => createHmac('sha256', process.env.QR_SECRET).update(data).digest('base64url')

function encode(subject) {
  const body = Buffer.from(subject, 'utf8').toString('base64url')
  return `${body}.${sign(body)}`
}

export const generateTicket = (registrationId) => encode(registrationId)

export const generateStandaloneTicket = (eventId, userId) => encode(`standalone:${eventId}:${userId}`)

// For check-in scanning. Returns { kind: 'MAIN', registrationId } or { kind: 'STANDALONE', eventId, userId } if the
// payload is genuine, otherwise null.
export function verifyTicket(payload) {
  if (typeof payload !== 'string' || payload.length > 300) return null
  const [body, signature, extra] = payload.split('.')
  if (!body || !signature || extra !== undefined) return null

  const expected = Buffer.from(sign(body))
  const given = Buffer.from(signature)
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null

  const subject = Buffer.from(body, 'base64url').toString('utf8')
  if (isUuid(subject)) return { kind: 'MAIN', registrationId: subject }
  const [tag, eventId, userId, rest] = subject.split(':')
  if (tag === 'standalone' && isUuid(eventId) && isUuid(userId) && rest === undefined) {
    return { kind: 'STANDALONE', eventId, userId }
  }
  return null
}
