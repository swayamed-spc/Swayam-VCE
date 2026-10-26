import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import EventFrame from '../components/EventFrame'
import { useLiveEvents } from '../hooks/useLiveEvents'
import { archive, byPhase, findArchive, monthOf } from '../lib/events'
import { club, departments, faq, industryVoices, lifecycleStages, pillars, sponsors } from '../data/site'

const college = club.college.replace(' (Autonomous)', '')

export default function Home() {
  const { live } = useLiveEvents()
  const upcoming = useMemo(() => byPhase(live, 'upcoming'), [live])
  const recent = useMemo(() => byPhase(archive, 'past'), [])

  return (
    <>
      <section className="hero">
        <div className="w">
          <span className="eyebrow hero-in">{college} · Hyderabad</span>
          <h1 className="hero-in">From ideas to <em>impact.</em></h1>
          <p className="lead hero-in hero-in--2">Swayam is the Entrepreneurship Cell of {college}. {club.vision}</p>
          <div className="actions hero-in hero-in--3">
            <Link className="btn" to="/events">Explore events</Link>
            <Link className="btn btn--ghost" to="/about">About Swayam</Link>
          </div>
        </div>
      </section>

      <EventStrip upcoming={upcoming} recent={recent} />

      <VisionInAction stages={lifecycleStages} />

      <section className="sec">
        <div className="w">
          <div className="sec-head"><h2>What we do</h2></div>
          <div className="pillars">
            {pillars.map((p) => (
              <div key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Voices speakers={industryVoices.filter((v) => v.photo && v.linkedin)} />

      {sponsors.length > 0 && (
        <section className="sec">
          <div className="w">
            <div className="sec-head"><h2>Backed by</h2></div>
            <div className="chips">
              {sponsors.map((s) => (s.url ? <a key={s.name} className="chip" href={s.url} target="_blank" rel="noreferrer">{s.name}</a> : <span key={s.name} className="chip">{s.name}</span>))}
            </div>
          </div>
        </section>
      )}

      <Partner />

      {faq.length > 0 && (
        <section className="sec">
          <div className="w">
            <div className="sec-head"><h2>Questions</h2></div>
            <div className="faq">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

// The archive events that document each stage of the vision, as photo cards drifting right to left.
// The list is rendered twice so the loop is seamless; hovering or focusing a card pauses it.
function VisionInAction({ stages }) {
  const cards = useMemo(() => {
    const seen = new Set()
    return stages.flatMap((s) =>
      (s.events ?? [])
        .map(findArchive)
        .filter((e) => e?.poster && !seen.has(e.key) && seen.add(e.key))
        .map((e) => ({ e, stage: s })),
    )
  }, [stages])
  const row = useRef(null)

  return (
    <section className="sec" aria-labelledby="vision-title">
      <div className="w sec-head">
        <div>
          <span className="eyebrow">Our record</span>
          <h2 id="vision-title">Our Vision in Action</h2>
        </div>
        <div className="actions mt-0">
          <button className="btn btn--sm btn--ghost" onClick={() => row.current?.step(-1)} aria-label="Move the events back">Previous</button>
          <button className="btn btn--sm btn--ghost" onClick={() => row.current?.step(1)} aria-label="Move the events forward">Next</button>
          <Link className="btn btn--sm" to="/events/past">Full archive</Link>
        </div>
      </div>
      <Marquee label="Events that document our vision" apiRef={row}>
        {(hidden) =>
          cards.map(({ e, stage }) => (
            <Link key={e.key} className="vcard" to={e.href} tabIndex={hidden ? -1 : undefined} draggable={false}>
              <img src={e.poster} alt="" loading="lazy" draggable={false} />
              <span className="vcard-body">
                <span className="vcard-stage">{stage.step} · {stage.stage}</span>
                <span className="vcard-name">{e.name}</span>
                <span className="vcard-date">{monthOf(e.start)} {e.start.getFullYear()}</span>
              </span>
            </Link>
          ))
        }
      </Marquee>
    </section>
  )
}

// Speakers need a real photo and LinkedIn link to be shown; without any, the section stays hidden
function Voices({ speakers }) {
  const row = useRef(null)
  if (!speakers.length) return null
  return (
    <section className="sec" aria-labelledby="voices-title">
      <div className="w sec-head">
        <div>
          <h2 id="voices-title">Voices from the stage</h2>
          <p className="muted small mb-0">Founders and mentors who have spoken at Swayam</p>
        </div>
        <div className="actions mt-0">
          <button className="btn btn--sm btn--ghost" onClick={() => row.current?.step(-1)} aria-label="Move the speakers back">Previous</button>
          <button className="btn btn--sm btn--ghost" onClick={() => row.current?.step(1)} aria-label="Move the speakers forward">Next</button>
        </div>
      </div>
      <Marquee label="Speakers" reverse apiRef={row}>
        {(hidden) =>
          speakers.map((v) => (
            <a key={v.name} className="speaker" href={v.linkedin} target="_blank" rel="noreferrer" tabIndex={hidden ? -1 : undefined} draggable={false}>
              <img src={v.photo} alt="" loading="lazy" draggable={false} />
              <span className="speaker-name">{v.name}</span>
              <span className="speaker-role">{v.role}, {v.org}</span>
            </a>
          ))
        }
      </Marquee>
    </section>
  )
}

// A row of cards that drifts sideways by itself and that people can also move: Previous / Next (apiRef.current.step),
// swiping, trackpad scrolling, dragging with the mouse, and the arrow keys once it has focus. The drift pauses while
// the pointer is over the row or a card has focus (so cards are easy to click), and for a few seconds after someone
// moves it. The list is rendered three times side by side and the scroll position is kept within the middle copy,
// so it loops endlessly in both directions. children(hidden) renders one copy; the outer two are hidden from screen
// readers and the tab order. With reduced motion there is no drift, only the manual controls.
const DRIFT = 32 // pixels per second
const RESUME_AFTER = 3000 // ms of stillness after someone moves the row

function Marquee({ label, reverse = false, apiRef, children }) {
  const box = useRef(null)
  const middle = useRef(null)

  useEffect(() => {
    const el = box.current
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const width = () => middle.current?.offsetWidth ?? 0
    let hovered = false
    let focused = false
    let quietUntil = 0
    let glide = 0 // pixels still to travel after Previous / Next
    let carry = 0
    let drag = null
    let suppressClick = false
    const nudge = () => { quietUntil = performance.now() + RESUME_AFTER }

    // Keep the view inside the middle copy; returns how far it jumped, so a drag can follow
    const wrap = () => {
      const w = width()
      if (!w || w * 3 <= el.clientWidth) return 0
      if (el.scrollLeft < w * 0.5) { el.scrollLeft += w; return w }
      if (el.scrollLeft >= w * 1.5) { el.scrollLeft -= w; return -w }
      return 0
    }
    el.scrollLeft = width()

    let last = performance.now()
    let raf = requestAnimationFrame(function tick(now) {
      const dt = Math.min(now - last, 100)
      last = now
      let move = 0
      if (glide) {
        const part = Math.abs(glide) < 1 ? glide : glide * 0.16
        glide -= part
        move += part
      } else if (!reduce && !drag && !hovered && !focused && now > quietUntil) {
        move += ((reverse ? -1 : 1) * DRIFT * dt) / 1000
      }
      carry += move
      const px = Math.trunc(carry)
      if (px) {
        el.scrollLeft += px
        carry -= px
      }
      const jumped = wrap()
      if (drag) drag.left += jumped
      raf = requestAnimationFrame(tick)
    })

    if (apiRef) {
      apiRef.current = {
        step(dir) {
          const card = el.querySelector('.marquee-set > *')
          const stride = card ? card.offsetWidth + 20 : 280
          glide += dir * Math.max(stride, Math.floor(el.clientWidth * 0.6 / stride) * stride)
          nudge()
        },
      }
    }

    // Mouse dragging (touch and trackpads scroll natively)
    const down = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag = { x: e.clientX, left: el.scrollLeft, moved: false }
    }
    const move = (e) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      if (Math.abs(dx) > 4) drag.moved = true
      if (drag.moved) {
        el.scrollLeft = drag.left - dx
        el.classList.add('dragging')
      }
    }
    const up = () => {
      if (!drag) return
      suppressClick = drag.moved
      drag = null
      el.classList.remove('dragging')
      nudge()
    }
    // A drag that ends on a card must not open it
    const click = (e) => {
      if (suppressClick) {
        e.preventDefault()
        e.stopPropagation()
        suppressClick = false
      }
    }
    const listeners = [
      ['pointerdown', down], ['pointermove', move], ['pointerup', up], ['pointercancel', up], ['click', click, true],
      ['mouseenter', () => { hovered = true }], ['mouseleave', () => { hovered = false; up() }],
      ['focusin', () => { focused = true }], ['focusout', () => { focused = false }],
      ['wheel', nudge], ['touchstart', nudge], ['keydown', nudge],
    ]
    for (const [type, fn, capture] of listeners) el.addEventListener(type, fn, capture)
    return () => {
      cancelAnimationFrame(raf)
      for (const [type, fn, capture] of listeners) el.removeEventListener(type, fn, capture)
    }
  }, [reverse, apiRef])

  return (
    <div ref={box} className="marquee" role="region" aria-label={`${label}. Use Previous and Next, swipe, or drag to move.`} tabIndex={0}>
      <div className="marquee-track">
        <div className="marquee-set" aria-hidden="true">{children(true)}</div>
        <div className="marquee-set" ref={middle}>{children(false)}</div>
        <div className="marquee-set" aria-hidden="true">{children(true)}</div>
      </div>
    </div>
  )
}

function EventStrip({ upcoming, recent }) {
  const strip = useRef(null)
  const items = upcoming.length ? upcoming : recent.slice(0, 8)
  const scroll = (dir) => strip.current?.scrollBy({ left: dir * Math.min(strip.current.clientWidth * 0.9, 400), behavior: 'smooth' })

  return (
    <section className="sec">
      <div className="w">
        <div className="sec-head">
          <h2>{upcoming.length ? 'Upcoming events' : 'Recent events'}</h2>
          <div className="actions mt-0">
            <button className="btn btn--sm btn--ghost" onClick={() => scroll(-1)} aria-label="Scroll back">Previous</button>
            <button className="btn btn--sm btn--ghost" onClick={() => scroll(1)} aria-label="Scroll forward">Next</button>
            <Link className="btn btn--sm" to={upcoming.length ? '/events/upcoming' : '/events/past'}>See all</Link>
          </div>
        </div>
        <div className="strip" ref={strip} tabIndex={0} role="region" aria-label={upcoming.length ? 'Upcoming events' : 'Recent events'}>
          {items.map((e) => <EventFrame key={e.key} e={e} />)}
        </div>
      </div>
    </section>
  )
}

function Partner() {
  const gsd = departments.find((d) => d.id === 'gsd')
  return (
    <section className="sec" id="partner">
      <div className="w two">
        <div>
          <h2>Partner with us</h2>
          <p className="intro mt-md">
            Back the next set of founders from Vasavi. Partners and sponsors work with us on E-Summit, hackathons,
            workshops and venture visits, and meet the students building with them.
          </p>
          {gsd && (
            <p className="muted">
              Partnerships are run by our <Link className="text-link" to={`/teams/${gsd.id}`}>{gsd.name}</Link>,
              led by {gsd.heads.map((h) => h.name).join(' and ')}.
            </p>
          )}
        </div>
        <div className="panel">
          <p className="small muted mb-0">Email</p>
          <p className="contact-big"><a href={`mailto:${club.email}`}>{club.email}</a></p>
          <p className="small muted mb-0 mt-md">Phone</p>
          <p className="contact-big mono mb-0">{club.phone}</p>
        </div>
      </div>
    </section>
  )
}
