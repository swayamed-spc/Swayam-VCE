// Admin list of venues, which fills the venue dropdown in the create-event form. Deleting a venue only removes it from
// the dropdown; events already held there keep their venue.
import { useState } from 'react'
import { api } from '../../api/client'
import { Alert } from '../../components/ui'

export default function Venues({ venues, onChanged }) {
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(null) // 'add' or a venue id
  const [error, setError] = useState('')

  async function add(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Enter the venue name.')
    setBusy('add')
    setError('')
    try {
      await api('/venues', { method: 'POST', body: { name } })
      setName('')
      onChanged()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(null)
    }
  }

  async function remove(v) {
    setBusy(v.id)
    setError('')
    try {
      await api(`/venues/${v.id}`, { method: 'DELETE' })
      onChanged()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(null)
    }
  }

  return (
    <section aria-labelledby="venues-title">
      <h2 id="venues-title" className="mb-md">Venues</h2>
      <p className="muted small">The places staff can choose when creating an event. Removing one doesn't change events already held there.</p>
      <Alert>{error}</Alert>
      <form className="inline-form inline-form--wide mb-md" onSubmit={add} noValidate>
        <label className="visually-hidden" htmlFor="venue-name">Venue name</label>
        <input id="venue-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} placeholder="Main Auditorium" />
        <button className="btn btn--sm" disabled={busy === 'add'}>{busy === 'add' ? 'Adding' : 'Add venue'}</button>
      </form>
      {venues.length === 0 ? (
        <p className="muted">No venues yet. Add the halls and rooms events are held in.</p>
      ) : (
        <ul className="venue-list">
          {venues.map((v) => (
            <li key={v.id}>
              <span>{v.name}</span>
              <button className="link-btn small" onClick={() => remove(v)} disabled={busy === v.id} aria-label={`Delete ${v.name}`}>
                {busy === v.id ? 'Deleting' : 'Delete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
