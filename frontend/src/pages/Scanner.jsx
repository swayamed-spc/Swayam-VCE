// /admin/scan — the door scanner for staff (ADMIN, or EVENT_HEAD for events they created). Point the camera at a
// student's master QR code; the server verifies it and records the check-in (POST /api/registrations/check-in).
// The camera needs a secure page: http://localhost or https://.
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { api } from '../api/client'
import { Alert, Loading } from '../components/ui'
import { useAuth } from '../context/auth'
import { useLiveEvents } from '../hooks/useLiveEvents'
import { fmtDateTime } from '../lib/events'

const READER_ID = 'qr-reader'
const RESUME_AFTER = { ok: 2500, error: 4000 } // ms before the camera scans again by itself

export default function Scanner() {
  const { user } = useAuth()
  const { live, loading } = useLiveEvents()
  const events = live
    .filter((e) => user.role === 'ADMIN' || e.raw.createdBy === user.id)
    .filter((e) => e.phase !== 'past' || Date.now() - e.start < 3 * 864e5) // today's, upcoming, or the last 3 days
    .sort((a, b) => a.start - b.start)

  const [params] = useSearchParams()
  const [eventId, setEventId] = useState(params.get('event') ?? '') // ?event=<id> when opened from the dashboard
  const [subs, setSubs] = useState([])
  const [subEventId, setSubEventId] = useState('')
  const [running, setRunning] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [result, setResult] = useState(null) // { ok, title, detail }
  const [manual, setManual] = useState('')
  const [count, setCount] = useState(0)

  const scanner = useRef(null)
  const busy = useRef(false)
  const target = useRef({ eventId: '', subEventId: '' })
  target.current = { eventId, subEventId }
  const timer = useRef(null)

  // Preselect the event happening soonest, unless a valid one was asked for
  useEffect(() => {
    if (events.length && !events.some((e) => e.key === eventId)) setEventId(events.find((e) => e.phase !== 'past')?.key ?? events[0].key)
  }, [events, eventId])

  useEffect(() => {
    setSubEventId('')
    setSubs([])
    if (eventId) api(`/events/${eventId}/sub-events`).then((s) => setSubs(s ?? [])).catch(() => setSubs([]))
  }, [eventId])

  const dismiss = useCallback(() => {
    clearTimeout(timer.current)
    setResult(null)
    busy.current = false
    try {
      if (scanner.current?.getState?.() === 3) scanner.current.resume() // 3 = PAUSED
    } catch {
      // the camera was stopped meanwhile
    }
  }, [])

  const checkIn = useCallback(async (qrPayload) => {
    if (busy.current) return
    busy.current = true
    try {
      if (scanner.current?.getState?.() === 2) scanner.current.pause(true) // 2 = SCANNING
    } catch {
      // manual entry without the camera
    }
    const { eventId: ev, subEventId: sub } = target.current
    let next
    try {
      const d = await api('/registrations/check-in', {
        method: 'POST',
        body: { qrPayload: qrPayload.trim(), ...(ev && { eventId: ev }), ...(sub && { subEventId: sub }) },
      })
      next = { ok: true, title: `${d.name || d.email} checked in!`, detail: [d.subEventTitle || d.eventTitle, d.teamName && `Team ${d.teamName}`].filter(Boolean).join(' · ') }
      setCount((c) => c + 1)
      navigator.vibrate?.(80)
    } catch (err) {
      const who = err.data?.name || err.data?.email
      const when = err.data?.attendedAt && ` at ${new Date(err.data.attendedAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}`
      next = { ok: false, title: err.message, detail: who ? `${who}${when ?? ''}` : '' }
      navigator.vibrate?.([80, 60, 80])
    }
    setResult(next)
    timer.current = setTimeout(dismiss, next.ok ? RESUME_AFTER.ok : RESUME_AFTER.error)
  }, [dismiss])

  async function start() {
    setCameraError('')
    try {
      scanner.current ??= new Html5Qrcode(READER_ID, { verbose: false })
      await scanner.current.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 240, height: 240 } }, (text) => checkIn(text), () => {})
      setRunning(true)
    } catch (err) {
      setCameraError(
        `The camera could not start (${err?.message || err}). Allow camera access for this site. Cameras only work on https:// or http://localhost.`,
      )
    }
  }

  async function stop() {
    try {
      if (scanner.current?.isScanning || scanner.current?.getState?.() === 3) await scanner.current.stop()
    } catch {
      // already stopped
    }
    setRunning(false)
  }

  useEffect(() => () => {
    clearTimeout(timer.current)
    stop()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function submitManual(e) {
    e.preventDefault()
    if (manual.trim()) checkIn(manual).then(() => setManual(''))
  }

  const event = events.find((e) => e.key === eventId)
  const where = subEventId ? subs.find((s) => s.id === subEventId)?.title : 'Main entrance'

  return (
    <div className="w page">
      <span className="eyebrow">Staff only</span>
      <h1 className="page-title">Door scanner</h1>
      <p className="intro">Choose the event and the door you are at, start the camera, and point it at each student's ticket QR code.</p>

      {loading ? <Loading /> : events.length === 0 ? (
        <Alert tone="info">
          {user.role === 'ADMIN' ? 'There are no current or upcoming events to scan for.' : 'You have no current or upcoming events. Event heads can scan only for events they created.'}
        </Alert>
      ) : (
        <div className="scan-layout mt-md">
          <div className="panel">
            <div className="field">
              <label htmlFor="scan-event">Event</label>
              <select id="scan-event" value={eventId} onChange={(e) => setEventId(e.target.value)} disabled={running}>
                {events.map((e) => <option key={e.key} value={e.key}>{e.name} · {fmtDateTime(e.start)}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="scan-door">Scanning at</label>
              <select id="scan-door" value={subEventId} onChange={(e) => setSubEventId(e.target.value)} disabled={running}>
                <option value="">Main entrance</option>
                {subs.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
              <p className="hint">Stop the camera to change these.</p>
            </div>
            {running ? (
              <button className="btn btn--block btn--ghost" onClick={stop}>Stop camera</button>
            ) : (
              <button className="btn btn--block" onClick={start}>Start camera</button>
            )}
            <Alert>{cameraError}</Alert>
            <p className="small muted mt-md">Checked in this session: <b className="accent">{count}</b></p>

            <form onSubmit={submitManual} className="mt-md" noValidate>
              <div className="field">
                <label htmlFor="manual">No camera? Paste the ticket code</label>
                <input id="manual" autoComplete="off" value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Ticket code" />
              </div>
              <button className="btn btn--sm btn--ghost" type="submit" disabled={!manual.trim()}>Check in</button>
            </form>
          </div>

          <div>
            <div className={`scan-view ${running ? 'on' : ''}`}>
              <div id={READER_ID} />
              {!running && <p className="muted">Camera off</p>}
            </div>
            {event && <p className="small muted mt-sm">{event.name} · {where}</p>}
          </div>
        </div>
      )}

      {result && createPortal(
        <button className={`scan-result ${result.ok ? 'ok' : 'error'}`} onClick={dismiss} aria-live="assertive">
          <span className="scan-result-tag">{result.ok ? 'SUCCESS' : 'ERROR'}</span>
          <span className="scan-result-title">{result.title}</span>
          {result.detail && <span className="scan-result-detail">{result.detail}</span>}
          <span className="scan-result-hint">Tap to scan the next ticket</span>
        </button>,
        document.body,
      )}
    </div>
  )
}
