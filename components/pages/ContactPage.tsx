'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [notif, setNotif] = useState(false)
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', service: '', msg: '' })
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
      gsap.fromTo(rightRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.25 })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!notifRef.current) return
    if (notif) {
      gsap.to(notifRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' })
      const t = setTimeout(() => {
        gsap.to(notifRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => setNotif(false),
        })
      }, 3200)
      return () => clearTimeout(t)
    }
  }, [notif])

  const handleSubmit = () => {
    if (!form.first || !form.email) return
    setNotif(true)
    setForm({ first: '', last: '', email: '', company: '', service: '', msg: '' })
  }

  return (
    <>
      <div
        ref={notifRef}
        style={{
          position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 1000,
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '1rem 1.6rem',
          fontFamily: 'var(--font-dm-sans, DM Sans, sans-serif)',
          fontSize: 13,
          opacity: 0,
          transform: 'translateY(12px)',
          pointerEvents: 'none',
        }}
      >
        Message sent — we&apos;ll be in touch soon.
      </div>

      <div className="contact-split">
        <div ref={leftRef} className="contact-left">
          <div className="section-label">Contact</div>
          <div className="contact-headline">
            Let&apos;s make<br />something<br /><em>real</em>.
          </div>
          <p style={{ fontSize: 14, color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8, maxWidth: '38ch', marginTop: '0.5rem' }}>
            Whether you have a fully scoped brief or just the beginning of an idea — we&apos;d love to hear from you.
          </p>
          <div className="contact-info">
            <div>
              <div className="contact-info-label">Email</div>
              <div className="contact-info-val"><a href="mailto:hello@ashman.studio">hello@ashman.studio</a></div>
            </div>
            <div>
              <div className="contact-info-label">London studio</div>
              <div className="contact-info-val">Studio 12, Clerkenwell Works<br />Clerkenwell, London EC1R</div>
            </div>
            <div>
              <div className="contact-info-label">New business</div>
              <div className="contact-info-val"><a href="tel:+442070000000">+44 (0)20 7000 0000</a></div>
            </div>
          </div>
        </div>

        <div ref={rightRef} className="contact-right">
          <div className="section-label">Send a brief</div>
          <div className="form-row">
            <div>
              <label>First name</label>
              <input type="text" placeholder="James" value={form.first} onChange={(e) => setForm((f) => ({ ...f, first: e.target.value }))} />
            </div>
            <div>
              <label>Last name</label>
              <input type="text" placeholder="Smith" value={form.last} onChange={(e) => setForm((f) => ({ ...f, last: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" placeholder="james@company.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input type="text" placeholder="Your organisation" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
          </div>
          <div className="form-group">
            <label>Service</label>
            <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}>
              <option value="" disabled>Select a service</option>
              <option>Brand Activation</option>
              <option>Wayfinding Systems</option>
              <option>Environmental Graphic Design</option>
              <option>Retail Environments</option>
              <option>Exhibition &amp; Events</option>
              <option>Brand Identity &amp; Strategy</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tell us about your project</label>
            <textarea placeholder="Share as much or as little as you like..." value={form.msg} onChange={(e) => setForm((f) => ({ ...f, msg: e.target.value }))} />
          </div>
          <button className="form-submit" onClick={handleSubmit}>Send message →</button>
        </div>
      </div>

      <Footer />
    </>
  )
}
