import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CTA, EXTERNAL, LINKS, SERVICES, SITE, STUDIOS, type ServiceSlug } from '@/lib/site'
import { CLIENTS, TESTIMONIALS } from '@/lib/proof'
import { DiagActivation, DiagFacade, DiagSign, DiagWayfinding } from '@/components/svg/Diagrams'

const DISCIPLINE_ART: Record<ServiceSlug, ComponentType> = {
  'brand-identity': DiagFacade,
  'wayfinding-signage': DiagWayfinding,
  'spatial-branding': DiagActivation,
  'digital-collateral': DiagSign,
}
const TILE_STYLE = ['span2 ink', 'paper', 'paper2', 'paper wide']

export function Disciplines({ id, headingLevel = 'h2' }: { id?: string; headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel
  return (
    <section className="ash-section" id={id}>
      <div className="ash-wrap">
        <div className="section-head">
          <div className="left">
            <div className="num">What we do</div>
            <Heading>One brand,<br /><em>four</em> disciplines.</Heading>
          </div>
          <p className="lede">
            Most projects run across all four: an identity that becomes a facade, a sign family, a
            launch campaign. We work end-to-end, from the first workshop to installation.
          </p>
        </div>
        <div className="home-mosaic">
          {SERVICES.map((s, i) => {
            const Art = DISCIPLINE_ART[s.slug]
            return (
              <Link key={s.slug} href={`/work?service=${s.slug}`} className={`mosaic-tile ${TILE_STYLE[i]}`}>
                <div className="tile-num">0{i + 1}</div>
                <div className="ghost-art" aria-hidden="true"><Art /></div>
                <div className="tile-copy">
                  <h3>{s.name}</h3>
                  <p>{s.scope}</p>
                </div>
                <div className="tile-arrow">View work <span aria-hidden="true">→</span></div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Belief() {
  return (
    <section className="ash-statement">
      <div className="ash-statement-bg" aria-hidden="true">{SITE.wordmark}</div>
      <div className="ash-statement-inner">
        <div className="ash-eyebrow on-dark"><span className="dash" />Our belief</div>
        <h2>The best brands don&apos;t just look good, they feel like <em>somewhere</em>.</h2>
        <p>
          {SITE.name} is a multidisciplinary, transdisciplinary practice founded by {SITE.founder}. We
          build brands from the first idea to the last sign: strategy, identity, story, digital and
          spatial collateral, designed as one system by one team. Brand designers, wayfinding
          specialists and spatial thinkers work across the line, not in sequence, so the logo, the
          website, the facade and the corridor sign all tell the same story.
        </p>
        <ul className="ash-stats">
          <li className="ash-stat-label">4 disciplines · one brand system</li>
          <li className="ash-stat-label">Identity → Digital → Space</li>
          <li className="ash-stat-label">2 studios · New Delhi · Dubai</li>
        </ul>
      </div>
    </section>
  )
}

const STEPS = [
  { num: '01', title: 'Discover', body: 'Site audit, brand workshop.' },
  { num: '02', title: 'Story & Identity', body: 'The narrative and the visual system.' },
  { num: '03', title: 'Design the system', body: 'Digital and spatial, as one.' },
  { num: '04', title: 'Build', body: 'Fabrication and install supervision.' },
]

export function HowWeWork() {
  return (
    <section className="ash-section">
      <div className="ash-wrap">
        <div className="section-head">
          <div className="left">
            <div className="num">Process</div>
            <h2>How we <em>work</em>.</h2>
          </div>
          <p className="lede">One team takes a brand from the first conversation to the last installed sign.</p>
        </div>
        <ol className="bordered-grid cols-4 steps">
          {STEPS.map((s) => (
            <li key={s.num} className="bordered-cell">
              <div className="bc-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Cities() {
  return (
    <section className="ash-section">
      <div className="ash-wrap">
        <div className="section-head">
          <div className="left">
            <div className="num">Studios</div>
            <h2>One practice,<br />two <em>cities</em>.</h2>
          </div>
          <p className="lede">
            New Delhi is the head office. Dubai works with clients across the Gulf. Call, message or
            drop by either studio.
          </p>
        </div>
        <div className="office-grid">
          {STUDIOS.map((st) => (
            <div key={st.key} className="office-card">
              <div>
                <div className="city-role">{st.role}</div>
                <h3 className="city">{st.key === 'new-delhi' ? <em>{st.city}</em> : st.city}</h3>
                <address className="city-addr">
                  {st.addressLines.map((l) => <span key={l}>{l}<br /></span>)}
                </address>
              </div>
              <div className="city-actions">
                <a href={st.tel}>Call {st.phone}</a>
                <a href={LINKS.whatsapp} {...EXTERNAL}>WhatsApp ↗</a>
                <a href={st.mapsUrl} {...EXTERNAL}>Get directions ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ title = <>Have a brand or a <em>space</em> in mind?</> }: { title?: React.ReactNode }) {
  return (
    <section className="ash-cta-strip">
      <div className="inner">
        <div>
          <h2>{title}</h2>
          <p>{CTA.reply}</p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn-primary">{CTA.primary}</Link>
          <a href={LINKS.whatsapp} {...EXTERNAL} className="btn-whatsapp on-accent">{CTA.whatsapp} ↗</a>
        </div>
      </div>
    </section>
  )
}

export function Clients() {
  if (CLIENTS.length === 0) return null
  return (
    <section className="ash-section clients">
      <div className="ash-wrap">
        <h2 className="section-label">Clients</h2>
        <ul className="client-row">
          {CLIENTS.map((c) => (
            <li key={c.name}>
              <Image src={c.logo} alt={c.name} width={160} height={64} style={{ objectFit: 'contain' }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null
  return (
    <section className="ash-section testimonials">
      <div className="ash-wrap">
        <h2 className="section-label">What clients say</h2>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>{t.name}, {t.role}, {t.company}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
