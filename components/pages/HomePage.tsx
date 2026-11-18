import Link from 'next/link'
import HeroShowcase from '@/components/HeroShowcase'
import { CTA, EXTERNAL, LINKS, SERVICES, SITE } from '@/lib/site'
import { Belief, Cities, Clients, CtaBand, Disciplines, HowWeWork, Testimonials } from '@/components/sections'
import HomeBrandStories from '@/components/BrandStories'
import Reveal from '@/components/Reveal'

export default function HomePage() {
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

      <HomeBrandStories />

      <CtaBand />
      <Clients />
      <Testimonials />
      <Belief />
      <HowWeWork />
      <Cities />
      <Reveal />
    </>
  )
}
