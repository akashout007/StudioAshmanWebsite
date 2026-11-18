import Link from 'next/link'
import { EMAIL, SITE } from '@/lib/site'

export default function PrivacyPage() {
  return (
    <div className="page-hero-wrap legal">
      <div className="ash-wrap legal-body">
        <p className="legal-flag">[PLACEHOLDER: LEGAL REVIEW] This page is a plain-language draft and has not been reviewed by a lawyer.</p>
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
          Form submissions are sent to our studio inbox by email through an email delivery provider.
          [PLACEHOLDER: LEGAL REVIEW: name the email provider, where data is stored, and how long
          enquiries are kept.]
        </p>

        <h2>Deleting your details</h2>
        <p>
          To see what we hold about you, or to ask us to delete it, email{' '}
          <a href={`mailto:${EMAIL.work}`}>{EMAIL.work}</a>. We&apos;ll confirm once it&apos;s done.
        </p>

        <p className="legal-updated">Last updated: [PLACEHOLDER: date of legal review]</p>
      </div>
    </div>
  )
}
