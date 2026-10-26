// One shape for every event the site shows, whichever source it came from:
//   archive: the documented events in src/data/events.js (content, photos, reports). Read-only.
//   live:    events created in the backend (GET /api/events). These take registrations and payments.
import { allEvents as archiveEvents } from '../data/events'

export const PHASES = ['upcoming', 'ongoing', 'past']
export const PHASE_LABEL = { upcoming: 'Upcoming', ongoing: 'Ongoing', past: 'Past' }
const ONGOING_HOURS = 12 // a live event counts as "ongoing" this long after it starts

const dateOnly = (s) => new Date(`${s}T00:00:00`)
export const fmtDate = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
export const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
export const fmtDateTime = (d) => `${fmtDate(d)}, ${fmtTime(d)}`
// A start and optional end; the end shows only its time when it is on the same day
export const fmtRange = (start, end) => {
  if (!end) return fmtDateTime(start)
  return fmtDate(start) === fmtDate(end) ? `${fmtDateTime(start)} – ${fmtTime(end)}` : `${fmtDateTime(start)} – ${fmtDateTime(end)}`
}
export const inr = (n) => (n ? `₹${Number(n).toLocaleString('en-IN')}` : 'Free')
// Money amounts (revenue, totals): 0 is ₹0, not Free
export const rupees = (n) => `₹${Number(n ?? 0).toLocaleString('en-IN')}`

// What a team of `people` pays for a live event: the group offer when the team is exactly the offer's size,
// otherwise the individual price for every member
export const priceForTeam = (e, people) => (e.groupSize && people === e.groupSize ? e.groupPrice : e.fee * people)
export const dayOf = (d) => d.getDate()
export const monthOf = (d, style = 'short') => d.toLocaleDateString('en-IN', { month: style })

function phaseOfLive(start, now = new Date()) {
  if (start > now) return 'upcoming'
  return now - start < ONGOING_HOURS * 3600e3 ? 'ongoing' : 'past'
}

export function fromArchive(e) {
  const start = dateOnly(e.date)
  return {
    key: e.slug,
    href: `/events/${e.slug}`,
    source: 'archive',
    name: e.name,
    category: e.category || 'Event',
    start,
    dateLabel: e.dateDisplay || fmtDate(start),
    timeLabel: e.time || e.duration || null,
    venue: e.venue,
    mode: e.mode,
    fee: e.fee ?? 0,
    summary: e.summary,
    poster: e.poster || e.gallery?.[0]?.img || null,
    phase: PHASES.includes(e.status) ? e.status : 'past',
    participants: e.participants || null,
    capacity: null,
    taken: null,
    raw: e,
  }
}

// availability: { [eventId]: { capacity, seatsTaken, seatsLeft } } from GET /api/events/availability
export function fromLive(e, availability = {}) {
  const start = new Date(e.date)
  const seats = availability[e.id]
  const firstSentence = e.description?.split(/(?<=[.!?])\s/)[0] ?? ''
  return {
    key: e.id,
    href: `/events/${e.id}`,
    source: 'live',
    name: e.title,
    category: 'Registrations',
    start,
    dateLabel: fmtDate(start),
    timeLabel: fmtTime(start),
    venue: e.location,
    mode: 'Offline',
    fee: e.price ?? 0,
    groupSize: e.groupSize ?? null, // group offer: exactly groupSize people pay groupPrice in total
    groupPrice: e.groupPrice ?? null,
    // Most people a team may have; null when the event takes individual registrations only
    teamCap: e.maxTeamSize ?? e.groupSize ?? null,
    summary: firstSentence.length > 220 ? `${firstSentence.slice(0, 217)}…` : firstSentence,
    poster: null,
    phase: phaseOfLive(start),
    participants: null,
    capacity: seats?.capacity ?? e.capacity,
    taken: seats?.seatsTaken ?? null,
    raw: e,
  }
}

export const archive = archiveEvents.map(fromArchive)

export const findArchive = (slug) =>
  archive.find((e) => e.key === slug || e.raw.aliases?.includes(slug)) ?? null

// Registration state for a live event, for the status pill and the Register button
export function seatStatus(e) {
  if (e.phase === 'past') return 'Ended'
  if (e.phase === 'ongoing') return 'Happening now'
  if (e.source !== 'live') return 'Upcoming'
  if (e.taken == null) return 'Open'
  if (e.taken >= e.capacity) return 'Sold out'
  return e.taken / e.capacity >= 0.8 ? 'Closing soon' : 'Open'
}
export const canRegister = (e) => e.source === 'live' && e.phase === 'upcoming' && seatStatus(e) !== 'Sold out'

export function byPhase(list, phase) {
  const items = list.filter((e) => e.phase === phase)
  return items.sort((a, b) => (phase === 'past' ? b.start - a.start : a.start - b.start))
}

export function applyFilters(list, { q = '', category = 'All', price = 'All' }) {
  const needle = q.trim().toLowerCase()
  return list.filter(
    (e) =>
      (!needle || `${e.name} ${e.category} ${e.venue ?? ''} ${e.summary ?? ''}`.toLowerCase().includes(needle)) &&
      (category === 'All' || e.category === category) &&
      (price === 'All' || (price === 'Free' ? !e.fee : e.fee > 0)),
  )
}
