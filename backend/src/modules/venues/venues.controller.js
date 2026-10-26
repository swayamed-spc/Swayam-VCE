// Venues staff choose from when creating an event (the event form's dropdown). Admins add and delete them.
// Events keep the venue's name as text, so deleting a venue leaves existing events unchanged.
import { asc, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { venues } from '../../db/schema.js'
import { isUuid } from '../../utils/isUuid.js'

const fail = (res, status, message) => res.status(status).json({ success: false, message })
const isUniqueViolation = (err) => (err?.cause?.code ?? err?.code) === '23505'

export async function listVenues(req, res) {
  const list = await db.select().from(venues).orderBy(asc(venues.name))
  res.json({ success: true, data: list })
}

// Body: { name }
export async function addVenue(req, res) {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim().replace(/\s+/g, ' ') : ''
  if (!name || name.length > 120) return fail(res, 400, 'name is required (up to 120 characters).')
  try {
    const [venue] = await db.insert(venues).values({ name }).returning()
    res.status(201).json({ success: true, data: venue })
  } catch (err) {
    if (isUniqueViolation(err)) return fail(res, 409, `${name} is already in the list.`)
    throw err
  }
}

export async function deleteVenue(req, res) {
  if (!isUuid(req.params.id)) return fail(res, 404, 'Venue not found.')
  const [deleted] = await db.delete(venues).where(eq(venues.id, req.params.id)).returning()
  if (!deleted) return fail(res, 404, 'Venue not found.')
  res.json({ success: true, data: deleted })
}
