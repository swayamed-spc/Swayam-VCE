// A lightweight, high-performance canvas background with drifting geometric nodes and interconnected lines.
// Uses the existing Swayam amber accent (--a: #ff9f1c) with low opacity.
// Respects prefers-reduced-motion, uses squared-distance checks to eliminate expensive Math.hypot calls,
// throttles pointer movements, and strictly avoids horizontal viewport overflow.
import { useEffect, useRef } from 'react'

export default function GeometricBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrameId = null
    let width = 0
    let height = 0
    const mouse = { x: -9999, y: -9999, active: false }
    let pointerRaf = 0

    const isMobile = (document.documentElement.clientWidth || window.innerWidth) < 768
    const particleCount = isMobile ? 20 : 36
    const maxDistance = isMobile ? 95 : 125
    const maxDistanceSq = maxDistance * maxDistance
    const baseSpeed = 0.2

    let particles = []

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * baseSpeed * 2,
          vy: (Math.random() - 0.5) * baseSpeed * 2,
          radius: Math.random() * 1.2 + 1,
          alpha: Math.random() * 0.22 + 0.14,
        })
      }
    }

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Use documentElement client dimensions so scrollbars are NOT included in the width
      width = document.documentElement.clientWidth || window.innerWidth
      height = document.documentElement.clientHeight || window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      if (particles.length === 0) {
        initParticles()
      }
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = 0.75
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq)
            const opacity = (1 - dist / maxDistance) * 0.1
            ctx.strokeStyle = `rgba(255, 159, 28, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(255, 159, 28, ${p1.alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function draw() {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around boundaries with soft padding
        if (p.x < -10) p.x = width + 10
        else if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        else if (p.y > height + 10) p.y = -10

        // Subtle mouse influence
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dSq = dx * dx + dy * dy
          if (dSq < 14400 && dSq > 0) {
            const d = Math.sqrt(dSq)
            p.x -= (dx / d) * 0.22
            p.y -= (dy / d) * 0.22
          }
        }
      }

      // Draw connections
      ctx.lineWidth = 0.75
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq)
            const opacity = (1 - dist / maxDistance) * 0.12
            ctx.strokeStyle = `rgba(255, 159, 28, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Draw node
        ctx.fillStyle = `rgba(255, 159, 28, ${p1.alpha})`
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw mouse connections if active
      if (mouse.active) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distSq = dx * dx + dy * dy
          if (distSq < 10000) {
            const dist = Math.sqrt(distSq)
            const opacity = (1 - dist / 100) * 0.16
            ctx.strokeStyle = `rgba(255, 159, 28, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    const onPointerMove = (e) => {
      if (pointerRaf) return
      pointerRaf = requestAnimationFrame(() => {
        pointerRaf = 0
        mouse.x = e.clientX
        mouse.y = e.clientY
        mouse.active = true
      })
    }

    const onPointerLeave = () => {
      mouse.active = false
    }

    const onVisibilityChange = () => {
      if (!document.hidden && !reducedMotion && !animationFrameId) {
        animationFrameId = requestAnimationFrame(draw)
      }
    }

    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      document.addEventListener('visibilitychange', onVisibilityChange)
      animationFrameId = requestAnimationFrame(draw)
    } else {
      renderStatic()
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (pointerRaf) cancelAnimationFrame(pointerRaf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="geometric-bg"
      aria-hidden="true"
    />
  )
}
