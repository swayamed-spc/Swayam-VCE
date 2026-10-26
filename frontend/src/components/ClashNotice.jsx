// Tells a student that what they are about to register for or book overlaps something they already have.
// It never blocks: concurrent events are allowed.
import { fmtRange } from '../lib/events'

export default function ClashNotice({ clashes }) {
  if (!clashes.length) return null
  const overlaps = clashes.filter((c) => c.level === 'overlap')
  const sameDay = clashes.filter((c) => c.level === 'sameDay')
  return (
    <div className="alert alert--warn" role="status">
      <b>{overlaps.length ? 'Heads up: this overlaps with something you have booked.' : 'Heads up: you have something else that day.'}</b>
      <ul>
        {overlaps.map((c) => <li key={c.title}>{c.title}: {fmtRange(c.window.start, c.window.end)}</li>)}
        {sameDay.map((c) => <li key={c.title}>{c.title}: same day, {fmtRange(c.window.start, c.window.end)}</li>)}
      </ul>
      <p className="small mb-0 mt-sm">You can still go ahead; just make sure you can attend both.</p>
    </div>
  )
}
