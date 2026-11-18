import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  PROJECTS, STATUS_LABEL, getAdjacentProjects, getProject, placeholder,
  type Project, type ProjectImage, type StorySection,
} from '@/data/projects'
import { CTA, EXTERNAL, LINKS, SITE, serviceBySlug, type ServiceSlug } from '@/lib/site'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectGallery from '@/components/project/ProjectGallery'
import ProjectPageNav from '@/components/project/ProjectPageNav'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

const primaryService = (p: Project) => serviceBySlug(p.services[0])?.name ?? SITE.positioning
const hookOf = (p: Project) => p.hook ?? p.discipline ?? placeholder('one-line story hook')

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title}: ${primaryService(project)} | ${SITE.name}`
  const description = `${hookOf(project)}${project.location ? `, ${project.location}` : ''}. A brand story by ${SITE.name}.`

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      images: [{ url: project.hero.src, alt: project.hero.alt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [project.hero.src] },
  }
}

const SECTION_SERVICES: Record<Exclude<StorySection, 'overview'>, ServiceSlug[]> = {
  identity: ['brand-identity'],
  spatial: ['wayfinding-signage', 'spatial-branding'],
  digital: ['digital-collateral'],
}

function Story({ id, title, text, fallback, images = [] }: {
  id: string; title: string; text?: string; fallback: string; images?: ProjectImage[]
}) {
  return (
    <section className="story-section" aria-labelledby={id}>
      <div className="ash-wrap story-text">
        <h2 id={id} className="story-title">{title}</h2>
        <p className={text ? undefined : 'is-placeholder'}>{text ?? placeholder(fallback)}</p>
      </div>
      <ProjectGallery images={images} />
    </section>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)
  const imagesFor = (s: StorySection) => project.images.filter((i) => (i.section ?? 'overview') === s)
  const shows = (s: Exclude<StorySection, 'overview'>) =>
    imagesFor(s).length > 0 || project.services.some((sv) => SECTION_SERVICES[s].includes(sv))
  const services = project.services.map((s) => serviceBySlug(s)?.name).filter(Boolean)

  const meta: [string, string][] = [
    ['Client', project.client ?? placeholder('client name')],
    ['Sector', project.sector],
    ['Location', project.location ?? placeholder('location')],
    ['Year', project.year ?? placeholder('year')],
    ['Status', STATUS_LABEL[project.status]],
    ['Services', services.join(', ')],
  ]

  return (
    <div className="proj-detail proj-entrance">
      <header className="proj-detail-header ash-wrap">
        <div role="navigation" aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/work" className="breadcrumb-link">Brand stories</Link>
          <span className="sep" aria-hidden="true">/</span>
          <span className="current">{project.title}</span>
        </div>

        <div className="proj-detail-header-inner">
          <div className="proj-detail-meta">
            <div className="ash-eyebrow"><span className="dash" />{services.join(' · ')}</div>
            {project.status !== 'built' && (
              <span className={`proj-status-badge status-${project.status}`}>{STATUS_LABEL[project.status]}</span>
            )}
          </div>
          <h1 className="proj-detail-title">{project.title}</h1>
          <p className="proj-detail-hook">{hookOf(project)}</p>
        </div>
      </header>

      <ProjectHero image={project.hero} />

      <section className="ash-wrap proj-meta-row" aria-label="Project details">
        <dl>
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className={v.startsWith('[PLACEHOLDER') ? 'is-placeholder' : undefined}>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Story id="brief" title="The brief" text={project.brief}
        fallback="the brief: what the client needed and why" images={imagesFor('overview')} />
      <Story id="story" title="The story we built" text={project.story}
        fallback="the brand story and the idea behind the work" />
      {shows('identity') && (
        <Story id="identity" title="Identity" text={project.identityText}
          fallback="identity: name, logo, visual system, type and colour" images={imagesFor('identity')} />
      )}
      {shows('spatial') && (
        <Story id="spatial" title="Spatial" text={project.spatialText}
          fallback="spatial: wayfinding, signage, facade and interior work" images={imagesFor('spatial')} />
      )}
      {shows('digital') && (
        <Story id="digital" title="Digital & collateral" text={project.digitalText}
          fallback="digital and collateral: social, web, packaging and print" images={imagesFor('digital')} />
      )}
      <Story id="outcome" title="Outcome" text={project.outcome}
        fallback="outcome: only real, client-approved results" />

      <section className="story-cta">
        <div className="ash-wrap story-cta-inner">
          <h2>Building a brand or a <em>space</em>?</h2>
          <div className="cta-actions">
            <Link href="/contact" className="btn-primary">{CTA.primary}</Link>
            <a href={LINKS.whatsapp} {...EXTERNAL} className="btn-whatsapp">{CTA.whatsapp} ↗</a>
          </div>
        </div>
      </section>

      <ProjectPageNav prev={prev} next={next} />
    </div>
  )
}
