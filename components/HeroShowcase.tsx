'use client'
import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProject, orderedProjects } from '@/data/projects'
import { SERVICES, type ServiceSlug } from '@/lib/site'

type Filter = ServiceSlug | 'all'

// Hero art and caption for the carousel, in display order. Projects without an entry follow,
// using their own hero image and one-liner.
const ART = [
  {
    slug: 'bollywood-kabab', alt: 'Bollywood Kabab facade signage at dusk, Greater Noida',
    line: 'Cinema-inspired identity and facade signage for a kebab restaurant in Greater Noida.',
    src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg', position: '60% 40%',
  },
  {
    slug: 'central-square', alt: 'Aerial view of the Central Square commercial complex, North Delhi',
    line: 'A cube-based signage and wayfinding system for three plazas in North Delhi.',
    src: '/projects/central-square/central-square-hero.jpg', position: '60% 55%',
  },
  {
    slug: 'kaamya-greens', alt: 'Aerial render of the Kaamya Greens residential towers, Greater Noida',
    line: 'A brass-and-grey signage system for a residential development in Greater Noida.',
    src: '/projects/kaamya-greens/kaamya-hero.jpg', position: '50% 50%',
  },
  {
    slug: 'mall-of-expressway', alt: 'Render of the Mall of Expressway building, Greater Noida',
    line: 'One brass-and-grey sign system for a retail mall and studio apartments in Greater Noida.',
    src: '/projects/mall-of-expressway/mall-banner.jpg', position: '50% 55%',
  },
  {
    slug: 'artnest-studio', alt: 'ArtNest Studio wordmark surrounded by its bird mascot',
    line: 'A mascot-led brand identity for a community art studio in Faridabad.',
    src: '/projects/artnest/artnest-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'regency-hospital', alt: 'Night elevation of Regency Kanpur Hospital with its illuminated sign and emergency signage',
    line: 'A bilingual signage and wayfinding concept for a hospital campus in Kanpur.',
    src: '/projects/regency/regency-hero.jpg', position: '50% 20%',
  },
  {
    slug: 'swetafilms', alt: 'Sweta Films wordmark over a black and white studio photograph',
    line: 'A bold red identity for a photography and visual storytelling practice in Dubai.',
    src: '/projects/swetafilms/swetafilms-cover.jpg', position: '50% 45%',
  },
  {
    slug: 'intiva', alt: 'Intiva foaming wash bottle among botanicals',
    line: 'Brand identity, label and carton for a foaming intimate wash.',
    src: '/projects/intiva/intiva-cover.jpg', position: '50% 50%',
  },
  {
    slug: 'delhigrapher', alt: 'Delhigrapher wordmark beside a black and white wedding photograph',
    line: 'A handwritten identity for a wedding photography practice in New Delhi.',
    src: '/delhigrapher/delhigrapher-cover.jpg', position: '40% 40%',
  },
]

const SLIDES = [
  ...ART.map((a) => a.slug),
  ...orderedProjects().map((p) => p.slug).filter((slug) => !ART.some((a) => a.slug === slug)),
].flatMap((slug) => {
  const p = getProject(slug)
  if (!p) return []
  const art = ART.find((a) => a.slug === slug)
  const src = art?.src ?? p.hero.src
  if (!src) return []
  return [{
    slug, title: p.title, services: p.services, src,
    alt: art?.alt ?? p.hero.alt,
    position: art?.position ?? p.hero.position ?? '50% 50%',
    line: art?.line ?? p.discipline ?? '',
  }]
})

const slidesFor = (f: Filter) =>
  SLIDES.flatMap((s, i) => (f === 'all' || s.services.includes(f) ? [i] : []))

// Services with no projects are left out of both the rotation and the menu.
const ROTATION = SERVICES.filter((s) => slidesFor(s.slug).length > 0)
const OPTIONS: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'All work', count: SLIDES.length },
  ...ROTATION.map((s) => ({ value: s.slug, label: s.name, count: slidesFor(s.slug).length })),
]
const labelOf = (f: Filter) => OPTIONS.find((o) => o.value === f)?.label ?? 'All work'

const INTERVAL = 4000

