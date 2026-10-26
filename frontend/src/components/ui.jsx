// Small building blocks used across pages.
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

export const Loading = ({ children = 'Loading' }) => <p className="loading" role="status">{children}</p>

export function Alert({ tone = 'error', children }) {
  if (!children) return null
  return <p className={`alert alert--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>{children}</p>
}

export function Empty({ title, children, actions }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {children && <p>{children}</p>}
      {actions && <div className="actions">{actions}</div>}
    </div>
  )
}

const PILL_TONE = { accent: 'pill--accent', ok: 'pill--ok', danger: 'pill--danger', muted: '' }
export const Pill = ({ tone = 'muted', children }) => <span className={`pill ${PILL_TONE[tone] ?? ''}`}>{children}</span>

// Tone for the registration status pill on event rows and panels
export const toneForSeats = (s) => (s === 'Open' || s === 'Happening now' ? 'accent' : s === 'Closing soon' ? 'accent' : 'muted')

export function SeatBar({ taken, capacity, className = '' }) {
  if (taken == null || !capacity) return null
  const pct = Math.min(100, (taken / capacity) * 100)
  return (
    <div className={`seatbar ${className}`} role="img" aria-label={`${taken} of ${capacity} seats taken`}>
      <i style={{ width: `${pct}%` }} />
    </div>
  )
}

// Accessible dialog: Escape and backdrop click close it, focus moves in and returns afterwards.
// Rendered into <body> (a portal) so it sits above everything, including the footer, whatever page opens it.
export function Modal({ label, onClose, wide = false, children }) {
  const box = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    box.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [onClose])
  return createPortal(
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={box} className={`modal-box ${wide ? 'modal-box--wide' : ''}`} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export const Crumbs = ({ items }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    {items.map((it, i) => (
      <span key={it.label}>
        {i > 0 && <span aria-hidden="true">/</span>}
        {it.to ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
      </span>
    ))}
  </nav>
)
