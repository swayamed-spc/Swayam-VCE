// One event in the Events list: a summary line that expands (on click) to show the details and actions.
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { canRegister, dayOf, inr, monthOf, seatStatus } from '../lib/events'
import { Pill, SeatBar, toneForSeats } from './ui'

export default function EventRow({ e, registered, onRegister }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const status = seatStatus(e)

  return (
    <div className={`row ${open ? 'open' : ''}`}>
      <button className="row-head" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <span className="row-date">
          <b>{dayOf(e.start)}</b>
          <span>{monthOf(e.start)} {e.start.getFullYear()}</span>
        </span>
        <span className="row-title">
          <h3>{e.name}</h3>
          <span>{[e.category, e.venue].filter(Boolean).join(' · ')}</span>
        </span>
        <span className="row-meta">
          <span>{inr(e.fee)}</span>
          <Pill tone={toneForSeats(status)}>{status}</Pill>
          <span className="row-chev" aria-hidden="true">+</span>
        </span>
      </button>
      <SeatBar taken={e.taken} capacity={e.capacity} />
      <div className="row-more" id={panelId} role="region" aria-label={`${e.name} details`}>
        <div>
          {e.summary && <p>{e.summary}</p>}
          <p className="small muted">
            {[e.dateLabel, e.timeLabel, e.mode].filter(Boolean).join(' · ')}
            {e.taken != null && ` · ${e.taken} of ${e.capacity} seats taken`}
            {e.participants && ` · ${e.participants}`}
          </p>
          <div className="actions">
            <Link className="btn btn--sm btn--ghost" to={e.href} tabIndex={open ? 0 : -1}>View details</Link>
            {registered ? (
              <Link className="btn btn--sm" to="/dashboard" tabIndex={open ? 0 : -1}>View my registration</Link>
            ) : (
              canRegister(e) && onRegister && (
                <button className="btn btn--sm" onClick={() => onRegister(e)} tabIndex={open ? 0 : -1}>Register</button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
