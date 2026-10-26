import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { Alert, Empty } from '../components/ui'

// Opened from the emailed link: /reset-password?token=...
export default function ResetPassword() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (password.length < 8) return setError('Choose a password of at least 8 characters.')
    if (new TextEncoder().encode(password).length > 72) return setError('That password is too long. Use at most 72 characters.')
    if (password !== confirm) return setError('The two passwords do not match.')
    setBusy(true)
    setError('')
    try {
      await api('/auth/reset-password', { method: 'POST', body: { token, password } })
      setDone(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <div className="w page narrow">
        <h1 className="page-title">Reset your password</h1>
        <Empty title="This link is incomplete" actions={<Link className="btn btn--sm" to="/forgot-password">Request a new link</Link>}>
          Open the link from your email exactly as it was sent, or request a new one.
        </Empty>
      </div>
    )
  }

  return (
    <div className="w page narrow">
      <h1 className="page-title">Choose a new password</h1>
      {done ? (
        <>
          <Alert tone="ok">Your password has been changed.</Alert>
          <Link className="btn" to="/login">Log in</Link>
        </>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="password">New password</label>
            <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="hint">At least 8 characters.</p>
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirm new password</label>
            <input id="confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
          <Alert>{error}</Alert>
          {error && /expired|invalid/i.test(error) && <p className="small"><Link className="text-link" to="/forgot-password">Request a new link</Link></p>}
          <button className="btn btn--block" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Change password'}</button>
        </form>
      )}
    </div>
  )
}
