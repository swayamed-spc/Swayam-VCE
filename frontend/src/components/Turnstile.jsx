// Cloudflare Turnstile CAPTCHA. Calls onToken(token) when solved and onToken(null) when it expires or fails.
// Tokens are single-use: after a failed submit, change `resetKey` to get a fresh one.
import { useEffect, useRef } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA' // Cloudflare's test key
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise
function loadScript() {
  scriptPromise ??= new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile)
    const s = document.createElement('script')
    s.src = SCRIPT
    s.async = true
    s.onload = () => resolve(window.turnstile)
    s.onerror = () => {
      scriptPromise = null
      reject(new Error('CAPTCHA failed to load'))
    }
    document.head.appendChild(s)
  })
  return scriptPromise
}

export default function Turnstile({ onToken, resetKey = 0 }) {
  const box = useRef(null)
  const widget = useRef(null)
  const latest = useRef(onToken)
  latest.current = onToken

  useEffect(() => {
    let cancelled = false
    loadScript()
      .then((ts) => {
        if (cancelled || !box.current) return
        widget.current = ts.render(box.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          callback: (t) => latest.current(t),
          'expired-callback': () => latest.current(null),
          'error-callback': () => latest.current(null),
        })
      })
      .catch(() => latest.current(null))
    return () => {
      cancelled = true
      if (widget.current != null) window.turnstile?.remove(widget.current)
      widget.current = null
    }
  }, [])

  useEffect(() => {
    if (resetKey && widget.current != null) {
      latest.current(null)
      window.turnstile?.reset(widget.current)
    }
  }, [resetKey])

  return <div ref={box} className="turnstile" aria-label="Security check" />
}
