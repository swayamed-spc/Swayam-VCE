import { Link } from 'react-router-dom'
import { fmt, inr, statusOf } from '../data/site'
const FF = { Competition: '--f-accent', Workshop: '--f-fun', Speaker: '--f-canticle' }
export default function EventCard({ e }) {
  const s = statusOf(e)
  return (<Link to={`/events/${e.slug}`} className="card" style={{ display: 'block' }}>
    <div className="poster">{e.name}</div>
    <div className="pad">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="badge">{inr(e.fee)}</span><span className="muted">{s}</span></div>
      <h3 style={{ fontSize: 28, margin: '12px 0 4px', fontFamily: `var(${FF[e.category] || '--f-head'})` }}>{e.name}</h3>
      <p className="muted">{fmt(e.date)} · {e.venue}</p>
      <div className="bar" style={{ margin: '14px 0 6px' }}><i style={{ width: `${e.filled / e.capacity * 100}%` }} /></div>
      <p className="muted" style={{ fontSize: 13 }}>{e.filled} of {e.capacity} seats taken</p>
    </div>
  </Link>)
}
