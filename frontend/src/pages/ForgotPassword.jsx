import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import Turnstile from '../components/Turnstile'
import { Alert } from '../components/ui'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(null)
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Enter a valid email address.')
    if (!token) return setError('Please complete the security check.')
    setBusy(true)
    setError('')
    try {
      await api('/auth/forgot-password', { method: 'POST', body: { email: email.trim(), turnstileToken: token } })
      setSent(true)
    } catch (err) {
      setError(err.message)
      setResetKey((k) => k + 1)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="w page narrow">
      <h1 className="page-title">Reset your password</h1>
      {sent ? (
        <>
          <Alert tone="ok">If an account exists for {email.trim()}, we have sent it a link to choose a new password. The link works once and expires in 30 minutes.</Alert>
          {import.meta.env.DEV && <p className="small muted">Development note: emails aren't sent yet. The reset link is printed in the backend terminal.</p>}
          <div className="actions mt-md">
            <Link className="btn" to="/login">Back to log in</Link>
            <button className="btn btn--ghost" onClick={() => { setSent(false); setResetKey((k) => k + 1) }}>Send another link</button>
          </div>
        </>
      ) : (
        <>
          <p className="muted mb-md">Enter the email you signed up with and we'll send you a link to choose a new password.</p>
          <form onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Turnstile onToken={setToken} resetKey={resetKey} />
            <Alert>{error}</Alert>
            <button className="btn btn--block" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</button>
          </form>
          <p className="auth-foot">Remembered it? <Link to="/login">Log in</Link></p>
        </>
      )}
    </div>
  )
}
