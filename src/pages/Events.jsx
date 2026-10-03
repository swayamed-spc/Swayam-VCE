import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import RegisterModal from '../components/RegisterModal'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/auth'
import { events, fmt, inr, statusOf } from '../data/site'

export function EventsList() {
  const [q, setQ] = useState(''), [cat, setCat] = useState('All'), [price, setPrice] = useState('All')
  const cats = ['All', ...new Set(events.map(e => e.category))]
  const list = useMemo(() => events.filter(e =>
    e.name.toLowerCase().includes(q.toLowerCase()) && (cat === 'All' || e.category === cat) &&
    (price === 'All' || (price === 'Free' ? e.fee === 0 : e.fee > 0))), [q, cat, price])
  return (<div className="wrap page">
    <h1 style={{ fontFamily: 'var(--f-accent)' }}>Events</h1>
    <input placeholder="Search events" aria-label="Search events" value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 420 }} />
    <div className="chips">{cats.map(c => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
      {['All', 'Free', 'Paid'].map(p => <button key={p} className={`chip ${price === p ? 'on' : ''}`} onClick={() => setPrice(p)}>{p === 'All' ? 'Any price' : p}</button>)}</div>
    {list.length ? <div className="grid">{list.map(e => <EventCard key={e.slug} e={e} />)}</div>
      : <p className="muted">No events match. Clear a filter to see more.</p>}
  </div>)
}

export function EventDetail() {
  const { slug } = useParams(), nav = useNavigate(), { user, regs } = useAuth()
  const [open, setOpen] = useState(false)
  const e = events.find(x => x.slug === slug)
  if (!e) return <div className="wrap page"><h1>Not found</h1><Link to="/events" className="btn">Back to events</Link></div>
  const s = statusOf(e), mine = regs.find(r => r.slug === e.slug), can = s === 'Open' || s === 'Closing soon'
  const click = () => user ? setOpen(true) : nav('/login')
  return (<div className="wrap page">
    <p className="muted"><Link to="/">Home</Link> / <Link to="/events">Events</Link> / {e.name}</p>
    <h1 style={{ marginTop: 16 }}>{e.name}</h1>
    <div className="split">
      <div>
        <Reveal><h2 className="h2" style={{ fontSize: 32 }}>About</h2><p>{e.about}</p></Reveal>
        <Reveal><h2 className="h2" style={{ fontSize: 32, marginTop: 48 }}>Schedule</h2>
          <div className="tl">{e.schedule.map(x => <div key={x.t}><b>{x.t}</b><p>{x.e}</p></div>)}</div></Reveal>
        <Reveal><h2 className="h2" style={{ fontSize: 32 }}>Rules</h2><ul style={{ paddingLeft: 20 }}>{e.rules.map(r => <li key={r}>{r}</li>)}</ul></Reveal>
        <Reveal><h2 className="h2" style={{ fontSize: 32, marginTop: 48 }}>Prizes</h2><p>{e.prizes}</p></Reveal>
      </div>
      <aside className="card pad sticky" style={{ padding: 28 }}>
        <span className="badge">{inr(e.fee)}</span>
        <p style={{ margin: '12px 0 0' }}>{fmt(e.date)} at {e.time}</p><p className="muted">{e.venue}</p>
        <div className="bar" style={{ margin: '16px 0 6px' }}><i style={{ width: `${e.filled / e.capacity * 100}%` }} /></div>
        <p className="muted" style={{ fontSize: 14, marginBottom: 16 }}>{e.filled} of {e.capacity} seats taken · {s}</p>
        {mine ? <Link className="btn" to={`/ticket/${mine.code}`}>View your ticket</Link>
          : <button className="btn" disabled={!can} style={!can ? { opacity: .4, cursor: 'not-allowed' } : {}} onClick={click}>{can ? 'Register' : s}</button>}
      </aside>
    </div>
    {open && <RegisterModal ev={e} onClose={() => setOpen(false)} />}
  </div>)
}