export default function HeroShowcase() {
  const [filter, setFilter] = useState<Filter>(ROTATION[0]?.slug ?? 'all')
  const [pos, setPos] = useState(0)
  const [chosen, setChosen] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeOpt, setActiveOpt] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [idle, setIdle] = useState(false)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const [announcement, setAnnouncement] = useState('')
  const visits = useRef<Partial<Record<ServiceSlug, number>>>(ROTATION[0] ? { [ROTATION[0].slug]: 0 } : {})
  const chosenRef = useRef(false)
  chosenRef.current = chosen
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const uid = useId()

  const list = slidesFor(filter)
  const current = list[Math.min(pos, list.length - 1)] ?? 0
  const slide = SLIDES[current]
  const rotating = !chosen && !reduceMotion && ROTATION.length > 1
  const held = !rotating || userPaused || hovering || focusInside || open || !idle

  const nextService = () => {
    const i = ROTATION.findIndex((s) => s.slug === filter)
    return ROTATION[(i + 1) % ROTATION.length].slug
  }
  // Next unseen project for a service, skipping the one already on screen (some projects carry several services)
  const nextVisit = (s: ServiceSlug) => {
    const l = slidesFor(s)
    const v = ((visits.current[s] ?? -1) + 1) % l.length
    return l.length > 1 && l[v] === current ? (v + 1) % l.length : v
  }

  // Start rotating only once the page has settled, so the first image paints fast
  useEffect(() => {
    const onLoad = () => setTimeout(() => setIdle(true), 1500)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = (reduce: boolean) => {
      setReduceMotion(reduce)
      if (reduce) setFilter((f) => (chosenRef.current ? f : 'all'))
    }
    apply(mq.matches)
    const onChange = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  // Each turn moves to the next service and shows its next project
  useEffect(() => {
    if (held) return
    const id = window.setTimeout(() => {
      const s = nextService()
      const v = nextVisit(s)
      visits.current[s] = v
      setFilter(s)
      setPos(v)
    }, INTERVAL)
    return () => window.clearTimeout(id)
  }, [held, filter, pos]) // eslint-disable-line react-hooks/exhaustive-deps

  // Mount images just ahead of need: neighbours in this list and the next rotation stop
  useEffect(() => {
    if (!idle) return
    const wanted = [current, list[(pos + 1) % list.length], list[(pos - 1 + list.length) % list.length]]
    if (rotating) {
      const s = nextService()
      wanted.push(slidesFor(s)[nextVisit(s)])
    }
    setLoaded((prev) => (wanted.every((i) => prev.has(i)) ? prev : new Set([...Array.from(prev), ...wanted])))
  }, [idle, filter, pos, rotating]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) listRef.current?.focus()
  }, [open])

  const go = (delta: number) => setPos((p) => (Math.min(p, list.length - 1) + delta + list.length) % list.length)

  const choose = (value: Filter) => {
    const count = slidesFor(value).length
    setFilter(value)
    setPos(0)
    setChosen(true)
    setOpen(false)
    setAnnouncement(value === 'all' ? `Showing all ${count} projects` : `Showing ${count} ${labelOf(value)} projects`)
    triggerRef.current?.focus()
  }

  const openMenu = () => {
    setActiveOpt(Math.max(0, OPTIONS.findIndex((o) => o.value === filter)))
    setOpen(true)
  }

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      openMenu()
    }
  }

  const onListKey = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    const last = OPTIONS.length - 1
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActiveOpt((i) => Math.min(i + 1, last)); break
      case 'ArrowUp': e.preventDefault(); setActiveOpt((i) => Math.max(i - 1, 0)); break
      case 'Home': e.preventDefault(); setActiveOpt(0); break
      case 'End': e.preventDefault(); setActiveOpt(last); break
      case 'Enter': case ' ': e.preventDefault(); choose(OPTIONS[activeOpt].value); break
      case 'Escape': e.preventDefault(); setOpen(false); triggerRef.current?.focus(); break
      case 'Tab': setOpen(false); break
    }
  }

  const touchX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touchX.current = null
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const listId = `${uid}-services`
  const optId = (i: number) => `${uid}-opt-${i}`

  return (
    <section
      className="showcase"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovering(true) }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovering(false) }}
      // Only keyboard focus holds the rotation (a mouse click leaves focus behind on a button),
      // and not on the pause control itself, so pressing Play takes effect at once
      onFocus={(e) => setFocusInside(e.target.matches(':focus-visible') && !e.target.matches('.showcase-rotate'))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusInside(false) }}
      onKeyDown={onKey}
    >
      <div className="showcase-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {SLIDES.map((s, i) => {
          const isActive = i === current
          return (
            <Link
              key={s.slug}
              href={`/work/${s.slug}`}
              className={`showcase-slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              {loaded.has(i) && <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: s.position }}
              />}
            </Link>
          )
        })}

        <div className="showcase-shade" aria-hidden="true" />

        <div className={`showcase-ui${open ? ' is-open' : ''}`}>
          <div
            className="showcase-switch"
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false) }}
          >
            <div className="showcase-chip">
              <span id={`${uid}-lead`} className="showcase-chip-lead">We build</span>
              <button
                ref={triggerRef}
                type="button"
                className="showcase-trigger"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-labelledby={`${uid}-lead ${uid}-value`}
                onClick={() => (open ? setOpen(false) : openMenu())}
                onKeyDown={onTriggerKey}
              >
                <span className="showcase-trigger-text">
                  {/* Every label is stacked in one cell, so the chip is as wide as the longest and never jumps */}
                  {OPTIONS.map((o) => (
                    <span
                      key={o.value}
                      id={o.value === filter ? `${uid}-value` : undefined}
                      className={o.value === filter ? 'is-current' : undefined}
                      aria-hidden={o.value === filter ? undefined : true}
                    >
                      {o.label}
                    </span>
                  ))}
                </span>
                <span className="showcase-caret" aria-hidden="true">▾</span>
              </button>
              {rotating && (
                <button
                  type="button"
                  className="showcase-rotate"
                  aria-label={userPaused ? 'Play service rotation' : 'Pause service rotation'}
                  onClick={() => setUserPaused((p) => !p)}
                >
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">
                    {userPaused
                      ? <path fill="currentColor" d="M2.5 1.5v9l8-4.5z" />
                      : <path fill="currentColor" d="M2 1.5h3v9H2zM7 1.5h3v9H7z" />}
                  </svg>
                </button>
              )}
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={-1}
              hidden={!open}
              aria-label="Show projects for"
              aria-activedescendant={open ? optId(activeOpt) : undefined}
              className="showcase-options"
              onKeyDown={onListKey}
            >
              {OPTIONS.map((o, i) => (
                <li
                  key={o.value}
                  id={optId(i)}
                  role="option"
                  aria-selected={o.value === filter}
                  className={i === activeOpt ? 'is-active' : undefined}
                  onClick={() => choose(o.value)}
                  onPointerMove={() => setActiveOpt(i)}
                >
                  <span>{o.label}</span>
                  <span className="showcase-option-count">({o.count})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="showcase-caption">
            <Link href={`/work/${slide.slug}`} className="showcase-title">{slide.title}</Link>
            <p key={`l-${current}`} className="showcase-line">{slide.line}</p>
            <Link href={filter === 'all' ? '/work' : `/work?service=${filter}`} className="showcase-all">
              {filter === 'all' ? 'View all brand stories' : `View all ${labelOf(filter)} stories`} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{announcement}</p>

        <button type="button" className="showcase-arrow showcase-prev" aria-label="Previous project" onClick={() => go(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" className="showcase-arrow showcase-next" aria-label="Next project" onClick={() => go(1)}>
          <span aria-hidden="true">→</span>
        </button>

        <p className="showcase-count">
          <span className="sr-only">Project </span>{list.indexOf(current) + 1} / {list.length}
        </p>
        <div className="showcase-dots" role="group" aria-label="Choose a project">
          {list.map((i, n) => (
            <button
              key={SLIDES[i].slug}
              type="button"
              aria-current={i === current ? 'true' : undefined}
              aria-label={`Show ${SLIDES[i].title}`}
              className={`showcase-dot${i === current ? ' is-active' : ''}`}
              onClick={() => setPos(n)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
