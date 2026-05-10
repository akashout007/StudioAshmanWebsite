'use client'
import { useEffect, useRef, type ComponentType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'
import {
  DiagWayfinding, DiagSign, DiagActivation, DiagFacade,
  DiagFloorplan, DiagRetail, DiagSection
} from '@/components/svg/Diagrams'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Wayfinding', 'Sign Design', 'Environmental Graphics',
  'Brand Activation', 'Spatial Identity', 'Retail Environments', 'Exhibition Design',
]

const PRACTICES = [
  {
    cls: 'span2 ink',
    num: '01 / Practice',
    title: (<>Wayfinding<br />&amp; <em>navigation</em>.</>),
    body: 'Strategy, masterplan, sign family, specification and supervised install. Airport terminals, hospital campuses, civic interiors, transit interchanges.',
    art: 'wayfinding',
    page: 'services' as const,
    arrow: 'See projects',
  },
  {
    cls: 'paper',
    num: '02',
    title: (<>Sign <em>design</em>.</>),
    body: 'Letterforms, pictogram libraries, dimensional sign families, typographic system audits.',
    art: 'sign',
    page: 'services' as const,
    arrow: 'Open',
  },
  {
    cls: 'paper2',
    num: '03',
    title: (<>Environmental graphics.</>),
    body: 'Surface design at architectural scale — facades, atria, supergraphics, floor narratives.',
    art: 'facade',
    page: 'services' as const,
    arrow: 'Open',
  },
  {
    cls: 'paper',
    num: '04',
    title: (<>Brand <em>activation</em>.</>),
    body: 'Pop-ups, flagship moments and live experiences that connect brands with people.',
    art: 'activation',
    page: 'services' as const,
    arrow: 'Open',
  },
  {
    cls: 'paper2',
    num: '05',
    title: (<>Spatial identity.</>),
    body: 'Translating brand language into three dimensions — retail flagships and concept stores.',
    art: 'retail',
    page: 'services' as const,
    arrow: 'Open',
  },
]

const ArtMap: Record<string, ComponentType> = {
  wayfinding: DiagWayfinding,
  sign: DiagSign,
  facade: DiagFacade,
  activation: DiagActivation,
  retail: DiagRetail,
}

const FEATURED = [
  {
    tag: 'Wayfinding · Healthcare', year: '2025', hero: true,
    title: (<>Regency Hospital — bilingual <em>wayfinding</em> for a multi-block campus.</>),
    loc: 'Lucknow, Uttar Pradesh · 2025', diag: 'wayfinding',
  },
  {
    tag: 'Spatial Identity · Heritage', year: '24',
    title: 'Chopra Soda — retail revival of a Punjabi heritage soft drink',
    loc: 'Faridkot, Punjab · 2024', diag: 'retail',
  },
  {
    tag: 'EGD · Studio', year: '25',
    title: 'Artnest Studio — environmental identity for an atelier',
    loc: 'Charmwood Village, Faridabad · 2025', diag: 'facade',
  },
  {
    tag: 'Spatial Identity · Cultural', year: '26',
    title: 'Delhigrapher — wayfinding & gallery identity for a photography collective',
    loc: 'New Delhi · 2026', diag: 'floorplan',
  },
  {
    tag: 'Wayfinding · Healthcare', year: '25',
    title: 'Regency Hospital — emergency & OPD route signage',
    loc: 'Lucknow · 2025 — phase 2', diag: 'section',
  },
  {
    tag: 'Sign Design · Retail', year: '25',
    title: 'Chopra Soda — hand-painted dukan & cart sign system',
    loc: 'Faridkot · 2025', diag: 'sign',
  },
]

const ProjArtMap: Record<string, ComponentType> = {
  wayfinding: DiagWayfinding,
  retail: DiagRetail,
  facade: DiagFacade,
  floorplan: DiagFloorplan,
  section: DiagSection,
  sign: DiagSign,
  activation: DiagActivation,
}

const STATS = [
  { label: 'Year founded', val: '2024' },
  { label: 'People in studio', val: '12' },
  { label: 'Cities · NDL · CHD · DXB', val: '3' },
  { label: 'Independent', val: '100%' },
]

