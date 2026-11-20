'use client'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  getProject, matchesFilters, orderedProjects, primarySectorOf, primaryServiceOf,
  type Project, type SectorFilter, type ServiceFilter,
} from '@/data/projects'
import { SECTORS, SERVICES, type SectorSlug, type ServiceSlug } from '@/lib/site'

// Hero art and caption for the carousel, in display order. Projects without an entry follow,
// using their own hero image and one-liner. Focal points live on the project (`focal`).
const ART = [
  { slug: 'bollywood-kabab', alt: 'Bollywood Kabab facade signage at dusk, Greater Noida', line: 'Cinema-inspired identity and facade signage for a kebab restaurant in Greater Noida.', src: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg' },
  { slug: 'central-square', alt: 'Aerial view of the Central Square commercial complex, North Delhi', line: 'A cube-based signage and wayfinding system for three plazas in North Delhi.', src: '/projects/central-square/central-square-hero.jpg' },
  { slug: 'kaamya-greens', alt: 'Aerial render of the Kaamya Greens residential towers, Greater Noida', line: 'A brass-and-grey signage system for a residential development in Greater Noida.', src: '/projects/kaamya-greens/kaamya-hero.jpg' },
  { slug: 'mall-of-expressway', alt: 'Render of the Mall of Expressway building, Greater Noida', line: 'One brass-and-grey sign system for a retail mall and studio apartments in Greater Noida.', src: '/projects/mall-of-expressway/mall-banner.jpg' },
  { slug: 'artnest-studio', alt: 'ArtNest Studio wordmark surrounded by its bird mascot', line: 'A mascot-led brand identity for a community art studio in Faridabad.', src: '/projects/artnest/artnest-cover.jpg' },
  { slug: 'regency-hospital', alt: 'Night elevation of Regency Kanpur Hospital with its illuminated sign and emergency signage', line: 'A bilingual signage and wayfinding concept for a hospital campus in Kanpur.', src: '/projects/regency/regency-hero.jpg' },
  { slug: 'swetafilms', alt: 'Sweta Films wordmark over a black and white studio photograph', line: 'A bold red identity for a photography and visual storytelling practice in Dubai.', src: '/projects/swetafilms/swetafilms-cover.jpg' },
  { slug: 'intiva', alt: 'Intiva foaming wash bottle among botanicals', line: 'Brand identity, label and carton for a foaming intimate wash.', src: '/projects/intiva/intiva-cover.jpg' },
  { slug: 'delhigrapher', alt: 'Delhigrapher wordmark beside a black and white wedding photograph', line: 'A handwritten identity for a wedding photography practice in New Delhi.', src: '/delhigrapher/delhigrapher-cover.jpg' },
]

type Slide = {
  slug: string; project: Project; title: string; src: string; alt: string; focal: string; line: string
  service: ServiceSlug; sector: SectorSlug
}

const SLIDES: Slide[] = [
  ...ART.map((a) => a.slug),
  ...orderedProjects().map((p) => p.slug).filter((slug) => !ART.some((a) => a.slug === slug)),
].flatMap((slug) => {
  const p = getProject(slug)
  if (!p) return []
  const art = ART.find((a) => a.slug === slug)
  const src = art?.src ?? p.hero.src
  if (!src) return []
  return [{
    slug, project: p, title: p.title, src,
    alt: art?.alt ?? p.hero.alt,
    focal: p.focal ?? p.hero.position ?? '50% 50%',
    line: art?.line ?? p.discipline ?? '',
    service: primaryServiceOf(p), sector: primarySectorOf(p),
  }]
})

const slidesFor = (service: ServiceFilter, sector: SectorFilter) =>
  SLIDES.flatMap((s, i) => (matchesFilters(s.project, service, sector) ? [i] : []))

const serviceChip = (s: ServiceSlug) => SERVICES.find((x) => x.slug === s)?.chip ?? ''
const sectorChip = (s: SectorSlug) => SECTORS.find((x) => x.slug === s)?.chip ?? ''

const SERVICE_OPTIONS = [
  { value: 'all' as ServiceFilter, name: 'Everything' },
  ...SERVICES.map((s) => ({ value: s.slug as ServiceFilter, name: s.chip })),
]
const SECTOR_OPTIONS = [
  { value: 'all' as SectorFilter, name: 'Every sector' },
  ...SECTORS.map((s) => ({ value: s.slug as SectorFilter, name: s.name })),
]

/** "Showing 3 Wayfinding projects for Hospitals." Spoken only after a visitor's own choice. */
function describe(n: number, service: ServiceFilter, sector: SectorFilter) {
  const sv = service === 'all' ? '' : `${serviceChip(service)} `
  const sc = sector === 'all' ? '' : ` for ${sectorChip(sector)}`
  const all = service === 'all' && sector === 'all' ? 'all ' : ''
  return `Showing ${all}${n} ${sv}project${n === 1 ? '' : 's'}${sc}.`
}

const DURATION = 5000 // per slide; the progress bar's fill animation is the timer
const WIPE = 700
const FLAP_STEP = 90 // ms per flip of one letter
const FLAP_STAGGER = 25 // ms between letters
const FLAP_GLYPHS = 'ABCDEFGHIJKLMNOPRSTUVWY'

const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const on = (e: MediaQueryListEvent) => setReduce(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

/**
 * A word that changes like an airport split-flap board: each changed letter flips through two random
 * letters before landing. Screen readers only ever get the final word.
 *
 * Sizing: the final word sits invisibly in the same grid cell as the animated letters, so the box always
 * fits the real text in whatever font is active (Play pairings, late font loads, resizes). A width is held
 * only while a flip animates (eased from the old word to the new one), then released to auto.
 */
function FlapWord({ text, still, replay = 0 }: { text: string; still: boolean; replay?: number }) {
  const [chars, setChars] = useState(() => text.split(''))
  const [ticks, setTicks] = useState<number[]>(() => text.split('').map(() => 0))
  const shown = useRef(text)
  const boxRef = useRef<HTMLSpanElement>(null)
  const charsRef = useRef<HTMLSpanElement>(null)
  const sizerRef = useRef<HTMLSpanElement>(null)

  const lastReplay = useRef(replay)
  useEffect(() => {
    // A new `replay` value flips the same word in from scrambled letters (the first-visit intro)
    const replaying = replay !== lastReplay.current
    lastReplay.current = replay
    const from = replaying ? '' : shown.current
    if (from === text) return
    shown.current = text
    if (still) { setChars(text.split('')); setTicks(text.split('').map(() => 0)); return }

    const n = Math.max(from.length, text.length)
    const cur = Array.from({ length: n }, (_, i) => from[i] ?? '')
    const tick = cur.map(() => 0)
    setChars([...cur])
    const timers: number[] = []
    const end = n * FLAP_STAGGER + 3 * FLAP_STEP + 10

    // Hold the width during the flip only: from the letters on screen now to the new word, measured
    // in the current font. Growing words widen at once; shrinking ones wait for their extra letters to go.
    const box = boxRef.current, oldW = charsRef.current?.getBoundingClientRect().width, newW = sizerRef.current?.getBoundingClientRect().width
    if (box && oldW && newW) {
      box.style.transition = 'none'
      box.style.width = `${oldW}px`
      void box.offsetWidth
      box.style.transition = ''
      const settle = () => { box.style.width = `${newW}px` }
      if (newW >= oldW) settle()
      else timers.push(window.setTimeout(settle, from.length * FLAP_STAGGER))
      timers.push(window.setTimeout(() => { box.style.width = '' }, end + 320))
    }

    for (let i = 0; i < n; i++) {
      const target = text[i] ?? ''
      if (from[i] === target) continue
      const steps = target === ' ' || target === ''
        ? [target]
        : [FLAP_GLYPHS[Math.floor(Math.random() * FLAP_GLYPHS.length)], FLAP_GLYPHS[Math.floor(Math.random() * FLAP_GLYPHS.length)].toLowerCase(), target]
      steps.forEach((ch, s) => {
        timers.push(window.setTimeout(() => {
          cur[i] = ch
          tick[i] += 1
          setChars([...cur])
          setTicks([...tick])
        }, i * FLAP_STAGGER + s * FLAP_STEP))
      })
    }
    timers.push(window.setTimeout(() => {
      setChars(text.split(''))
      setTicks(text.split('').map((_, i) => tick[i] ?? 0))
    }, end))
    return () => {
      timers.forEach(window.clearTimeout)
      if (box) box.style.width = ''
    }
  }, [text, still, replay])

  return (
    <span ref={boxRef} className="flap">
      <span className="sr-only">{text}</span>
      <span ref={sizerRef} className="flap-sizer" aria-hidden="true">{text}</span>
      <span ref={charsRef} className="flap-chars" aria-hidden="true">
        {chars.map((c, i) => (
          <span key={`${i}-${ticks[i] ?? 0}`} className={ticks[i] ? 'flap-char is-flipped' : 'flap-char'}>
            {c === ' ' ? '\u00a0' : c}
          </span>
        ))}
      </span>
    </span>
  )
}

type Option<T> = { value: T; name: string; count: number }

/** One word in the sentence: a button that opens a listbox (frosted panel above the chip; a sheet on phones). */
function ChipSelect<T extends string>({ id, kind, word, options, value, open, onOpen, onClose, onChoose, still, replay = 0 }: {
  id: string
  kind: 'Service' | 'Sector'
  word: string
  options: Option<T>[]
  value: T
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChoose: (v: T) => void
  still: boolean
  replay?: number
}) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const [closing, setClosing] = useState(false)
  const enabled = (i: number) => options[i].count > 0

  useEffect(() => {
    if (!open) return
    setClosing(false)
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    listRef.current?.focus()
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Closing fades out for 150ms before the panel unmounts
  const close = useCallback((refocus: boolean) => {
    if (refocus) triggerRef.current?.focus()
    if (still) { onClose(); return }
    setClosing(true)
    window.setTimeout(() => { setClosing(false); onClose() }, 150)
  }, [onClose, still])

  const step = (from: number, dir: 1 | -1) => {
    for (let i = from + dir; i >= 0 && i < options.length; i += dir) if (enabled(i)) return i
    return from
  }
  const choose = (i: number) => {
    if (!enabled(i)) return
    onChoose(options[i].value)
    close(true)
  }

  const onListKey = (e: React.KeyboardEvent) => {
    e.stopPropagation()
    switch (e.key) {
      case 'ArrowDown': case 'ArrowRight': e.preventDefault(); setActive((i) => step(i, 1)); break
      case 'ArrowUp': case 'ArrowLeft': e.preventDefault(); setActive((i) => step(i, -1)); break
      case 'Home': e.preventDefault(); setActive(step(-1, 1)); break
      case 'End': e.preventDefault(); setActive(step(options.length, -1)); break
      case 'Enter': case ' ': e.preventDefault(); choose(active); break
      case 'Escape': e.preventDefault(); close(true); break
      case 'Tab': onClose(); break
    }
  }

  const label = options.find((o) => o.value === value)?.name
  return (
    <span className="chip-select" onBlur={(e) => { if (open && !e.currentTarget.contains(e.relatedTarget as Node)) close(false) }}>
      <button
        ref={triggerRef}
        type="button"
        className="chip-word"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${kind}: ${word}`}
        onClick={() => (open ? close(false) : onOpen())}
        onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); onOpen() } }}
      >
        <FlapWord text={word} still={still} replay={replay} />
        <span className="chip-caret" aria-hidden="true">⌄</span>
      </button>

      {open && (
        <span className={`chip-panel${closing ? ' is-closing' : ''}`} data-kind={kind}>
          <span className="chip-panel-title" id={`${id}-title`}>{kind === 'Service' ? 'We design' : 'For'}</span>
          <ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={`${id}-title`}
            aria-activedescendant={`${id}-opt-${active}`}
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
                style={{ animationDelay: `${Math.min(i * 30, 250)}ms` }}
                onClick={() => choose(i)}
                onPointerMove={() => { if (enabled(i)) setActive(i) }}
              >
                <span className="chip-dot" aria-hidden="true" />
                <span className="chip-option-name">{o.name}</span>
                <span className="chip-option-count">{o.count}</span>
              </li>
            ))}
          </ul>
          <span className="sr-only">{label ? `Selected: ${label}` : ''}</span>
        </span>
      )}
    </span>
  )
}

export default function HeroShowcase() {
  const uid = useId()
  const reduce = useReducedMotion()
  const [service, setService] = useState<ServiceFilter>('all')
  const [sector, setSector] = useState<SectorFilter>('all')
  const [current, setCurrent] = useState(0) // SLIDES index on screen
  const [outgoing, setOutgoing] = useState<number | null>(null) // SLIDES index being wiped over
  const [dir, setDir] = useState<1 | -1>(1)
  const [wipe, setWipe] = useState(0) // increments per transition; parity restarts the CSS animation
  const [menu, setMenu] = useState<'service' | 'sector' | null>(null)
  const [hovering, setHovering] = useState(false)
  const [focusInside, setFocusInside] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [idle, setIdle] = useState(false)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]))
  const [announcement, setAnnouncement] = useState('')
  const [introFlip, setIntroFlip] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const imgRefs = useRef(new Map<number, HTMLImageElement>())
  const pending = useRef<{ target: number; dir: 1 | -1 } | null>(null)
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null)
  const swiped = useRef(false)

  const list = slidesFor(service, sector)
  // Where the shown slide sits in the current set (-1 only while wiping to a newly filtered set)
  const pos = list.indexOf(current)
  const slide = SLIDES[current]
  const single = list.length < 2
  const playing = !reduce && !single && idle && !hovering && !focusInside && menu === null && !tabHidden && onScreen

  // Unlocked words follow the slide; a chosen word stays put
  const serviceWord = service === 'all' ? serviceChip(slide.service) : serviceChip(service)
  const sectorWord = sector === 'all' ? sectorChip(slide.sector) : sectorChip(sector)

  // Start after the page settles, so the first image paints fast
  useEffect(() => {
    const onLoad = () => window.setTimeout(() => setIdle(true), 1200)
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => window.removeEventListener('load', onLoad)
  }, [])

  // First visit only: the chip rises into place shortly after the first image, then its first word flips
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('hero-intro')) return
    const start = () => window.setTimeout(() => {
      root.classList.remove('hero-intro')
      try { localStorage.setItem('ashman-hero-intro', '1') } catch { /* fine: it may play again */ }
      window.setTimeout(() => setIntroFlip(1), 450)
    }, 400)
    const img = imgRefs.current.get(0)
    let t: number | undefined
    if (!img || img.complete) t = start()
    else img.addEventListener('load', () => { t = start() }, { once: true })
    return () => window.clearTimeout(t)
  }, [])

  // Pause silently while the tab is hidden or the hero is off screen
  useEffect(() => {
    const onVis = () => setTabHidden(document.visibilityState === 'hidden')
    onVis()
    document.addEventListener('visibilitychange', onVis)
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.25 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => { document.removeEventListener('visibilitychange', onVis); io.disconnect() }
  }, [])

  // Keep the current slide and the next one loaded, so a wipe never reveals an empty frame
  useEffect(() => {
    if (!idle) return
    const next = list[(pos + 1) % list.length]
    setLoaded((prev) => (prev.has(current) && prev.has(next) ? prev : new Set([...Array.from(prev), current, next])))
  }, [idle, current, pos, service, sector]) // eslint-disable-line react-hooks/exhaustive-deps

  const isReady = (i: number) => {
    const img = imgRefs.current.get(i)
    return !!img && img.complete && img.naturalWidth > 0
  }

  const shownRef = useRef(current)
  shownRef.current = current
  const commit = useCallback((target: number, d: 1 | -1) => {
    const from = shownRef.current
    if (from === target) return
    shownRef.current = target
    setOutgoing(from)
    setDir(d)
    setCurrent(target)
    setWipe((w) => w + 1)
  }, [])

  // Clear the outgoing slide once the wipe has covered it
  useEffect(() => {
    if (outgoing === null) return
    const t = window.setTimeout(() => setOutgoing(null), reduce ? 0 : WIPE + 50)
    return () => window.clearTimeout(t)
  }, [outgoing, wipe, reduce])

  /** Wipe to a slide (SLIDES index), first making sure its image is in so the wipe never shows a blank. */
  const show = (target: number, d: 1 | -1) => {
    if (target === current) return
    if (isReady(target)) { pending.current = null; commit(target, d); return }
    pending.current = { target, dir: d }
    setLoaded((prev) => (prev.has(target) ? prev : new Set([...Array.from(prev), target])))
    // Never wait forever on a slow image
    window.setTimeout(() => {
      if (pending.current?.target === target) { pending.current = null; commit(target, d) }
    }, 1500)
  }
  // Neighbours in the current set; from outside the set (mid-filter), "next" is its first slide
  const step = (d: 1 | -1) => {
    const n = list.length
    show(list[pos < 0 ? (d > 0 ? 0 : n - 1) : (pos + d + n) % n], d)
  }

  const onImageLoad = (i: number) => {
    const p = pending.current
    if (p && p.target === i) { pending.current = null; commit(p.target, p.dir) }
  }

  const advance = () => { if (playing) step(1) }

  const choose = (nextService: ServiceFilter, nextSector: SectorFilter) => {
    const nextList = slidesFor(nextService, nextSector)
    setAnnouncement(describe(nextList.length, nextService, nextSector))
    setService(nextService)
    setSector(nextSector)
    // Wipe to the first matching project (or stay, if it's already the one on screen)
    show(nextList[0], 1)
  }

  const serviceOptions: Option<ServiceFilter>[] = SERVICE_OPTIONS.map((o) => ({ ...o, count: slidesFor(o.value, sector).length }))
  const sectorOptions: Option<SectorFilter>[] = SECTOR_OPTIONS.map((o) => ({ ...o, count: slidesFor(service, o.value).length }))

  // Swipe on touch: horizontal moves change slides; vertical ones stay with the page (touch-action: pan-y)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return
    swipe.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
    swiped.current = false
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s || s.id !== e.pointerId || single) return
    const dx = e.clientX - s.x, dy = e.clientY - s.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swiped.current = true
      step(dx < 0 ? 1 : -1)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (single) return
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  const bars = list.slice(0, 10)
  const wipeClass = reduce || wipe === 0 ? '' : ` wipe-${dir > 0 ? 'fwd' : 'back'}-${wipe % 2}`

  return (
    <section
      ref={sectionRef}
      className={`hero-carousel${playing ? ' is-playing' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured brand stories"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovering(true) }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovering(false) }}
      // Only keyboard focus holds the carousel; a mouse click leaves focus behind on whatever it hit
      onFocus={(e) => setFocusInside(e.target.matches(':focus-visible'))}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusInside(false) }}
      onKeyDown={onKey}
    >
      <div
        className="hero-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { swipe.current = null }}
        onClickCapture={(e) => { if (swiped.current) { e.preventDefault(); e.stopPropagation(); swiped.current = false } }}
      >
        {/* Polite only when a visitor is driving (paused); silent while it advances on its own */}
        <div className="hero-slides" aria-live={playing ? 'off' : 'polite'}>
          {SLIDES.map((s, i) => {
            const isCurrent = i === current
            const isOutgoing = i === outgoing && !isCurrent
            const n = list.indexOf(i)
            return (
              <div
                key={s.slug}
                className={`hero-slide${isCurrent ? ` is-current${wipeClass}` : ''}${isOutgoing ? ' is-outgoing' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-label={n >= 0 ? `${n + 1} of ${list.length}: ${s.title}` : s.title}
                aria-hidden={!isCurrent}
              >
                <Link href={`/work/${s.slug}`} className="hero-slide-link" tabIndex={isCurrent ? 0 : -1} aria-label={`${s.title}: view the brand story`}>
                  {(loaded.has(i) || isCurrent) && (
                    <Image
                      ref={(el) => { if (el) imgRefs.current.set(i, el); else imgRefs.current.delete(i) }}
                      src={s.src}
                      alt={s.alt}
                      fill
                      priority={i === 0}
                      loading={i === 0 ? undefined : 'eager'}
                      sizes="100vw"
                      style={{ objectFit: 'cover', objectPosition: s.focal }}
                      onLoad={() => onImageLoad(i)}
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </div>

        <div className="hero-shade" aria-hidden="true" />

        <div className={`hero-chip-pos${menu ? ' is-open' : ''}`}>
          <div className="hero-chip">
            <span className="hero-chip-group">
              <span className="hero-chip-text">We design</span>
              <ChipSelect
                id={`${uid}-service`} kind="Service" word={serviceWord} still={reduce} replay={introFlip}
                options={serviceOptions} value={service}
                open={menu === 'service'} onOpen={() => setMenu('service')} onClose={() => setMenu(null)}
                onChoose={(v) => choose(v, sector)}
              />
            </span>
            <span className="hero-chip-group">
              <span className="hero-chip-text">for</span>
              <ChipSelect
                id={`${uid}-sector`} kind="Sector" word={sectorWord} still={reduce}
                options={sectorOptions} value={sector}
                open={menu === 'sector'} onOpen={() => setMenu('sector')} onClose={() => setMenu(null)}
                onChoose={(v) => choose(service, v)}
              />
            </span>
          </div>
        </div>
        {menu && <div className="chip-backdrop" aria-hidden="true" onClick={() => setMenu(null)} />}

        <div className="hero-foot" data-play-avoid>
          <Link href={`/work/${slide.slug}`} className="hero-caption" key={`c-${current}-${wipe}`}>
            <span className="hero-title">{slide.title}</span>
            <span className="hero-line">{slide.line}</span>
          </Link>

          {!single && (
            <div className="hero-bars" role="group" aria-label="Choose a project">
              {bars.map((i, n) => {
                const isOn = i === current
                return (
                  <button
                    key={SLIDES[i].slug}
                    type="button"
                    className={`hero-bar${isOn ? ' is-on' : ''}${n < pos ? ' is-done' : ''}`}
                    aria-label={`Show ${n + 1} of ${list.length}: ${SLIDES[i].title}`}
                    aria-current={isOn ? 'true' : undefined}
                    onClick={() => show(i, n >= pos ? 1 : -1)}
                  >
                    <span
                      key={isOn ? `fill-${wipe}` : 'fill'}
                      className="hero-bar-fill"
                      style={isOn ? { animationDuration: `${DURATION}ms` } : undefined}
                      onAnimationEnd={isOn ? advance : undefined}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {!single && (
          <>
            <button type="button" className="hero-arrow hero-prev" aria-label="Previous project" onClick={() => step(-1)}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="hero-arrow hero-next" aria-label="Next project" onClick={() => step(1)}>
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}

        <p className="sr-only" aria-live="polite">{announcement}</p>
      </div>
    </section>
  )
}
