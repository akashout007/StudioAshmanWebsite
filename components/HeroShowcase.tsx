'use client'
import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  getProject, matchesFilters, orderedProjects, workHref,
  type Project, type SectorFilter, type ServiceFilter,
} from '@/data/projects'
import { SECTORS, SERVICES, type SectorSlug, type ServiceSlug } from '@/lib/site'

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
    slug, project: p as Project, title: p.title, src,
    alt: art?.alt ?? p.hero.alt,
    position: art?.position ?? p.hero.position ?? '50% 50%',
    line: art?.line ?? p.discipline ?? '',
  }]
})

const slidesFor = (service: ServiceFilter, sector: SectorFilter) =>
  SLIDES.flatMap((s, i) => (matchesFilters(s.project, service, sector) ? [i] : []))

type Pair = { service: ServiceSlug; sector: SectorSlug }
// Rotation starts from the lead built project (the first slide) under its primary service and sector,
// then walks every service + sector pair that has at least one project. Empty pairs never appear.
const LEAD = SLIDES[0].project
const ALL_PAIRS: Pair[] = SERVICES.flatMap((sv) => SECTORS.map((sc) => ({ service: sv.slug, sector: sc.slug })))
  .filter((p) => slidesFor(p.service, p.sector).length > 0)
const LEAD_INDEX = Math.max(0, ALL_PAIRS.findIndex((p) => p.service === LEAD.services[0] && p.sector === LEAD.sectors[0]))
const PAIRS = [...ALL_PAIRS.slice(LEAD_INDEX), ...ALL_PAIRS.slice(0, LEAD_INDEX)]
const pairKey = (p: Pair) => `${p.service}|${p.sector}`

const SERVICE_OPTIONS = [
  { value: 'all' as ServiceFilter, name: 'Everything', chip: 'Everything' },
  ...SERVICES.map((s) => ({ value: s.slug as ServiceFilter, name: s.name, chip: s.chip })),
]
const SECTOR_OPTIONS = [
  { value: 'all' as SectorFilter, name: 'Every sector', chip: 'Every sector' },
  ...SECTORS.map((s) => ({ value: s.slug as SectorFilter, name: s.name, chip: s.name })),
]

/** "Showing 2 Wayfinding projects for hospitals." Spoken only after a visitor's own choice. */
function describe(n: number, service: ServiceFilter, sector: SectorFilter) {
  const sv = service === 'all' ? '' : `${SERVICE_OPTIONS.find((o) => o.value === service)?.chip} `
  const sc = sector === 'all' ? '' : ` for ${SECTOR_OPTIONS.find((o) => o.value === sector)?.name.toLowerCase()}`
  const all = service === 'all' && sector === 'all' ? 'all ' : ''
  return `Showing ${all}${n} ${sv}project${n === 1 ? '' : 's'}${sc}.`
}

const INTERVAL = 4000

type Option<T> = { value: T; name: string; chip: string; count: number }

