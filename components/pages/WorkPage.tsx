'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import NextProjectArt from '@/components/NextProjectArt'
import { usePage } from '@/context/PageContext'
import { PROJECTS } from '@/data/projects'
import type { ProjectCategory } from '@/data/projects'
import { EDITORIAL_COVERS } from '@/components/project/EditorialCover'
import {
  DiagWayfinding, DiagSign, DiagActivation, DiagFacade,
  DiagFloorplan, DiagRetail, DiagSection, DiagTransit,
} from '@/components/svg/Diagrams'

gsap.registerPlugin(ScrollTrigger)

// Fallback SVG diagrams for projects that have real photos (Chopra Soda, Delhigrapher)
// and as a backup for any project not in EDITORIAL_COVERS
const DIAG_FALLBACK: Record<string, React.ComponentType> = {
  'chopra-soda':  DiagRetail,
  'delhigrapher': DiagFloorplan,
}

function getCover(slug: string): React.ComponentType | undefined {
  return EDITORIAL_COVERS[slug] ?? DIAG_FALLBACK[slug]
}

type FilterValue = 'all' | ProjectCategory

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All work',                value: 'all' },
  { label: 'Wayfinding',              value: 'wayfinding' },
  { label: 'Spatial Identity',        value: 'spatial-identity' },
  { label: 'Environmental Graphics',  value: 'environmental-graphics' },
  { label: 'Brand Identity',          value: 'brand-identity' },
]

// Featured slugs — appear in the editorial 7fr/5fr diagonal grid
const FEATURED_SLUGS = ['mall-of-expressway', 'artnest-studio', 'regency-hospital', 'chopra-soda']

// Wide (7fr) and narrow (5fr) cards share a row, so narrow = wide × 5/7 keeps both the same height
const FEATURED_RATIOS = ['4/3', '20/21', '20/21', '4/3']

function NextProjectCard({ aspectRatio, onClick }: { aspectRatio: string; onClick: () => void }) {
  return (
    <button type="button" className="proj-card proj-card-link proj-card-next" onClick={onClick}>
      <div className="proj-img">
        <div className="proj-img-inner" style={{ aspectRatio }}>
          <NextProjectArt />
        </div>
      </div>
      <div className="proj-info">
        <div className="proj-cat">Coming soon</div>
        <div className="proj-title">Your project</div>
        <div className="proj-sub">Have something in mind? Start a conversation →</div>
      </div>
    </button>
  )
}

export default function WorkPage() {
  const { navigateTo } = usePage()
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const allFiltered =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter as ProjectCategory))

  const featuredFiltered = allFiltered
    .filter((p) => FEATURED_SLUGS.includes(p.slug))
    .sort((a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug))

  const selectedFiltered = allFiltered.filter((p) => !FEATURED_SLUGS.includes(p.slug))

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(heroRef.current.querySelector('.ash-eyebrow'),
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, 0)
        .fromTo(heroRef.current.querySelector('h1'),
          { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .85 }, .12)
        .fromTo(heroRef.current.querySelector('.lede'),
          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, .28)
    })
    return () => ctx.revert()
  }, [])

  // Card stagger on filter change
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

  const handleFilter = (cat: FilterValue) => {
    if (cat === activeFilter) return
    const cards = gridRef.current?.querySelectorAll('.proj-card')
    if (cards?.length) {
      gsap.to(cards, {
        opacity: 0, y: -12, scale: .98, duration: .22,
        stagger: .03, ease: 'power2.in',
        onComplete: () => setActiveFilter(cat),
      })
    } else {
      setActiveFilter(cat)
    }
  }

  const isFiltered = activeFilter !== 'all'

  return (
    <>
      {/* PAGE HERO */}
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
            A young studio with a small, deliberate output. Named engagements across
            healthcare wayfinding, heritage retail, artist ateliers and photography —
            most still in active phases.
          </p>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker paper">
        <div className="ticker-track">
          {[
            'Wayfinding', 'Sign Design', 'Environmental Graphics',
            'Brand Activation', 'Spatial Identity', 'Retail Environments',
            'Wayfinding', 'Sign Design', 'Environmental Graphics',
            'Brand Activation', 'Spatial Identity', 'Retail Environments',
          ].map((item, i) => (
            <span key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            className={`filter-btn${activeFilter === value ? ' active' : ''}`}
            onClick={() => handleFilter(value)}
            aria-pressed={activeFilter === value}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PROJECT GRID */}
      <div ref={gridRef}>
        {!isFiltered && featuredFiltered.length > 0 && (
          <div className="work-section">
            <div className="work-section-head ash-wrap">
              <div className="ash-eyebrow muted">
                <span className="dash" />Featured work
              </div>
            </div>
            <div className="featured-editorial">
              {featuredFiltered.map((p, i) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  Cover={getCover(p.slug)}
                  aspectRatio={FEATURED_RATIOS[i % FEATURED_RATIOS.length]}
                />
              ))}
              {featuredFiltered.length % 2 === 1 && (
                <NextProjectCard
                  aspectRatio={FEATURED_RATIOS[featuredFiltered.length % FEATURED_RATIOS.length]}
                  onClick={() => navigateTo('contact')}
                />
              )}
            </div>
          </div>
        )}

        {!isFiltered && selectedFiltered.length > 0 && (
          <div className="work-section">
            <div className="work-section-head ash-wrap">
              <div className="ash-eyebrow muted">
                <span className="dash" />Selected work
              </div>
            </div>
            <div className="selected-grid">
              {selectedFiltered.map((p) => (
                <ProjectCard key={p.slug} project={p} Cover={getCover(p.slug)} aspectRatio="4/3" />
              ))}
              {selectedFiltered.length % 2 === 1 && (
                <NextProjectCard aspectRatio="4/3" onClick={() => navigateTo('contact')} />
              )}
            </div>
          </div>
        )}

        {isFiltered && allFiltered.length > 0 && (
          <div className="work-section">
            <div className="work-section-head ash-wrap">
              <div className="ash-eyebrow muted">
                <span className="dash" />
                {FILTERS.find((f) => f.value === activeFilter)?.label} · {allFiltered.length}{' '}
                {allFiltered.length === 1 ? 'project' : 'projects'}
              </div>
            </div>
            <div className="selected-grid">
              {[...featuredFiltered, ...selectedFiltered].map((p) => (
                <ProjectCard key={p.slug} project={p} Cover={getCover(p.slug)} aspectRatio="4/3" />
              ))}
              {allFiltered.length % 2 === 1 && (
                <NextProjectCard aspectRatio="4/3" onClick={() => navigateTo('contact')} />
              )}
            </div>
          </div>
        )}

        {allFiltered.length === 0 && (
          <div className="ash-wrap work-empty">
            No projects in this category yet.
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
