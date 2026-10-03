import { Link, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../context/auth'
import { events, fmt } from '../data/site'
export function Dashboard() {
  const { user, regs } = useAuth()
  return (<div className="wrap page">
    <h1>Hi, {user.name.split(' ')[0]}</h1>
    <h2 className="h2" style={{ fontSize: 32 }}>My tickets</h2>
    {regs.length === 0 ? <><p className="muted" style={{ marginBottom: 16 }}>You have not registered for any event yet.</p><Link to="/events" className="btn">Browse events</Link></> :
      <div className="grid">{regs.map(r => { const e = events.find(x => x.slug === r.slug); return (
        <div key={r.code} className="card pad" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 24 }}>{e.name}</h3><p className="muted">{fmt(e.date)} · {e.venue}</p>
          <p className="mono" style={{ margin: '8px 0 16px' }}>{r.code}</p><Link to={`/ticket/${r.code}`} className="btn" style={{ fontSize: 16 }}>Open ticket</Link>
        </div>)})}</div>}
  </div>)
}
export function Ticket() {
  const { code } = useParams(), { regs, user } = useAuth()
  const r = regs.find(x => x.code === code)
  if (!r) return <div className="wrap page"><h1>No ticket</h1><Link to="/dashboard" className="btn">Back</Link></div>
  const e = events.find(x => x.slug === r.slug)
  return (<div className="wrap page" style={{ maxWidth: 420 }}>
    <div className="card" style={{ padding: 32, textAlign: 'center' }}>
      <span className="badge">Confirmed</span>
      <h2 style={{ fontSize: 36, margin: '12px 0 4px', fontFamily: 'var(--f-canticle)' }}>{e.name}</h2>
      <p className="muted">{fmt(e.date)} at {e.time}<br />{e.venue}</p>
      <div style={{ background: '#fff', padding: 14, display: 'inline-block', margin: '20px 0' }}><QRCodeSVG value={r.code} size={190} /></div>
      <p className="mono">{r.code}</p><p className="muted">{user.name}</p>
      <button className="btn" style={{ marginTop: 20 }} onClick={() => window.print()}>Print or save as PDF</button>
    </div></div>)
}
