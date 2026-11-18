'use client'
import { useEffect } from 'react'

// Fades section headings in as they scroll into view. Without JS, or with reduced motion, they simply show.
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(document.querySelectorAll<HTMLElement>('.section-head .num, .section-head h2, .section-head .lede'))
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    if (!els.length) return
    els.forEach((el) => el.classList.add('reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -12% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
