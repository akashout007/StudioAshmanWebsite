'use client'
import Link from 'next/link'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectCard from '@/components/ProjectCard'
import { FilterChips, SECTOR_CHOICES, SERVICE_CHOICES, filterProjects } from '@/components/BrandStories'
import { workHref, type SectorFilter, type ServiceFilter } from '@/data/projects'
import { SECTORS, SERVICES, sectorBySlug, serviceBySlug, type SectorSlug, type ServiceSlug } from '@/lib/site'

const FEATURED_SLUGS = ['mall-of-expressway', 'artnest-studio', 'bollywood-kabab', 'chopra-soda']
// Wide (7fr) and narrow (5fr) cards share a row, so narrow = wide × 5/7 keeps both the same height
const FEATURED_RATIOS = ['4/3', '20/21', '20/21', '4/3']

const isService = (v: string | null): v is ServiceSlug => SERVICES.some((s) => s.slug === v)
const isSector = (v: string | null): v is SectorSlug => SECTORS.some((s) => s.slug === v)

type Filters = { service: ServiceFilter; sector: SectorFilter }

// Reads ?service= and ?sector= in its own Suspense boundary so the grid itself still renders on the
// server. It also re-runs on Back/Forward, since Next keeps useSearchParams in step with history.
function FilterParams({ onChange }: { onChange: (f: Filters) => void }) {
  const params = useSearchParams()
  useEffect(() => {
    const service = params.get('service')
    const sector = params.get('sector')
    onChange({ service: isService(service) ? service : 'all', sector: isSector(sector) ? sector : 'all' })
  }, [params, onChange])
  return null
}

export default function WorkPage() {
  const [filters, setFilters] = useState<Filters>({ service: 'all', sector: 'all' })
  const { service, sector } = filters

  const apply = (next: Filters) => {
    setFilters(next)
    // A history entry per change, so Back/Forward step through filters
    window.history.pushState(null, '', workHref(next.service, next.sector))
  }
  const fromUrl = useCallback((f: Filters) => setFilters(f), [])

  const projects = filterProjects(service, sector)
  const unfiltered = service === 'all' && sector === 'all'
  const featured = unfiltered
    ? FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined)
    : []
  const rest = projects.filter((p) => !featured.includes(p))
  const heading = [
    service === 'all' ? null : serviceBySlug(service)?.name,
    sector === 'all' ? null : sectorBySlug(sector)?.name,
  ].filter(Boolean).join(' · ')

  return (
    <>
      <div className="page-hero-wrap">
        <div className="page-hero">
          <div>
            <div className="breadcrumb">
              <Link href="/" className="breadcrumb-link">Ashman Studio</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span className="current">Brand stories</span>
            </div>
            <div className="ash-eyebrow"><span className="dash" />Brand stories</div>
            <h1>Brands we&apos;ve built,<br />and the <em>places</em> they live.</h1>
          </div>
          <p className="lede">
            Identities, wayfinding systems, spaces and collateral, each one designed as part of a
            single brand story.
          </p>
        </div>
      </div>

      <Suspense fallback={null}><FilterParams onChange={fromUrl} /></Suspense>
      <FilterChips
        value={service} options={SERVICE_CHOICES} label="Filter brand stories by discipline"
        onChange={(v) => apply({ service: v, sector })}
      />
      <FilterChips
        value={sector} options={SECTOR_CHOICES} label="Filter brand stories by sector" className="filter-bar-sector"
        onChange={(v) => apply({ service, sector: v })}
      />
      <p className="sr-only" aria-live="polite">
        {projects.length} brand {projects.length === 1 ? 'story' : 'stories'}{heading ? ` in ${heading}` : ''}
      </p>

      {featured.length > 0 && (
        <section className="work-section" aria-labelledby="featured-heading">
          <div className="work-section-head ash-wrap">
            <h2 id="featured-heading" className="ash-eyebrow muted"><span className="dash" />Featured</h2>
          </div>
          <div className="featured-editorial">
            {featured.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                aspectRatio={FEATURED_RATIOS[i % FEATURED_RATIOS.length]}
                sizes="(max-width: 768px) 100vw, 60vw"
                priority={i < 2}
              />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="work-section" aria-labelledby="list-heading">
          <div className="work-section-head ash-wrap">
            <h2 id="list-heading" className="ash-eyebrow muted">
              <span className="dash" />
              {heading || 'More brand stories'}
            </h2>
          </div>
          <div className="selected-grid">
            {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <div className="ash-wrap work-empty">
          <p>No brand stories for this combination yet.</p>
          <button type="button" className="btn-outline" onClick={() => apply({ service: 'all', sector: 'all' })}>
            Show all brand stories
          </button>
        </div>
      )}
    </>
  )
}
