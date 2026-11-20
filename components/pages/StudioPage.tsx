import Link from 'next/link'
import { SITE } from '@/lib/site'
import { Belief, Cities, CtaBand, HowWeWork, Services } from '@/components/sections'

const BELIEFS = [
  {
    num: '01',
    title: (<>Space is not the <em>wrapping</em>.</>),
    body: 'The physical environment isn\'t a finishing layer applied at the end of a brand project. It\'s where the brand actually lives: the threshold, the queue, the ceiling height, the moment of arrival. We design from that premise outward.',
  },
  {
    num: '02',
    title: (<>Wayfinding is <em>care</em>.</>),
    body: 'A signage system, done well, is one of the highest-trust gestures a building can make to a stranger. Get it wrong and you have an exhausted, late, anxious person. Get it right and you have someone who feels looked after.',
  },
  {
    num: '03',
    title: (<>Material before <em>image</em>.</>),
    body: 'We start with the physical: what something is made of, how it\'s lit, how it ages, how it sounds underfoot. A sign that\'s wrong in mild steel won\'t be saved by a clever typeface choice.',
  },
]

export default function StudioPage() {
  return (
    <>
      <div className="page-hero-wrap">
        <div className="page-hero">
          <div>
            <div className="breadcrumb">
              <Link href="/" className="breadcrumb-link">{SITE.name}</Link>
              <span className="sep" aria-hidden="true">/</span>
              <span className="current">Studio</span>
            </div>
            <div className="ash-eyebrow"><span className="dash" />Studio</div>
            <h1>A <em>spatial branding</em> studio.</h1>
          </div>
          <p className="lede">{SITE.summary}</p>
        </div>
      </div>

      <Belief />

      <section className="ash-section">
        <div className="ash-wrap">
          <div className="two-col">
            <div>
              <h2 className="two-col-title">Why the studio exists.</h2>
            </div>
            <div>
              <p>
                {SITE.name} was started by <strong>{SITE.founder}</strong>, an architect and wayfinding
                specialist working out of New Delhi. The studio grew out of a simple need: too many
                hospitals, malls and campuses leave people lost, because wayfinding is treated as an
                afterthought. We design it in from the start, alongside the brand and the
                architecture, so a building is as easy to find your way through as it is to look at.
              </p>
              <p>
                The work so far spans <em>Chopra&apos;s Lemon Soda</em>, a soda bar in Zira; a wayfinding
                concept for <em>Regency Kanpur Hospital</em>; and a brand identity for{' '}
                <em>ArtNest Studio</em>, a community art studio in Faridabad.{' '}
                <Link href="/work">See all brand stories</Link>.
              </p>
              <p>A second studio in Dubai works with clients across the Gulf. New Delhi remains the head office.</p>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <HowWeWork />

      <section className="ash-section" style={{ paddingTop: 0 }}>
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">Beliefs</div>
              <h2>What the studio<br /><em>actually</em> believes.</h2>
            </div>
          </div>
          <ul className="bordered-grid beliefs">
            {BELIEFS.map((b) => (
              <li key={b.num} className="bordered-cell">
                <div className="bc-num">{b.num}</div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cities />
      <CtaBand />
    </>
  )
}
