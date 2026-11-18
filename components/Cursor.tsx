'use client'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce && navigator.maxTouchPoints === 0)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    let cleanup = () => {}
    let cancelled = false
    import('gsap').then(({ default: gsap }) => {
      if (cancelled) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) {
        dot.classList.add('hovered')
        ring.classList.add('hovered')
      }
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) {
        dot.classList.remove('hovered')
        ring.classList.remove('hovered')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

      cleanup = () => {
        window.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseover', onOver)
        document.removeEventListener('mouseout', onOut)
      }
    })
    return () => {
      cancelled = true
      cleanup()
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
