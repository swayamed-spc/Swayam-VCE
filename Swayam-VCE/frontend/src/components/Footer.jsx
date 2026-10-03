import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { club } from '../data/site'
export default function Footer() {
  return (<footer><div className="wrap">
    <div className="grid">
      <div><img src={logo} alt="Swayam E-Cell" style={{ height: 72, marginBottom: 8 }} /><p className="muted">{club.tagline}</p></div>
      <div><h3 style={{ fontSize: 26, marginBottom: 8, fontFamily: 'var(--f-canticle)' }}>Explore</h3><p><Link to="/events">Events</Link></p><p><Link to="/about">About and team</Link></p></div>
      <div><h3 style={{ fontSize: 26, marginBottom: 8, fontFamily: 'var(--f-canticle)' }}>Contact</h3><p className="muted">{club.email}</p><p className="muted">{club.phone}</p><p className="muted">{club.address}</p></div>
      <div><h3 style={{ fontSize: 26, marginBottom: 8, fontFamily: 'var(--f-canticle)' }}>Follow</h3>{club.socials.map(s => <p key={s.n}><a href={s.u}>{s.n}</a></p>)}</div>
    </div>
    <p className="muted" style={{ fontSize: 14 }}>© 2026 Swayam E-Cell</p>
  </div></footer>)
}
