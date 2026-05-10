'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'

gsap.registerPlugin(ScrollTrigger)

const TEAM = [
  {
    name: 'Akash Manna', initial: 'A',
    role: 'Founder · Principal',
    bio: 'Architect and wayfinding specialist. Leads strategy across every engagement and is in the room for every major design review.',
  },
  {
    name: 'Anamika', initial: 'An',
    role: 'Architect & Spatial Designer',
    bio: 'Leads spatial identity and architectural collaboration. Background in interiors and exhibition design.',
  },
  {
    name: 'Arsalan', initial: 'Ar',
    role: 'Senior Graphic Designer',
    bio: 'NID graduate. Owns sign design, EGD and the typographic side of the studio. Leads the Chopra Soda and Delhigrapher work.',
  },
  {
    name: 'Vikram', initial: 'V',
    role: 'Motion & Animation',
    bio: 'NID Ahmedabad — communication design. Designs digital wayfinding, animated signage and the studio\'s case-study films.',
  },
  {
    name: 'Maaz', initial: 'M',
    role: 'Technical Designer',
    bio: 'Translates design intent into manufacturable spec. Owns fabrication drawings, mounting details and tendered material packages.',
  },
]

const TIMELINE = [
  { year: '2024', what: 'Studio founded in New Delhi', where: 'Akash Manna opens the practice out of a single room in Hauz Khas Village. First commission: Chopra Soda, Faridkot.' },
  { year: '2024', what: 'Chopra Soda — first retail engagement', where: 'A heritage soft-drink brand from Punjab; spatial identity, retail signage and a hand-painted dukan revival.' },
  { year: '2025', what: 'Regency Hospital — first wayfinding commission', where: 'A multi-block hospital campus in Lucknow. Bilingual (English / Hindi) wayfinding, sign masterplan and pictogram set.' },
  { year: '2025', what: 'Artnest Studio — Charmwood Village, Faridabad', where: 'Environmental identity for an artist\'s atelier. The studio\'s first dedicated EGD engagement.' },
  { year: '2025', what: 'Chandigarh studio opens', where: 'A second studio in Sector 17 to be closer to the Punjab and Haryana work.' },
  { year: '2026', what: 'Delhigrapher — gallery & wayfinding', where: 'Spatial identity and visitor wayfinding for a Delhi-based photography collective.' },
  { year: '2026', what: 'Dubai studio opens', where: 'A third studio in Alserkal Avenue (Al Quoz) to handle Gulf engagements.' },
]

const AWARDS = [
  { year: '2026', title: (<>Kyoorius Yellow — <em>Wayfinding</em></>), org: 'Regency Hospital, Lucknow', cat: 'Wayfinding' },
  { year: '2025', title: 'India Design Mark — Heritage Retail', org: 'Chopra Soda, Faridkot', cat: 'Spatial Identity' },
  { year: '2025', title: 'AGDA Merit — Identity', org: 'Chopra Soda, Faridkot', cat: 'Sign Design' },
  { year: '2025', title: (<>WIN Awards — <em>shortlist</em></>), org: 'Regency Hospital, Lucknow', cat: 'Healthcare' },
  { year: '2024', title: 'Brand New — Noted', org: 'Studio launch identity', cat: 'Brand' },
]