/** One dropdown in the hero sentence: a button that opens a listbox (a bottom sheet on phones). */
function ChipSelect<T extends string>({ id, kind, options, value, open, onOpen, onClose, onChoose, align }: {
  id: string
  kind: 'Service' | 'Sector'
  options: Option<T>[]
  value: T
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChoose: (v: T) => void
  align: 'left' | 'right'
}) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const current = options.find((o) => o.value === value) ?? options[0]
  const enabled = (i: number) => options[i].count > 0

  useEffect(() => {
    if (!open) return
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    listRef.current?.focus()
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const step = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < options.length; i += dir) if (enabled(i)) return i
    return from
  }
  const close = () => { onClose(); triggerRef.current?.focus() }
  const choose = (i: number) => {
    if (!enabled(i)) return
    onChoose(options[i].value)
    triggerRef.current?.focus()
  }

  const onListKey = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); setActive((i) => step(i, 1)); break
      case 'ArrowUp': e.preventDefault(); setActive((i) => step(i, -1)); break
      case 'Home': e.preventDefault(); setActive(step(-1, 1)); break
      case 'End': e.preventDefault(); setActive(step(options.length, -1)); break
      case 'Enter': case ' ': e.preventDefault(); choose(active); break
      case 'Escape': e.preventDefault(); close(); break
      case 'Tab': onClose(); break
    }
  }

  return (
    <span
      className={`chip-select chip-select-${align}`}
      onBlur={(e) => { if (open && !e.currentTarget.contains(e.relatedTarget as Node)) onClose() }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="chip-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${kind}: ${current.name}`}
        onClick={() => (open ? onClose() : onOpen())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); onOpen() }
        }}
      >
        {/* Every label is stacked in one cell, so the trigger is as wide as its longest label and never
            jumps; each carries its own caret so the ▾ always sits right after the word */}
        <span className="chip-trigger-text" aria-hidden="true">
          {options.map((o) => (
            <span key={o.value} className={o.value === value ? 'is-current' : undefined}>
              {o.chip}<span className="chip-caret">▾</span>
            </span>
          ))}
        </span>
      </button>

      <span className="chip-menu" hidden={!open}>
        <span className="chip-sheet-title" id={`${id}-title`}>{kind}</span>
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-title`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          onKeyDown={onListKey}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={o.value === value}
              aria-disabled={o.count === 0 || undefined}
              className={i === active ? 'is-active' : undefined}
              onClick={() => choose(i)}
              onPointerMove={() => { if (enabled(i)) setActive(i) }}
            >
              <span className="chip-check" aria-hidden="true">{o.value === value ? '✓' : ''}</span>
              <span className="chip-option-name">{o.name}</span>
              <span className="chip-option-count">({o.count})</span>
            </li>
          ))}
        </ul>
      </span>
    </span>
  )
}

export default function HeroShowcase() {
  const [service, setService] = useState<ServiceFilter>(PAIRS[0]?.service ?? 'all')
  const [sector, setSector] = useState<SectorFilter>(PAIRS[0]?.sector ?? 'all')
  const [pos, setPos] = useState(0)
  const [chosen, setChosen] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const [menu, setMenu] = useState<'service' | 'sector' | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [idle, setIdle] = useState(false)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const [announcement, setAnnouncement] = useState('')
  const visits = useRef<Record<string, number>>(PAIRS[0] ? { [pairKey(PAIRS[0])]: 0 } : {})
  const pairIndex = useRef(0)
  const chosenRef = useRef(false)
  chosenRef.current = chosen
  const uid = useId()

  const list = slidesFor(service, sector)
  const current = list[Math.min(pos, list.length - 1)] ?? 0
  const slide = SLIDES[current]
  const rotating = !chosen && !reduceMotion && PAIRS.length > 1
  const held = !rotating || userPaused || hovering || focusInside || menu !== null || !idle

  // Next unseen project for a pair, skipping the one already on screen
  const nextVisit = (p: Pair) => {
    const l = slidesFor(p.service, p.sector)
    const v = ((visits.current[pairKey(p)] ?? -1) + 1) % l.length
    return l.length > 1 && l[v] === current ? (v + 1) % l.length : v
  }
  const nextPair = () => PAIRS[(pairIndex.current + 1) % PAIRS.length]

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
      if (reduce && !chosenRef.current) {
        setService('all')
        setSector('all')
        setPos(0)
      }
    }
    apply(mq.matches)
    const onChange = (e: MediaQueryListEvent) => apply(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (held) return
    const id = window.setTimeout(() => {
      const p = nextPair()
      const v = nextVisit(p)
      pairIndex.current = (pairIndex.current + 1) % PAIRS.length
      visits.current[pairKey(p)] = v
      setService(p.service)
      setSector(p.sector)
      setPos(v)
    }, INTERVAL)
    return () => window.clearTimeout(id)
  }, [held, service, sector, pos]) // eslint-disable-line react-hooks/exhaustive-deps

  // Mount images just ahead of need: neighbours in this set and the next rotation stop
  useEffect(() => {
    if (!idle) return
    const wanted = [current, list[(pos + 1) % list.length], list[(pos - 1 + list.length) % list.length]]
    if (rotating) {
      const p = nextPair()
      wanted.push(slidesFor(p.service, p.sector)[nextVisit(p)])
    }
    setLoaded((prev) => (wanted.every((i) => prev.has(i)) ? prev : new Set([...Array.from(prev), ...wanted])))
  }, [idle, service, sector, pos, rotating]) // eslint-disable-line react-hooks/exhaustive-deps

  const go = (delta: number) => setPos((p) => (Math.min(p, list.length - 1) + delta + list.length) % list.length)

  const choose = (nextService: ServiceFilter, nextSector: SectorFilter) => {
    setService(nextService)
    setSector(nextSector)
    setPos(0)
    setChosen(true)
    setMenu(null)
    setAnnouncement(describe(slidesFor(nextService, nextSector).length, nextService, nextSector))
  }

  const serviceOptions: Option<ServiceFilter>[] = SERVICE_OPTIONS.map((o) => ({ ...o, count: slidesFor(o.value, sector).length }))
  const sectorOptions: Option<SectorFilter>[] = SECTOR_OPTIONS.map((o) => ({ ...o, count: slidesFor(service, o.value).length }))

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

        <div className={`showcase-ui${menu ? ' is-open' : ''}`}>
          <div className="showcase-switch">
            <div className="showcase-chip">
              <div className="chip-sentence">
                <span className="chip-line">
                  <span className="chip-word">We design</span>
                  <ChipSelect
                    id={`${uid}-service`} kind="Service" align="left"
                    options={serviceOptions} value={service}
                    open={menu === 'service'} onOpen={() => setMenu('service')} onClose={() => setMenu(null)}
                    onChoose={(v) => choose(v, sector)}
                  />
                </span>
                <span className="chip-line">
                  <span className="chip-word">for</span>
                  <ChipSelect
                    id={`${uid}-sector`} kind="Sector" align="right"
                    options={sectorOptions} value={sector}
                    open={menu === 'sector'} onOpen={() => setMenu('sector')} onClose={() => setMenu(null)}
                    onChoose={(v) => choose(service, v)}
                  />
                </span>
              </div>
              {rotating && (
                <button
                  type="button"
                  className="showcase-rotate"
                  aria-label={userPaused ? 'Play rotation' : 'Pause rotation'}
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
          </div>

          <div className="showcase-caption">
            <Link href={`/work/${slide.slug}`} className="showcase-title">{slide.title}</Link>
            <p key={`l-${current}`} className="showcase-line">{slide.line}</p>
            <Link href={workHref(service, sector)} className="showcase-all">
              View {list.length} {list.length === 1 ? 'story' : 'stories'} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Tapping outside an open bottom sheet closes it (phones only; hidden by CSS elsewhere) */}
        {menu && <div className="chip-backdrop" aria-hidden="true" onClick={() => setMenu(null)} />}

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
