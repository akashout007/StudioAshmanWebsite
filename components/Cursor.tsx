'use client'
import { useEffect, useRef, useState } from 'react'

// Only for a real mouse: never on touch, hover-less devices, or with reduced motion
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
// Over these the ring would sit under the header or menus, so it steps aside
const COVERED = 'header, .mega-menu, .mobile-nav, [role="listbox"]'

/** Decorative ring that trails the system cursor. The system cursor always stays visible. */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  // Where the pointer first moved; the ring only exists from then on
  const [start, setStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const target = { x: 0, y: 0 }
    const pos = { x: 0, y: 0 }
    let started = false

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.25
      pos.y += (target.y - pos.y) * 0.25
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.1 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      target.x = e.clientX
      target.y = e.clientY
      if (!started) {
        // Appear right at the pointer on the first real move, never from the corner
        started = true
        pos.x = target.x
        pos.y = target.y
        setStart({ x: target.x, y: target.y })
      }
      const ring = ringRef.current
      if (ring) {
        const el = e.target as Element
        ring.classList.toggle('is-hidden', !!el.closest?.(COVERED))
        ring.classList.toggle('hovered', !!el.closest?.('a, button, [role="option"]'))
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => ringRef.current?.classList.add('is-hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      setStart(null)
    }
  }, [enabled])

  if (!enabled || !start) return null
  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      aria-hidden="true"
      style={{ transform: `translate3d(${start.x}px, ${start.y}px, 0)` }}
    />
  )
}
