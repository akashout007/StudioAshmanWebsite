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
          <Link href="/#what-we-do" onClick={closeMobile}>What we do</Link>
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
            <div className="mega-col">
              <p className="mega-heading">Disciplines</p>
              <ul className="mega-list">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/work?service=${s.slug}`} onClick={() => setMenuOpen(false)}>
                      {s.name}
                      <span className="mm-meta">View work</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mega-col">
              <p className="mega-heading">Explore</p>
              <ul className="mega-list">
                <li><Link href="/#what-we-do" onClick={() => setMenuOpen(false)}>How the four fit together<span className="mm-meta">Overview</span></Link></li>
                <li><Link href="/work" onClick={() => setMenuOpen(false)}>Brand stories<span className="mm-meta">All work</span></Link></li>
                <li><Link href="/studio" onClick={() => setMenuOpen(false)}>About the studio<span className="mm-meta">Studio</span></Link></li>
              </ul>
            </div>

            <Link href="/contact" className="mega-feature" onClick={() => setMenuOpen(false)}>
              <div>
                <div className="ash-eyebrow on-dark">
                  <span className="dash" />Start a project
                </div>
                <h3>Have a brand or a <em>space</em> in mind?</h3>
              </div>
              <div className="mm-meta-row">
                <div>{CTA.reply}</div>
                <span className="mm-arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
