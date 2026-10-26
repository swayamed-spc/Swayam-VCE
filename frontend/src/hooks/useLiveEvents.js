// Live (bookable) events from the backend, with seat counts. Fetched once and shared by every page; call reload()
// after something that changes seats, such as a registration.
import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { fromLive } from '../lib/events'

let cache = null // { events, error }
let inflight = null
const listeners = new Set()

async function load() {
  inflight ??= Promise.all([api('/events'), api('/events/availability').catch(() => [])])
    .then(([events, seats]) => {
      const availability = Object.fromEntries((seats ?? []).map((s) => [s.eventId, s]))
      cache = { events: (events ?? []).map((e) => fromLive(e, availability)), error: null }
    })
    .catch((err) => {
      cache = { events: [], error: err.message }
    })
    .finally(() => {
      inflight = null
      listeners.forEach((fn) => fn(cache))
    })
  return inflight
}

export function useLiveEvents() {
  const [state, setState] = useState(cache)

  useEffect(() => {
    listeners.add(setState)
    if (!cache) load()
    return () => listeners.delete(setState)
  }, [])

  const reload = useCallback(() => load(), [])
  return { live: state?.events ?? [], loading: !state, error: state?.error ?? null, reload }
}
