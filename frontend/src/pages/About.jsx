import Reveal from '../components/Reveal'
import { team, timeline, club } from '../data/site'
export default function About() {
  return (<div className="wrap page">
    <h1 style={{ fontFamily: 'var(--f-gothic)' }}>About Swayam</h1>
    <Reveal><p style={{ maxWidth: 680, fontSize: 20 }}>Swayam is the Entrepreneurship Cell of our college. We help students turn ideas into ventures through competitions, workshops, mentorship and a community of builders.</p></Reveal>
    <section><Reveal><h2 className="h2" style={{ fontFamily: "var(--f-grunge)" }}>Our journey</h2></Reveal>
      <div className="tl">{timeline.map(t => <Reveal key={t.y}><div><b style={{ fontFamily: 'var(--f-grunge)', fontSize: 32 }}>{t.y}</b><h3 style={{ fontSize: 24 }}>{t.t}</h3><p className="muted">{t.d}</p></div></Reveal>)}</div></section>
    <section style={{ paddingTop: 0 }}><Reveal><h2 className="h2" style={{ fontFamily: "var(--f-fun)" }}>Core team</h2></Reveal>
      <div className="grid">{team.map((m, i) => <Reveal key={i} delay={i * .08}><div className="card pad" style={{ textAlign: 'center', padding: 28 }}>
        <div style={{ width: 96, height: 96, margin: '0 auto 16px', borderRadius: '50%', background: 'var(--deep)', display: 'grid', placeItems: 'center', fontFamily: 'var(--f-fun)', fontSize: 36 }}>{m.name[0]}</div>
        <h3 style={{ fontSize: 22 }}>{m.name}</h3><p style={{ color: 'var(--red2)' }}>{m.role}</p><p className="muted">{m.dept}</p></div></Reveal>)}</div></section>
    <Reveal><p className="muted">Questions? Write to <span className="mono">{club.email}</span></p></Reveal>
  </div>)
}
