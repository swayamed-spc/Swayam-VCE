// The teams of a team-competition session: teams already formed, bookings still waiting, and auto-grouping, which
// couples short teams into full ones (Team A with 2 + Team B with 1 = a team of 3). Only paid-up bookings are grouped;
// running it again later places newcomers and earlier leftovers without touching teams already formed.
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../api/client'
import { Alert, Loading } from '../../components/ui'

const NOT_ENOUGH = 'Sorry, not enough teammates to fulfill the team size requirement.'
const who = (m) => m.name || m.email

export default function Teams({ event, session, onChanged, onClose }) {
  const base = `/events/${event.key}/sub-events/${session.id}`
  const [roster, setRoster] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null) // the last auto-group response

  const load = useCallback(() => {
    api(`${base}/teams`).then(setRoster).catch((err) => setError(err.message))
  }, [base])
  useEffect(() => {
    load()
  }, [load])

  async function autoGroup() {
    setBusy(true)
    setError('')
    try {
      setResult(await api(`${base}/auto-group`, { method: 'POST' }))
      load()
      onChanged()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const waiting = roster?.ungrouped ?? []
  return (
    <section className="panel teams" aria-labelledby="teams-title">
      <div className="sec-head mb-md">
        <div>
          <h3 id="teams-title">{session.title}: teams of {session.teamSize}</h3>
          <p className="muted small mb-0">Students book under their own team name. Auto-group couples short teams into full ones.</p>
        </div>
        <div className="actions mt-0">
          <button className="btn btn--sm" onClick={autoGroup} disabled={busy}>{busy ? 'Grouping' : 'Auto-group teams'}</button>
          <button className="btn btn--sm btn--ghost" onClick={onClose}>Close</button>
        </div>
      </div>

      <Alert>{error}</Alert>
      {result && (
        <>
          <Alert tone={result.teamsFormed.length ? 'ok' : 'info'}>
            {result.teamsFormed.length
              ? `${result.teamsFormed.length} team${result.teamsFormed.length > 1 ? 's' : ''} formed${result.teamsFormed.some((t) => t.coupled) ? `, ${result.teamsFormed.filter((t) => t.coupled).length} by coupling short teams` : ''}.`
              : 'No new teams to form.'}
            {result.awaitingPayment.length > 0 && ` ${result.awaitingPayment.length} booking${result.awaitingPayment.length > 1 ? 's are' : ' is'} waiting for payment approval and will be grouped once approved.`}
          </Alert>
          {result.leftovers.length > 0 && (
            <div className="alert alert--error" role="alert">
              <b>{NOT_ENOUGH}</b>
              <p className="mb-0 mt-sm">
                Not placed: {result.leftovers.map((l) => `${l.teamName} (${l.members.map(who).join(', ')})`).join('; ')}.
                They stay booked; run auto-group again when more students book, or contact them:{' '}
                <a className="text-link" href={`mailto:${result.leftoverEmails.join(',')}`}>email them</a>.
              </p>
            </div>
          )}
        </>
      )}

      {!roster ? !error && <Loading /> : (
        <div className="teams-grid">
          <div>
            <h4 className="teams-h">Formed teams ({roster.teams.length})</h4>
            {roster.teams.length === 0 ? <p className="muted small">None yet.</p> : (
              <ul className="team-cards">
                {roster.teams.map((t) => (
                  <li key={t.groupId}>
                    <b>{t.groupName}</b>
                    <span className="muted small">{t.members.length} of {roster.teamSize}</span>
                    <ul>{t.members.map((m) => <li key={m.email}>{who(m)}{m.teamName && <span className="muted"> · booked as {m.teamName}</span>}</li>)}</ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4 className="teams-h">Not grouped yet ({waiting.length})</h4>
            {waiting.length === 0 ? <p className="muted small">Everyone is in a team.</p> : (
              <ul className="team-cards">
                {waiting.map((t) => (
                  <li key={t.teamName + t.members[0].email}>
                    <b>{t.teamName}</b>
                    <span className={`small ${t.paid ? 'muted' : 'accent'}`}>
                      {t.members.length} of {roster.teamSize}{t.paid ? '' : ' · payment pending'}
                    </span>
                    <ul>{t.members.map((m) => <li key={m.email}>{who(m)}</li>)}</ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
