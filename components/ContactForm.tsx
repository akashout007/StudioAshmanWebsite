'use client'
import { useRef, useState, type FormEvent } from 'react'
import { EMAIL, SERVICES } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Fields = {
  name: string; email: string; phone: string; company: string
  city: string; service: string; timeline: string; message: string; website: string
}
type FieldKey = keyof Fields

const EMPTY: Fields = {
  name: '', email: '', phone: '', company: '', city: '', service: '', timeline: '', message: '', website: '',
}

const REQUIRED: FieldKey[] = ['name', 'email', 'phone', 'service', 'message']
const ORDER: FieldKey[] = ['name', 'email', 'phone', 'company', 'city', 'service', 'timeline', 'message']

function validate(f: Fields) {
  const errors: Partial<Record<FieldKey, string>> = {}
  if (!f.name.trim()) errors.name = 'Please enter your full name.'
  if (!f.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = 'Please enter a valid email address, like name@company.com.'
  if (!f.phone.trim()) errors.phone = 'Please enter a phone or WhatsApp number.'
  else if (f.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a full phone number, including the country code.'
  if (!f.service) errors.service = 'Please choose a service, or "Not sure yet".'
  if (!f.message.trim()) errors.message = 'Please tell us a little about your project.'
  return errors
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (k: FieldKey) => (e: { target: { value: string } }) => {
    const value = e.target.value
    setFields((f) => ({ ...f, [k]: value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return
    const found = validate(fields)
    setErrors(found)
    const first = ORDER.find((k) => found[k])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${first}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (k: FieldKey) => ({
    id: `cf-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    required: REQUIRED.includes(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `cf-${k}-error` : undefined,
  })

  const err = (k: FieldKey) =>
    errors[k] ? <p id={`cf-${k}-error`} className="field-error">{errors[k]}</p> : null

  const mailto = `mailto:${EMAIL.work}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(
    [
      fields.name && `Name: ${fields.name}`,
      fields.phone && `Phone: ${fields.phone}`,
      fields.company && `Company: ${fields.company}`,
      fields.service && `Service: ${fields.service}`,
      fields.message && `\n${fields.message}`,
    ].filter(Boolean).join('\n'),
  )}`

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="cf-required-note">
      <p id="cf-required-note" className="form-required-note">Fields marked * are required.</p>

      <div className="form-group">
        <label htmlFor="cf-name">Full name *</label>
        <input type="text" autoComplete="name" {...fieldProps('name')} />
        {err('name')}
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="cf-email">Email *</label>
          <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="cf-phone">Phone / WhatsApp *</label>
          <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
          {err('phone')}
        </div>
      </div>

      <div className="form-row">
        <div>
          <label htmlFor="cf-company">Company</label>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
        </div>
        <div className="form-group form-group-inline">
          <label htmlFor="cf-city">City</label>
          <select autoComplete="address-level2" {...fieldProps('city')}>
            <option value="">Select a city</option>
            <option>New Delhi</option>
            <option>Dubai</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group form-group-inline">
          <label htmlFor="cf-service">Service *</label>
          <select {...fieldProps('service')}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
            <option>Not sure yet</option>
          </select>
          {err('service')}
        </div>
        <div className="form-group form-group-inline">
          <label htmlFor="cf-timeline">Timeline</label>
          <select {...fieldProps('timeline')}>
            <option value="">Select a timeline</option>
            <option>ASAP</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-message">Tell us about your project *</label>
        <textarea {...fieldProps('message')} />
        {err('message')}
      </div>

      <div className="form-hp" aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input type="text" id="cf-website" name="website" tabIndex={-1} autoComplete="off"
          value={fields.website} onChange={set('website')} />
      </div>

      <button type="submit" className="form-submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>

      <p className="form-note">
        Every project is scoped and priced to its requirements. Tell us what you&apos;re building and
        we&apos;ll come back with a proposal.
      </p>

      <div className="form-status" aria-live="polite">
        {status === 'success' && (
          <p className="form-success">Thank you. Your message has reached us, and we&apos;ll reply within two working days.</p>
        )}
      </div>
      <div role="alert">
        {status === 'error' && (
          <p className="form-failure">
            Sorry, your message didn&apos;t send. Please try again, or email us directly at{' '}
            <a href={mailto}>{EMAIL.work}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
