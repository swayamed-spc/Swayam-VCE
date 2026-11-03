import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { canRegister, seatStatus } from '../lib/events'

function EventCard({ e, index = 0, registered = false, onRegister }) {
  const [imgError, setImgError] = useState(false)
  const navigate = useNavigate()

  const isPast = e.phase === 'past'
  const status = isPast ? 'COMPLETED' : seatStatus(e)
  const showPoster = Boolean(e.poster) && !imgError

  function handleCardClick(ev) {
    // Don't intercept if user clicked on or inside an anchor or button
    if (ev.target.closest('a, button')) return
    navigate(e.href)
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter' && !ev.target.closest('a, button')) {
      navigate(e.href)
    }
  }

  return (
    <article
      className="event-card"
      style={{ '--stagger': Math.min(index, 10) }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${e.name} event card`}
    >
      {/* Event Image or Dark Fallback */}
      <div className="event-card-img">
        {showPoster ? (
          <img
            src={e.poster}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="event-card-fallback" aria-hidden="true">
            <div className="event-card-fallback-glow" />
            <svg
              className="event-card-fallback-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="event-card-fallback-name">{e.name}</span>
          </div>
        )}

        {/* Academic Year Badge */}
        {e.academicYear && (
          <span className="event-card-year" aria-label={`Academic year ${e.academicYear}`}>
            {e.academicYear}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="event-card-body">
        {/* Category Badge & Status */}
        <div className="event-card-meta-top">
          <span className="event-card-cat">{e.category}</span>
          <span
            className={`event-card-status ${!isPast ? 'event-card-status--active' : ''}`}
          >
            {status}
          </span>
        </div>

        {/* Event Title */}
        <div className="event-card-title">
          <h3>
            <Link to={e.href} tabIndex={-1}>
              {e.name}
            </Link>
          </h3>
        </div>

        {/* Date and Venue */}
        <div className="event-card-meta">
          <span>📅 {e.dateLabel}</span>
          {e.venue && <span>· 📍 {e.venue.split(',')[0]}</span>}
        </div>

        {/* Short Summary */}
        {e.summary && <p className="event-card-summary">{e.summary}</p>}

        {/* Footer */}
        <div className="event-card-footer">
          {/* Left info: Verified participants, seats, or omitted cleanly */}
          {e.participants ? (
            <span className="event-card-participants" title={e.participants}>
              👥 {e.participants}
            </span>
          ) : e.source === 'live' && e.capacity ? (
            <span className="event-card-participants">
              {e.taken || 0} of {e.capacity} seats taken
            </span>
          ) : (
            <span />
          )}

          {/* Right action */}
          {isPast ? (
            <Link to={e.href} className="event-card-action">
              View report <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          ) : registered ? (
            <Link to="/dashboard" className="btn btn--sm">
              View my registration
            </Link>
          ) : canRegister(e) && onRegister ? (
            <button
              className="btn btn--sm"
              onClick={(ev) => {
                ev.preventDefault()
                onRegister(e)
              }}
            >
              Register
            </button>
          ) : (
            <Link to={e.href} className="event-card-action">
              View details <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(EventCard)
