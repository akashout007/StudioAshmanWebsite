'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

type Category = 'all' | 'activation' | 'wayfinding' | 'egd' | 'retail'

interface Project {
  id: number
  cat: Category
  catLabel: string
  title: string
  sub: string
  svgBg: string
  svgContent: React.ReactNode
}

const PROJECTS: Project[] = [
  {
    id: 1, cat: 'activation', catLabel: 'Brand Activation',
    title: 'Meridian Sport — Global Pop-up Tour', sub: 'London · Dubai · New York, 2024',
    svgBg: '#1a1410',
    svgContent: <>
      <circle cx="200" cy="160" r="140" fill="none" stroke="#c8502a" strokeWidth="1.2" opacity="0.35" />
      <circle cx="200" cy="160" r="85" fill="none" stroke="#c8502a" strokeWidth="0.8" opacity="0.2" />
      <circle cx="200" cy="160" r="8" fill="#c8502a" opacity="0.6" />
      <line x1="200" y1="20" x2="200" y2="300" stroke="#c8502a" strokeWidth="0.6" opacity="0.3" />
      <line x1="60" y1="160" x2="340" y2="160" stroke="#c8502a" strokeWidth="0.6" opacity="0.3" />
      <rect x="25" y="25" width="3" height="200" fill="#c8502a" opacity="0.5" />
      <text x="38" y="100" fontFamily="sans-serif" fontSize="42" fontWeight="bold" fill="#f2efe8" opacity="0.04" letterSpacing="-2">ACTIVATE</text>
    </>,
  },
  {
    id: 2, cat: 'wayfinding', catLabel: 'Wayfinding',
    title: 'Northfield Arena Signage System', sub: 'Manchester, 2024',
    svgBg: '#0f1418',
    svgContent: <>
      <line x1="0" y1="160" x2="400" y2="160" stroke="#1e2a38" strokeWidth="50" />
      <polyline points="20,300 80,60 150,300 230,60 310,300 380,180" fill="none" stroke="#c8502a" strokeWidth="1.5" opacity="0.7" />
      <rect x="10" y="138" width="5" height="44" fill="#c8502a" opacity="0.8" />
      <text x="24" y="166" fontFamily="sans-serif" fontSize="9" fill="#c8502a" letterSpacing="2.5" opacity="0.9">GATE A → EAST WING</text>
    </>,
  },
  {
    id: 3, cat: 'egd', catLabel: 'Environmental Graphics',
    title: 'Forma HQ Campus Identity', sub: 'London, 2023',
    svgBg: '#18130e',
    svgContent: <>
      <rect x="0" y="0" width="400" height="80" fill="#1f180f" />
      <rect x="0" y="80" width="400" height="160" fill="#1e1710" />
      <rect x="0" y="240" width="400" height="80" fill="#18120d" />
      <rect x="20" y="22" width="160" height="3" fill="#c8502a" opacity="0.85" />
      <rect x="20" y="32" width="100" height="3" fill="#c8502a" opacity="0.45" />
      <text x="18" y="180" fontFamily="sans-serif" fontSize="80" fill="#f2efe8" opacity="0.04" fontWeight="bold" letterSpacing="-3">FORMA</text>
      <rect x="20" y="252" width="3" height="40" fill="#c8502a" opacity="0.8" />
      <text x="32" y="278" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="3">ENVIRONMENTAL GRAPHICS</text>
    </>,
  },
  {
    id: 4, cat: 'retail', catLabel: 'Retail Environments',
    title: 'Velo Co. Flagship Store', sub: 'Shoreditch, London, 2023',
    svgBg: '#0e1210',
    svgContent: <>
      <rect x="30" y="30" width="340" height="260" fill="#121a16" />
      <rect x="30" y="30" width="340" height="3" fill="#c8502a" opacity="0.6" />
      <line x1="120" y1="30" x2="120" y2="290" stroke="#1e2820" strokeWidth="1" />
      <line x1="280" y1="30" x2="280" y2="290" stroke="#1e2820" strokeWidth="1" />
      <circle cx="200" cy="160" r="60" fill="none" stroke="#c8502a" strokeWidth="0.8" opacity="0.3" />
      <text x="140" y="168" fontFamily="sans-serif" fontSize="24" fill="#f2efe8" opacity="0.06" fontWeight="bold" letterSpacing="2">VELO</text>
    </>,
  },
  {
    id: 5, cat: 'activation', catLabel: 'Brand Activation',
    title: 'Arc Retail — Season Launch', sub: 'Birmingham, 2023',
    svgBg: '#1a100a',
    svgContent: <>
      <circle cx="200" cy="160" r="120" fill="#c8502a" opacity="0.06" />
      <circle cx="200" cy="160" r="80" fill="none" stroke="#c8502a" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="160" r="40" fill="none" stroke="#c8502a" strokeWidth="0.6" opacity="0.25" />
      <line x1="80" y1="60" x2="200" y2="160" stroke="#c8502a" strokeWidth="0.5" opacity="0.3" />
      <line x1="320" y1="60" x2="200" y2="160" stroke="#c8502a" strokeWidth="0.5" opacity="0.3" />
      <line x1="80" y1="260" x2="200" y2="160" stroke="#c8502a" strokeWidth="0.5" opacity="0.3" />
      <line x1="320" y1="260" x2="200" y2="160" stroke="#c8502a" strokeWidth="0.5" opacity="0.3" />
      <text x="50" y="30" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="3">ARC — SS24 ACTIVATION</text>
    </>,
  },
  {
    id: 6, cat: 'wayfinding', catLabel: 'Wayfinding',
    title: 'Strata Tower Campus Navigation', sub: 'Dublin, 2022',
    svgBg: '#0c1014',
    svgContent: <>
      <line x1="0" y1="80" x2="400" y2="80" stroke="#192030" strokeWidth="2" />
      <line x1="0" y1="160" x2="400" y2="160" stroke="#192030" strokeWidth="2" />
      <line x1="0" y1="240" x2="400" y2="240" stroke="#192030" strokeWidth="2" />
      <rect x="20" y="62" width="4" height="36" fill="#c8502a" opacity="0.8" />
      <text x="34" y="85" fontFamily="sans-serif" fontSize="8" fill="#c8502a" letterSpacing="2" opacity="0.9">LOBBY → RECEPTION</text>
      <rect x="20" y="142" width="4" height="36" fill="#c8502a" opacity="0.5" />
      <text x="34" y="165" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="2" opacity="0.7">FLOORS 2–8</text>
      <rect x="20" y="222" width="4" height="36" fill="#c8502a" opacity="0.3" />
      <text x="34" y="245" fontFamily="sans-serif" fontSize="8" fill="#5a5a58" letterSpacing="2" opacity="0.5">ROOF TERRACE</text>
    </>,
  },
  {
    id: 7, cat: 'egd', catLabel: 'Environmental Graphics',
    title: 'Meridian HQ Brand Wall', sub: 'London, 2022',
    svgBg: '#141210',
    svgContent: <>
      <rect x="0" y="0" width="400" height="320" fill="#1a1612" />
      <text x="-10" y="240" fontFamily="serif" fontSize="140" fill="#c8502a" opacity="0.07" fontWeight="bold" letterSpacing="-6">M</text>
      <rect x="20" y="20" width="200" height="3" fill="#c8502a" opacity="0.7" />
      <rect x="20" y="28" width="130" height="2" fill="#c8502a" opacity="0.35" />
      <rect x="20" y="280" width="3" height="30" fill="#c8502a" opacity="0.8" />
      <text x="32" y="300" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="2.5">MERIDIAN — BRAND WALL</text>
    </>,
  },
  {
    id: 8, cat: 'retail', catLabel: 'Retail Environments',
    title: 'Arc Winter Pop-up', sub: 'Edinburgh, 2022',
    svgBg: '#100e0c',
    svgContent: <>
      <rect x="40" y="40" width="320" height="240" fill="#181412" />
      <rect x="40" y="40" width="320" height="3" fill="#c8502a" opacity="0.7" />
      <rect x="40" y="40" width="3" height="240" fill="#c8502a" opacity="0.7" />
      <circle cx="200" cy="170" r="70" fill="none" stroke="#c8502a" strokeWidth="0.7" opacity="0.3" />
      <text x="130" y="180" fontFamily="sans-serif" fontSize="28" fill="#f2efe8" opacity="0.05" fontWeight="bold" letterSpacing="1">ARC</text>
      <text x="52" y="56" fontFamily="sans-serif" fontSize="7" fill="#7a7670" letterSpacing="2.5">POP-UP / EDINBURGH 2022</text>
    </>,
  },
  {
    id: 9, cat: 'activation', catLabel: 'Brand Activation',
    title: 'Northfield Sponsor Activation', sub: 'Manchester, 2021',
    svgBg: '#0a1018',
    svgContent: <>
      <rect x="0" y="120" width="400" height="80" fill="#0f1822" />
      <polyline points="0,120 100,80 200,120 300,80 400,120" fill="none" stroke="#c8502a" strokeWidth="1.2" opacity="0.6" />
      <polyline points="0,200 100,160 200,200 300,160 400,200" fill="none" stroke="#c8502a" strokeWidth="0.6" opacity="0.3" />
      <circle cx="200" cy="160" r="30" fill="#c8502a" opacity="0.08" />
      <text x="50" y="20" fontFamily="sans-serif" fontSize="8" fill="#7a7670" letterSpacing="3">NORTHFIELD — ACTIVATION 2021</text>
    </>,
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Brand Activation', value: 'activation' },
  { label: 'Wayfinding', value: 'wayfinding' },
  { label: 'Environmental Graphics', value: 'egd' },
  { label: 'Retail', value: 'retail' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const gridRef = useRef<HTMLDivElement>(null)
  const pageHeroRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageHeroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Runs after DOM updates with new filtered cards
    requestAnimationFrame(() => {
      const cards = gridRef.current?.querySelectorAll('.proj-card')
      if (!cards) return
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
      )
    })
  }, [activeFilter])

  const handleFilter = (cat: Category) => {
    const cards = gridRef.current?.querySelectorAll('.proj-card')
    if (cards) {
      gsap.to(cards, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => setActiveFilter(cat),
      })
    } else {
      setActiveFilter(cat)
    }
  }

  return (
    <>
      <div ref={pageHeroRef} className="page-hero">
        <div className="section-label">Our work</div>
        <h1>Projects that<br />define <em>space</em>.</h1>
        <p>A selection of brand environments, wayfinding systems, and spatial design projects from across the globe.</p>
      </div>

      <div className="filter-bar">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={`filter-btn${activeFilter === value ? ' active' : ''}`}
            onClick={() => handleFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="projects-grid">
        {filtered.map((p) => (
          <div key={p.id} className="proj-card">
            <div className="proj-img">
              <div className="proj-img-inner">
                <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <rect width="400" height="320" fill={p.svgBg} />
                  {p.svgContent}
                </svg>
              </div>
            </div>
            <div className="proj-info">
              <div className="proj-cat">{p.catLabel}</div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-sub">{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <Footer tagline="Designing the physical world of your brand." />
    </>
  )
}
