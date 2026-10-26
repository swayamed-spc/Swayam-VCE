// Email through Resend (https://resend.com). With RESEND_API_KEY unset (local development) nothing is sent and the
// message is printed in the terminal instead, so links such as password resets still work while testing.
// EMAIL_FROM is the sender, e.g. "Swayam E-Cell <noreply@your-domain>" on a domain verified in Resend. Resend's own
// onboarding@resend.dev (the default) only delivers to the Resend account owner's address.
//
// sendEmail never throws: callers fire and forget, and a mail failure must not fail the request that caused it.
const RESERVED = /@[^@]+\.(invalid|test|example|localhost)$/i // test addresses that can never receive mail

const escape = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export const frontendUrl = () =>
  (process.env.FRONTEND_URL || (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',')[0]).replace(/\/+$/, '')

// { to, subject, heading, lines: [text], button?: { label, url }, footer? } → a plain, on-brand message (HTML + text)
export async function sendEmail({ to, subject, heading, lines, button, footer }) {
  if (!to) return
  const text = [heading, '', ...lines, ...(button ? ['', `${button.label}: ${button.url}`] : []), ...(footer ? ['', footer] : [])].join('\n')
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.log(`[email not sent: RESEND_API_KEY unset] to ${to}: ${subject}\n${text}\n`)
    return
  }
  if (RESERVED.test(to)) return
  const html = `<!doctype html><html><body style="margin:0;background:#000;font-family:Arial,Helvetica,sans-serif;color:#f4f4f2">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#0a0a0a;border:1px solid #262626;border-radius:14px;padding:28px">
<tr><td style="font-size:20px;font-weight:700;padding-bottom:4px">Swayam <span style="color:#8c8c8c;font-weight:400;font-size:14px">E-Cell</span></td></tr>
<tr><td style="font-size:22px;font-weight:700;padding:16px 0 8px">${escape(heading)}</td></tr>
${lines.map((l) => `<tr><td style="font-size:15px;line-height:1.6;color:#cfcfcc;padding-bottom:10px">${escape(l)}</td></tr>`).join('')}
${button ? `<tr><td style="padding:14px 0 6px"><a href="${escape(button.url)}" style="display:inline-block;background:#ff9f1c;color:#000;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:999px">${escape(button.label)}</a></td></tr>` : ''}
${footer ? `<tr><td style="font-size:12px;line-height:1.5;color:#8c8c8c;padding-top:18px">${escape(footer)}</td></tr>` : ''}
</table></td></tr></table></body></html>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from: process.env.EMAIL_FROM || 'Swayam E-Cell <onboarding@resend.dev>', to: [to], subject, html, text }),
    })
    if (!res.ok) console.error(`[email] Resend refused the message to ${to} (${res.status}): ${(await res.text()).slice(0, 300)}`)
  } catch (err) {
    console.error(`[email] could not reach Resend for ${to}:`, err?.message ?? err)
  }
}
