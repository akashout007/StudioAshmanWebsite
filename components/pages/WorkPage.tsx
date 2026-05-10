'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'
import {
  DiagWayfinding, DiagSign, DiagActivation, DiagFacade,
  DiagFloorplan, DiagRetail, DiagSection, DiagTransit
} from '@/components/svg/Diagrams'

gsap.registerPlugin(ScrollTrigger)

type Category = 'all' | 'wayfinding' | 'sign' | 'egd' | 'activation' | 'retail' | 'identity'

interface Project {
  id: number
  cat: Category
  catLabel: string
  title: string
  sub: string
  Diag: React.ComponentType
}

const PROJECTS: Project[] = [
  {
    id: 1, cat: 'wayfinding', catLabel: 'Wayfinding · Healthcare',
    title: 'Regency Hospital — bilingual wayfinding for a multi-block campus',
    sub: 'Lucknow, Uttar Pradesh · 2025',
    Diag: DiagWayfinding,
  },
  {
    id: 2, cat: 'retail', catLabel: 'Spatial Identity · Heritage',
    title: 'Chopra Soda — retail revival of a Punjabi heritage soft drink',
    sub: 'Faridkot, Punjab · 2024',
    Diag: DiagRetail,
  },
  {
    id: 3, cat: 'egd', catLabel: 'EGD · Studio',
    title: 'Artnest Studio — environmental identity for an atelier',
    sub: 'Charmwood Village, Faridabad · 2025',
    Diag: DiagFacade,
  },
  {
    id: 4, cat: 'identity', catLabel: 'Spatial Identity · Cultural',
    title: 'Delhigrapher — wayfinding & gallery identity for a photography collective',
    sub: 'New Delhi · 2026',
    Diag: DiagFloorplan,
  },
  {
    id: 5, cat: 'wayfinding', catLabel: 'Wayfinding · Healthcare',
    title: 'Regency Hospital — emergency & OPD route signage',
    sub: 'Lucknow · 2025 — phase 2',
    Diag: DiagSection,
  },
  {
    id: 6, cat: 'sign', catLabel: 'Sign Design · Retail',
    title: 'Chopra Soda — hand-painted dukan & cart sign system',
    sub: 'Faridkot · 2025',
    Diag: DiagSign,
  },
  {
    id: 7, cat: 'egd', catLabel: 'EGD · Studio',
    title: 'Artnest Studio — threshold & supergraphic series',
    sub: 'Faridabad · 2026',
    Diag: DiagActivation,
  },
  {
    id: 8, cat: 'wayfinding', catLabel: 'Wayfinding · Transit',
    title: 'Naviga International — Terminal 4 wayfinding masterplan',
    sub: 'Mumbai · 2024',
    Diag: DiagTransit,
  },
  {
    id: 9, cat: 'retail', catLabel: 'Retail Environments · F&B',
    title: 'Chopra Soda — dukan rollout spatial system',
    sub: 'Punjab · 2025–26',
    Diag: DiagRetail,
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All work', value: 'all' },
  { label: 'Wayfinding', value: 'wayfinding' },
  { label: 'Sign Design', value: 'sign' },
  { label: 'Environmental Graphics', value: 'egd' },
  { label: 'Brand Activation', value: 'activation' },
  { label: 'Retail & Identity', value: 'retail' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('all')
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(heroRef.current.querySelector('.ash-eyebrow'),
            { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, 0)
          .fromTo(heroRef.current.querySelector('h1'),
            { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .85 }, .12)
          .fromTo(heroRef.current.querySelector('.lede'),
            { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, .28)
      }
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      const cards = gridRef.current?.querySelectorAll('.proj-card')
      if (!cards?.length) return
      gsap.fromTo(cards,
        { opacity: 0, y: 28, scale: .97 },
        { opacity: 1, y: 0, scale: 1, duration: .55, stagger: .07, ease: 'power3.out' }
      )
    })
  }, [activeFilter])

  const handleFilter = (cat: Category) => {
    if (cat === activeFilter) return
    const cards = gridRef.current?.querySelectorAll('.proj-card')
    if (cards?.length) {
      gsap.to(cards, {
        opacity: 0, y: -12, scale: .98, duration: .22, stagger: .03, ease: 'power2.in',
        onComplete: () => setActiveFilter(cat),
      })
    } else {
      setActiveFilter(cat)
    }
  }

  return (
    <>
      <div className="page-hero-wrap">
        <div ref={heroRef} className="page-hero">
          <div>
            <div className="breadcrumb">
              <span>Ashman.Studio</span>
              <span className="sep">/</span>
              <span className="current">Work</span>
            </div>
            <div className="ash-eyebrow" style={{ opacity: 0 }}>
              <span className="dash" />01 — Selected work
            </div>
            <h1 style={{ opacity: 0 }}>
              Projects that<br />define <em>space</em>.
            </h1>
          </div>
          <p className="lede" style={{ opacity: 0 }}>
            A young studio with a small, deliberate output. Four named engagements
            since we opened in 2024 — healthcare wayfinding, heritage retail, an
            artist&apos;s atelier and a photography collective — most still in active phases.
          </p>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker paper">
        <div className="ticker-track">
          {['Wayfinding', 'Sign Design', 'Environmental Graphics', 'Brand Activation', 'Spatial Identity', 'Retail Environments',
            'Wayfinding', 'Sign Design', 'Environmental Graphics', 'Brand Activation', 'Spatial Identity', 'Retail Environments',
          ].map((item, i) => (
            <span key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* FILTER BAR */}
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

      {/* PROJECTS GRID */}
      <div ref={gridRef} className="projects-grid">
        {filtered.map((p) => {
          const Art = p.Diag
          return (
            <div key={p.id} className="proj-card">
              <div className="proj-img">
                <div className="proj-img-inner" style={{ aspectRatio: '4/3.2' }}>
                  <Art />
                </div>
              </div>
              <div className="proj-info">
                <div className="proj-cat">{p.catLabel}</div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-sub">{p.sub}</div>
              </div>
            </div>
          )
        })}
      </div>

      <Footer />
    </>
  )
}
