'use client'
import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import gsap from 'gsap'
import { usePage, PageName } from '@/context/PageContext'

type MegaKey = 'work' | 'services' | 'studio' | null

interface MegaData {
  colA: { title: string; items: { name: string; meta: string; page: PageName }[] }
  colB: { title: string; items: { name: string; meta: string; page: PageName }[] }
  feature: { eyebrow: string; title: ReactNode; meta: string[]; page: PageName }
}

const MEGA: Record<string, MegaData> = {
  work: {
    colA: {
      title: 'Practice areas',
      items: [
        { name: 'Wayfinding', meta: '24 projects', page: 'services' },
        { name: 'Sign Design', meta: '18 projects', page: 'services' },
        { name: 'Environmental Graphics', meta: '15 projects', page: 'services' },
        { name: 'Brand Activation', meta: '12 projects', page: 'services' },
        { name: 'Spatial Identity', meta: '9 projects', page: 'services' },
      ],
    },
    colB: {
      title: 'Sectors',
      items: [
        { name: 'Healthcare', meta: 'Hospital campus', page: 'work' },
        { name: 'Retail & Heritage', meta: 'Flagship · F&B', page: 'work' },
        { name: 'Civic & Cultural', meta: 'Gallery · studio', page: 'work' },
        { name: 'Workplace', meta: 'Office campus', page: 'work' },
        { name: 'Hospitality', meta: 'Hotel · resort', page: 'work' },
      ],
    },
    feature: {
      eyebrow: 'Featured case study',
      title: <><em>Regency Hospital</em> — bilingual wayfinding for a multi-block campus.</>,
      meta: ['Healthcare · Lucknow', '2025'],
      page: 'work',
    },
  },
  services: {
    colA: {
      title: 'Spatial',
      items: [
        { name: 'Wayfinding strategy', meta: 'Audit → masterplan', page: 'services' },
        { name: 'Sign design', meta: 'Family · spec · supply', page: 'services' },
        { name: 'Environmental graphics', meta: 'Surface · facade', page: 'services' },
      ],
    },
    colB: {
      title: 'Brand',
      items: [
        { name: 'Brand activation', meta: 'Pop-ups · live', page: 'services' },
        { name: 'Retail environments', meta: 'Flagship · concept', page: 'services' },
        { name: 'Spatial identity', meta: 'Architecture-led', page: 'services' },
      ],
    },
    feature: {
      eyebrow: 'How we work',
      title: <>Six disciplines, <em>one</em> studio.</>,
      meta: ['Capabilities', 'Read more →'],
      page: 'services',
    },
  },
  studio: {
    colA: {
      title: 'About us',
      items: [
        { name: 'Our story', meta: 'Since 2024', page: 'studio' },
        { name: 'Team', meta: '12 people', page: 'studio' },
        { name: 'Awards & press', meta: '5 honours', page: 'studio' },
      ],
    },
    colB: {
      title: 'Connect',
      items: [
        { name: 'Get in touch', meta: 'New projects', page: 'contact' },
        { name: 'Studios', meta: 'NDL · CHD · DXB', page: 'contact' },
        { name: 'Careers', meta: 'Currently hiring', page: 'studio' },
      ],
    },
    feature: {
      eyebrow: 'In the studio',
      title: <>A practice that&apos;s stayed <em>independent</em>.</>,
      meta: ['Hauz Khas, New Delhi', 'Since 2024'],
      page: 'studio',
    },
  },
}

export default function Nav() {
  const { currentPage, navigateTo } = usePage()
  const navRef = useRef<HTMLElement>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const [openMega, setOpenMega] = useState<MegaKey>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMega(null) }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMega(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [])

  // Animate mega menu open
  useEffect(() => {
    if (!megaRef.current) return
    if (openMega) {
      gsap.fromTo(megaRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: .22, ease: 'power3.out' }
      )
    }
  }, [openMega])

  const openMenu = useCallback((key: MegaKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMega(key)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const go = useCallback((page: PageName) => {
    setOpenMega(null)
    navigateTo(page)
  }, [navigateTo])

  const NAV_ITEMS: { label: string; key: MegaKey; page: PageName }[] = [
    { label: 'Work', key: 'work', page: 'work' },
    { label: 'What we do', key: 'services', page: 'services' },
    { label: 'Studio', key: 'studio', page: 'studio' },
  ]

  const mega = openMega ? MEGA[openMega] : null

  return (
    <nav ref={navRef} onMouseLeave={scheduleClose} onMouseEnter={cancelClose}>
      <button className="nav-logo" onClick={() => go('home')}>
        Ashman<span>.</span>Studio
      </button>

      <ul className="nav-links">
        {NAV_ITEMS.map(({ label, key, page }) => (
          <li key={key}>
            <button
              className={currentPage === page ? 'active' : ''}
              onClick={() => { setOpenMega(null); go(page) }}
              onMouseEnter={() => openMenu(key)}
              aria-expanded={openMega === key}
            >
              {label}
              <span className={`nav-caret${openMega === key ? ' open' : ''}`}>▾</span>
            </button>
          </li>
        ))}
        <li>
          <button
            className={currentPage === 'contact' ? 'active' : ''}
            onClick={() => go('contact')}
            onMouseEnter={scheduleClose}
            style={{ letterSpacing: '.2em' }}
          >
            Contact
          </button>
        </li>
        <li>
          <button className="nav-cta" onClick={() => go('contact')} onMouseEnter={scheduleClose}>
            Start a project →
          </button>
        </li>
      </ul>

      {mega && openMega && (
        <div
          ref={megaRef}
          className="mega-menu"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mega-col">
            <h4>{mega.colA.title}</h4>
            <ul className="mega-list">
              {mega.colA.items.map((it) => (
                <li key={it.name}>
                  <button onClick={() => go(it.page)}>
                    {it.name}
                    <span className="mm-meta">{it.meta}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mega-col">
            <h4>{mega.colB.title}</h4>
            <ul className="mega-list">
              {mega.colB.items.map((it) => (
                <li key={it.name}>
                  <button onClick={() => go(it.page)}>
                    {it.name}
                    <span className="mm-meta">{it.meta}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button className="mega-feature" onClick={() => go(mega.feature.page)}>
            <div>
              <div className="ash-eyebrow on-dark">
                <span className="dash" />
                {mega.feature.eyebrow}
              </div>
              <h3>{mega.feature.title}</h3>
            </div>
            <div className="mm-meta-row">
              <div>{mega.feature.meta.map((m, i) => <div key={i}>{m}</div>)}</div>
              <span className="mm-arrow">↗</span>
            </div>
          </button>
        </div>
      )}
    </nav>
  )
}
