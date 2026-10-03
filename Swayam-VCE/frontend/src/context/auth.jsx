// Mock auth + registrations stored in localStorage. Replace with real API calls later.
import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext()
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => load('sw_user', null))
  const [regs, setRegs] = useState(() => load('sw_regs', []))
  useEffect(() => localStorage.setItem('sw_user', JSON.stringify(user)), [user])
  useEffect(() => localStorage.setItem('sw_regs', JSON.stringify(regs)), [regs])
  const register = (ev) => {
    const r = { code: `SWAYAM-2026-${String(regs.length + 1).padStart(4, '0')}`, slug: ev.slug, at: Date.now() }
    setRegs([...regs, r]); return r
  }
  return <Ctx.Provider value={{ user, login: setUser, logout: () => setUser(null), regs, register }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
