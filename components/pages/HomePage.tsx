'use client'
import { useEffect, useRef, type ComponentType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import HeroShowcase from '@/components/HeroShowcase'
import { CTA, EXTERNAL, LINKS, SERVICES, SITE } from '@/lib/site'
import { Belief, Cities, Clients, CtaBand, Disciplines, HowWeWork, Testimonials } from '@/components/sections'
import {
  DiagWayfinding, DiagSign, DiagActivation, DiagFacade,
  DiagFloorplan, DiagRetail, DiagSection
} from '@/components/svg/Diagrams'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = [
  {
    slug: 'regency-hospital', tag: 'Wayfinding · Healthcare', year: '2026', hero: true,
    title: (<>Regency Kanpur Hospital — bilingual <em>wayfinding</em> concept for a hospital campus.</>),
    loc: 'Kanpur, Uttar Pradesh · 2026 · Concept', diag: 'wayfinding',
    imgSrc: '/projects/regency/regency-cover.jpg', imgPos: '72% 50%',
  },
  {
    slug: 'central-square', tag: 'Wayfinding · Commercial', year: '',
    title: 'Central Square — signage and wayfinding for a three-plaza commercial complex',
    loc: 'North Delhi · Design development', diag: 'section',
    imgSrc: '/projects/central-square/central-square-hero.jpg',
  },
  {
    slug: 'kaamya-greens', tag: 'Wayfinding · Residential', year: '26',
    title: 'Kaamya Greens — brass-and-grey signage for a residential development',
    loc: 'Greater Noida · 2026', diag: 'section', imgSrc: '/projects/kaamya-greens/kaamya-hero.jpg',
  },
  {
    slug: 'mall-of-expressway', tag: 'Wayfinding · Mixed-use', year: '26',
    title: 'Mall of Expressway — one sign system for a mall and studio apartments',
    loc: 'Greater Noida · 2026', diag: 'section', imgSrc: '/projects/mall-of-expressway/mall-banner.jpg', imgPos: '50% 50%',
  },
  {
    slug: 'chopra-soda', tag: 'Spatial Identity · Heritage', year: '24',
    title: 'Chopra\'s Lemon Soda — brand collaterals and menu for a soda bar',
    loc: 'Zira, Punjab · 2026', diag: 'retail', imgSrc: '/projects/chopra-soda/chopra-hero.jpg',
  },
  {
    slug: 'artnest-studio', tag: 'Brand Identity', year: '',
    title: 'ArtNest Studio — brand identity for a community art studio',
    loc: 'Charmwood Village, Faridabad', diag: 'facade', imgSrc: '/projects/artnest/artnest-cover.jpg',
  },
  {
    slug: 'delhigrapher', tag: 'Brand Identity', year: '26',
    title: 'Delhigrapher — brand identity for a wedding photography practice',
    loc: 'New Delhi · 2026', diag: 'floorplan', imgSrc: '/delhigrapher/delhigrapher-cover.jpg',
  },
  {
    slug: 'bollywood-kabab', tag: 'Brand Identity · Signage', year: '',
    title: 'Bollywood Kabab — cinema-inspired identity and facade signage for a kebab restaurant',
    loc: 'Greater Noida', diag: 'sign', imgSrc: '/projects/bollywood-kabab/bollywood-kabab-hero.jpg',
  },
  {
    slug: 'intiva', tag: 'Brand Identity · Packaging', year: '',
    title: 'Intiva — brand identity and packaging for a foaming intimate wash',
    loc: 'Label, carton and product imagery', diag: 'sign', imgSrc: '/projects/intiva/intiva-cover.jpg',
  },
  {
    slug: 'regency-hospital', tag: 'Wayfinding · Healthcare', year: '26',
    title: 'Regency Kanpur Hospital — gate, drop-off and corridor sign family',
    loc: 'Kanpur · 2026 · Concept', diag: 'section', imgSrc: '/projects/regency/regency-dr01.jpg',
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

export default function HomePage() {
  const featuredRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {

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

    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-text">
          <h1>{SITE.heroTitle}</h1>
          <div className="home-hero-side">
            <p>{SITE.heroSub}</p>
            <div className="hero-ctas">
              <Link href="/contact" className="btn-primary">{CTA.primary}</Link>
              <a href={LINKS.whatsapp} {...EXTERNAL} className="btn-whatsapp">{CTA.whatsapp} ↗</a>
            </div>
          </div>
        </div>
        <HeroShowcase />
      </section>

      <div className="ticker" aria-label={`Disciplines: ${SERVICES.map((sv) => sv.name).join(', ')}`} role="region">
        <div className="ticker-track" aria-hidden="true">
          {[...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES].map((sv, i) => (
            <span key={i}>
              <span className="ticker-item">{sv.name}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <Disciplines id="what-we-do" />

      {/* FEATURED PROJECTS */}
      <section className="ash-section" style={{ paddingTop: 0 }}>
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 02 / Selected work</div>
              <h2>Recent <em>projects</em>.</h2>
            </div>
            <p className="lede">
              Identities, wayfinding systems and spaces we have built, each one a brand with a story
              to tell.
            </p>
          </div>
          <div ref={featuredRef} className="project-grid">
            {FEATURED.map((p, i) => {
              const Art = ProjArtMap[p.diag] || DiagWayfinding
              return (
                <Link
                  key={i}
                  href={`/work/${p.slug}`}
                  className={`project-card${p.hero ? ' hero' : ''}`}
                >
                  <div className="pc-img">
                    {p.imgSrc ? (
                      <img src={p.imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.imgPos, display: 'block' }} />
                    ) : (
                      <Art />
                    )}
                  </div>
                  <div className="pc-meta">
                    <span className="pc-tag">{p.tag}</span>
                    {p.year && <span className="pc-year">— {p.year}</span>}
                  </div>
                  <h3>{p.title}</h3>
                  <div className="pc-loc">{p.loc}</div>
                </Link>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
            <Link href="/work" className="btn-outline">
              View all projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
      <Clients />
      <Testimonials />
      <Belief />
      <HowWeWork />
      <Cities />
    </>
  )
}
