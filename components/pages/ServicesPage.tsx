'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Physical Brand\nActivation',
    desc: 'We design brand experiences that live in the real world — pop-ups, takeovers, and immersive installations that stop people in their tracks.',
    items: ['Pop-up store design', 'Event installations', 'Product launch environments', 'Retail takeovers', 'Brand roadshows'],
  },
  {
    num: '02',
    title: 'Wayfinding\nSystems',
    desc: 'Navigation design that respects people's time while reinforcing your brand at every touchpoint. We work from masterplan to material specification.',
    items: ['Signage systems', 'Architectural wayfinding', 'Campus navigation', 'Transport & infrastructure', 'Digital wayfinding integration'],
  },
  {
    num: '03',
    title: 'Environmental\nGraphic Design',
    desc: 'Surface-level storytelling at scale. We design the visual language of interiors, facades, and public spaces — graphics that feel native to architecture.',
    items: ['Wall murals & graphics', 'Floor graphics', 'Window & facade treatment', 'Donor walls & recognition', 'Heritage & brand timelines'],
  },
  {
    num: '04',
    title: 'Retail\nEnvironments',
    desc: 'Store design that sells — through considered layout, material hierarchy, and visual merchandising systems that support every product category.',
    items: ['Flagship store design', 'Shop-in-shop concepts', 'Visual merchandising', 'Retail graphics programs', 'Seasonal installations'],
  },
  {
    num: '05',
    title: 'Exhibition\n& Events',
    desc: 'Award-worthy trade show stands and brand pavilions designed to attract, engage, and convert in the most competitive of arenas.',
    items: ['Trade show stands', 'Brand pavilions', 'Conference & summit spaces', 'Experiential galleries', 'Museum-quality exhibitions'],
  },
  {
    num: '06',
    title: 'Brand Identity\n& Strategy',
    desc: 'The foundations everything else is built on. We develop brand identities built for the physical world — systems that scale from a business card to a building.',
    items: ['Brand strategy', 'Visual identity design', 'Brand guidelines', 'Naming & verbal identity', 'Brand rollout & guardianship'],
  },
]

export default function ServicesPage() {
  const { navigateTo } = usePage()
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.svc-detail-item')
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power3.out',
            })
          },
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={heroRef} className="page-hero">
        <div className="section-label">Services</div>
        <h1>What we<br /><em>design</em>.</h1>
        <p>From strategy through to installation, we work across the full spectrum of brand environments and spatial communication.</p>
      </div>

      <div className="services-detail">
        <div ref={gridRef} className="svc-detail-grid">
          {SERVICES.map((s) => (
            <div key={s.num} className="svc-detail-item">
              <div className="svc-big-num">{s.num}</div>
              <div className="svc-detail-title" style={{ whiteSpace: 'pre-line' }}>{s.title}</div>
              <div className="svc-detail-desc">{s.desc}</div>
              <ul className="svc-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <section className="statement">
        <div className="statement-inner">
          <div className="section-label" style={{ color: 'var(--accent)' }}>Our process</div>
          <h2>We work best as<br /><em>long-term partners</em>,<br />not one-off suppliers.</h2>
          <p>Our engagements range from focused sprint projects to multi-year retained partnerships. Either way, you get the full team — strategist, designer, and producer — from day one.</p>
          <button className="btn-primary accent" onClick={() => navigateTo('contact')}>Talk to us</button>
        </div>
      </section>

      <Footer tagline="Designing the physical world of your brand." />
    </>
  )
}
