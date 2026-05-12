'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'
import {
  DiagWayfinding, DiagSign, DiagFacade,
  DiagActivation, DiagRetail, DiagFloorplan
} from '@/components/svg/Diagrams'

gsap.registerPlugin(ScrollTrigger)

const SUMMARY = [
  { num: '01', name: 'Wayfinding', sub: 'Strategy → install' },
  { num: '02', name: 'Sign Design', sub: 'Sign families & spec' },
  { num: '03', name: 'Environmental Graphics', sub: 'Surface at scale' },
  { num: '04', name: 'Brand Activation', sub: 'Pop-ups & live' },
  { num: '05', name: 'Retail Environments', sub: 'Flagship & concept' },
  { num: '06', name: 'Spatial Identity', sub: 'Brand in 3D' },
]

const SERVICES = [
  {
    num: '01', alt: false,
    eyebrow: 'Spatial · 24 projects to date',
    title: (<>Wayfinding<br />&amp; <em>navigation</em>.</>),
    lede: 'From a five-day audit walk to the last installed totem. We design wayfinding for environments where finding the right place at the right time is critical — airport terminals, hospital campuses, civic interiors and transit interchanges. Our process is route-led, drawn in plan and section before a single sign type is specified.',
    deliverables: [
      { name: 'Wayfinding strategy & audit', meta: 'Phase 1' },
      { name: 'Information architecture', meta: 'Phase 1' },
      { name: 'Sign type schedule & masterplan', meta: 'Phase 2' },
      { name: 'Pictogram libraries', meta: 'Phase 2' },
      { name: 'Specification & supply', meta: 'Phase 3' },
      { name: 'Install supervision', meta: 'Phase 4' },
    ],
    cta: 'View 24 wayfinding projects',
    projTag: 'Featured · Healthcare',
    projName: 'Regency Hospital — Lucknow · 2025',
    Diag: DiagWayfinding,
  },
  {
    num: '02', alt: true,
    eyebrow: 'Spatial · 18 projects to date',
    title: (<>Sign <em>design</em>.</>),
    lede: 'The sign family is where every wayfinding system lives or dies. We design dimensional sign families — typeface decisions, mounting geometry, sightlines, illumination, materials, fabrication tolerances — and follow them all the way to the foundry. Our specs are produced for production engineers, not just clients.',
    deliverables: [
      { name: 'Sign family design', meta: '8–24 types' },
      { name: 'Custom letterforms', meta: 'On request' },
      { name: 'Pictogram set', meta: 'ISO 7001 base' },
      { name: 'Material & fabrication spec', meta: 'For tender' },
      { name: 'Bilingual / trilingual systems', meta: 'EN · HI · AR' },
    ],
    cta: 'View 18 signage projects',
    projTag: 'Featured · Heritage Retail',
    projName: 'Chopra Soda — Faridkot, Punjab',
    Diag: DiagSign,
    imgSrc: '/chopra-soda.png',
  },
  {
    num: '03', alt: false,
    eyebrow: 'Spatial · 15 projects to date',
    title: (<>Environmental<br /><em>graphics</em>.</>),
    lede: 'Surface design at architectural scale. Facades, atria, supergraphics, floor narratives, donor walls, exhibition panels. Where wayfinding tells you where to go, environmental graphics tell you where you are — they give a building its voice. We work alongside architects from concept stage.',
    deliverables: [
      { name: 'Supergraphic & facade design', meta: 'Up to 60m' },
      { name: 'Atrium & lobby installations', meta: 'Bespoke' },
      { name: 'Donor / heritage walls', meta: 'Cultural' },
      { name: 'Exhibition panel systems', meta: 'Modular' },
      { name: 'Vinyl, cut metal, applied print', meta: 'Per surface' },
    ],
    cta: 'View 15 EGD projects',
    projTag: 'Featured · Studio',
    projName: 'Artnest Studio — Faridabad · 2025',
    Diag: DiagFacade,
  },
  {
    num: '04', alt: true,
    eyebrow: 'Brand · 12 projects to date',
    title: (<>Brand <em>activation</em>.</>),
    lede: 'Pop-ups, flagship moments and live experiences that connect a brand with its audience for a few hours, days or weeks. We design the footprint, the moment of approach, the surface, the queue, the photograph. Designed for one place, one time — and to stop people in the street.',
    deliverables: [
      { name: 'Activation concept', meta: 'Strategic' },
      { name: 'Footprint & flow', meta: 'Plan-led' },
      { name: 'Built environment design', meta: 'Construction' },
      { name: 'Surface & graphic system', meta: 'Site-specific' },
      { name: 'Production & install', meta: 'Turnkey' },
    ],
    cta: 'View 12 activation projects',
    projTag: 'Featured · Cultural',
    projName: 'Delhigrapher — New Delhi',
    Diag: DiagActivation,
  },
  {
    num: '05', alt: false,
    eyebrow: 'Brand · 14 projects to date',
    title: (<>Retail <em>environments</em>.</>),
    lede: 'Flagship and concept stores designed to feel like the brand from the moment someone crosses the threshold. We work with the architect on plan and section, then own everything you can see and touch — surface, signage, fixturing language, packaging on shelf. Less interior design, more brand environment.',
    deliverables: [
      { name: 'Concept & customer journey', meta: 'Strategic' },
      { name: 'Architectural collaboration', meta: 'With architect' },
      { name: 'Fixture & display design', meta: 'Manufacturing' },
      { name: 'Wayfinding & sign system', meta: 'In-store' },
      { name: 'Rollout playbook', meta: 'Multi-store' },
    ],
    cta: 'View 14 retail projects',
    projTag: 'Featured · Heritage F&B',
    projName: 'Chopra Soda — dukan rollout',
    Diag: DiagRetail,
    imgSrc: '/chopra-soda.png',
  },
  {
    num: '06', alt: true,
    eyebrow: 'Brand · 9 projects to date',
    title: (<>Spatial<br /><em>identity</em>.</>),
    lede: 'The architecture-led end of the practice. We translate brand language into three dimensions — an environmental tone of voice, a material palette, a sign family — and document it as a system the client\'s other consultants can build with. Used by clients with multi-site estates that need to feel coherent.',
    deliverables: [
      { name: 'Spatial brand audit', meta: 'Phase 1' },
      { name: 'Material & finish library', meta: 'Spec sheet' },
      { name: 'Wayfinding sign family', meta: 'For estate' },
      { name: 'Environmental tone of voice', meta: 'Editorial' },
      { name: 'Rollout & governance manual', meta: 'Living doc' },
    ],
    cta: 'View 9 spatial identity projects',
    projTag: 'Featured · Cultural',
    projName: 'Delhigrapher — collective gallery',
    Diag: DiagFloorplan,
  },
]

