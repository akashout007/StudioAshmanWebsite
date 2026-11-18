'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProject } from '@/data/projects'

const SLIDES = [
  {
    slug: 'bollywood-kabab', alt: 'Bollywood Kabab facade signage at dusk, Greater Noida', what: 'signage', who: 'restaurants',
    line: 'Cinema-inspired identity and facade signage for a kebab restaurant in Greater Noida.',
    src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg', position: '60% 40%',
  },
  {
    slug: 'central-square', alt: 'Aerial view of the Central Square commercial complex, North Delhi', what: 'wayfinding', who: 'commercial complexes',
    line: 'A cube-based signage and wayfinding system for three plazas in North Delhi.',
    src: '/projects/central-square/central-square-hero.jpg', position: '60% 55%',
  },
  {
    slug: 'kaamya-greens', alt: 'Aerial render of the Kaamya Greens residential towers, Greater Noida', what: 'wayfinding', who: 'residences',
    line: 'A brass-and-grey signage system for a residential development in Greater Noida.',
    src: '/projects/kaamya-greens/kaamya-hero.jpg', position: '50% 50%',
  },
  {
    slug: 'mall-of-expressway', alt: 'Render of the Mall of Expressway building, Greater Noida', what: 'wayfinding', who: 'malls',
    line: 'One brass-and-grey sign system for a retail mall and studio apartments in Greater Noida.',
    src: '/projects/mall-of-expressway/mall-banner.jpg', position: '50% 55%',
  },
  {
    slug: 'artnest-studio', alt: 'ArtNest Studio wordmark surrounded by its bird mascot', what: 'identities', who: 'art studios',
    line: 'A mascot-led brand identity for a community art studio in Faridabad.',
    src: '/projects/artnest/artnest-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'regency-hospital', alt: 'Night elevation of Regency Kanpur Hospital with its illuminated sign and emergency signage', what: 'wayfinding', who: 'hospitals',
    line: 'A bilingual signage and wayfinding concept for a hospital campus in Kanpur.',
    src: '/projects/regency/regency-hero.jpg', position: '50% 20%',
  },
  {
    slug: 'swetafilms', alt: 'Sweta Films wordmark over a black and white studio photograph', what: 'identities', who: 'film studios',
    line: 'A bold red identity for a photography and visual storytelling practice in Dubai.',
    src: '/projects/swetafilms/swetafilms-cover.jpg', position: '50% 45%',
  },
  {
    slug: 'intiva', alt: 'Intiva foaming wash bottle among botanicals', what: 'packaging', who: 'skincare',
    line: 'Brand identity, label and carton for a foaming intimate wash.',
    src: '/projects/intiva/intiva-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'delhigrapher', alt: 'Delhigrapher wordmark beside a black and white wedding photograph', what: 'identities', who: 'photographers',
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
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: s.position }}
              />
            </Link>
          )
        })}

        <div className="showcase-shade" aria-hidden="true" />

        <p className="sr-only">
          We design {Array.from(new Set(SLIDES.map((sl) => sl.what))).join(', ')} for{' '}
          {Array.from(new Set(SLIDES.map((sl) => sl.who))).join(', ')}.
        </p>
        <p className="showcase-pill" aria-hidden="true">
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

        <p className="showcase-count" aria-live="polite">
          <span className="sr-only">Slide </span>{active + 1} / {SLIDES.length}
        </p>
        <div className="showcase-dots" role="group" aria-label="Choose a slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              aria-current={i === active ? 'true' : undefined}
              aria-label={`Go to slide ${i + 1}`}
              className={`showcase-dot${i === active ? ' is-active' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
