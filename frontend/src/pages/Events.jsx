import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EventCard from '../components/EventCard'
import RegisterModal from '../components/RegisterModal'
import { Alert, Empty, Loading } from '../components/ui'
import { useAuth } from '../context/auth'
import { useLiveEvents } from '../hooks/useLiveEvents'
import { useMyRegistrations } from '../hooks/useMyRegistrations'
import { applyFilters, archive, byPhase, PHASE_LABEL, PHASES } from '../lib/events'
import { club } from '../data/site'

const PRICES = [['All', 'Any price'], ['Free', 'Free'], ['Paid', 'Paid']]
const instagram = club.socials.find((s) => s.n === 'Instagram')?.u

// /events, /events/upcoming, /events/ongoing, /events/past.
export default function Events({ phase = 'past' }) {
  const { live, loading, error, reload } = useLiveEvents()
  const { user } = useAuth()
  const mine = useMyRegistrations()
  const navigate = useNavigate()
  const location = useLocation()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState('All')
  const [academicYear, setAcademicYear] = useState('All')
  const [registering, setRegistering] = useState(null)

  const all = useMemo(() => [...live, ...archive], [live])
  const counts = useMemo(() => Object.fromEntries(PHASES.map((p) => [p, byPhase(all, p).length])), [all])
  const inPhase = useMemo(() => byPhase(all, phase), [all, phase])
  const categories = useMemo(() => ['All', ...new Set(inPhase.map((e) => e.category).filter(Boolean))], [inPhase])
  const academicYears = useMemo(() => {
    const list = inPhase.map((e) => e.academicYear).filter(Boolean)
    return list.length ? ['All', ...new Set(list)] : []
  }, [inPhase])
  const shown = applyFilters(inPhase, { q, category, price, academicYear })

  useEffect(() => {
    if (category !== 'All' && !categories.includes(category)) setCategory('All')
  }, [categories, category])

  useEffect(() => {
    if (academicYear !== 'All' && !academicYears.includes(academicYear)) setAcademicYear('All')
  }, [academicYears, academicYear])

  function onRegister(e) {
    if (!user) return navigate('/login', { state: { from: location.pathname } })
    setRegistering(e)
  }

  function clearFilters() {
    setQ('')
    setCategory('All')
    setPrice('All')
    setAcademicYear('All')
  }

  const liveTab = phase !== 'past'
  const filtering = q || category !== 'All' || price !== 'All' || academicYear !== 'All'

  return (
    <div className="w page">
      <h1 className="page-title">Events</h1>
      <p className="intro">
        Workshops, founder talks, competitions and summits run by Swayam. Register for what is coming up, or browse the
        archive of everything we have run since 2018.
      </p>

      <nav className="tabs mt-md" aria-label="Event timing">
        {PHASES.map((p) => (
          <Link key={p} className="tab" to={`/events/${p}`} aria-current={p === phase ? 'page' : undefined}>
            {PHASE_LABEL[p]}<small>{p === 'past' || !loading ? counts[p] : '…'}</small>
          </Link>
        ))}
      </nav>

      {liveTab && error && (
        <Alert tone="info">Live events couldn't be loaded right now ({error}). The event archive is still available.</Alert>
      )}

      {liveTab && loading ? (
        <Loading>Loading events</Loading>
      ) : inPhase.length === 0 ? (
        <Empty
          title={phase === 'upcoming' ? 'No upcoming events right now' : 'Nothing is happening right now'}
          actions={
            <>
              <Link className="btn btn--sm" to="/events/past">Browse the archive ({counts.past})</Link>
              {instagram && <a className="btn btn--sm btn--ghost" href={instagram} target="_blank" rel="noreferrer">Follow on Instagram</a>}
            </>
          }
        >
          New events are announced on Instagram first and appear here as soon as registrations open.
        </Empty>
      ) : (
        <>
          <div className="filters">
            <input
              type="search"
              placeholder={
                phase === 'past'
                  ? 'Search past events by name, topic, or venue...'
                  : 'Search events by name, topic, or venue...'
              }
              aria-label="Search events"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            {categories.length > 2 && (
              <div className="chips" role="group" aria-label="Category">
                {categories.map((c) => (
                  <button
                    key={c}
                    className="chip"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            {academicYears.length > 2 && (
              <div className="chips" role="group" aria-label="Academic Year">
                {academicYears.map((y) => (
                  <button
                    key={y}
                    className="chip"
                    aria-pressed={academicYear === y}
                    onClick={() => setAcademicYear(y)}
                  >
                    {y === 'All' ? 'All Academic Years' : y}
                  </button>
                ))}
              </div>
            )}

            {inPhase.some((e) => e.fee > 0) && (
              <div className="chips" role="group" aria-label="Price">
                {PRICES.map(([value, label]) => (
                  <button
                    key={value}
                    className="chip"
                    aria-pressed={price === value}
                    onClick={() => setPrice(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="results-bar">
            <p className="result-count" aria-live="polite">
              Showing <b>{shown.length}</b> {shown.length === 1 ? 'event' : 'events'}
              {phase === 'past' ? ' from VCE records' : ''}
              {filtering && ` (filtered from ${inPhase.length})`}
            </p>
            {filtering && (
              <button className="chip chip--clear" onClick={clearFilters}>
                Clear filters ✕
              </button>
            )}
          </div>

          {shown.length ? (
            <div className="event-grid">
              {shown.map((e, index) => (
                <EventCard
                  key={e.key}
                  e={e}
                  index={index}
                  registered={Boolean(mine.forEvent(e.key))}
                  onRegister={onRegister}
                />
              ))}
            </div>
          ) : (
            <Empty
              title="No events match"
              actions={
                <button className="btn btn--sm btn--ghost" onClick={clearFilters}>
                  Clear filters
                </button>
              }
            >
              Try a different search, or clear the filters to see all {inPhase.length}.
            </Empty>
          )}
        </>
      )}

      {registering && (
        <RegisterModal
          event={registering}
          onClose={() => setRegistering(null)}
          onChanged={() => { reload(); mine.reload() }}
        />
      )}
    </div>
  )
}
