import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  Cover?: ComponentType
  aspectRatio?: string
}

export default function ProjectCard({ project, Cover, aspectRatio = '4/3' }: Props) {
  const sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw'

  return (
    <Link href={`/work/${project.slug}`} className="proj-card proj-card-link">
      <div className="proj-img">
        <div className="proj-img-inner" style={{ aspectRatio }}>
          {project.hero.src ? (
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              fill
              sizes={sizes}
              style={{ objectFit: 'cover', objectPosition: project.hero.position }}
            />
          ) : Cover ? (
            <Cover />
          ) : (
            <div className="proj-card-placeholder" />
          )}
          {!project.hasCaseStudy && (
            <div className="proj-dev-badge" aria-label="Case study in development">
              <span>Case Study in Development</span>
            </div>
          )}
        </div>
      </div>
      <div className="proj-info">
        <div className="proj-cat">{project.number} — {project.category}</div>
        <div className="proj-title">{project.title}</div>
        <div className="proj-sub">
          {[project.location, project.year].filter(Boolean).join(' · ')}
          {project.discipline && !project.location && !project.year && (
            <span className="proj-discipline">{project.discipline}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
