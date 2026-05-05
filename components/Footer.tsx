'use client'
import { usePage } from '@/context/PageContext'

interface Props {
  tagline?: string
}

export default function Footer({ tagline = 'Designing the physical world of your brand — where space becomes experience.' }: Props) {
  const { navigateTo } = usePage()

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">Ashman<span>.</span>Studio</div>
          <div className="footer-tagline">{tagline}</div>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            <li><button onClick={() => navigateTo('services')}>Brand Activation</button></li>
            <li><button onClick={() => navigateTo('services')}>Wayfinding</button></li>
            <li><button onClick={() => navigateTo('services')}>Environmental Graphics</button></li>
            <li><button onClick={() => navigateTo('services')}>Retail Environments</button></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Studio</div>
          <ul className="footer-links">
            <li><button onClick={() => navigateTo('work')}>Our Work</button></li>
            <li><button onClick={() => navigateTo('studio')}>About</button></li>
            <li><button onClick={() => navigateTo('contact')}>Careers</button></li>
          </ul>
        </div>
        <div>
          <div className="footer-col-title">Contact</div>
          <ul className="footer-links">
            <li><a href="mailto:hello@ashman.studio">hello@ashman.studio</a></li>
            <li><span style={{ fontSize: 13, color: 'rgba(242,239,232,0.55)' }}>London, UK</span></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Ashman Studio</span>
        <span>Privacy Policy · Terms</span>
      </div>
    </footer>
  )
}
