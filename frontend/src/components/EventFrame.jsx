// An event card for the horizontal strip on the home page.
import { Link } from 'react-router-dom'
import { dayOf, inr, monthOf, seatStatus } from '../lib/events'

export default function EventFrame({ e }) {
  return (
    <Link className="frame" to={e.href}>
      {e.poster && (
        <div className="frame-img">
          <img src={e.poster} alt="" loading="lazy" />
        </div>
      )}
      <div className="frame-body">
        <div className="frame-date">
          <b>{dayOf(e.start)}</b>
          <span>{monthOf(e.start, 'long')}</span>
        </div>
        <div>
          <p className="small">{e.category}</p>
          <h3>{e.name}</h3>
          <p>{[e.start.getFullYear(), e.venue && e.venue.split(',')[0]].filter(Boolean).join(' · ')}</p>
          <p>{e.source === 'live' ? `${inr(e.fee)} · ${seatStatus(e)}` : e.mode}</p>
        </div>
      </div>
    </Link>
  )
}
