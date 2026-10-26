// Venue field for staff forms: a dropdown of the admin's venues, plus "Other" to type any place by hand
// (e.g. "Vasavi College of Engineering" for an event, or a classroom for a session). value is the venue's text.
import { useState } from 'react'

const OTHER = '__other'

export default function VenuePicker({ id, label = 'Venue', venues, value, onChange, hint }) {
  const names = venues.map((v) => v.name)
  const [custom, setCustom] = useState(Boolean(value) && !names.includes(value))
  const typing = custom || names.length === 0

  function pick(e) {
    if (e.target.value === OTHER) {
      setCustom(true)
      onChange('')
    } else {
      onChange(e.target.value)
    }
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {typing ? (
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} maxLength={255} placeholder="Type the venue" autoFocus={custom} />
      ) : (
        <select id={id} value={value} onChange={pick}>
          <option value="">Choose a venue</option>
          {names.map((n) => <option key={n} value={n}>{n}</option>)}
          <option value={OTHER}>Other (type a venue)</option>
        </select>
      )}
      {custom && names.length > 0 && (
        <button type="button" className="link-btn small mt-sm" onClick={() => { setCustom(false); onChange('') }}>Choose from the list instead</button>
      )}
      {hint && <p className="hint">{hint}</p>}
    </div>
  )
}
