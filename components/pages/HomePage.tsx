'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'
import HeroSVG from '@/components/svg/HeroSVG'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Brand Activation', 'Wayfinding Systems', 'Environmental Graphic Design',
  'Spatial Branding', 'Pop-up Experiences', 'Retail Environments', 'Exhibition Design',
]

const SERVICES = [
  { num: '01', title: 'Physical Brand\nActivation', desc: 'Pop-ups, flagship moments, and live experiences that put your brand into the hands — and hearts — of your audience.' },
  { num: '02', title: 'Wayfinding\nSystems', desc: 'Clear, beautiful systems that move people through complex spaces with confidence and ease.' },
  { num: '03', title: 'Environmental\nGraphic Design', desc: 'Large-scale graphics, murals, and surface treatments that transform walls and facades into brand statements.' },
  { num: '04', title: 'Retail\nEnvironments', desc: 'Store design and visual merchandising systems that turn shopping spaces into immersive brand worlds.' },
  { num: '05', title: 'Exhibition\n& Events', desc: 'Trade show stands, exhibition design, and branded event spaces built to make a lasting impression.' },
  { num: '06', title: 'Brand Identity\n& Strategy', desc: 'The thinking and visual language that underpins every space we design — cohesive, considered, distinct.' },
]

const WORK_ITEMS = [
  {
    tag: 'Brand Activation',
    name: 'Meridian Sport — Global Pop-up Tour',
    aspect: '3/4.2',
    svg: (
      <svg viewBox="0 0 400 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="560" fill="#1a1410" />
        <circle cx="200" cy="250" r="180" fill="none" stroke="#c8502a" strokeWidth="1.2" opacity="0.35" />
        <circle cx="200" cy="250" r="110" fill="none" stroke="#c8502a" strokeWidth="0.8" opacity="0.25" />
        <circle cx="200" cy="250" r="50" fill="#c8502a" opacity="0.1" />
        <rect x="55" y="70" width="3" height="420" fill="#c8502a" opacity="0.5" />
        <rect x="55" y="70" width="290" height="3" fill="#c8502a" opacity="0.5" />
        <text x="75" y="160" fontFamily="sans-serif" fontSize="52" fontWeight="bold" fill="#f2efe8" opacity="0.04" letterSpacing="-2">ACTIVATE</text>
        <text x="75" y="230" fontFamily="sans-serif" fontSize="52" fontWeight="bold" fill="#f2efe8" opacity="0.04" letterSpacing="-2">THE</text>
        <text x="75" y="300" fontFamily="sans-serif" fontSize="52" fontWeight="bold" fill="#f2efe8" opacity="0.04" letterSpacing="-2">SPACE</text>
      </svg>
    ),
  },
  {
    tag: 'Wayfinding',
    name: 'Northfield Arena Signage System',
    aspect: '16/8.5',
    svg: (
      <svg viewBox="0 0 400 215" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="215" fill="#0f1418" />
        <line x1="0" y1="107" x2="400" y2="107" stroke="#1e2a38" strokeWidth="35" />
        <polyline points="30,190 90,40 160,190 240,40 320,190 390,110" fill="none" stroke="#c8502a" strokeWidth="1.5" opacity="0.7" />
        <rect x="15" y="88" width="5" height="38" fill="#c8502a" opacity="0.8" />
        <text x="28" y="112" fontFamily="sans-serif" fontSize="8" fill="#c8502a" letterSpacing="2.5" opacity="0.9">GATE A → EAST WING</text>
      </svg>
    ),
  },
  {
    tag: 'Environmental Graphic Design',
    name: 'Forma HQ Campus Identity',
    aspect: '16/8.5',
    svg: (
      <svg viewBox="0 0 400 215" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="215" fill="#18130e" />
        <rect x="0" y="0" width="400" height="55" fill="#1f180f" />
        <rect x="0" y="55" width="400" height="105" fill="#1e1710" />
        <rect x="0" y="160" width="400" height="55" fill="#18120d" />
        <rect x="20" y="18" width="140" height="2.5" fill="#c8502a" opacity="0.85" />
        <rect x="20" y="25" width="90" height="2.5" fill="#c8502a" opacity="0.45" />
        <text x="18" y="110" fontFamily="sans-serif" fontSize="55" fill="#f2efe8" opacity="0.04" fontWeight="bold" letterSpacing="-3">FORMA</text>
        <rect x="20" y="170" width="3" height="28" fill="#c8502a" opacity="0.8" />
        <text x="30" y="190" fontFamily="sans-serif" fontSize="7.5" fill="#7a7670" letterSpacing="3">ENVIRONMENTAL GRAPHICS</text>
      </svg>
    ),
  },
]

