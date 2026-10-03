import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useAuth } from '../context/auth'
import { inr, fmt } from '../data/site'
// Steps: confirm -> pay (mock; free events skip) -> success
export default function RegisterModal({ ev, onClose }) {
  const { user, register } = useAuth(), nav = useNavigate()
  const [step, setStep] = useState('confirm'), [reg, setReg] = useState(null)
  const done = () => { setReg(register(ev)); setStep('done') }
  return (<div className="modal" onClick={onClose}><div className="card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
    {step === 'confirm' && <>
      <h2 style={{ fontSize: 30, marginBottom: 16 }}>Confirm registration</h2>
      <p>{ev.name}</p><p className="muted">{fmt(ev.date)} · {ev.venue}</p><p className="muted">Registering as {user.name} ({user.email})</p>
      <p style={{ margin: '16px 0' }}>Fee: <b>{inr(ev.fee)}</b></p>
      <button className="btn" onClick={() => ev.fee ? setStep('pay') : done()}>{ev.fee ? 'Continue to payment' : 'Register now'}</button>
    </>}
    {step === 'pay' && <>
      <h2 style={{ fontSize: 30, marginBottom: 16 }}>Pay {inr(ev.fee)}</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Demo payment. Razorpay will be connected here by the backend team.</p>
      <button className="btn" onClick={done}>Pay {inr(ev.fee)}</button>
    </>}
    {step === 'done' && <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: 30, marginBottom: 8 }}>You are in.</h2>
      <p className="mono">{reg.code}</p>
      <div style={{ background: '#fff', padding: 12, display: 'inline-block', margin: '16px 0' }}><QRCodeSVG value={reg.code} size={160} /></div><br />
      <button className="btn" onClick={() => nav(`/ticket/${reg.code}`)}>View ticket</button>
    </div>}
  </div></div>)
}
