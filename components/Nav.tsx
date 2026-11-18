'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu, { MenuToggle } from '@/components/MobileMenu'
import { CTA, SERVICES } from '@/lib/site'

export default function Nav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        triggerRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header>
      <nav ref={navRef} aria-label="Main">
        <Link href="/" className="nav-logo" aria-label="Ashman Studio, home">
          ashman<span>.</span>studio
        </Link>

        <MenuToggle open={mobileOpen} onToggle={() => setMobileOpen((o) => !o)} />
        <MobileMenu open={mobileOpen} onClose={closeMobile}>
          <Link href="/" onClick={closeMobile}>Home</Link>
          <Link href="/work" onClick={closeMobile}>Brand stories</Link>
          <div className="mobile-services">
            <p className="mobile-services-title">What we do</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/work?service=${s.slug}`} onClick={closeMobile}>
                    <span className="mobile-service-name">{s.name}</span>
                    <span className="mobile-service-line">{s.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/studio" onClick={closeMobile}>Studio</Link>
          <Link href="/contact" onClick={closeMobile}>Contact</Link>
        </MobileMenu>

        <ul className="nav-links">
          <li>
            <Link href="/work" className={isActive('/work') ? 'active' : ''}>Brand stories</Link>
          </li>
          <li>
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="nav-services"
              onClick={() => setMenuOpen((o) => !o)}
            >
              What we do
              <span className={`nav-caret${menuOpen ? ' open' : ''}`} aria-hidden="true">▾</span>
            </button>
          </li>
          <li>
            <Link href="/studio" className={isActive('/studio') ? 'active' : ''}>Studio</Link>
          </li>
          <li>
            <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
          </li>
          <li>
            <Link href="/contact" className="nav-cta">{CTA.primary}</Link>
          </li>
        </ul>

        {menuOpen && (
          <div id="nav-services" className="mega-menu">
            <ul className="mega-services">
              {SERVICES.map((s, i) => (
                <li key={s.slug}>
                  <Link href={`/work?service=${s.slug}`} onClick={() => setMenuOpen(false)}>
                    <span className="mega-num" aria-hidden="true">0{i + 1}</span>
                    <span className="mega-name">{s.name}</span>
                    <span className="mega-line">{s.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/work" className="mega-all" onClick={() => setMenuOpen(false)}>
              All brand stories <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
