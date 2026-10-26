// Staff queue for one event: registrations and session bookings whose UPI payment is waiting for a decision.
// Approve marks it VERIFIED (or REFUND_REQUIRED if the event filled up meanwhile); Reject cancels it.
// A team appears once, as its leader's row, and the decision applies to the whole team.
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../api/client'
import { Alert, Empty, Loading } from '../../components/ui'
import { fmtDateTime, rupees } from '../../lib/events'

const KINDS = {
  registration: { list: '/payments/pending', verify: (id) => `/payments/${id}/verify` },
  booking: { list: '/payments/sub-event-bookings/pending', verify: (id) => `/payments/sub-event-bookings/${id}/verify` },
}

// What the student should have paid: the price they were offered times the team size
function expectedAmount(kind, r) {
  if (kind === 'registration' && r.event.groupSize === r.teamSize) return r.event.groupPrice // the event's group offer
  const each = kind === 'booking' ? (r.isPassHolder ? r.subEvent.priceForPassHolders : r.subEvent.priceForStandalone) : r.event.price
  return each * r.teamSize
}

export function usePendingPayments() {
  const [state, setState] = useState({ registration: [], booking: [], loading: true, error: null })
  const reload = useCallback(async () => {
    try {
      const [registration, booking] = await Promise.all([api(KINDS.registration.list), api(KINDS.booking.list)])
      setState({ registration: registration ?? [], booking: booking ?? [], loading: false, error: null })
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err.message }))
    }
  }, [])
  useEffect(() => {
    reload()
  }, [reload])
  return { ...state, reload }
}

export default function PendingPayments({ eventId, pending, onDecided }) {
  if (pending.loading) return <Loading />
  if (pending.error) return <Alert>{pending.error}</Alert>
  const registrations = pending.registration.filter((r) => r.event.id === eventId)
  const bookings = pending.booking.filter((r) => r.event.id === eventId)
  if (!registrations.length && !bookings.length) {
    return <Empty title="No pending payments">Payments students submit for this event and its sessions will appear here for approval.</Empty>
  }
  return (
    <div className="stack">
      {registrations.length > 0 && <Queue title="Event registrations" kind="registration" rows={registrations} onDecided={onDecided} />}
      {bookings.length > 0 && <Queue title="Session bookings" kind="booking" rows={bookings} onDecided={onDecided} />}
    </div>
  )
}

function Queue({ title, kind, rows, onDecided }) {
  const [busy, setBusy] = useState(null)
  const [confirming, setConfirming] = useState(null) // row id waiting for "Confirm reject"
  const [notice, setNotice] = useState(null) // { tone, text }

  async function decide(r, action) {
    setBusy(r.id)
    setNotice(null)
    try {
      const d = await api(KINDS[kind].verify(r.id), { method: 'PATCH', body: { action } })
      const who = `${r.user.email}${r.teamSize > 1 ? ` (team of ${r.teamSize})` : ''}`
      setNotice(
        d.paymentStatus === 'REFUND_REQUIRED'
          ? { tone: 'error', text: `No seats were left, so ${who} was marked for a refund and cancelled. Refund the student.` }
          : action === 'APPROVE'
            ? { tone: 'ok', text: `Approved ${who}. Their ticket is ready.` }
            : { tone: 'info', text: `Rejected ${who}. The registration was cancelled.` },
      )
      onDecided()
    } catch (err) {
      setNotice({ tone: 'error', text: err.message })
      onDecided() // someone else may have decided it already
    } finally {
      setBusy(null)
      setConfirming(null)
    }
  }

  return (
    <section>
      <h3 className="mb-md">{title} <span className="muted small">({rows.length})</span></h3>
      {notice && <Alert tone={notice.tone}>{notice.text}</Alert>}
      <div className="dtable" role="table" aria-label={`Pending payments: ${title}`}>
        <div className="dtable-head" role="row">
          <span role="columnheader">Student</span>
          <span role="columnheader">Amount</span>
          <span role="columnheader">UTR</span>
          <span role="columnheader">Submitted</span>
          <span role="columnheader"><span className="visually-hidden">Decision</span></span>
        </div>
        {rows.map((r) => {
          const expected = expectedAmount(kind, r)
          // A different total is normal for group offers (5+2), so it is shown neutrally, never as an error
          const custom = r.totalAmountPaid != null && r.totalAmountPaid !== expected
          return (
            <div key={r.id} className="dtable-row" role="row">
              <span role="cell" data-label="Student">
                <b>{r.user.email}</b>
                {r.teamName && <small>Team {r.teamName} · {r.teamSize} people</small>}
                {kind === 'booking' && <small>{r.subEvent.title}{r.isPassHolder ? ' · Pass holder' : ''}</small>}
              </span>
              <span role="cell" data-label="Amount">
                <b>{r.totalAmountPaid != null ? `Submitted: ${rupees(r.totalAmountPaid)}` : 'Not given'}</b>
                {custom && <small>{r.teamSize > 1 ? 'Custom team total' : 'Custom amount'} · list price {rupees(expected)}</small>}
                {!custom && kind === 'registration' && r.event.groupSize === r.teamSize && <small>Group offer: {r.teamSize} for {rupees(r.event.groupPrice)}</small>}
              </span>
              <span role="cell" data-label="UTR">
                {r.utrNumber ? <b className="mono">{r.utrNumber}</b> : <small>Waiting for the student</small>}
                {r.paymentScreenshotUrl && <a className="text-link small" href={r.paymentScreenshotUrl} target="_blank" rel="noreferrer">Screenshot</a>}
              </span>
              <span role="cell" data-label="Submitted"><small>{fmtDateTime(new Date(r.createdAt))}</small></span>
              <span role="cell" className="dtable-actions">
                {confirming === r.id ? (
                  <>
                    <button className="btn btn--sm btn--danger" disabled={busy === r.id} onClick={() => decide(r, 'REJECT')}>Confirm reject</button>
                    <button className="btn btn--sm btn--ghost" disabled={busy === r.id} onClick={() => setConfirming(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn--sm" disabled={!r.utrNumber || r.totalAmountPaid == null || busy === r.id} onClick={() => decide(r, 'APPROVE')}
                      title={!r.utrNumber ? 'The student has not submitted a UTR yet' : undefined}>
                      {busy === r.id ? 'Saving' : 'Approve'}
                    </button>
                    <button className="btn btn--sm btn--ghost" disabled={busy === r.id} onClick={() => setConfirming(r.id)}>Reject</button>
                  </>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
