import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { STATUS_LABEL, filled, type Project } from '@/data/projects'
import { serviceBySlug } from '@/lib/site'

interface Props {
  project: Project
  Cover?: ComponentType
  aspectRatio?: string
  sizes?: string
  priority?: boolean
}

export function projectMeta(project: Project) {
  return [project.location, project.year].filter(filled).join(' · ')
}

export default function ProjectCard({
  project,
  Cover,
  aspectRatio = '4/3',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  priority = false,
}: Props) {
  const services = project.services.map((s) => serviceBySlug(s)?.short).filter(Boolean).join(' · ')
  const hook = [project.hook, project.discipline].find(filled)
  const meta = projectMeta(project)

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
              priority={priority}
              style={{ objectFit: 'cover', objectPosition: project.hero.position }}
            />
          ) : Cover ? (
            <Cover />
          ) : (
            <div className="proj-card-placeholder" />
          )}
          {project.status !== 'built' && (
            <span className={`proj-status-chip status-${project.status}`}>{STATUS_LABEL[project.status]}</span>
          )}
        </div>
      </div>
      <div className="proj-info">
        <div className="proj-cat">{services}</div>
        <h3 className="proj-title">{project.title}</h3>
        {hook && <p className="proj-hook">{hook}</p>}
        {meta && <div className="proj-sub">{meta}</div>}
      </div>
    </Link>
  )
}
