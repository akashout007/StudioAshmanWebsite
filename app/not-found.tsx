import Link from 'next/link'
import { CTA } from '@/lib/site'

export const metadata = { title: 'Page not found | Ashman Studio', robots: { index: false } }

export default function NotFound() {
  return (
    <div className="page-hero-wrap legal not-found">
      <div className="ash-wrap legal-body">
        <div className="ash-eyebrow"><span className="dash" />404</div>
        <h1>This page has <em>wandered off</em>.</h1>
        <p>
          The link may be old, or the page may have moved. Good wayfinding means a clear way back, so
          here are two.
        </p>
        <div className="hero-ctas">
          <Link href="/work" className="btn-primary">See brand stories →</Link>
          <Link href="/contact" className="btn-outline">{CTA.primary}</Link>
        </div>
      </div>
    </div>
  )
}
