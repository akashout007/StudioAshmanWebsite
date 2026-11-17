'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
    slug: 'kaamya-greens', what: 'wayfinding', who: 'residences',
    line: 'A brass-and-grey signage system for a residential development in Greater Noida.',
    src: '/projects/kaamya-greens/kaamya-hero.jpg', position: '50% 50%',
  },
  {
    slug: 'mall-of-expressway', what: 'wayfinding', who: 'malls',
    line: 'One brass-and-grey sign system for a retail mall and studio apartments in Greater Noida.',
    src: '/projects/mall-of-expressway/mall-hero.jpg', position: '50% 35%',
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

function WordSlot({ word, delay = 0 }: { word: string; delay?: number }) {
  const [words, setWords] = useState({ cur: word, prev: null as string | null, n: 0 })
  const [width, setWidth] = useState<number>()
  const measureRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setWords((w) => (w.cur === word ? w : { cur: word, prev: w.cur, n: w.n + 1 }))
  }, [word])

  useLayoutEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.offsetWidth)
  }, [words.cur])

  return (
    <span className="slot" style={{ width, transitionDelay: `${delay}ms` }}>
      <span ref={measureRef} className="slot-measure" aria-hidden="true">{words.cur}</span>
      {words.prev && (
        <span key={`out-${words.n}`} className="slot-word slot-out" style={{ animationDelay: `${delay}ms` }} aria-hidden="true">
          {words.prev}
        </span>
      )}
      <span key={`in-${words.n}`} className={`slot-word${words.n ? ' slot-in' : ''}`} style={{ animationDelay: `${delay}ms` }}>
        {words.cur}
      </span>
    </span>
  )
}

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

  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1))
    touchX.current = null
  }

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
      <div className="showcase-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
          We design <WordSlot word={current.what} /> for <WordSlot word={current.who} delay={120} />
        </p>

        <button type="button" className="showcase-arrow showcase-prev" aria-label="Previous project" onClick={() => go(active - 1)}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="showcase-arrow showcase-next" aria-label="Next project" onClick={() => go(active + 1)}>
          <span aria-hidden="true">→</span>
        </button>

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
