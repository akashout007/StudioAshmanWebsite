import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS, getProject, getAdjacentProjects } from '@/data/projects'
import NavProject from '@/components/NavProject'
import FooterProject from '@/components/FooterProject'
import ProjectHero from '@/components/project/ProjectHero'
import ProjectGallery from '@/components/project/ProjectGallery'
import ProjectPageNav from '@/components/project/ProjectPageNav'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title} — Ashman Studio`
  const description =
    project.description ??
    `${project.category}${project.location ? ` · ${project.location}` : ''}${project.year ? ` · ${project.year}` : ''} — Ashman Studio`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(project.hero.src ? { images: [{ url: project.hero.src, alt: project.hero.alt }] } : {}),
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <>
      <NavProject />

      <main className="proj-detail proj-entrance">
        {/* ── HEADER ── */}
        <header className="proj-detail-header ash-wrap">
          <div role="navigation" aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/?section=work" className="breadcrumb-link">Work</Link>
            <span className="sep">/</span>
            <span className="current">{project.title}</span>
          </div>

          <div className="proj-detail-header-inner">
            <div className="proj-detail-meta">
              <div className="ash-eyebrow">
                <span className="dash" />
                {project.number} — {project.category}
              </div>
              {project.status === 'proposal' && (
                <span className="proj-status-badge">Proposal</span>
              )}
            </div>

            <h1 className="proj-detail-title">{project.title}</h1>

            {(project.location || project.year) && (
              <p className="proj-detail-location">
                {[project.location, project.year].filter(Boolean).join(' · ')}
              </p>
            )}

            {project.introduction && (
              <p className="proj-detail-intro">{project.introduction}</p>
            )}
          </div>
        </header>

        {/* ── HERO ── */}
        <ProjectHero image={project.hero} />

        {/* ── OVERVIEW ── */}
        {(project.client || project.location || project.year || project.description || project.scope) && (
          <section className="proj-detail-overview ash-wrap">
            <div className="proj-overview-left">
              <dl className="proj-overview-dl">
                {project.client && (
                  <>
                    <dt>Client</dt>
                    <dd>{project.client}</dd>
                  </>
                )}
                {project.location && (
                  <>
                    <dt>Location</dt>
                    <dd>{project.location}</dd>
                  </>
                )}
                {project.year && (
                  <>
                    <dt>Year</dt>
                    <dd>{project.year}</dd>
                  </>
                )}
                <dt>Status</dt>
                <dd className={project.status === 'proposal' ? 'proj-status-proposal' : ''}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </dd>
              </dl>

              {project.role && (
                <div className="proj-overview-role">
                  <div className="proj-overview-label">Role</div>
                  <p>{project.role}</p>
                </div>
              )}

              {project.scope && project.scope.length > 0 && (
                <div className="proj-overview-scope">
                  <div className="proj-overview-label">Scope</div>
                  <ul>
                    {project.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="proj-overview-right">
              {project.description && (
                <p className="proj-overview-desc">{project.description}</p>
              )}
            </div>
          </section>
        )}

        {/* ── SECTIONS ── */}
        {project.sections?.map((section, i) => (
          <section key={i} className="proj-detail-section">
            {(section.eyebrow || section.title) && (
              <div className="ash-wrap proj-section-head">
                {section.eyebrow && (
                  <div className="ash-eyebrow muted">
                    <span className="dash" />
                    {section.eyebrow}
                  </div>
                )}
                {section.title && (
                  <h2 className="proj-section-title">{section.title}</h2>
                )}
              </div>
            )}
            {section.text && (
              <div className="ash-wrap">
                <p className="proj-section-text">{section.text}</p>
              </div>
            )}
            {section.images && section.images.length > 0 && (
              <div className={`proj-section-images proj-section-images--${section.layout ?? 'full'}`}>
                {section.images.map((img, j) => {
                  const isDocument = img.type === 'diagram' || img.type === 'process'
                  return (
                    <div key={j} className="proj-section-img-wrap">
                      {img.src && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
                          style={{ objectFit: isDocument ? 'contain' : 'cover' }}
                        />
                      )}
                      {img.caption && (
                        <figcaption className="proj-img-caption">{img.caption}</figcaption>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        ))}

        {/* ── GALLERY ── */}
        {project.images.length > 0 && (
          <ProjectGallery images={project.images} />
        )}

        {/* ── PROJECT NAV ── */}
        <ProjectPageNav prev={prev} next={next} />
      </main>

      <FooterProject />
    </>
  )
}
