// Validates an event's day-by-day timetable. Any times are allowed; slots on a day may not overlap.
// Returns { schedule } (days sorted by date, slots by start time, or null when none is given) or { error }.
const DATE = /^\d{4}-\d{2}-\d{2}$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/
const MAX_DAYS = 14
const MAX_SLOTS = 30

export function readSchedule(value) {
  if (value === undefined || value === null) return { schedule: null }
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_DAYS) {
    return { error: `schedule must be a list of 1 to ${MAX_DAYS} days.` }
  }
  const days = []
  for (const day of value) {
    const date = day?.date
    if (typeof date !== 'string' || !DATE.test(date) || Number.isNaN(new Date(`${date}T00:00:00Z`).getTime())) {
      return { error: 'Every schedule day needs a date like 2026-11-20.' }
    }
    if (days.some((d) => d.date === date)) return { error: `${date} appears twice in the schedule.` }
    if (!Array.isArray(day.slots) || day.slots.length === 0 || day.slots.length > MAX_SLOTS) {
      return { error: `${date}: add 1 to ${MAX_SLOTS} time slots.` }
    }
    const slots = []
    for (const s of day.slots) {
      const { start, end, title, kind = 'session' } = s ?? {}
      if (!TIME.test(start ?? '') || !TIME.test(end ?? '')) return { error: `${date}: times must look like 09:30 or 16:20.` }
      if (end <= start) return { error: `${date}: a slot must end after it starts (${start} to ${end}).` }
      if (kind !== 'session' && kind !== 'break') return { error: "A slot's kind must be 'session' or 'break'." }
      if (typeof title !== 'string' || !title.trim() || title.trim().length > 120) {
        return { error: `${date} ${start}: every slot needs a title (up to 120 characters).` }
      }
      slots.push({ start, end, title: title.trim(), kind })
    }
    slots.sort((a, b) => a.start.localeCompare(b.start))
    const clash = slots.find((s, i) => i > 0 && s.start < slots[i - 1].end)
    if (clash) return { error: `${date}: "${clash.title}" starts before the slot before it ends.` }
    days.push({ date, slots })
  }
  days.sort((a, b) => a.date.localeCompare(b.date))
  return { schedule: days }
}
