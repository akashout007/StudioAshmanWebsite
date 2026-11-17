import Link from 'next/link'

export default function FooterProject() {
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
              Independent practice. Studios in New Delhi and Dubai.
            </div>
          </div>

          <div>
            <div className="footer-col-title">What we do</div>
            <ul className="footer-links">
              <li><Link href="/?section=services">Wayfinding</Link></li>
              <li><Link href="/?section=services">Sign Design</Link></li>
              <li><Link href="/?section=services">Environmental Graphics</Link></li>
              <li><Link href="/?section=services">Brand Activation</Link></li>
              <li><Link href="/?section=services">Retail Environments</Link></li>
              <li><Link href="/?section=services">Spatial Identity</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Studio</div>
            <ul className="footer-links">
              <li><Link href="/?section=studio">Our story</Link></li>
              <li><Link href="/?section=studio">Team</Link></li>
              <li><Link href="/?section=work">Selected work</Link></li>
              <li><Link href="/?section=studio">Awards &amp; press</Link></li>
              <li><Link href="/?section=studio">Careers</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Studios</div>
            <ul className="footer-links">
              <li><Link href="/?section=contact">New Delhi · HQ ↗</Link></li>
              <li><Link href="/?section=contact">Dubai ↗</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Get in touch</div>
            <ul className="footer-links">
              <li><a href="mailto:work@studioashman.com">work@studioashman.com</a></li>
              <li><a href="mailto:press@ashmanstudios.com">press@ashmanstudios.com</a></li>
              <li><a href="mailto:careers@ashmanstudios.com">careers@ashmanstudios.com</a></li>
              <li><a href="#">Instagram ↗</a></li>
              <li><a href="#">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2024–2026 Ashman Studio · Founded by Akash Manna</span>
        <span className="center">✦ Designing the physical world of your brand</span>
        <span className="right">
          <a href="#">Privacy</a>
          {' · '}
          <a href="#">Terms</a>
          {' · '}
          <a href="#">Colophon</a>
        </span>
      </div>
    </footer>
  )
}
