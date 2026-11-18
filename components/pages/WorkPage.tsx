'use client'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectCard from '@/components/ProjectCard'
import { FilterChips, filterProjects, type FilterValue } from '@/components/BrandStories'
import { SERVICES, serviceBySlug, type ServiceSlug } from '@/lib/site'

const FEATURED_SLUGS = ['mall-of-expressway', 'artnest-studio', 'bollywood-kabab', 'chopra-soda']
// Wide (7fr) and narrow (5fr) cards share a row, so narrow = wide × 5/7 keeps both the same height
const FEATURED_RATIOS = ['4/3', '20/21', '20/21', '4/3']

const isService = (v: string | null): v is ServiceSlug => SERVICES.some((s) => s.slug === v)

// Reads ?service= in its own Suspense boundary so the grid itself still renders on the server.
function ServiceParam({ onChange }: { onChange: (v: FilterValue) => void }) {
  const params = useSearchParams()
  useEffect(() => {
    const v = params.get('service')
    onChange(isService(v) ? v : 'all')
  }, [params, onChange])
  return null
}

export default function WorkPage() {
  const [active, setActive] = useState<FilterValue>('all')

  const setFilter = (v: FilterValue) => {
    setActive(v)
    window.history.replaceState(null, '', v === 'all' ? '/work' : `/work?service=${v}`)
  }

  const projects = filterProjects(active)
  const featured = active === 'all'
    ? FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined)
    : []
  const rest = projects.filter((p) => !featured.includes(p))
  const activeName = active === 'all' ? null : serviceBySlug(active)?.name

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

      <Suspense fallback={null}><ServiceParam onChange={setActive} /></Suspense>
      <FilterChips value={active} onChange={setFilter} label="Filter brand stories by discipline" />
      <p className="sr-only" aria-live="polite">
        {projects.length} brand stories{activeName ? ` in ${activeName}` : ''}
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
              {activeName ?? 'More brand stories'}
            </h2>
          </div>
          <div className="selected-grid">
            {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </section>
      )}

      {projects.length === 0 && (
        <p className="ash-wrap work-empty">No brand stories in this discipline yet.</p>
      )}
    </>
  )
}
