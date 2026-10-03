import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
function Form({ signup }) {
  const { login } = useAuth(), nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', password: '', roll: '' }), [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.')
    if (f.password.length < 8) return setErr('Password must be at least 8 characters.')
    if (signup && !f.name.trim()) return setErr('Enter your full name.')
    login({ name: f.name || f.email.split('@')[0], email: f.email, roll: f.roll }); nav('/dashboard')
  }
  return (<div className="wrap page" style={{ maxWidth: 480 }}>
    <h1 style={{ fontSize: 'clamp(40px,8vw,72px)' }}>{signup ? 'Sign up' : 'Log in'}</h1>
    <form className="card" style={{ padding: 28 }} onSubmit={submit}>
      {signup && <><label htmlFor="n">Full name</label><input id="n" value={f.name} onChange={set('name')} />
        <label htmlFor="r">Roll number</label><input id="r" value={f.roll} onChange={set('roll')} /></>}
      <label htmlFor="e">Email</label><input id="e" type="email" value={f.email} onChange={set('email')} />
      <label htmlFor="p">Password</label><input id="p" type="password" value={f.password} onChange={set('password')} />
      {err && <p role="alert" style={{ color: 'var(--red2)', marginBottom: 12 }}>{err}</p>}
      <button className="btn" type="submit">{signup ? 'Create account' : 'Log in'}</button>
      <p className="muted" style={{ marginTop: 16 }}>{signup ? <>Have an account? <Link to="/login">Log in</Link></> : <>New here? <Link to="/signup">Sign up</Link></>}</p>
    </form></div>)
}
export const Login = () => <Form />
export const Signup = () => <Form signup />
