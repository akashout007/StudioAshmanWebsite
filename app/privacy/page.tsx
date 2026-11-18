import Link from 'next/link'
import { EMAIL, SITE, filled } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy | Ashman Studio',
  description: 'What Ashman Studio collects through its contact form, why, and how to ask for your details to be deleted.',
  path: '/privacy',
})

// Fill these after legal review; each line renders only once it has real text.
// Where enquiries are stored and how long they're kept, as one or two plain sentences.
const DATA_HANDLING: string | null = null
// The review date, e.g. '18 November 2026'.
const LAST_UPDATED: string | null = null

export default function PrivacyPage() {
  return (
    <div className="page-hero-wrap legal">
      <div className="ash-wrap legal-body">
        <h1>Privacy</h1>
        <p>
          This page explains what {SITE.name} collects through this website, why, and how to ask us to
          delete it.
        </p>

        <h2>What we collect</h2>
        <p>
          When you send a brief through the <Link href="/contact">contact form</Link>, we receive the
          details you enter: your name, email address, phone or WhatsApp number, and optionally your
          company, city, the service you&apos;re interested in, your timeline and your message.
        </p>

        <h2>Why we collect it</h2>
        <p>
          We use these details only to reply to your enquiry and to discuss a possible project with you.
          We don&apos;t sell them, and we don&apos;t add you to a mailing list.
        </p>

        <h2>How it is handled</h2>
        <p>
          Form submissions are sent to our studio inbox by email through Resend, an email delivery
          service, which also sends you a confirmation that we received your message.
          {filled(DATA_HANDLING) && ` ${DATA_HANDLING}`}
        </p>

        <h2>Deleting your details</h2>
        <p>
          To see what we hold about you, or to ask us to delete it, email{' '}
          <a href={`mailto:${EMAIL.work}`}>{EMAIL.work}</a>. We&apos;ll confirm once it&apos;s done.
        </p>

        {filled(LAST_UPDATED) && <p className="legal-updated">Last updated: {LAST_UPDATED}</p>}
      </div>
    </div>
  )
}
