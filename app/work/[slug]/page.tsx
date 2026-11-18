import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  PROJECTS, STATUS_LABEL, filled, getAdjacentProjects, getProject,
  type Project, type ProjectImage, type StorySection,
} from '@/data/projects'
import { CTA, EXTERNAL, LINKS, SITE, serviceBySlug, type ServiceSlug } from '@/lib/site'
import ProjectHero from '@/components/project/ProjectHero'
import { pageMeta } from '@/lib/seo'
import ProjectGallery from '@/components/project/ProjectGallery'
import ProjectPageNav from '@/components/project/ProjectPageNav'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

const primaryService = (p: Project) => serviceBySlug(p.services[0])?.name ?? SITE.positioning
const hookOf = (p: Project) => [p.hook, p.discipline].find(filled)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const lead = hookOf(project) ?? `${project.title}, ${primaryService(project).toLowerCase()}`
  const where = filled(project.location) ? `, ${project.location}` : ''
  return pageMeta({
    title: `${project.title}: ${primaryService(project)} | ${SITE.name}`,
    description: `${lead}${where}. A brand story by ${SITE.name}.`,
    path: `/work/${project.slug}`,
    image: `/og/${project.slug}.jpg`,
    imageAlt: project.hero.alt,
  })
}

const SECTION_SERVICES: Record<Exclude<StorySection, 'overview'>, ServiceSlug[]> = {
  identity: ['brand-identity'],
  spatial: ['wayfinding-signage', 'spatial-branding'],
  digital: ['digital-collateral'],
}

// A story section renders only with real text or images. Without text, the heading stays only
// when it labels the images (Identity, Spatial…); "The brief" over bare images would mislead.
function Story({ id, title, text, images = [], labelsImages = false }: {
  id: string; title: string; text?: string; images?: ProjectImage[]; labelsImages?: boolean
}) {
  const hasText = filled(text)
  if (!hasText && images.length === 0) return null
  if (!hasText && !labelsImages) {
    return <section className="story-section"><ProjectGallery images={images} /></section>
  }
  return (
    <section className="story-section" aria-labelledby={id}>
      <div className="ash-wrap story-text">
        <h2 id={id} className="story-title">{title}</h2>
        {hasText && <p>{text}</p>}
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
  // Discipline sections belong only to projects with that service, or with images tagged for it
  const applies = (s: Exclude<StorySection, 'overview'>) =>
    imagesFor(s).length > 0 || project.services.some((sv) => SECTION_SERVICES[s].includes(sv))
  const services = project.services.map((s) => serviceBySlug(s)?.name).filter(Boolean)
  const hook = hookOf(project)

  const meta = ([
    ['Client', project.client],
    ['Sector', project.sector],
    ['Location', project.location],
    ['Year', project.year],
    ['Status', STATUS_LABEL[project.status]],
    ['Services', services.join(', ')],
  ] as [string, string | undefined][]).filter((row): row is [string, string] => filled(row[1]))

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
          {hook && <p className="proj-detail-hook">{hook}</p>}
        </div>
      </header>

      <ProjectHero image={project.hero} />

      <section className="ash-wrap proj-meta-row" aria-label="Project details">
        <dl>
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Story id="brief" title="The brief" text={project.brief} images={imagesFor('overview')} />
      <Story id="story" title="The story we built" text={project.story} />
      {applies('identity') && (
        <Story id="identity" title="Identity" text={project.identityText} images={imagesFor('identity')} labelsImages />
      )}
      {applies('spatial') && (
        <Story id="spatial" title="Spatial" text={project.spatialText} images={imagesFor('spatial')} labelsImages />
      )}
      {applies('digital') && (
        <Story id="digital" title="Digital & collateral" text={project.digitalText} images={imagesFor('digital')} labelsImages />
      )}
      <Story id="outcome" title="Outcome" text={project.outcome} />

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