export default function HomePage() {
  const { navigateTo } = usePage()
  const heroEyebrowRef = useRef<HTMLDivElement>(null)
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroCtaRef = useRef<HTMLDivElement>(null)
  const heroRightRef = useRef<HTMLDivElement>(null)
  const svcSectionRef = useRef<HTMLElement>(null)
  const svcCardsRef = useRef<HTMLDivElement>(null)
  const statementRef = useRef<HTMLElement>(null)
  const statNumsRef = useRef<(HTMLDivElement | null)[]>([])
  const workSectionRef = useRef<HTMLElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(heroRightRef.current, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut' }, 0)
        .fromTo(heroEyebrowRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75 }, 0.3)
        .fromTo(heroHeadlineRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.85 }, 0.45)
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 0.62)
        .fromTo(heroCtaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.78)

      // Services cards stagger
      if (svcCardsRef.current) {
        const cards = svcCardsRef.current.querySelectorAll('.svc-card')
        ScrollTrigger.create({
          trigger: svcCardsRef.current,
          start: 'top 78%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.08,
              ease: 'power3.out',
            })
          },
        })
      }

      // Statement fade-in
      if (statementRef.current) {
        gsap.fromTo(
          statementRef.current.querySelector('.statement-inner'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 70%',
            },
          }
        )

        // Stats counter
        const targets = [
          { el: statNumsRef.current[0], end: 12, suffix: '+' },
          { el: statNumsRef.current[1], end: 80, suffix: '+' },
          { el: statNumsRef.current[2], end: 4, suffix: '' },
        ]
        ScrollTrigger.create({
          trigger: statementRef.current,
          start: 'top 65%',
          onEnter: () => {
            targets.forEach(({ el, end, suffix }) => {
              if (!el) return
              const counter = { val: 0 }
              gsap.to(counter, {
                val: end,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  el.textContent = Math.round(counter.val) + suffix
                },
              })
            })
          },
        })
      }

      // Work grid stagger
      if (workSectionRef.current) {
        const items = workSectionRef.current.querySelectorAll('.work-item')
        ScrollTrigger.create({
          trigger: workSectionRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
            })
          },
        })
      }

      // Clients fade-in
      if (clientsRef.current) {
        gsap.fromTo(
          clientsRef.current.querySelectorAll('.client-name'),
          { opacity: 0, y: 16 },
          {
            opacity: 0.4,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: clientsRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const STATS = [
    { label: 'Years of practice', end: 12, suffix: '+' },
    { label: 'Projects delivered', end: 80, suffix: '+' },
    { label: 'Continents', end: 4, suffix: '' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div ref={heroEyebrowRef} className="hero-eyebrow">Brand Environments &amp; Spatial Design</div>
          <h1 ref={heroHeadlineRef} className="hero-headline">
            Space is<br />your most<br /><em>powerful</em><br />brand asset.
          </h1>
          <p ref={heroSubRef} className="hero-sub">
            We design the physical world of your brand — activations that stop people, wayfinding that guides them, and environments that make them feel something.
          </p>
          <div ref={heroCtaRef} className="hero-cta">
            <button className="btn-primary" onClick={() => navigateTo('work')}>See our work</button>
            <button className="btn-ghost" onClick={() => navigateTo('services')}>What we do</button>
          </div>
        </div>
        <div ref={heroRightRef} className="hero-right">
          <HeroSVG />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section ref={svcSectionRef} className="section">
        <div className="section-label">What we do</div>
        <div ref={svcCardsRef} className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.num} className="svc-card" onClick={() => navigateTo('services')}>
              <div className="svc-num">{s.num}</div>
              <div className="svc-title" style={{ whiteSpace: 'pre-line' }}>{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section ref={statementRef} className="statement">
        <div className="statement-inner">
          <div className="section-label" style={{ color: 'var(--accent)' }}>Our belief</div>
          <h2>The best brands don't just look good —<br />they feel like <em>somewhere</em>.</h2>
          <p>We work with brands that understand the power of physical space. From the corner of a flagship store to the entrance of a stadium, we design environments that communicate, guide, and inspire.</p>
          <button className="btn-primary accent" onClick={() => navigateTo('contact')}>Start a project</button>
          <div className="stat-row">
            {STATS.map((s, i) => (
              <div key={s.label}>
                <div
                  className="stat-num"
                  ref={(el) => { statNumsRef.current[i] = el }}
                >
                  0{s.suffix}
                </div>
                <div className="stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK GRID */}
      <section ref={workSectionRef} className="section">
        <div className="work-header">
          <div>
            <div className="section-label">Selected work</div>
            <div className="section-headline">Recent<br /><em>projects</em></div>
          </div>
          <button className="btn-ghost" onClick={() => navigateTo('work')}>View all work</button>
        </div>
        <div className="work-grid">
          {WORK_ITEMS.map((item, i) => (
            <div key={i} className="work-item" onClick={() => navigateTo('work')}>
              <div className="work-inner" style={{ aspectRatio: item.aspect }}>
                {item.svg}
              </div>
              <div className="work-overlay">
                <div className="work-tag">{item.tag}</div>
                <div className="work-name">{item.name}</div>
                <div className="work-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS */}
      <div ref={clientsRef} className="clients">
        <div className="section-label clients-label" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>Trusted by</div>
        <div className="clients-row">
          {['Meridian', 'Forma Group', 'Northfield', 'Velo Co.', 'Arc Retail', 'Strata'].map((c) => (
            <div key={c} className="client-name">{c}</div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
