// Overlap warnings: when a student registers or books something that overlaps what they already have. Nothing is
// blocked; running two things at once is allowed, the student is just told.
//   An event takes each schedule day from its first slot to its last (without a schedule: its start, end unknown).
//   A session takes startTime to endTime (end unknown when not set; no startTime: no time to compare).
// With both ends known, overlapping times count as a clash; otherwise being on the same day gets a softer notice.
// A session never clashes with its own event: it happens inside it.
import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/auth'

const at = (date, hhmm) => new Date(`${date}T${hhmm}:00+05:30`) // schedule times are clock times in IST
const istDay = (d) => d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })

export function eventWindows({ date, schedule }) {
  if (schedule?.length) {
    return schedule.map((d) => {
      const starts = d.slots.map((s) => s.start).sort()
      const ends = d.slots.map((s) => s.end).sort()
      return { start: at(d.date, starts[0]), end: at(d.date, ends.at(-1)) }
    })
  }
  return date ? [{ start: new Date(date), end: null }] : []
}

export const sessionWindows = ({ startTime, endTime }) =>
  startTime ? [{ start: new Date(startTime), end: endTime ? new Date(endTime) : null }] : []

function compare(a, b) {
  if (a.end && b.end) return a.start < b.end && b.start < a.end ? 'overlap' : null
  return istDay(a.start) === istDay(b.start) ? 'sameDay' : null
}

// target and each of mine: { kind: 'event' | 'session', id, eventId, title, windows }
// Returns [{ title, level: 'overlap' | 'sameDay', window }], overlaps first.
export function findClashes(target, mine) {
  const found = []
  for (const item of mine) {
    if (item.kind === target.kind && item.id === target.id) continue
    if (item.kind !== target.kind && item.eventId === target.eventId) continue // a session inside its own event
    let best = null
    for (const t of target.windows) {
      for (const w of item.windows) {
        const level = compare(t, w)
        if (level === 'overlap' || (level && !best)) best = { title: item.title, level, window: w }
      }
    }
    if (best) found.push(best)
  }
  return found.sort((a, b) => (a.level === b.level ? 0 : a.level === 'overlap' ? -1 : 1))
}

// What the signed-in student already holds (confirmed registrations and bookings, paid or awaiting payment)
export function useClashes(target) {
  const { user } = useAuth()
  const [mine, setMine] = useState(null)
  useEffect(() => {
    if (!user) return
    Promise.all([api('/registrations/me').catch(() => []), api('/registrations/bookings/me').catch(() => [])]).then(([regs, books]) => {
      setMine([
        ...(regs ?? []).filter((r) => r.status === 'CONFIRMED').map((r) => ({
          kind: 'event', id: r.event.id, eventId: r.event.id, title: r.event.title, windows: eventWindows(r.event),
        })),
        ...(books ?? []).filter((b) => b.status === 'CONFIRMED').map((b) => ({
          kind: 'session', id: b.subEvent.id, eventId: b.event.id, title: `${b.subEvent.title} (${b.event.title})`, windows: sessionWindows(b.subEvent),
        })),
      ])
    })
  }, [user])
  return mine && target.windows.length ? findClashes(target, mine) : []
}
