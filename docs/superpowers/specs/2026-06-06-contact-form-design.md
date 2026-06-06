# elkapz labs Contact Form Design

## Goal

Replace every public email action with an embedded bilingual contact form that sends enquiries to Gmail through a server-only Next.js endpoint. Visitors must stay on the website and receive clear success or recovery feedback.

## User Flow

1. Any audit or package CTA links to `#contact`.
2. The visitor completes the form in English or Serbian Latin.
3. Client-side required fields provide immediate accessible guidance.
4. The form submits JSON to `POST /api/contact`.
5. The server validates and normalizes all fields.
6. Nodemailer sends the enquiry through Gmail SMTP.
7. The visitor sees a success message and the form resets, or sees an actionable error without losing entered data.

## Fields

- Full name: required, 2–100 characters
- Business email: required, valid email, maximum 254 characters
- Company name: required, 2–120 characters
- Phone: optional, maximum 40 characters
- Interested service: required select containing Audit, Launch, Build, Automate, AI Advisor, and Not sure yet
- Biggest repetitive-work problem: required textarea, 20–2,000 characters
- Consent: required checkbox confirming permission to respond
- Website: hidden honeypot field; populated submissions return a generic success response without sending
- Locale: hidden `en` or `sr-Latn` value used for the email subject and confirmation copy

## Interface

The existing final CTA becomes a two-column contact section:

- Left: current high-impact audit message, response expectation, and three short expectation points
- Right: structured form in a raised dark surface

Inputs use visible labels, persistent optional markers, 48px minimum height, strong focus rings, inline validation, and no placeholder-only labels. Submit uses the existing acid-lime primary treatment. Loading, success, and error states use text plus icons, never color alone.

On mobile, message precedes the form. The section remains fully usable at 320px.

## CTA Changes

- Header audit button: `#contact`
- Mobile navigation audit button: `#contact`
- Hero audit button: `#contact`
- Pricing package buttons: `#contact` with no client-side email data
- Final CTA: contains the form directly
- Footer contact: links to `#contact` and displays a localized “Contact form” label
- JSON-LD: remove the public email property
- Client translation dictionaries: remove the email address

## Service Scope Update

Remove the dedicated “Customer Support AI System” service card in English and Serbian. Retain customer-support experience in the background and credibility sections because it describes operational experience rather than a standalone consultancy offer.

## Server Architecture

`app/api/contact/route.ts` accepts only JSON POST requests and runs in the Node.js runtime.

`lib/contact/validation.ts` owns pure normalization and validation so behavior is testable without SMTP.

`lib/contact/mailer.ts` creates a Nodemailer Gmail transport from:

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CONTACT_TO_EMAIL` optional; defaults to `GMAIL_USER`

The mail sender is `GMAIL_USER`. The visitor address is set as `replyTo`; it is never used as the SMTP sender. Email includes both plain-text and escaped HTML bodies.

Missing server configuration returns HTTP 503. Invalid input returns HTTP 400. SMTP failure returns HTTP 502. Unexpected errors return HTTP 500. Responses never expose credentials or raw provider errors.

## Spam and Abuse Controls

- Honeypot field
- Maximum lengths on client and server
- JSON content-type and payload-size constraints supplied by platform defaults
- Generic success response for honeypot submissions
- No visitor-supplied HTML is trusted; all HTML output is escaped

CAPTCHA and persistent rate limiting are intentionally excluded until traffic warrants external infrastructure.

## Internationalization

All labels, options, helper text, validation messages, button states, and result messages exist in English and Serbian Latin dictionaries.

The submitted locale determines the internal email subject:

- English: `New website enquiry — {service}`
- Serbian: `Novi upit sa sajta — {service}`

## Environment Setup

`.env.example` documents variable names with placeholders only. `.env.local` remains ignored and is never committed.

Gmail requires:

1. Two-Step Verification enabled
2. A 16-character Google App Password
3. App password stored as `GMAIL_APP_PASSWORD`, never the regular Gmail password

## Testing

- Validation unit tests: required fields, email format, length limits, optional phone, locale, honeypot
- Route tests: 200 success, 400 invalid, 200 honeypot, 503 missing config, 502 mail failure
- UI tests: all fields, bilingual labels, anchor replacement, loading state, success reset, error recovery, no `mailto:` links
- Full lint, typecheck, test, production build
- Playwright QA at 320px, 768px, and 1280px in both languages
