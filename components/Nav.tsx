'use client'
import { useEffect, useRef } from 'react'
import { usePage, PageName } from '@/context/PageContext'

export default function Nav() {
  const { currentPage, navigateTo } = usePage()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links: { label: string; page: PageName }[] = [
    { label: 'Work', page: 'work' },
    { label: 'Services', page: 'services' },
    { label: 'Studio', page: 'studio' },
  ]

  return (
    <nav ref={navRef}>
      <button className="nav-logo" onClick={() => navigateTo('home')}>
        Ashman<span>.</span>Studio
      </button>
      <ul className="nav-links">
        {links.map(({ label, page }) => (
          <li key={page}>
            <button
              className={currentPage === page ? 'active' : ''}
              onClick={() => navigateTo(page)}
            >
              {label}
            </button>
          </li>
        ))}
        <li>
          <button className="nav-cta" onClick={() => navigateTo('contact')}>
            Get in touch
          </button>
        </li>
      </ul>
    </nav>
  )
}
