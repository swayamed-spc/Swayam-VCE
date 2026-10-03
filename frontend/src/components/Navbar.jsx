import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
export default function Navbar() {
  const [solid, setSolid] = useState(false), [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  useEffect(() => { const f = () => setSolid(scrollY > 20); f(); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}><div className="wrap">
      <Link to="/" className="logo">SWAY<b>AM</b></Link>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      <nav className={`links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <NavLink to="/events" className={({ isActive }) => isActive ? 'on' : ''}>Events</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'on' : ''}>About</NavLink>
        {user ? <><NavLink to="/dashboard">My tickets</NavLink><a href="#" onClick={(e) => { e.preventDefault(); logout() }}>Log out</a></>
          : <Link to="/login" className="btn" style={{ fontSize: 16, padding: '8px 20px' }}>Log in</Link>}
      </nav>
    </div></header>
  )
}
