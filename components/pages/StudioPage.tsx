'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePage } from '@/context/PageContext'
import Footer from '@/components/Footer'
import StudioSVG from '@/components/svg/StudioSVG'

gsap.registerPlugin(ScrollTrigger)

const VALUES = [
  {
    title: 'Craft over speed',
    desc: 'We take the time to get it right. Every project receives the same level of obsessive attention to detail — regardless of budget or timeline.',
  },
  {
    title: 'Spatial thinking first',
    desc: 'We think in three dimensions from the very beginning. Strategy and concept work always considers how ideas will live in physical space.',
  },
  {
    title: 'Honest partnerships',
    desc: 'We tell you what we think — even when it's uncomfortable. Our clients keep coming back because we treat their challenges as our own.',
  },
  {
    title: 'Made to last',
    desc: 'We design systems, not just moments. Everything we make is built to flex, grow, and remain relevant — long after the launch date.',
  },
]

export default function StudioPage() {
  const { navigateTo } = usePage()
  const heroRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })

      if (splitRef.current) {
        gsap.fromTo(
          splitRef.current.querySelector('.studio-left'),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: splitRef.current, start: 'top 75%' },
          }
        )
        gsap.fromTo(
          splitRef.current.querySelector('.studio-right'),
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: splitRef.current, start: 'top 75%' },
          }
        )
      }

      if (valuesRef.current) {
        const items = valuesRef.current.querySelectorAll('.value-item')
        ScrollTrigger.create({
          trigger: valuesRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
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
        <div className="section-label">Studio</div>
        <h1>Built to make<br />brands <em>felt</em>.</h1>
      </div>

      <div ref={splitRef} className="studio-split">
        <div className="studio-left">
          <div className="section-label">Who we are</div>
          <p className="studio-body">Ashman Studio is an independent brand environment practice founded on a single conviction: that the physical world is the most powerful channel a brand has.</p>
          <p className="studio-body">We're a team of strategists, spatial designers, graphic designers, and production specialists — brought together by a shared obsession with how spaces make people feel.</p>
          <p className="studio-body">Our work spans physical brand activation, wayfinding, and environmental graphic design. We work with brands and organisations who want to leave a mark — not just a logo.</p>
          <div style={{ marginTop: '3rem' }}>
            <button className="btn-primary" onClick={() => navigateTo('contact')}>Work with us</button>
          </div>
        </div>
        <div className="studio-right">
          <StudioSVG />
        </div>
      </div>

      <div ref={valuesRef} className="values-row">
        {VALUES.map((v) => (
          <div key={v.title} className="value-item">
            <div className="value-num">—</div>
            <div className="value-title">{v.title}</div>
            <div className="value-desc">{v.desc}</div>
          </div>
        ))}
      </div>

      <Footer tagline="Designing the physical world of your brand." />
    </>
  )
}
