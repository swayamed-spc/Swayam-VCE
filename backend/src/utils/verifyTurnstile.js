// Checks a Cloudflare Turnstile token with Cloudflare's siteverify API. Fails closed: a missing token, a network
// error, a timeout or any unexpected response returns false. Each token is single-use and expires after 5 minutes.
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(turnstileToken, remoteIp) {
  if (typeof turnstileToken !== 'string' || !turnstileToken || turnstileToken.length > 2048) return false

  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: turnstileToken })
  if (remoteIp) body.set('remoteip', remoteIp)

  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(5000) })
    if (!res.ok) return false
    const data = await res.json()
    return data.success === true
  } catch (err) {
    console.error('Turnstile verification error:', err.message)
    return false
  }
}
