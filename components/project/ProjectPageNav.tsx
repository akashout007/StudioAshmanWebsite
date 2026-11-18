import Link from 'next/link'
import type { Project } from '@/data/projects'

interface Props {
  prev: Project | null
  next: Project | null
}

export default function ProjectPageNav({ prev, next }: Props) {
  return (
    <div role="navigation" className="proj-page-nav" aria-label="Project navigation">
      <div className="ash-wrap proj-page-nav-inner">
        <Link href="/work" className="proj-page-nav-back">
          ← Back to work
        </Link>

        {(prev || next) && (
          <div className="proj-page-nav-links">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="proj-page-nav-item proj-page-nav-prev">
                <span className="proj-page-nav-dir">← Previous</span>
                <span className="proj-page-nav-num">{prev.number}</span>
                <span className="proj-page-nav-name">{prev.title}</span>
                <span className="proj-page-nav-cat">{prev.category}</span>
              </Link>
            ) : <div />}

            {next ? (
              <Link href={`/work/${next.slug}`} className="proj-page-nav-item proj-page-nav-next">
                <span className="proj-page-nav-dir">Next →</span>
                <span className="proj-page-nav-num">{next.number}</span>
                <span className="proj-page-nav-name">{next.title}</span>
                <span className="proj-page-nav-cat">{next.category}</span>
              </Link>
            ) : <div />}
          </div>
        )}
      </div>
    </div>
  )
}
