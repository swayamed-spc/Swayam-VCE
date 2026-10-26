// "Delete event" / "Delete session" for staff. Typing the exact name is always required, so nothing is deleted by a
// stray click. The server decides what is allowed: event heads only while nobody has registered or booked; admins
// also when people have (the typed name is sent as the confirmation, and their registrations and payments go too).
import { useState } from 'react'

export default function DeleteControl({ kind, name, onDelete, onDeleted }) {
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const [state, setState] = useState({ busy: false, error: '' })

  async function remove() {
    setState({ busy: true, error: '' })
    try {
      const result = await onDelete(typed)
      onDeleted(result)
    } catch (err) {
      setState({ busy: false, error: err.message })
    }
  }

  if (!open) {
    return <button type="button" className="btn btn--sm btn--ghost btn--danger-ghost" onClick={() => setOpen(true)}>Delete {kind}</button>
  }
  return (
    <div className="delete-box" role="group" aria-label={`Delete ${kind}`}>
      <p className="mb-0"><b>Delete {name}?</b> This can't be undone.</p>
      <p className="small muted">
        {kind === 'event'
          ? 'Its sessions are deleted with it. If people have registered, only an admin can delete it, and their registrations and payment records are removed too.'
          : 'If people have booked it, only an admin can delete it, and their bookings and payment records are removed too.'}
      </p>
      <label className="small" htmlFor={`confirm-${kind}`}>Type the {kind} name to confirm</label>
      <input id={`confirm-${kind}`} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={name} autoComplete="off" />
      {state.error && <p className="small danger mt-sm mb-0" role="alert">{state.error}</p>}
      <div className="actions">
        <button type="button" className="btn btn--sm btn--danger" disabled={typed !== name || state.busy} onClick={remove}>
          {state.busy ? 'Deleting' : `Delete ${kind}`}
        </button>
        <button type="button" className="btn btn--sm btn--ghost" onClick={() => { setOpen(false); setTyped(''); setState({ busy: false, error: '' }) }}>Cancel</button>
      </div>
    </div>
  )
}
