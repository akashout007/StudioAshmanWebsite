'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import MobileMenu, { MenuToggle } from '@/components/MobileMenu'

export default function NavProject() {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <nav ref={navRef}>
      <Link href="/" className="nav-logo">
        Ashman<span>.</span>Studio
      </Link>

      <MenuToggle open={mobileOpen} onToggle={() => setMobileOpen((o) => !o)} />
      <MobileMenu open={mobileOpen} onClose={closeMobile}>
        <Link href="/" onClick={closeMobile}>Home</Link>
        <Link href="/?section=work" onClick={closeMobile}>Work</Link>
        <Link href="/?section=services" onClick={closeMobile}>What we do</Link>
        <Link href="/?section=studio" onClick={closeMobile}>Studio</Link>
        <Link href="/?section=contact" onClick={closeMobile}>Contact</Link>
      </MobileMenu>

      <ul className="nav-links" role="list">
        <li>
          <Link href="/?section=work" className="nav-project-link">Work</Link>
        </li>
        <li>
          <Link href="/?section=services" className="nav-project-link">What we do</Link>
        </li>
        <li>
          <Link href="/?section=studio" className="nav-project-link">Studio</Link>
        </li>
        <li>
          <Link href="/?section=contact" className="nav-project-link">Contact</Link>
        </li>
        <li>
          <Link href="/?section=contact" className="nav-cta">
            Start a project →
          </Link>
        </li>
      </ul>
    </nav>
  )
}
