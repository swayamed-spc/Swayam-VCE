import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SpaceCanvas from './components/SpaceCanvas'
import { useAuth } from './context/auth'
import Home from './pages/Home'
import { EventsList, EventDetail } from './pages/Events'
import About from './pages/About'
import { Login, Signup } from './pages/Auth'
import { Dashboard, Ticket } from './pages/Dashboard'

const Protected = ({ children }) => (useAuth().user ? children : <Navigate to="/login" replace />)
let lenis

export default function App() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.09 })
    let id; const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null }
  }, [])
  // On every page change: jump to top and tell Lenis the page height changed (fixes needing a refresh).
  useEffect(() => {
    lenis ? lenis.scrollTo(0, { immediate: true, force: true }) : window.scrollTo(0, 0)
    const t = setTimeout(() => lenis && lenis.resize(), 100)
    return () => clearTimeout(t)
  }, [pathname])
  return (<>
    <SpaceCanvas />
    <motion.div className="prog" style={{ scaleX, width: '100%' }} />
    <Navbar />
    <motion.main key={pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/ticket/:code" element={<Protected><Ticket /></Protected>} />
        <Route path="*" element={<div className="wrap page"><h1>404</h1><p className="muted">This page does not exist.</p></div>} />
      </Routes>
    </motion.main>
    <Footer />
  </>)
}
