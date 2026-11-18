'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const BELIEFS = [
  {
    num: '— 01',
    title: (<>Space is not the <em>wrapping</em>.</>),
    body: 'The physical environment isn\'t a finishing layer applied at the end of a brand project. It\'s where the brand actually lives — the threshold, the queue, the ceiling height, the moment of arrival. We design from that premise outward.',
    meta: 'Foundational',
  },
  {
    num: '— 02',
    title: (<>Wayfinding is <em>care</em>.</>),
    body: 'A signage system, done well, is one of the highest-trust gestures a building can make to a stranger. Get it wrong and you have an exhausted, late, anxious person. Get it right and you have someone who feels looked after. That\'s the stake.',
    meta: 'Operational',
  },
  {
    num: '— 03',
    title: (<>Material before <em>image</em>.</>),
    body: 'We start with the physical — what something is made of, how it\'s lit, how it ages, how it sounds underfoot — before we get to graphics. The discipline runs the studio: a sign that\'s wrong in mild steel won\'t be saved by a clever typeface choice.',
    meta: 'Material',
  },
]

export default function StudioPage() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const storyRef    = useRef<HTMLElement>(null)
  const pullRef     = useRef<HTMLDivElement>(null)
  const beliefsRef  = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLElement>(null)

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

      /* ─── Section heads ─── */
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

      /* ─── Story two-col ─── */
      if (storyRef.current) {
        const cols = storyRef.current.querySelectorAll('.two-col > div')
        gsap.fromTo(cols[0], { opacity: 0, x: -28 }, {
          opacity: 1, x: 0, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 78%' },
        })
        gsap.fromTo(cols[1], { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: .85, ease: 'power3.out', delay: .1,
          scrollTrigger: { trigger: storyRef.current, start: 'top 78%' },
        })
      }

      /* ─── Pull quote ─── */
      if (pullRef.current) {
        gsap.fromTo(pullRef.current.querySelector('h2'), { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: pullRef.current, start: 'top 78%' },
        })
      }

      /* ─── Beliefs grid ─── */
      if (beliefsRef.current) {
        const cells = beliefsRef.current.querySelectorAll('.bordered-cell')
        ScrollTrigger.create({
          trigger: beliefsRef.current, start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(cells,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out' }
            )
          },
        })
      }

      /* ─── CTA ─── */
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current, { opacity: 0, y: 28 }, {
          opacity: 1, y: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
        })
      }

    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* PAGE HERO */}
      <div className="page-hero-wrap">
        <div ref={heroRef} className="page-hero">
          <div>
            <div className="breadcrumb">
              <Link href="/" className="breadcrumb-link">Ashman Studio</Link>
              <span className="sep">/</span>
              <span className="current">Studio</span>
            </div>
            <div className="ash-eyebrow" style={{ opacity: 0 }}>
              <span className="dash" />03 — Studio
            </div>
            <h1 style={{ opacity: 0 }}>
              An <em>independent</em><br />practice.
            </h1>
          </div>
          <p className="lede" style={{ opacity: 0 }}>
            Founded in New Delhi by Akash Manna — an architect and wayfinding
            specialist. Just a small team. Independent on purpose: no holding company,
            no second-guessing, no pitch-process theatre.
          </p>
        </div>
      </div>

      {/* STORY */}
      <section ref={storyRef} className="ash-section">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 01 / Story</div>
              <h2>Two <em>years</em>,<br />three cities.</h2>
            </div>
            <p className="lede">
              The shorthand version of how the studio got here. Four engagements, three studios,
              one founder who is still in the room for every major design review.
            </p>
          </div>
          <div className="two-col">
            <div>
              <h3>How the studio came to be.</h3>
            </div>
            <div>
              <p>
                Ashman Studio was started by <strong>Akash Manna</strong>, an architect
                and wayfinding specialist working out of New Delhi. The studio grew out of a simple
                need: too many hospitals, malls and campuses leave people lost, because wayfinding
                is treated as an afterthought. We design it in from the start, alongside the brand
                and the architecture, so a building is as easy to find your way through as it is
                to look at.
              </p>
              <p>
                The early work has been a small, careful set of engagements —
                <em>Chopra&apos;s Lemon Soda</em>, a soda bar in Zira; a wayfinding
                concept for <em>Regency Kanpur Hospital</em>; and a brand identity for{' '}
                <em>ArtNest Studio</em>, a community art studio in Faridabad.
              </p>
              <p>
                A second studio in Dubai handles engagements across the Gulf.
                New Delhi remains the head office.
              </p>
              <p>
                We&apos;ve stayed deliberately small. Two people means everyone knows what
                every project is, and the founder is in the room for every design decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <div ref={pullRef} className="about-pull">
        <div className="ash-eyebrow muted" style={{ marginBottom: 32 }}>
          <span className="dash" />How we work
        </div>
        <h2>
          We design end-to-end. From the first audit walk through the last installed sign,
          one studio takes the work — no handoff, no <em>delivery partner</em>, no surprise.
        </h2>
      </div>

      {/* BELIEFS */}
      <section className="ash-section">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 02 / Beliefs</div>
              <h2>What the studio<br /><em>actually</em> believes.</h2>
            </div>
            <p className="lede">
              We&apos;ve been asked variations of &quot;what&apos;s your design philosophy&quot; enough times to
              have written it down. Three things, in order.
            </p>
          </div>
          <div ref={beliefsRef} className="bordered-grid">
            {BELIEFS.map((b) => (
              <div key={b.num} className="bordered-cell">
                <div className="bc-num">{b.num}</div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
                <div style={{
                  fontFamily: 'var(--font-label)', fontSize: 9, fontWeight: 700,
                  letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mid)',
                  display: 'flex', gap: 18,
                }}>
                  <span>{b.meta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="ash-cta-strip">
        <div className="inner">
          <div>
            <h2>Want to <em>work</em> with us?</h2>
            <p>
              Whether you&apos;re scoping a project, exploring a brief, or applying for a role —
              we&apos;d love to hear from you.
            </p>
          </div>
          <Link href="/contact" className="btn-primary">
            Get in touch →
          </Link>
        </div>
      </section>

    </>
  )
}
