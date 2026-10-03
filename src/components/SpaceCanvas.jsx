import { useEffect, useMemo, useRef } from 'react'
// Background: drifting CSS star layers + a pixelated canvas with scroll-driven warp stars,
// cursor sparks and two faint mathematical patterns (hexagonal tessellation, Sierpinski fractals).
const S = 2
const rnd = (n) => Math.floor(Math.random() * n)
const shadow = (n) => Array.from({ length: n }, () => `${rnd(2600)}px ${rnd(2000)}px ${Math.random() < .2 ? '#ff2d40' : '#fff'}`).join(',')
const LAYERS = [{ n: 280, s: 1, d: 70, k: .05 }, { n: 120, s: 2, d: 120, k: .1 }, { n: 50, s: 3, d: 180, k: .18 }]
export default function SpaceCanvas() {
  const ref = useRef()
  const layers = useMemo(() => LAYERS.map((l) => ({ ...l, sh: shadow(l.n) })), [])
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d'), root = document.documentElement
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, raf, nx = .5, ny = .5, lastY = scrollY, vel = 0, t = 0, sparks = [], mx = -999, my = -999
    const stars = Array.from({ length: 560 }, () => ({ x: (Math.random() - .5) * 2.6, y: (Math.random() - .5) * 2.6, z: .02 + Math.random() * .98, hot: Math.random() < .22 }))
    const init = () => { w = Math.ceil(innerWidth / S); h = Math.ceil(innerHeight / S); cv.width = w; cv.height = h }
    const move = (e) => { const p = e.touches ? e.touches[0] : e; nx = p.clientX / innerWidth; ny = p.clientY / innerHeight; mx = p.clientX / S; my = p.clientY / S
      sparks.push({ x: mx, y: my, vx: (Math.random() - .5) * 1.2, vy: (Math.random() - .5) * 1.2, l: 36 }) }
    const proj = (s, z, cx, cy, f) => [cx + s.x / z * f, cy + s.y / z * f]
    // Sierpinski triangle outline, recursion depth d
    const tri = (x, y, s, d) => {
      if (!d) { ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s / 2, y - s * .866); ctx.closePath(); return }
      const q = s / 2; tri(x, y, q, d - 1); tri(x + q, y, q, d - 1); tri(x + q / 2, y - q * .866, q, d - 1)
    }
    const fractal = (cx, cy, s, ang, col, depth) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang); ctx.strokeStyle = col; ctx.beginPath(); tri(-s / 2, s * .289, s, depth); ctx.stroke(); ctx.restore()
    }
    // Hexagonal tessellation: faint, with a slow wave and a glow around the cursor
    const tess = () => {
      const R = 20, H = R * 1.732, off = (scrollY * .03) % (H * 2)
      ctx.lineWidth = 1
      for (let c = -1; c * 1.5 * R < w + R; c++) for (let r = -1; r * H < h + H; r++) {
        const x = c * 1.5 * R, y = r * H + (c & 1 ? H / 2 : 0) - off
        const wave = Math.max(0, Math.sin(Math.hypot(x - w / 2, y - h / 2) * .045 - t * .025)), glow = Math.max(0, 1 - Math.hypot(x - mx, y - my) / 70)
        ctx.strokeStyle = `rgba(225,29,46,${(.03 + wave * .045 + glow * .16).toFixed(3)})`; ctx.beginPath()
        for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; k ? ctx.lineTo(x + R * Math.cos(a), y + R * Math.sin(a)) : ctx.moveTo(x + R * Math.cos(a), y + R * Math.sin(a)) }
        ctx.closePath(); ctx.stroke()
      }
    }
    const draw = () => {
      t++
      const max = Math.max(1, root.scrollHeight - innerHeight), p = Math.min(1, scrollY / max)
      vel += (Math.max(-40, Math.min(40, scrollY - lastY)) - vel) * .12; lastY = scrollY
      root.style.setProperty('--sy', scrollY + 'px')
      const dz = -(.0005 + vel * .001), cx = w / 2 + (.5 - nx) * w * .18, cy = h / 2 + (.5 - ny) * h * .18, f = h * .55
      ctx.clearRect(0, 0, w, h)
      tess()
      ctx.lineWidth = 1
      fractal(w * .8, h * .5, Math.min(w, h) * .75, t * .0006 + p * 1.5, 'rgba(225,29,46,.10)', 4)
      fractal(w * .12, h * .62, Math.min(w, h) * .45, -t * .0008 - p * 1.2, 'rgba(255,255,255,.05)', 3)
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
