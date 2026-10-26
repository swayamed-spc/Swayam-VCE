import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import GoogleButton from '../components/GoogleButton'
import Turnstile from '../components/Turnstile'
import { Alert, Loading } from '../components/ui'
import { useAuth } from '../context/auth'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Where to go after signing in: back to the page that sent us here, or My tickets
function useReturnTo() {
  const location = useLocation()
  const from = location.state?.from
  return typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : '/dashboard'
}

function AuthShell({ title, intro, children }) {
  const { user, ready } = useAuth()
  const returnTo = useReturnTo()
  if (!ready) return <div className="w page"><Loading /></div>
  if (user) return <Navigate to={returnTo} replace />
  return (
    <div className="w page narrow">
      <h1 className="page-title">{title}</h1>
      {intro && <p className="muted mb-md">{intro}</p>}
      {children}
    </div>
  )
}

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = useReturnTo()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) return setError('Enter a valid email address.')
    if (!password) return setError('Enter your password.')
    if (!token) return setError('Please complete the security check.')
    setBusy(true)
    setError('')
    try {
      await login(email.trim(), password, token)
      navigate(returnTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setResetKey((k) => k + 1) // CAPTCHA tokens are single-use
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Log in" intro="Welcome back. Log in to register for events and see your tickets.">
      <GoogleButton onSuccess={() => navigate(returnTo, { replace: true })} onError={setError} />
      <div className="auth-or">or with email</div>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="hint"><Link className="text-link" to="/forgot-password">Forgot password?</Link></p>
        </div>
        <Turnstile onToken={setToken} resetKey={resetKey} />
        <Alert>{error}</Alert>
        <button className="btn btn--block" type="submit" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
      </form>
      <p className="auth-foot">New to Swayam? <Link to="/signup" state={location.state}>Create an account</Link></p>
    </AuthShell>
  )
}

export function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = useReturnTo()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [resetKey, setResetKey] = useState(0)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Enter your full name.')
    if (!EMAIL.test(email.trim())) return setError('Enter a valid email address.')
    if (password.length < 8) return setError('Choose a password of at least 8 characters.')
    if (!token) return setError('Please complete the security check.')
    setBusy(true)
    setError('')
    try {
      await signup(name.trim(), email.trim(), password, token)
      navigate(returnTo, { replace: true })
    } catch (err) {
      setError(err.message)
      setResetKey((k) => k + 1)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Create an account" intro="One account for every Swayam event: registrations, payments and tickets.">
      <GoogleButton onSuccess={() => navigate(returnTo, { replace: true })} onError={setError} />
      <div className="auth-or">or with email</div>
      <form onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="hint">At least 8 characters.</p>
        </div>
        <Turnstile onToken={setToken} resetKey={resetKey} />
        <Alert>{error}</Alert>
        <button className="btn btn--block" type="submit" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="auth-foot">Already have an account? <Link to="/login" state={location.state}>Log in</Link></p>
    </AuthShell>
  )
}