export default function ServicesPage() {
  const { navigateTo } = usePage()
  const heroRef    = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ─── Page hero ─── */
      if (heroRef.current) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(heroRef.current.querySelector('.ash-eyebrow'),
            { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6 }, 0)
          .fromTo(heroRef.current.querySelector('h1'),
            { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .85 }, .12)
          .fromTo(heroRef.current.querySelector('.lede'),
            { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7 }, .28)
      }

      /* ─── Summary grid cells ─── */
      if (summaryRef.current) {
        const cells = summaryRef.current.querySelectorAll('.bordered-cell')
        ScrollTrigger.create({
          trigger: summaryRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(cells,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: .65, stagger: .08, ease: 'power3.out' }
            )
          },
        })
      }

      /* ─── Service rows ─── */
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const isAlt = i % 2 === 1
        const copy   = row.querySelector('.svc-row-copy')
        const visual = row.querySelector('.svc-visual')
        ScrollTrigger.create({
          trigger: row,
          start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(copy,
              { opacity: 0, x: isAlt ? 28 : -28 },
              { opacity: 1, x: 0, duration: .85, ease: 'power3.out' }
            )
            gsap.fromTo(visual,
              { opacity: 0, x: isAlt ? -28 : 28, scale: 1.04 },
              { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
            )
          },
        })
      })

    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="page-hero-wrap">
        <div ref={heroRef} className="page-hero">
          <div>
            <div className="breadcrumb">
              <span>Ashman.Studio</span>
              <span className="sep">/</span>
              <span className="current">What we do</span>
            </div>
            <div className="ash-eyebrow" style={{ opacity: 0 }}>
              <span className="dash" />02 — Services
            </div>
            <h1 style={{ opacity: 0 }}>
              Six disciplines.<br />One <em>studio</em>.
            </h1>
          </div>
          <p className="lede" style={{ opacity: 0 }}>
            We design the physical world of your brand from the strategic audit to the last
            installed sign. Most projects sit across two or three of the disciplines below —
            we scope and price them as a single engagement, not a stack of line items.
          </p>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker paper">
        <div className="ticker-track">
          {['Wayfinding', 'Sign Design', 'Environmental Graphics', 'Brand Activation', 'Retail Environments', 'Spatial Identity',
            'Wayfinding', 'Sign Design', 'Environmental Graphics', 'Brand Activation', 'Retail Environments', 'Spatial Identity',
          ].map((item, i) => (
            <span key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <section style={{ padding: '80px 0' }}>
        <div className="ash-wrap">
          <div ref={summaryRef} className="bordered-grid">
            {SUMMARY.map((s) => (
              <div key={s.num} className="bordered-cell">
                <div className="bc-num">{s.num}</div>
                <h3>{s.name}</h3>
                <p style={{ marginBottom: 0 }}>{s.sub}</p>
                <div className="bc-link" style={{ marginTop: 28 }}>Read more →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE ROWS */}
      {SERVICES.map((s, i) => {
        const Art = s.Diag
        return (
          <div key={s.num} className="svc-row-wrap">
            <div
              ref={(el) => { rowRefs.current[i] = el }}
              className={`service-row${s.alt ? ' alt' : ''}`}
            >
              <div className="svc-row-copy">
                <div className="svc-big-num">{s.num}</div>
                <div className="ash-eyebrow muted" style={{ marginBottom: 22 }}>
                  <span className="dash" />{s.eyebrow}
                </div>
                <h2>{s.title}</h2>
                <p className="svc-lede">{s.lede}</p>
                <ul className="deliverables">
                  {s.deliverables.map((d) => (
                    <li key={d.name}>
                      <span>{d.name}</span>
                      <span className="meta">{d.meta}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-ghost" onClick={() => navigateTo('work')}>
                  {s.cta} →
                </button>
              </div>
              <div className="svc-visual">
                {s.imgSrc ? (
                  <img src={s.imgSrc} alt={s.projName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <Art />
                )}
                <div className="svc-ovl">
                  <div className="ovl-tag">{s.projTag}</div>
                  <div className="ovl-name">{s.projName}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* CTA */}
      <section className="ash-cta-strip">
        <div className="inner">
          <div>
            <h2>Have a <em>space</em> in mind?</h2>
            <p>
              Most engagements start with a 60-minute call and an audit walk-through.
              Tell us what you&apos;re working on and we&apos;ll let you know how we can help.
            </p>
          </div>
          <button className="btn-primary" onClick={() => navigateTo('contact')}>
            Brief us →
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}
