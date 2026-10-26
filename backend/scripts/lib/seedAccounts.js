// Shared by the seed scripts: creates or resets accounts with one password, then reads them back and checks each
// password the way login does. Re-running is safe: existing accounts get their password, role and active flag reset.
// The password is public, so this refuses to run with NODE_ENV=production unless the script is given --force.
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { inArray, sql } from 'drizzle-orm'
import { db } from '../../src/db/index.js'
import { users } from '../../src/db/schema.js'
import { BCRYPT_COST } from '../../src/modules/auth/auth.controller.js'

export const PASSWORD = 'Password123!'

// The accounts db:seed has always created; seed-demo.js adds more on top
export const BASE_ACCOUNTS = [
  { email: 'admin@swayam.com', name: 'Swayam Admin', role: 'ADMIN' },
  { email: 'manager@swayam.com', name: 'Event Manager', role: 'EVENT_HEAD' },
  { email: 'student@swayam.com', name: 'Test Student', role: 'STUDENT' },
]

// accounts: [{ email, name, role }]. Returns true when every account can log in.
export async function seedAccounts(accounts) {
  if (process.env.NODE_ENV === 'production' && !process.argv.includes('--force')) {
    console.error('NODE_ENV is production: refusing to create accounts with a public password. Pass --force to override.')
    return false
  }

  const passwordHash = await bcrypt.hash(PASSWORD, BCRYPT_COST)
  await db
    .insert(users)
    .values(accounts.map((a) => ({ ...a, passwordHash })))
    .onConflictDoUpdate({
      target: users.email,
      set: { passwordHash, role: sql`excluded.role`, isActive: true },
    })

  const saved = await db.select().from(users).where(inArray(users.email, accounts.map((a) => a.email)))
  let ok = true
  for (const { email, role } of accounts) {
    const row = saved.find((u) => u.email === email)
    const works = row && row.role === role && row.isActive && (await bcrypt.compare(PASSWORD, row.passwordHash))
    if (!works) ok = false
    console.log(`${works ? 'ok  ' : 'FAIL'} ${email.padEnd(24)} ${role}`)
  }
  console.log(ok ? `\nAll ${accounts.length} accounts can log in with ${PASSWORD}` : '\nSome accounts did not save correctly.')
  return ok
}
