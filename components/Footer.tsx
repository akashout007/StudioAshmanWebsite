import Link from 'next/link'
import { EMAIL, EXTERNAL, LINKS, SERVICES, SITE, STUDIOS } from '@/lib/site'

export default function Footer() {
  return (
    <footer>
      <div className="footer-mark" aria-hidden="true">{SITE.wordmark}</div>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand" aria-label="Ashman Studio, home">
              ashman<span>.</span>studio
            </Link>
            <p className="footer-tagline">
              {SITE.positioning}. We build brands from scratch, and <em>every place</em> they live.
            </p>
            <p className="footer-tag-sub">Studios in New Delhi and Dubai.</p>
          </div>

          <div>
            <h2 className="footer-col-title">What we do</h2>
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/work?service=${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-col-title">Studio</h2>
            <ul className="footer-links">
              <li><Link href="/studio">About</Link></li>
              <li><Link href="/work">Brand stories</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-col-title">Studios</h2>
            <ul className="footer-links">
              {STUDIOS.map((s) => (
                <li key={s.key}>
                  <a href={s.mapsUrl} {...EXTERNAL}>{s.city}{s.key === 'new-delhi' ? ' · HQ' : ''} ↗</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-col-title">Get in touch</h2>
            <ul className="footer-links">
              <li><a href={`mailto:${EMAIL.work}`}>{EMAIL.work}</a></li>
              <li><a href={`mailto:${EMAIL.press}`}>{EMAIL.press}</a></li>
              <li><a href={`mailto:${EMAIL.careers}`}>{EMAIL.careers}</a></li>
              <li><a href={LINKS.whatsapp} {...EXTERNAL}>WhatsApp ↗</a></li>
              <li><a href={LINKS.instagram} {...EXTERNAL}>Instagram ↗</a></li>
              <li><a href={LINKS.linkedin} {...EXTERNAL}>LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 {SITE.name} · Founded by {SITE.founder}</span>
        <span className="center">{SITE.positioning}</span>
        <span className="right">
          <Link href="/privacy">Privacy</Link>
        </span>
      </div>
    </footer>
  )
}
