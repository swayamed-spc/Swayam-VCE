import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'
import { verifyTurnstile } from '../../utils/verifyTurnstile.js'

export const BCRYPT_COST = 12
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Compared against when the email is unknown, so a login takes the same time whether or not the account exists
const DUMMY_HASH = bcrypt.hashSync('timing-equaliser', BCRYPT_COST)

export const publicUser = ({ id, email, role, isActive, createdAt }) => ({ id, email, role, isActive, createdAt })

// clearCookie must use the same options as res.cookie, or the browser keeps the cookie
const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
})

export function setAuthCookie(res, userId) {
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
  const { exp } = jwt.decode(token) // cookie expires exactly when the token does
  res.cookie('token', token, { ...cookieOptions(), expires: new Date(exp * 1000) })
}

const fail = (res, status, message) => res.status(status).json({ success: false, message })

// Returns { email, password } or null. Body checks run before the CAPTCHA so a bad form doesn't burn the token.
function readCredentials(body, { forRegister }) {
  const { email, password } = body ?? {}
  if (typeof email !== 'string' || typeof password !== 'string') return null
  const normalised = email.trim().toLowerCase()
  if (!EMAIL.test(normalised) || normalised.length > 255) return null
  // bcrypt only uses the first 72 bytes, so longer passwords are rejected instead of silently truncated
  if (Buffer.byteLength(password) > 72) return null
  if (forRegister && password.length < 8) return null
  return { email: normalised, password }
}

const captchaPassed = (req) => verifyTurnstile(req.body?.turnstileToken, req.ip)

export async function register(req, res) {
  const creds = readCredentials(req.body, { forRegister: true })
  if (!creds) return fail(res, 400, 'Enter a valid email and a password of 8 to 72 characters.')
  if (!(await captchaPassed(req))) return fail(res, 403, 'CAPTCHA verification failed. Are you a bot?')

  const passwordHash = await bcrypt.hash(creds.password, BCRYPT_COST)
  const [user] = await db
    .insert(users)
    .values({ email: creds.email, passwordHash })
    .onConflictDoNothing({ target: users.email })
    .returning()
  if (!user) return fail(res, 409, 'An account with this email already exists.')

  setAuthCookie(res, user.id)
  res.status(201).json({ success: true, data: publicUser(user) })
}

export async function login(req, res) {
  const creds = readCredentials(req.body, { forRegister: false })
  if (!creds) return fail(res, 400, 'Enter your email and password.')
  if (!(await captchaPassed(req))) return fail(res, 403, 'CAPTCHA verification failed. Are you a bot?')

  const [user] = await db.select().from(users).where(eq(users.email, creds.email)).limit(1)
  const passwordOk = await bcrypt.compare(creds.password, user?.passwordHash ?? DUMMY_HASH)
  // Same answer for unknown email, wrong password and deactivated account, so emails can't be probed
  if (!user || !passwordOk || !user.isActive) return fail(res, 401, 'Invalid email or password.')

  setAuthCookie(res, user.id)
  res.json({ success: true, data: publicUser(user) })
}

export function logout(req, res) {
  res.clearCookie('token', cookieOptions())
  res.json({ success: true, data: null })
}

export function me(req, res) {
  res.json({ success: true, data: req.user })
}
