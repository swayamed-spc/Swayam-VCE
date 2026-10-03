import { useEffect, useMemo, useRef } from 'react'
// Background: CSS star layers (box-shadow technique, scroll parallax) + a pixelated canvas where
// scrolling flies you through a galaxy: warp-speed stars, red nebulae, a spiral galaxy and a planet that approaches.
const S = 2, BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
const rnd = (n) => Math.floor(Math.random() * n)
const shadow = (n) => Array.from({ length: n }, () => `${rnd(2600)}px ${rnd(2000)}px ${Math.random() < .2 ? '#ff2d40' : '#fff'}`).join(',')
const LAYERS = [{ n: 280, s: 1, d: 70, k: .05 }, { n: 120, s: 2, d: 120, k: .1 }, { n: 50, s: 3, d: 180, k: .18 }]
const PAL = { red: ['#e11d2e', '#7f0f18', '#120204'], ash: ['#e5e5e5', '#6b6b70', '#0c0c0e'], deep: ['#ff2d40', '#a3121e', '#1a0306'] }
// Pixel planet: lit sphere + Bayer dithering. o.ring / o.bands (stripe frequency) / o.craters
function makePlanet(r, pal, o = {}) {
  const W = r * 4, p = document.createElement('canvas'); p.width = p.height = W
  const x = p.getContext('2d'), c = r * 2, [A, B, C] = PAL[pal], dot = (i, j, col) => { x.fillStyle = col; x.fillRect(i, j, 1, 1) }
  for (let i = 0; i < W; i++) for (let j = 0; j < W; j++) {
    const dx = i - c, dy = j - c, d = Math.hypot(dx, dy); if (d > r) continue
    let l = Math.max(0, (-dx * .6 - dy * .5) / r * .8 + Math.sqrt(1 - (d / r) ** 2) * .5)
    if (o.bands) l += Math.sin(dy * o.bands) * .14
    if (o.craters && Math.sin(dx * .7) * Math.sin(dy * .9) > .82) l -= .35
    const t = BAYER[(j % 4) * 4 + (i % 4)] / 16
    dot(i, j, l > t + .3 ? A : l > t * .6 ? B : C)
  }
  if (o.ring) for (let a = 0; a < 6.283; a += .004) {
    const rx = r * 1.7 * Math.cos(a), ry = r * .4 * Math.sin(a)
    if (ry < 0 && Math.hypot(rx, ry) < r) continue
    dot(Math.round(c + rx), Math.round(c + ry), a % .3 < .15 ? A : B)
  }
  return p
}
// t = position along the journey (0 top of page, 1 bottom); x,y = screen position (0..1)
const PLANETS = [
  { t: .06, x: .82, y: .3, r: 26, pal: 'red', o: { ring: 1 } }, { t: .22, x: .14, y: .62, r: 20, pal: 'ash', o: { bands: .55 } },
  { t: .38, x: .8, y: .66, r: 15, pal: 'deep', o: { craters: 1 } }, { t: .55, x: .2, y: .3, r: 30, pal: 'red', o: { bands: .4, ring: 1 } },
  { t: .74, x: .74, y: .36, r: 18, pal: 'ash', o: { ring: 1 } }, { t: .92, x: .5, y: .5, r: 28, pal: 'deep', o: { bands: .5 } },
]
export default function SpaceCanvas() {
  const ref = useRef()
  const layers = useMemo(() => LAYERS.map((l) => ({ ...l, sh: shadow(l.n) })), [])
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d'), planets = PLANETS.map((q) => ({ ...q, img: makePlanet(q.r, q.pal, q.o) })), root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, raf, nx = .5, ny = .5, lastY = scrollY, vel = 0, rot = 0, sparks = [], mx = -9, my = -9
    const stars = Array.from({ length: 650 }, () => ({ x: (Math.random() - .5) * 2.6, y: (Math.random() - .5) * 2.6, z: .02 + Math.random() * .98, hot: Math.random() < .22 }))
    const neb = Array.from({ length: 7 }, () => ({ x: (Math.random() - .5) * 2.2, y: (Math.random() - .5) * 1.6, z: Math.random() }))
    let arms = []
    const init = () => {
      w = Math.ceil(innerWidth / S); h = Math.ceil(innerHeight / S); cv.width = w; cv.height = h; ctx.imageSmoothingEnabled = false
      const R = Math.min(w, h) * .55
      arms = Array.from({ length: 560 }, (_, i) => { const r = Math.pow(Math.random(), .6) * R; return { r, a: (i % 3) * 2.094 + r * .045 + (Math.random() - .5) * .5, hot: r < R * .3 } })
    }
    const move = (e) => { const p = e.touches ? e.touches[0] : e; nx = p.clientX / innerWidth; ny = p.clientY / innerHeight; mx = p.clientX / S; my = p.clientY / S
      sparks.push({ x: mx, y: my, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2, l: 36 }) }
    const proj = (s, z, cx, cy, f) => [cx + s.x / z * f, cy + s.y / z * f]
    const draw = () => {
      const max = Math.max(1, root.scrollHeight - innerHeight), p = Math.min(1, scrollY / max)
      vel += (Math.max(-40, Math.min(40, scrollY - lastY)) - vel) * .12; lastY = scrollY
      root.style.setProperty('--sy', scrollY + 'px')
      const dz = -(.0005 + vel * .001), cx = w / 2 + (.5 - nx) * w * .18, cy = h / 2 + (.5 - ny) * h * .18, f = h * .55
      ctx.clearRect(0, 0, w, h)
      // nebulae
      for (const n of neb) {
        n.z += dz * .5; if (n.z < .05) { n.z = 1; n.x = (Math.random() - .5) * 2.2; n.y = (Math.random() - .5) * 1.6 } if (n.z > 1) n.z = .05
        const [x, y] = proj(n, n.z, cx, cy, f), r = Math.max(10, f * .5 / n.z * .6), a = .24 * (1 - n.z) + .03
        const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(225,29,46,${a})`); g.addColorStop(1, 'rgba(225,29,46,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
      }
      // spiral galaxy: grows as you travel
      rot += .0012 + vel * .0004; const gs = .6 + p * 1.8, gx = w * .3 - p * w * .15, gy = h * .35
      for (const a of arms) { const an = a.a + rot / (1 + a.r * .02); ctx.fillStyle = a.hot ? '#ff2d40' : a.r % 3 < 1 ? '#7f0f18' : '#e11d2e'; ctx.globalAlpha = a.hot ? .85 : .5
        ctx.fillRect(Math.floor(gx + Math.cos(an) * a.r * gs), Math.floor(gy + Math.sin(an) * a.r * gs * .42), 1, 1) }
      ctx.globalAlpha = 1
      // planets: each grows and drifts outward as you reach its point on the journey, then fades behind you
      for (const q of planets) {
        const d = q.t - p; if (d < -.1) continue
        const sc = Math.max(.3, 1.5 - d * 2.4), pw = q.img.width * sc * .8
        ctx.globalAlpha = Math.max(0, Math.min(1, 1 + d * 10)) * .92
        ctx.drawImage(q.img, Math.floor(w * q.x - pw / 2 + (q.x - .5) * w * (sc - 1) * .5 + (.5 - nx) * -16 * sc), Math.floor(h * q.y - pw / 2 + (.5 - ny) * -9 * sc), pw, pw)
      }
      ctx.globalAlpha = 1
      // warp stars
      const streak = 2 + Math.abs(vel) * .45
      for (const s of stars) {
        s.z += dz
        if (s.z < .02) { s.z = 1; s.x = (Math.random() - .5) * 2.6; s.y = (Math.random() - .5) * 2.6 } else if (s.z > 1) s.z = .02
        const [x, y] = proj(s, s.z, cx, cy, f), [px, py] = proj(s, Math.min(1.2, s.z - dz * streak), cx, cy, f)
        if (x < 0 || x > w || y < 0 || y > h) { s.z = 1; continue }
        ctx.strokeStyle = s.hot ? `rgba(255,45,64,${1 - s.z * .6})` : `rgba(255,255,255,${(1 - s.z) * 1.1})`
        ctx.lineWidth = s.z < .3 ? 2 : 1; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(x, y); ctx.stroke()
      }
      sparks = sparks.filter((s) => s.l > 0)
      for (const s of sparks) { s.x += s.vx; s.y += s.vy; s.l--; ctx.fillStyle = `rgba(255,45,64,${s.l / 36})`; ctx.fillRect(Math.floor(s.x), Math.floor(s.y), 1, 1) }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    init(); draw()
    addEventListener('resize', init)
    if (!reduce) { addEventListener('mousemove', move); addEventListener('touchmove', move, { passive: true }) }
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', init); removeEventListener('mousemove', move); removeEventListener('touchmove', move) }
  }, [])
  return (<div className="space" aria-hidden="true">
    {layers.map((l) => <div key={l.s} className="par" style={{ transform: `translateY(calc(var(--sy, 0px) * -${l.k}))` }}>
      {[0, 2000].map((t) => <div key={t} className="st" style={{ top: t, width: l.s, height: l.s, boxShadow: l.sh, animationDuration: `${l.d}s` }} />)}
    </div>)}
    <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', imageRendering: 'pixelated' }} />
  </div>)
}
