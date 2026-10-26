// Refunds due: payments marked REFUND_REQUIRED (no seat was left when approved, or payments were closed early).
// Staff send the money back through UPI, then mark it refunded here. Admins see every event, event heads their own.
// A team appears once (its leader's payment), and marking it refunded covers the whole team.
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../api/client'
import { Alert, Empty, Loading } from '../../components/ui'
import { fmtDateTime, rupees } from '../../lib/events'

const refundPath = (r) => (r.kind === 'booking' ? `/payments/sub-event-bookings/${r.id}/refund` : `/payments/${r.id}/refund`)

export default function Refunds() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(null)
  const [confirming, setConfirming] = useState(null)
  const [notice, setNotice] = useState('')

  const load = useCallback(() => {
    api('/payments/refunds').then(setRows).catch((err) => setError(err.message))
  }, [])
  useEffect(() => {
    load()
  }, [load])

  async function markRefunded(r) {
    setBusy(r.id)
    setNotice('')
    setError('')
    try {
      await api(refundPath(r), { method: 'PATCH' })
      setNotice(`Marked ${rupees(r.totalAmountPaid)} to ${r.email} as refunded.`)
      load()
    } catch (err) {
      setError(err.message)
      load()
    } finally {
      setBusy(null)
      setConfirming(null)
    }
  }

  if (!rows) return error ? <Alert>{error}</Alert> : <Loading />
  return (
    <section aria-labelledby="refunds-title">
      <h2 id="refunds-title" className="mb-md">Refunds due <span className="muted small">({rows.length})</span></h2>
      <p className="muted small">
        These students paid but didn't get a seat. Send the amount back to them by UPI (the UTR identifies their payment),
        then mark it refunded. They can then register or book again.
      </p>
      {notice && <Alert tone="ok">{notice}</Alert>}
      <Alert>{error}</Alert>
      {rows.length === 0 ? (
        <Empty title="No refunds due">Payments that need to be sent back will appear here.</Empty>
      ) : (
        <div className="dtable" role="table" aria-label="Refunds due">
          <div className="dtable-head" role="row">
            <span role="columnheader">Student</span>
            <span role="columnheader">Amount</span>
            <span role="columnheader">UTR</span>
            <span role="columnheader">For</span>
            <span role="columnheader"><span className="visually-hidden">Action</span></span>
          </div>
          {rows.map((r) => (
            <div key={r.id} className="dtable-row" role="row">
              <span role="cell" data-label="Student">
                <b>{r.name || r.email}</b>
                <small>{r.email}{r.teamName ? ` · Team ${r.teamName} (${r.teamSize})` : ''}</small>
              </span>
              <span role="cell" data-label="Amount"><b>{r.totalAmountPaid != null ? rupees(r.totalAmountPaid) : 'Not given'}</b></span>
              <span role="cell" data-label="UTR">{r.utrNumber ? <span className="mono">{r.utrNumber}</span> : <small>—</small>}</span>
              <span role="cell" data-label="For">
                <b>{r.sessionTitle ?? r.eventTitle}</b>
                <small>{r.sessionTitle ? `Session of ${r.eventTitle}` : 'Event registration'}{r.reviewedAt ? ` · ${fmtDateTime(new Date(r.reviewedAt))}` : ''}</small>
              </span>
              <span role="cell" className="dtable-actions">
                {confirming === r.id ? (
                  <>
                    <button className="btn btn--sm" disabled={busy === r.id} onClick={() => markRefunded(r)}>{busy === r.id ? 'Saving' : 'Yes, refunded'}</button>
                    <button className="btn btn--sm btn--ghost" disabled={busy === r.id} onClick={() => setConfirming(null)}>Cancel</button>
                  </>
                ) : (
                  <button className="btn btn--sm" onClick={() => setConfirming(r.id)}>Mark refunded</button>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
