'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <nav ref={navRef}>
      <Link href="/" className="nav-logo">
        Ashman<span>.</span>Studio
      </Link>

      <button
        className="nav-hamburger"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <span /><span /><span />
      </button>

      {mobileOpen && (
        <div className="mobile-nav" role="dialog" aria-label="Navigation menu">
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
            Close ✕
          </button>
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/?section=work" onClick={() => setMobileOpen(false)}>Work</Link>
          <Link href="/?section=services" onClick={() => setMobileOpen(false)}>What we do</Link>
          <Link href="/?section=studio" onClick={() => setMobileOpen(false)}>Studio</Link>
          <Link href="/?section=contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <div className="mobile-nav-footer">
            Ashman<span style={{ color: 'var(--accent)' }}>.</span>Studio · Est. New Delhi 2024
          </div>
        </div>
      )}

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
