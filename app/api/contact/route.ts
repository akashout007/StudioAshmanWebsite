import { NextResponse } from 'next/server'
import { EMAIL, SERVICES } from '@/lib/site'

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), 'Not sure yet']
const CITY_OPTIONS = ['', 'New Delhi', 'Dubai', 'Other']
const TIMELINE_OPTIONS = ['', 'ASAP', '1–3 months', '3–6 months', 'Just exploring']

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Honeypot: real visitors never see this field, so a value means a bot. Pretend success.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 160),
    city: clean(body.city, 40),
    service: clean(body.service, 80),
    timeline: clean(body.timeline, 40),
    message: clean(body.message, 5000),
  }

  const invalid =
    !data.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    data.phone.replace(/\D/g, '').length < 7 ||
    !SERVICE_OPTIONS.includes(data.service) ||
    !CITY_OPTIONS.includes(data.city) ||
    !TIMELINE_OPTIONS.includes(data.timeline) ||
    !data.message
  if (invalid) return NextResponse.json({ error: 'invalid_fields' }, { status: 422 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set; enquiry not sent.')
    return NextResponse.json({ error: 'not_configured' }, { status: 503 })
  }

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone / WhatsApp: ${data.phone}`,
    `Company: ${data.company || '—'}`,
    `City: ${data.city || '—'}`,
    `Service: ${data.service}`,
    `Timeline: ${data.timeline || '—'}`,
    '',
    data.message,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Ashman Studio website <website@studioashman.com>',
      to: [process.env.CONTACT_TO_EMAIL || EMAIL.work],
      reply_to: data.email,
      subject: `New project enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}`,
      text,
    }),
  })

  if (!res.ok) {
    console.error('Contact form: Resend responded', res.status, await res.text().catch(() => ''))
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
