'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { matchesFilters, orderedProjects, workHref, type SectorFilter, type ServiceFilter } from '@/data/projects'
import { SECTORS, SERVICES } from '@/lib/site'

export type FilterValue = ServiceFilter

export const SERVICE_CHOICES: { value: ServiceFilter; label: string }[] = [
  { value: 'all', label: 'All work' },
  ...SERVICES.map((s) => ({ value: s.slug, label: s.name })),
]
export const SECTOR_CHOICES: { value: SectorFilter; label: string }[] = [
  { value: 'all', label: 'Every sector' },
  ...SECTORS.map((s) => ({ value: s.slug, label: s.name })),
]

export function FilterChips<T extends string>({ value, onChange, label, options = SERVICE_CHOICES as { value: T; label: string }[], className = '' }: {
  value: T
  onChange: (v: T) => void
  label: string
  options?: { value: T; label: string }[]
  className?: string
}) {
  return (
    <div className={`filter-bar ${className}`.trim()} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`filter-btn${value === o.value ? ' active' : ''}`}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function filterProjects(service: ServiceFilter, sector: SectorFilter = 'all') {
  return orderedProjects().filter((p) => matchesFilters(p, service, sector))
}

export default function HomeBrandStories() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const projects = filterProjects(filter)

  return (
    <section className="ash-section brand-stories" style={{ paddingTop: 0 }}>
      <div className="ash-wrap">
        <div className="section-head">
          <div className="left">
            <div className="num">Selected work</div>
            <h2>Brand <em>stories</em>.</h2>
          </div>
          <p className="lede">
            Identities, wayfinding systems and spaces we have built, each one a brand with a story
            to tell.
          </p>
        </div>
      </div>
      <FilterChips value={filter} onChange={setFilter} label="Filter brand stories by service" />
      <p className="sr-only" aria-live="polite">{projects.length} brand stories shown</p>
      <div className="selected-grid story-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px" />
        ))}
      </div>
      <div className="ash-wrap story-more">
        <Link href={workHref(filter, 'all')} className="btn-outline">
          View all brand stories <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
