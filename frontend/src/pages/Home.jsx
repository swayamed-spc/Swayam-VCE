import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import logo from '../assets/logo.png'
import Reveal from '../components/Reveal'
import EventCard from '../components/EventCard'
import { club, stats, pillars, events } from '../data/site'

function Count({ n, s }) {
  const ref = useRef(), inView = useInView(ref, { once: true }), [v, setV] = useState(0)
  useEffect(() => { if (inView) animate(0, n, { duration: 1.8, onUpdate: (x) => setV(Math.round(x)) }) }, [inView, n])
  return <b ref={ref}>{v}{s}</b>
}

const F = ['--f-fun', '--f-gothic', '--f-accent', '--f-grunge', '--f-canticle', '--f-head']
export default function Home() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 160])
  const upcoming = events.filter(e => new Date(e.date) >= new Date()).slice(0, 3)
  return (<>
    <section className="hero"><motion.div className="orb" style={{ y }} />
      <div className="wrap">
        <motion.img src={logo} alt="Swayam E-Cell logo" className="hero-logo" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} />
        <motion.h1 initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [.22, 1, .36, 1] }}>SWAYAM</motion.h1>
        <motion.p className="tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>{club.tagline}</motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}>
          <Link to="/events" className="btn">Explore events</Link><Link to="/signup" className="btn ghost">Join the club</Link>
        </motion.div>
        <motion.p className="cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>Scroll to fly through the galaxy ↓</motion.p>
      </div>
    </section>
    <section><div className="wrap stats">{stats.map(s => <Reveal key={s.l}><Count n={s.n} s={s.s} /><span className="muted">{s.l}</span></Reveal>)}</div></section>
    <section><div className="wrap">
      <Reveal><h2 className="h2" style={{ fontFamily: "var(--f-hero)" }}>Upcoming events</h2></Reveal>
      <div className="grid">{upcoming.map((e, i) => <Reveal key={e.slug} delay={i * .1}><EventCard e={e} /></Reveal>)}</div>
      <Reveal><p style={{ marginTop: 32 }}><Link to="/events" className="btn ghost">See all events</Link></p></Reveal>
    </div></section>
    <section><div className="wrap">
      <Reveal><h2 className="h2" style={{ fontFamily: "var(--f-canticle)" }}>What we do</h2></Reveal>
      <div className="grid">{pillars.map((p, i) => <Reveal key={p.t} delay={i * .06}><div className="card pillar"><h3 style={{ fontFamily: `var(${F[i % 6]})`, fontSize: 30 }}>{p.t}</h3><p className="muted">{p.d}</p></div></Reveal>)}</div>
    </div></section>
    <section><div className="wrap"><Reveal><div className="manifesto">
      <p style={{ fontFamily: 'var(--f-hero)' }}>START SOMETHING.</p>
      <p style={{ fontFamily: 'var(--f-grunge)', color: 'var(--red2)' }}>BREAK SOMETHING.</p>
      <p style={{ fontFamily: 'var(--f-fun)' }}>BUILD SOMETHING.</p>
    </div></Reveal></div></section>
    <section><div className="wrap"><Reveal><div className="cta-band">
      <h2>Ready to build something?</h2><p style={{ margin: '12px 0 24px' }}>Create your account and register for the next event.</p>
      <Link to="/signup" className="btn" style={{ background: '#0a0a0a' }}>Create account</Link>
    </div></Reveal></div></section>
  </>)
}