export default function HomePage() {
  const { navigateTo } = usePage()

  const heroEyeRef   = useRef<HTMLDivElement>(null)
  const heroHeadRef  = useRef<HTMLHeadingElement>(null)
  const heroSubRef   = useRef<HTMLParagraphElement>(null)
  const heroMetaRef  = useRef<HTMLDivElement>(null)
  const heroCtaRef   = useRef<HTMLDivElement>(null)
  const heroRightRef = useRef<HTMLDivElement>(null)
  const mosaicRef    = useRef<HTMLDivElement>(null)
  const featuredRef  = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLElement>(null)
  const statBgRef    = useRef<HTMLDivElement>(null)
  const statNums     = useRef<(HTMLDivElement | null)[]>([])
  const studiosRef   = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ─── Hero entrance ─── */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(heroRightRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut' }, 0)
        .fromTo(heroEyeRef.current,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, .3)
        .fromTo(heroHeadRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: .9 }, .45)
        .fromTo(heroSubRef.current,  { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .75 }, .62)
        .fromTo(heroMetaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6 }, .74)
        .fromTo(heroCtaRef.current,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6 }, .84)

      /* ─── Subtle hero right parallax on scroll ─── */
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: .8,
        onUpdate: (self) => {
          if (heroRightRef.current) {
            gsap.set(heroRightRef.current.querySelector('svg'), {
              y: self.progress * 60,
            })
          }
        },
      })

      /* ─── Section head num labels slide ─── */
      gsap.utils.toArray<HTMLElement>('.section-head .num').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: .7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('.section-head h2').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
      gsap.utils.toArray<HTMLElement>('.section-head .lede').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      /* ─── Practice Mosaic tiles ─── */
      if (mosaicRef.current) {
        const tiles = mosaicRef.current.querySelectorAll('.mosaic-tile')
        gsap.fromTo(tiles,
          { opacity: 0, y: 32, scale: .97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: .7, stagger: .08, ease: 'power3.out',
            scrollTrigger: { trigger: mosaicRef.current, start: 'top 78%' },
          }
        )
      }

      /* ─── Featured project cards ─── */
      if (featuredRef.current) {
        const cards = featuredRef.current.querySelectorAll('.project-card')
        gsap.fromTo(cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: .65, stagger: .1, ease: 'power3.out',
            scrollTrigger: { trigger: featuredRef.current, start: 'top 78%' },
          }
        )
      }

      /* ─── Statement — text fade ─── */
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.querySelector('.ash-statement-inner'),
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: .9, ease: 'power3.out',
            scrollTrigger: { trigger: statementRef.current, start: 'top 70%' },
          }
        )

        /* ghost ASHMAN parallax */
        gsap.to(statBgRef.current, {
          x: '-8%',
          ease: 'none',
          scrollTrigger: {
            trigger: statementRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })

        /* stat counter animation */
        const counterTargets = [
          { el: statNums.current[0], val: '2024' },
          { el: statNums.current[1], val: '12' },
          { el: statNums.current[2], val: '3' },
          { el: statNums.current[3], val: '100%' },
        ]
        ScrollTrigger.create({
          trigger: statementRef.current,
          start: 'top 65%',
          onEnter: () => {
            counterTargets.forEach(({ el, val }) => {
              if (!el) return
              const numeric = parseInt(val)
              if (isNaN(numeric)) { el.textContent = val; return }
              const suffix = val.replace(String(numeric), '')
              const obj = { n: 0 }
              gsap.to(obj, {
                n: numeric, duration: 2, ease: 'power2.out',
                onUpdate: () => { el.textContent = Math.round(obj.n) + suffix },
              })
            })
          },
        })
      }

      /* ─── Office cards ─── */
      if (studiosRef.current) {
        const cards = studiosRef.current.querySelectorAll('.office-card')
        gsap.fromTo(cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: .65, stagger: .12, ease: 'power3.out',
            scrollTrigger: { trigger: studiosRef.current, start: 'top 78%' },
          }
        )
      }

      /* ─── CTA strip ─── */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: .8, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
          }
        )
      }

    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div ref={heroEyeRef} className="hero-eyebrow" style={{ opacity: 0 }}>
            Brand environments · Est. New Delhi 2024
          </div>
          <h1 ref={heroHeadRef} className="hero-headline" style={{ opacity: 0 }}>
            Space is your<br />most <em>powerful</em><br />brand asset.
          </h1>
          <div ref={heroMetaRef} className="hero-meta" style={{ opacity: 0 }}>
            <span>✦ Selected for AGI 2025</span>
            <span>↓ Scroll</span>
          </div>
          <p ref={heroSubRef} className="hero-sub" style={{ opacity: 0 }}>
            We are an independent practice of architects, graphic designers and signage specialists who design the physical world of your brand — wayfinding systems, environmental graphics, retail flagships and live activations.
          </p>
          <div ref={heroCtaRef} className="hero-cta" style={{ opacity: 0, marginTop: '2rem' }}>
            <button className="btn-primary" onClick={() => navigateTo('work')}>See our work</button>
            <button className="btn-ghost" onClick={() => navigateTo('services')}>What we do →</button>
          </div>
        </div>
        <div ref={heroRightRef} className="hero-right" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <DiagWayfinding />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* PRACTICE MOSAIC */}
      <section className="ash-section">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 01 / What we do</div>
              <h2>A practice<br />in <em>five</em> parts.</h2>
            </div>
            <p className="lede">
              Five overlapping disciplines, one studio. Most projects sit across two or three —
              a wayfinding system that needs a flagship moment; a retail environment that lives
              or dies on its sign family. We work end-to-end, from the first audit walk to
              installation supervision.
            </p>
          </div>
          <div ref={mosaicRef} className="home-mosaic">
            {PRACTICES.map((p, i) => {
              const Art = ArtMap[p.art]
              return (
                <button
                  key={i}
                  className={`mosaic-tile ${p.cls}`}
                  onClick={() => navigateTo(p.page)}
                  style={{ textAlign: 'left', width: '100%', height: '100%' }}
                >
                  <div className="tile-num">{p.num}</div>
                  <div className="ghost-art" aria-hidden="true"><Art /></div>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                  <div className="tile-arrow">{p.arrow} <span>→</span></div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="ash-section" style={{ paddingTop: 0 }}>
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 02 / Selected work</div>
              <h2>Recent <em>projects</em>.</h2>
            </div>
            <p className="lede">
              A young studio with a small, deliberate output. Four named engagements since
              we opened in 2024 — healthcare wayfinding, heritage retail, an artist&apos;s atelier
              and a photography collective — most still in active phases.
            </p>
          </div>
          <div ref={featuredRef} className="project-grid">
            {FEATURED.map((p, i) => {
              const Art = ProjArtMap[p.diag] || DiagWayfinding
              return (
                <button
                  key={i}
                  className={`project-card${p.hero ? ' hero' : ''}`}
                  onClick={() => navigateTo('work')}
                  style={{ border: 'none', background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}
                >
                  <div className="pc-img"><Art /></div>
                  <div className="pc-meta">
                    <span className="pc-tag">{p.tag}</span>
                    <span className="pc-year">— {p.year}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <div className="pc-loc">{p.loc}</div>
                </button>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
            <button className="btn-outline" onClick={() => navigateTo('work')}>
              View all projects <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section ref={statementRef} className="ash-statement">
        <div ref={statBgRef} className="ash-statement-bg" aria-hidden="true">ASHMAN</div>
        <div className="ash-statement-inner">
          <div className="ash-eyebrow on-dark">
            <span className="dash" />Our belief
          </div>
          <h2>
            The best brands don&apos;t just look good — they feel like <em>somewhere</em>.
          </h2>
          <p>
            Two years ago Akash Manna set out to do one thing well — design the physical
            environments that carry a brand once a visitor arrives. Sometimes that&apos;s a sign.
            Sometimes it&apos;s a hospital. Sometimes it&apos;s the difference between getting lost and
            feeling looked after. We work with brands and institutions that understand space
            is not the wrapping; it&apos;s the experience.
          </p>
          <div className="ash-stats">
            {STATS.map((s, i) => (
              <div key={s.label}>
                <div
                  className="ash-stat-num"
                  ref={(el) => { statNums.current[i] = el }}
                >
                  {s.val}
                </div>
                <div className="ash-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIOS */}
      <section className="ash-section">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 03 / Studios</div>
              <h2>Three <em>cities</em>,<br />one practice.</h2>
            </div>
            <p className="lede">
              Three studios across two countries. <em>New Delhi</em> is the head office — strategy,
              wayfinding and most of the design work. Chandigarh leads the Punjab and Haryana
              engagements; Dubai handles Gulf clients.
            </p>
          </div>
          <div ref={studiosRef} className="office-grid">
            <button className="office-card" onClick={() => navigateTo('contact')} style={{ border: 'none', textAlign: 'left' }}>
              <div>
                <div className="city-role">Headquarters · Strategy · Wayfinding</div>
                <div className="city"><em>New Delhi</em></div>
                <div className="city-addr">
                  Block 4, Hauz Khas Village<br />South Delhi 110016<br />India
                </div>
              </div>
              <div className="city-meta">
                <span className="city-clock">IST +5:30</span>
                <span className="city-tz">+91 11 4612 0042 ↗</span>
              </div>
            </button>

            <button className="office-card" onClick={() => navigateTo('contact')} style={{ border: 'none', textAlign: 'left' }}>
              <div>
                <div className="city-role">Sign Design · Heritage Retail</div>
                <div className="city">Chandigarh</div>
                <div className="city-addr">
                  SCO 142, Sector 17-C<br />Chandigarh 160017<br />India
                </div>
              </div>
              <div className="city-meta">
                <span className="city-clock">IST +5:30</span>
                <span className="city-tz">+91 172 4012 008 ↗</span>
              </div>
            </button>

            <button className="office-card" onClick={() => navigateTo('contact')} style={{ border: 'none', textAlign: 'left' }}>
              <div>
                <div className="city-role">Activation · Retail · Gulf</div>
                <div className="city">Dubai</div>
                <div className="city-addr">
                  Unit 17, Alserkal Avenue<br />Al Quoz 1, Dubai<br />United Arab Emirates
                </div>
              </div>
              <div className="city-meta">
                <span className="city-clock">GST +4:00</span>
                <span className="city-tz">+971 4 380 6620 ↗</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section ref={ctaRef} className="ash-cta-strip">
        <div className="inner">
          <div>
            <h2>Have a <em>space</em> in mind?</h2>
            <p>
              Tell us about your project — share as much or as little as you like and
              we&apos;ll be in touch within two working days.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigateTo('contact')}>
            Start a project →
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}
