// app/api/contact/route.ts — Ashman Studio contact form → Resend
// Env (set in Vercel for Production + Preview): RESEND_API_KEY (sending-only, studioashman.com)

import { Resend } from "resend";
import { randomUUID } from "crypto";

const TO = "work@studioashman.com";
const FROM_NOTIFY = "Ashman Studio Website <work@studioashman.com>";
const FROM_CONFIRM = "Ashman Studio <work@studioashman.com>";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? escape(v.trim().slice(0, max)) : "";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254;

// Created on first use: the Resend constructor throws without a key, which would break builds that lack one.
let client: Resend | null = null;
const resend = () => (client ??= new Resend(process.env.RESEND_API_KEY));

// Retry with exponential backoff on transient failures (rate limit / server errors).
async function sendWithRetry(payload: Parameters<Resend["emails"]["send"]>[0], idempotencyKey: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data, error } = await resend().emails.send(payload, { idempotencyKey });
    if (!error) return data;
    const retryable = ["rate_limit_exceeded", "internal_server_error", "application_error"].includes(error.name);
    if (!retryable || attempt === 2) throw new Error(`${error.name}: ${error.message}`);
    await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill the hidden "website" field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
  const name = clean(body.name, 100);
  const message = clean(body.message, 5000);
  const phone = clean(body.phone, 40) || "Not provided";
  const company = clean(body.company, 120) || "Not provided";
  const service = clean(body.service, 80);
  const city = clean(body.city, 40);
  const timeline = clean(body.timeline, 40);

  if (!name || !message || !isEmail(rawEmail)) {
    return Response.json({ ok: false, error: "Please add your name, a valid email and a message." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set; enquiry not sent.");
    return Response.json({ ok: false, error: "Couldn't send right now. Please email work@studioashman.com." }, { status: 503 });
  }

  // The notify template has no slots for service, city or timeline, so they lead the message.
  const details = [service && `Service: ${service}`, city && `City: ${city}`, timeline && `Timeline: ${timeline}`]
    .filter(Boolean)
    .join("\n");
  const notifyMessage = details ? `${details}\n\n${message}` : message;

  // One ID per submission: a double-click or retry can never send twice.
  const submissionId = typeof body.submissionId === "string" ? body.submissionId.slice(0, 64) : randomUUID();

  try {
    // 1) Notify the studio. Reply-To = visitor, so hitting reply answers them directly.
    await sendWithRetry(
      {
        from: FROM_NOTIFY,
        to: [TO],
        replyTo: rawEmail,
        template: {
          id: "contact-new-enquiry",
          variables: { NAME: name, VISITOR_EMAIL: escape(rawEmail), PHONE: phone, COMPANY: company, MESSAGE: notifyMessage },
        },
      },
      `contact-notify-${submissionId}`,
    );

    // 2) Confirm to the visitor. Message excerpt is capped so the form can't be abused as a spam relay.
    await sendWithRetry(
      {
        from: FROM_CONFIRM,
        to: [rawEmail],
        replyTo: TO,
        template: {
          id: "contact-confirmation",
          variables: { NAME: name, MESSAGE: message.length > 300 ? message.slice(0, 300) + "…" : message },
        },
      },
      `contact-confirm-${submissionId}`,
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ ok: false, error: "Couldn't send right now. Please email work@studioashman.com." }, { status: 502 });
  }
}
