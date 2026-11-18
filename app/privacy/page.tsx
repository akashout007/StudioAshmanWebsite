// Draft pending legal review.
// Plain-language draft: no certifications, named laws or fixed retention periods are claimed.
import Link from 'next/link'
import { EMAIL, SITE } from '@/lib/site'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Privacy | Ashman Studio',
  description: 'What Ashman Studio collects through its contact form, why, who handles it, and how to ask for your details to be corrected or deleted.',
  path: '/privacy',
})

const LAST_UPDATED = '18 November 2026'

export default function PrivacyPage() {
  const email = <a href={`mailto:${EMAIL.work}`}>{EMAIL.work}</a>

  return (
    <div className="page-hero-wrap legal">
      <div className="ash-wrap legal-body">
        <h1>Privacy</h1>
        <p>
          This page explains, in plain language, what we collect through this website, why we collect
          it, who handles it, and what you can ask us to do with it.
        </p>

        <h2>Who we are</h2>
        <p>
          {SITE.name} is a brand identity, wayfinding and spatial branding studio with studios in New
          Delhi and Dubai. For anything about your information, email us at {email}.
        </p>

        <h2>What the contact form collects</h2>
        <p>
          When you send a message through our <Link href="/contact">contact form</Link>, we receive what
          you type in: your name, email address and phone or WhatsApp number, the service you&apos;re
          interested in and your message, and, if you add them, your company, city and timeline.
        </p>

        <h2>Why we collect it</h2>
        <p>
          We use these details to reply to your enquiry and, if you&apos;d like to work with us, to
          prepare a proposal. We don&apos;t sell them, and we don&apos;t add you to a mailing list.
        </p>

        <h2>Who handles it</h2>
        <p>
          Resend, an email delivery service, sends your message to our studio inbox and sends you a
          confirmation that it arrived. Vercel hosts this website. Both handle your details only to
          provide those services to us.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep your details only for as long as we need them to handle your enquiry and any
          project that comes from it.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us at any time to see the details we hold about you, to correct them, or to
          delete them. Email {email} and we&apos;ll confirm once it&apos;s done.
        </p>

        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
      </div>
    </div>
  )
}
