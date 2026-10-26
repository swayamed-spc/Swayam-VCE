// The soft amber light and dot grid that follow the pointer. Off on touch screens and for reduced motion.
import { useEffect, useState } from 'react'

export default function Spotlight() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = matchMedia('(pointer: fine)').matches
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return
    setEnabled(true)
    let raf = 0, x = 0, y = 0
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        document.documentElement.style.setProperty('--mx', `${x}px`)
        document.documentElement.style.setProperty('--my', `${y}px`)
      })
    }
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div className="spot" aria-hidden="true" />
      <div className="dots" aria-hidden="true" />
    </>
  )
}
