import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'

// Body: { name }. Lets a signed-in user set the display name shown on their profile and tickets.
export async function updateMe(req, res) {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  if (!name || name.length > 100) return res.status(400).json({ success: false, message: 'Enter your name (up to 100 characters).' })

  const [user] = await db
    .update(users)
    .set({ name })
    .where(eq(users.id, req.user.id))
    .returning({ id: users.id, email: users.email, name: users.name, role: users.role, isActive: users.isActive, createdAt: users.createdAt })
  res.json({ success: true, data: user })
}
