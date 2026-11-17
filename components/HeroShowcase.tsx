'use client'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProject } from '@/data/projects'

const SLIDES = [
  {
    slug: 'bollywood-kabab', what: 'signage', who: 'restaurants',
    line: 'Cinema-inspired identity and facade signage for a kebab restaurant in Greater Noida.',
    src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg', position: '60% 40%',
  },
  {
    slug: 'central-square', what: 'wayfinding', who: 'commercial complexes',
    line: 'A cube-based signage and wayfinding system for three plazas in North Delhi.',
    src: '/projects/central-square/central-square-hero.jpg', position: '60% 55%',
  },
  {
    slug: 'artnest-studio', what: 'identities', who: 'art studios',
    line: 'A mascot-led brand identity for a community art studio in Faridabad.',
    src: '/projects/artnest/artnest-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'regency-hospital', what: 'wayfinding', who: 'hospitals',
    line: 'A bilingual signage and wayfinding concept for a hospital campus in Kanpur.',
    src: '/projects/regency/regency-hero.jpg', position: '50% 20%',
  },
  {
    slug: 'swetafilms', what: 'identities', who: 'film studios',
    line: 'A bold red identity for a photography and visual storytelling practice in Dubai.',
    src: '/projects/swetafilms/swetafilms-cover.jpg', position: '50% 45%',
  },
  {
    slug: 'intiva', what: 'packaging', who: 'skincare',
    line: 'Brand identity, label and carton for a foaming intimate wash.',
    src: '/projects/intiva/intiva-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'delhigrapher', what: 'identities', who: 'photographers',
    line: 'A handwritten identity for a wedding photography practice in New Delhi.',
    src: '/delhigrapher/delhigrapher-cover.jpg', position: '40% 40%',
  },
]

const INTERVAL = 5500

export default function HeroShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL)
    return () => window.clearTimeout(id)
  }, [active, paused, reduceMotion])

  const go = useCallback((i: number) => setActive((i + SLIDES.length) % SLIDES.length), [])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(active + 1)
    if (e.key === 'ArrowLeft') go(active - 1)
  }

  const current = SLIDES[active]

  return (
    <section
      className="showcase"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
    >
      <div className="showcase-stage">
        {SLIDES.map((s, i) => {
          const project = getProject(s.slug)
          if (!project) return null
          const isActive = i === active
          return (
            <Link
              key={s.slug}
              href={`/work/${s.slug}`}
              className={`showcase-slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${project.title} — view project`}
            >
              <Image
                src={s.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: s.position }}
              />
            </Link>
          )
        })}

        <div className="showcase-shade" aria-hidden="true" />

        <p className="showcase-pill" aria-live="polite">
          We design{' '}
          <span key={`w-${active}`} className="showcase-word">{current.what}</span>
          {' '}for{' '}
          <span key={`p-${active}`} className="showcase-word">{current.who}</span>
        </p>

        <div className="showcase-caption">
          <Link href={`/work/${current.slug}`} className="showcase-title">
            {getProject(current.slug)?.title}
          </Link>
          <p key={`l-${active}`} className="showcase-line">{current.line}</p>
        </div>

        <div className="showcase-dots" role="tablist" aria-label="Choose project">
          {SLIDES.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={getProject(s.slug)?.title}
              className={`showcase-dot${i === active ? ' is-active' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
