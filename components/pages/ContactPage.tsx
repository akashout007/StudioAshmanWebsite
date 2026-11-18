import ContactForm from '@/components/ContactForm'
import { CTA, EMAIL, EXTERNAL, LINKS, STUDIOS } from '@/lib/site'

export default function ContactPage() {
  return (
    <div className="contact-split">
      <div className="contact-left">
        <div className="section-label">Contact</div>
        <h1 className="contact-headline">
          Start a <em>project</em>.
        </h1>
        <p className="contact-intro">
          Whether you have a fully scoped brief or just the beginning of an idea, we&apos;d love to
          hear from you. {CTA.reply}
        </p>

        <a href={LINKS.whatsapp} {...EXTERNAL} className="btn-whatsapp">
          {CTA.whatsapp} ↗
        </a>

        <div className="contact-info">
          <div>
            <h2 className="contact-info-label">Email</h2>
            <div className="contact-info-val"><a href={`mailto:${EMAIL.work}`}>{EMAIL.work}</a></div>
          </div>
          {STUDIOS.map((s) => (
            <div key={s.key}>
              <h2 className="contact-info-label">{s.city} · {s.role}</h2>
              <address className="contact-info-val">
                {s.addressLines.map((l) => <span key={l}>{l}<br /></span>)}
              </address>
              <div className="contact-info-val contact-info-actions">
                <a href={s.tel}>{s.phone}</a>
                <a href={s.mapsUrl} {...EXTERNAL}>Get directions ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-right">
        <h2 className="section-label">Send a brief</h2>
        <ContactForm />
      </div>
    </div>
  )
}
