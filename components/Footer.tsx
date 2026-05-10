'use client'
import { usePage } from '@/context/PageContext'

export default function Footer() {
  const { navigateTo } = usePage()

  return (
    <footer>
      <div className="footer-mark" aria-hidden="true">ASHMAN</div>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">Ashman<span>.</span>Studio</div>
            <div className="footer-tagline">
              We design the physical world of <em>your brand</em> — where space becomes experience.
            </div>
            <div className="footer-tag-sub">
              Independent practice. Founded New Delhi 2024. Studios in New Delhi, Chandigarh and Dubai.
            </div>
          </div>

          <div>
            <div className="footer-col-title">What we do</div>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('services')}>Wayfinding</button></li>
              <li><button onClick={() => navigateTo('services')}>Sign Design</button></li>
              <li><button onClick={() => navigateTo('services')}>Environmental Graphics</button></li>
              <li><button onClick={() => navigateTo('services')}>Brand Activation</button></li>
              <li><button onClick={() => navigateTo('services')}>Retail Environments</button></li>
              <li><button onClick={() => navigateTo('services')}>Spatial Identity</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('studio')}>Our story</button></li>
              <li><button onClick={() => navigateTo('studio')}>Team</button></li>
              <li><button onClick={() => navigateTo('work')}>Selected work</button></li>
              <li><button onClick={() => navigateTo('studio')}>Awards &amp; press</button></li>
              <li><button onClick={() => navigateTo('studio')}>Careers</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Studios</div>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('contact')}>New Delhi · HQ ↗</button></li>
              <li><button onClick={() => navigateTo('contact')}>Chandigarh ↗</button></li>
              <li><button onClick={() => navigateTo('contact')}>Dubai ↗</button></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get in touch</div>
            <ul className="footer-links">
              <li><a href="mailto:hello@ashman.studio">hello@ashman.studio</a></li>
              <li><a href="mailto:press@ashman.studio">press@ashman.studio</a></li>
              <li><a href="mailto:careers@ashman.studio">careers@ashman.studio</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram ↗</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024–2026 Ashman Studio · Founded by Akash Manna</span>
        <span className="center">✦ Designing the physical world of your brand</span>
        <span className="right">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
          {' · '}
          <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
          {' · '}
          <a href="#" onClick={(e) => e.preventDefault()}>Colophon</a>
        </span>
      </div>
    </footer>
  )
}
