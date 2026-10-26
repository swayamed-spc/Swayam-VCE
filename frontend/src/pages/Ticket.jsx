import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import QrTicket from '../components/QrTicket'
import { Crumbs } from '../components/ui'
import { useAuth } from '../context/auth'
import { useLiveEvents } from '../hooks/useLiveEvents'
import { fmtDateTime, fromLive } from '../lib/events'

// /tickets/:eventId — the student's master QR code for one event
export default function Ticket() {
  const { eventId } = useParams()
  const { user } = useAuth()
  const { live } = useLiveEvents()
  const [fetched, setFetched] = useState(null)
  const event = live.find((e) => e.key === eventId) ?? fetched

  useEffect(() => {
    if (live.some((e) => e.key === eventId)) return
    api(`/events/${eventId}`).then((e) => setFetched(fromLive(e))).catch(() => {})
  }, [eventId, live])

  return (
    <div className="w page">
      <Crumbs items={[{ label: 'Dashboard', to: '/dashboard' }, { label: event?.name ?? 'Ticket' }]} />
      <div className="panel ticket">
        <span className="eyebrow">Entry ticket</span>
        <h1>{event?.name ?? 'Your ticket'}</h1>
        {event && <p className="muted">{fmtDateTime(event.start)}<br />{event.venue}</p>}
        <QrTicket eventId={eventId} />
        <p className="mb-0"><b>{user?.name || user?.email}</b></p>
        {user?.name && <p className="small muted">{user.email}</p>}
        <p className="small muted mt-md">Show this code at the entrance. Keep it private: anyone with the code can use your entry.</p>
        <div className="actions">
          <button className="btn btn--sm btn--ghost" onClick={() => window.print()}>Print</button>
          <Link className="btn btn--sm btn--ghost" to="/dashboard">All tickets</Link>
        </div>
      </div>
    </div>
  )
}
