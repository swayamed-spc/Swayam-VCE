// The signed-in user's registrations (GET /api/registrations/me), each with its event. Empty when logged out.
import { useCallback, useEffect, useState } from 'react'
import { api } from '../api/client'
import { useAuth } from '../context/auth'

export function useMyRegistrations() {
  const { user } = useAuth()
  const [state, setState] = useState({ items: [], loading: Boolean(user), error: null })

  const reload = useCallback(async () => {
    if (!user) return setState({ items: [], loading: false, error: null })
    setState((s) => ({ ...s, loading: true }))
    try {
      const items = await api('/registrations/me')
      setState({ items: items ?? [], loading: false, error: null })
    } catch (err) {
      setState({ items: [], loading: false, error: err.message })
    }
  }, [user])

  useEffect(() => {
    reload()
  }, [reload])

  const forEvent = useCallback((eventId) => state.items.find((r) => r.event.id === eventId) ?? null, [state.items])
  return { ...state, reload, forEvent }
}

// What a registration means for the student, in plain words, with the pill style to show it in
export function registrationState(r) {
  if (r.status === 'CANCELLED') {
    if (r.paymentStatus === 'REFUND_REQUIRED') return { label: 'Refund due', tone: 'danger', detail: 'There was no seat for your payment. The organisers will refund you.' }
    if (r.paymentStatus === 'REFUNDED') return { label: 'Refunded', tone: 'muted', detail: 'Your payment was refunded.' }
    return { label: 'Cancelled', tone: 'danger', detail: 'Your payment could not be verified, so this registration was cancelled. You can register again.' }
  }
  if (r.paymentStatus === 'VERIFIED') return { label: 'Confirmed', tone: 'ok', detail: 'Your ticket is ready.' }
  if (r.utrNumber) return { label: 'Verifying payment', tone: 'accent', detail: 'We have your payment details. Your ticket appears once the organisers verify it.' }
  return { label: 'Payment needed', tone: 'accent', detail: 'Pay by UPI and submit the transaction details to get your ticket.' }
}