const ROLES = [
  { title: (<>Senior Wayfinding <em>Designer</em></>), type: 'Permanent · Full-time', loc: 'New Delhi', meta: '4+ years experience' },
  { title: 'Junior Graphic Designer', type: 'Permanent · Full-time', loc: 'Chandigarh', meta: 'Recent NID / Srishti graduate' },
  { title: 'Sign Production Coordinator', type: 'Permanent · Full-time', loc: 'New Delhi', meta: 'Fabrication background' },
  { title: (<>Studio <em>Internship</em> 2026</>), type: '6 months · Paid', loc: 'New Delhi / Chandigarh', meta: 'Applications open Jan' },
]

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
  const { navigateTo } = usePage()
  const heroRef     = useRef<HTMLDivElement>(null)
  const storyRef    = useRef<HTMLElement>(null)
  const pullRef     = useRef<HTMLDivElement>(null)
  const beliefsRef  = useRef<HTMLDivElement>(null)
  const teamRef     = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const awardsRef   = useRef<HTMLDivElement>(null)
  const rolesRef    = useRef<HTMLDivElement>(null)
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
        const [left, right] = storyRef.current.querySelectorAll('.two-col > div')
        gsap.fromTo(left, { opacity: 0, x: -28 }, {
          opacity: 1, x: 0, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 78%' },
        })
        gsap.fromTo(right, { opacity: 0, y: 24 }, {
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

      /* ─── Team cards ─── */
      if (teamRef.current) {
        const cards = teamRef.current.querySelectorAll('.team-card')
        ScrollTrigger.create({
          trigger: teamRef.current, start: 'top 78%',
          onEnter: () => {
            gsap.fromTo(cards,
              { opacity: 0, y: 32, scale: .97 },
              { opacity: 1, y: 0, scale: 1, duration: .65, stagger: .1, ease: 'power3.out' }
            )
          },
        })
      }

      /* ─── Timeline rows ─── */
      if (timelineRef.current) {
        const rows = timelineRef.current.querySelectorAll('.timeline-row')
        ScrollTrigger.create({
          trigger: timelineRef.current, start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(rows,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: .6, stagger: .1, ease: 'power3.out' }
            )
          },
        })
        /* Animate timeline dots */
        rows.forEach((row) => {
          gsap.fromTo(row, {}, {
            scrollTrigger: {
              trigger: row, start: 'top 88%',
              onEnter: () => {
                const pseudo = row as HTMLElement
                pseudo.style.setProperty('--dot-scale', '1')
              },
            },
          })
        })
      }

      /* ─── Awards ─── */
      if (awardsRef.current) {
        const rows = awardsRef.current.querySelectorAll('.award-row')
        ScrollTrigger.create({
          trigger: awardsRef.current, start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(rows,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: .55, stagger: .09, ease: 'power3.out' }
            )
          },
        })
      }

      /* ─── Roles ─── */
      if (rolesRef.current) {
        const rows = rolesRef.current.querySelectorAll('.role-row')
        ScrollTrigger.create({
          trigger: rolesRef.current, start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(rows,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: .55, stagger: .09, ease: 'power3.out' }
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
              <span>Ashman.Studio</span>
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
            Founded 2024 in New Delhi by Akash Manna — an architect and wayfinding
            specialist. A small team of architects, graphic designers and technical
            designers across three studios. Independent on purpose: no holding company,
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
                Ashman Studio was started in 2024 by <strong>Akash Manna</strong>, an architect
                and wayfinding specialist working out of New Delhi. The studio grew out of a single
                hospital wayfinding commission and a deliberate bet that brand and architecture
                should be designed by the same hand.
              </p>
              <p>
                The first eighteen months were spent on a small, careful set of engagements —
                <em>Chopra Soda</em>, a heritage soft-drink brand from Faridkot; the wayfinding
                for <em>Regency Hospital</em> in Lucknow; and an environmental identity for{' '}
                <em>Artnest Studio</em>, a working atelier in Faridabad.
              </p>
              <p>
                We opened a second studio in Chandigarh in 2025 to be closer to the Punjab and
                Haryana work, and a third in Dubai in 2026 for engagements across the Gulf.
                New Delhi remains the head office.
              </p>
              <p>
                We&apos;ve stayed deliberately small. Around a dozen people is roughly the size
                where everyone in the studio knows what every project is, and where the founder
                can still be in the room for the major design reviews.
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

      {/* TEAM */}
      <section className="ash-section" style={{ paddingTop: 0 }}>
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 03 / Team</div>
              <h2>A small <em>team</em>,<br />five named here.</h2>
            </div>
            <p className="lede">
              The founder and four senior designers. The rest of the studio — assistants,
              junior designers and a small fabrication partner — are not listed here.
            </p>
          </div>
          <div ref={teamRef} className="team-grid">
            {TEAM.map((p) => (
              <div key={p.name} className="team-card">
                <div className="photo">
                  <div className="photo-initial">{p.initial}</div>
                </div>
                <div className="team-name">{p.name}</div>
                <div className="team-role">{p.role}</div>
                <div className="team-bio">{p.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="ash-section" style={{ paddingTop: 0 }}>
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 04 / Timeline</div>
              <h2>Seven <em>moments</em>.</h2>
            </div>
            <p className="lede">
              The shorthand version of how the studio got here. Other things happened in between,
              but these are the ones that changed the shape of the practice.
            </p>
          </div>
          <div ref={timelineRef} className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className="timeline-row">
                <div className="timeline-year">{t.year}</div>
                <div>
                  <div className="timeline-what">{t.what}</div>
                  <div className="timeline-where">{t.where}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="ash-section" style={{ paddingTop: 0 }} id="awards">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 05 / Awards</div>
              <h2>Honours &amp;<br /><em>recognition</em>.</h2>
            </div>
            <p className="lede">
              Five honours and shortlists in two years — most for the wayfinding and heritage
              retail work. We don&apos;t enter every competition; the ones below are the ones that
              mattered to the team or the client.
            </p>
          </div>
          <div ref={awardsRef} className="awards-list">
            {AWARDS.map((a, i) => (
              <div key={i} className="award-row">
                <div className="award-year">{a.year}</div>
                <div className="award-title">{a.title}</div>
                <div className="award-org">{a.org}</div>
                <div className="award-cat">{a.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section className="ash-section" style={{ paddingTop: 0 }} id="careers">
        <div className="ash-wrap">
          <div className="section-head">
            <div className="left">
              <div className="num">— 06 / Careers</div>
              <h2>Currently <em>hiring</em>.</h2>
            </div>
            <p className="lede">
              Four open roles across New Delhi and Chandigarh. We hire roughly two or three
              people a year — most arrive through a portfolio cold-email or a personal recommendation.
            </p>
          </div>
          <div ref={rolesRef} className="role-list">
            {ROLES.map((r, i) => (
              <a
                key={i}
                href="mailto:careers@ashman.studio"
                className="role-row"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px 80px', gap: 32 }}
              >
                <div className="role-title">{r.title}</div>
                <div className="role-meta">{r.type} · {r.meta}</div>
                <div className="role-loc">{r.loc}</div>
                <div className="role-arrow">Apply →</div>
              </a>
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
          <button className="btn-primary" onClick={() => navigateTo('contact')}>
            Get in touch →
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}
