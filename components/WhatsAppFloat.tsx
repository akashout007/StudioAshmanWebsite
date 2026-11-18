'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { EXTERNAL, LINKS } from '@/lib/site'

const SCROLL_REVEAL = 400

/**
 * Floating WhatsApp button. On the homepage it waits until the hero has fully scrolled away,
 * so the hero leads with "Start a project"; elsewhere it appears after 400px of scroll.
 * It always steps aside while the footer is in view, and never shows on /contact.
 */
export default function WhatsAppFloat() {
  const pathname = usePathname()
  const [pastHero, setPastHero] = useState(false)
  const [footerInView, setFooterInView] = useState(false)

  useEffect(() => {
    setPastHero(false)
    setFooterInView(false)
    if (pathname === '/contact') return
    const observers: IntersectionObserver[] = []
    let onScroll: (() => void) | null = null

    const hero = pathname === '/' ? document.querySelector('.home-hero') : null
    if (hero) {
      const io = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting))
      io.observe(hero)
      observers.push(io)
    } else {
      onScroll = () => setPastHero(window.scrollY > SCROLL_REVEAL)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    const footer = document.querySelector('footer')
    if (footer) {
      const io = new IntersectionObserver(([e]) => setFooterInView(e.isIntersecting))
      io.observe(footer)
      observers.push(io)
    }

    return () => {
      observers.forEach((io) => io.disconnect())
      if (onScroll) window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  if (pathname === '/contact') return null
  const visible = pastHero && !footerInView

  return (
    <a
      href={LINKS.whatsapp}
      {...EXTERNAL}
      className={`wa-float${visible ? ' is-visible' : ''}`}
      aria-label="Chat with Ashman Studio on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.04 3C8.86 3 3.04 8.82 3.04 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.04 29C23.22 29 29 23.18 29 16S23.22 3 16.04 3Zm0 23.6c-2.03 0-4.02-.55-5.75-1.58l-.41-.25-3.97 1.04 1.06-3.87-.27-.4A10.56 10.56 0 0 1 5.44 16c0-5.85 4.76-10.6 10.6-10.6 5.84 0 10.56 4.75 10.56 10.6 0 5.84-4.72 10.6-10.56 10.6Zm5.8-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>
      </svg>
    </a>
  )
}
