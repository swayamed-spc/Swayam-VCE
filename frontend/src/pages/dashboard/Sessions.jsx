// Sessions (sub-events) of one event: bookings and revenue per session, adding and editing sessions, and capacity
// changes. Priced sessions are paid to the event's own UPI QR, so the event needs one first. Team competitions
// (team size > 1) also get a Teams panel: the roster, and auto-grouping of short teams into full ones.
import { useId, useState } from 'react'
import { api } from '../../api/client'
import { Alert, Empty, Pill } from '../../components/ui'
import Teams from './Teams'
import DeleteControl from './DeleteControl'
import VenuePicker from '../../components/VenuePicker'
import { fmtRange, inr, rupees } from '../../lib/events'

const toInt = (v) => (v === '' ? NaN : Number(v))
// ISO time -> the value a datetime-local input shows (the browser's local time)
const toLocalInput = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

export default function Sessions({ event, venues, sessions, onChanged }) {
  const [form, setForm] = useState(null) // null, 'new', or the session being edited
  const [teamsFor, setTeamsFor] = useState(null) // session whose Teams panel is open
  const done = (saved) => {
    setForm(null)
    if (saved) onChanged()
  }

  return (
    <div className="stack">
      <section>
        <div className="sec-head mb-md">
          <h3>Sessions <span className="muted small">({sessions.length})</span></h3>
          {!form && <button className="btn btn--sm" onClick={() => setForm('new')}>Add a session</button>}
        </div>
        {form && <SessionForm key={form === 'new' ? 'new' : form.id} event={event} venues={venues} session={form === 'new' ? null : form} onDone={done} />}
        {sessions.length === 0 ? (
          !form && <Empty title="No sessions yet">Add workshops, hackathons or other sessions that students book on top of the event.</Empty>
        ) : (
          <div className="dtable dtable--sessions" role="table" aria-label="Sessions">
            <div className="dtable-head" role="row">
              <span role="columnheader">Session</span>
              <span role="columnheader">Booked</span>
              <span role="columnheader">Price</span>
              <span role="columnheader">Revenue</span>
              <span role="columnheader">Capacity</span>
            </div>
            {sessions.map((s) => (
              <div key={s.id} className="dtable-row" role="row">
                <span role="cell" data-label="Session">
                  <b>
                    {s.title}{' '}
                    <button className="link-btn small accent" onClick={() => setForm(s)} aria-label={`Edit ${s.title}`}>Edit</button>
                  </b>
                  {(s.venue || s.startTime) && <small>{[s.venue, s.startTime && fmtRange(new Date(s.startTime), s.endTime && new Date(s.endTime))].filter(Boolean).join(' · ')}</small>}
                  {s.passHoldersOnly && <small><Pill tone="accent">Ticket holders only</Pill></small>}
                  {s.teamSize > 1 && (
                    <small>
                      Teams of {s.teamSize} · {s.groupedCount} grouped ·{' '}
                      <button className="link-btn small accent" onClick={() => setTeamsFor(teamsFor?.id === s.id ? null : s)} aria-expanded={teamsFor?.id === s.id}>
                        {teamsFor?.id === s.id ? 'Hide teams' : 'Teams'}
                      </button>
                    </small>
                  )}
                </span>
                <span role="cell" data-label="Booked">
                  <b>{s.bookingsCount} / {s.capacity}</b>
                  <small>{s.verifiedCount} confirmed · {s.attendedCount} checked in</small>
                </span>
                <span role="cell" data-label="Price">
                  <small>With a ticket {inr(s.priceForPassHolders)}</small>
                  {!s.passHoldersOnly && <small>Without a ticket {inr(s.priceForStandalone)}</small>}
                </span>
                <span role="cell" data-label="Revenue">
                  <b>{rupees(s.revenue)}</b>
                  {s.refundRequiredCount > 0 && <small className="danger">{s.refundRequiredCount} refund{s.refundRequiredCount > 1 ? 's' : ''} due</small>}
                </span>
                <span role="cell" data-label="Capacity">
                  <CapacityEditor
                    key={s.capacity}
                    current={s.capacity}
                    save={(capacity) => api(`/events/${event.key}/sub-events/${s.id}/capacity`, { method: 'PATCH', body: { capacity } })}
                    onSaved={onChanged}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
      {teamsFor && <Teams key={teamsFor.id} event={event} session={teamsFor} onChanged={onChanged} onClose={() => setTeamsFor(null)} />}
    </div>
  )
}

// Inline capacity change, shared with the event overview. Going below the seats taken is allowed: nobody loses a
// seat, but new registrations are refused.
export function CapacityEditor({ current, save, onSaved }) {
  const id = useId()
  const [value, setValue] = useState(String(current))
  const [state, setState] = useState({ busy: false, error: '' })
  const n = toInt(value)
  const changed = n !== current

  async function submit(e) {
    e.preventDefault()
    if (!Number.isInteger(n) || n < 1) return setState({ busy: false, error: 'Enter a whole number of at least 1.' })
    setState({ busy: true, error: '' })
    try {
      await save(n)
      setState({ busy: false, error: '' })
      onSaved()
    } catch (err) {
      setState({ busy: false, error: err.message })
    }
  }

  return (
    <form className="inline-form" onSubmit={submit} noValidate>
      <label className="visually-hidden" htmlFor={id}>Capacity</label>
      <input id={id} type="number" min="1" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} aria-invalid={Boolean(state.error)} />
      <button className="btn btn--sm btn--ghost" disabled={!changed || state.busy}>{state.busy ? 'Saving' : 'Save'}</button>
      {state.error && <small className="danger">{state.error}</small>}
    </form>
  )
}

// Adds a session, or edits one when `session` is given. Edits apply to bookings made from then on: existing bookings
// keep their price and team.
function SessionForm({ event, venues, session, onDone }) {
  const editing = Boolean(session)
  const [f, setF] = useState(() => editing
    ? {
        title: session.title,
        venue: session.venue ?? '',
        startTime: toLocalInput(session.startTime),
        endTime: toLocalInput(session.endTime),
        capacity: String(session.capacity),
        priceForPassHolders: String(session.priceForPassHolders),
        priceForStandalone: String(session.priceForStandalone),
        teamSize: String(session.teamSize ?? 1),
        passHoldersOnly: Boolean(session.passHoldersOnly),
      }
    : // Most sessions happen at the event's own venue, so it is the starting choice
      { title: '', venue: event.venue ?? '', startTime: '', endTime: '', capacity: '', priceForPassHolders: '0', priceForStandalone: '0', teamSize: '1', passHoldersOnly: false })
  const [state, setState] = useState({ busy: false, error: '' })
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    const capacity = toInt(f.capacity)
    const pass = toInt(f.priceForPassHolders)
    const standalone = f.passHoldersOnly ? 0 : toInt(f.priceForStandalone)
    const teamSize = toInt(f.teamSize)
    let error = ''
    if (!f.title.trim()) error = 'Give the session a title.'
    else if (!f.venue.trim()) error = 'Choose where the session happens, or type a place under Other.'
    else if (f.endTime && !f.startTime) error = 'Set when the session starts, or clear the end time.'
    else if (f.endTime && f.endTime <= f.startTime) error = 'The session must end after it starts.'
    else if (!Number.isInteger(capacity) || capacity < 1) error = 'Capacity must be a whole number of at least 1.'
    else if (![pass, standalone].every((p) => Number.isInteger(p) && p >= 0)) error = 'Prices must be whole rupees, 0 for free.'
    else if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 50) error = 'Team size must be a whole number from 1 to 50.'
    else if ((pass > 0 || standalone > 0) && !event.raw.upiQrUrl) error = 'This event has no UPI QR code, so its sessions can only be free.'
    if (error) return setState({ busy: false, error })

    setState({ busy: true, error: '' })
    try {
      await api(editing ? `/events/${event.key}/sub-events/${session.id}` : `/events/${event.key}/sub-events`, {
        method: editing ? 'PATCH' : 'POST',
        body: {
          title: f.title.trim(),
          venue: f.venue.trim(),
          capacity,
          priceForPassHolders: pass,
          priceForStandalone: standalone,
          teamSize,
          passHoldersOnly: f.passHoldersOnly,
          ...(f.startTime && { startTime: new Date(f.startTime).toISOString() }),
          ...(f.endTime && { endTime: new Date(f.endTime).toISOString() }),
        },
      })
      onDone(true)
    } catch (err) {
      setState({ busy: false, error: err.message })
    }
  }

  return (
    <form className="panel mb-md" onSubmit={submit} noValidate>
      <h3 className="mb-md">{editing ? `Edit ${session.title}` : 'New session'}</h3>
      {editing && <p className="muted small">Changes apply to new bookings. Students who already booked keep their price and team.</p>}
      <Alert>{state.error}</Alert>
      <div className="form-grid">
        <div className="field span-2">
          <label htmlFor="s-title">Title</label>
          <input id="s-title" value={f.title} onChange={set('title')} maxLength={200} placeholder="IPL Auction" />
        </div>
        <VenuePicker id="s-venue" venues={venues} value={f.venue} onChange={(venue) => setF((x) => ({ ...x, venue }))} hint="From the list, or Other for a specific room." />
        <div className="field">
          <label htmlFor="s-cap">Capacity</label>
          <input id="s-cap" type="number" min="1" inputMode="numeric" value={f.capacity} onChange={set('capacity')} />
        </div>
        <div className="field">
          <label htmlFor="s-start">Starts (optional)</label>
          <input id="s-start" type="datetime-local" value={f.startTime} onChange={set('startTime')} />
        </div>
        <div className="field">
          <label htmlFor="s-end">Ends (optional)</label>
          <input id="s-end" type="datetime-local" value={f.endTime} min={f.startTime || undefined} onChange={set('endTime')} />
          <p className="hint">With an end time, students are warned if it overlaps something else they booked.</p>
        </div>
        <div className="field">
          <label htmlFor="s-team">Team size</label>
          <input id="s-team" type="number" min="1" max="50" inputMode="numeric" value={f.teamSize} onChange={set('teamSize')} />
        </div>
        <p className="hint span-2 mt-0">
          Team size 1 is an ordinary session. Above 1 makes it a team competition: students book under a team name with up
          to that many people (themselves included), and you can auto-group short teams.
        </p>
        <div className="field span-2">
          <label className="switch">
            <input type="checkbox" checked={f.passHoldersOnly} onChange={(e) => setF((x) => ({ ...x, passHoldersOnly: e.target.checked }))} />
            <span className="switch-track" aria-hidden="true" />
            Only for students with an event ticket
          </label>
          <p className="hint mt-0">
            {f.passHoldersOnly
              ? `Only students whose ${event.name} registration is confirmed can book. In a team, every member needs a ticket.`
              : 'Anyone can book. Students without an event ticket pay the "without a ticket" price.'}
          </p>
        </div>
        <div className="field">
          <label htmlFor="s-pass">Price with an event ticket (₹)</label>
          <input id="s-pass" type="number" min="0" inputMode="numeric" value={f.priceForPassHolders} onChange={set('priceForPassHolders')} />
        </div>
        {!f.passHoldersOnly && (
          <div className="field">
            <label htmlFor="s-standalone">Price without a ticket (₹)</label>
            <input id="s-standalone" type="number" min="0" inputMode="numeric" value={f.priceForStandalone} onChange={set('priceForStandalone')} />
          </div>
        )}
      </div>
      <div className="actions">
        <button className="btn btn--sm" disabled={state.busy}>{state.busy ? 'Saving' : editing ? 'Save changes' : 'Add session'}</button>
        <button type="button" className="btn btn--sm btn--ghost" onClick={() => onDone(false)}>Cancel</button>
      </div>
      {editing && (
        <div className="mt-md">
          <DeleteControl
            kind="session"
            name={session.title}
            onDelete={(confirm) => api(`/events/${event.key}/sub-events/${session.id}`, { method: 'DELETE', body: { confirm } })}
            onDeleted={() => onDone(true)}
          />
        </div>
      )}
    </form>
  )
}
