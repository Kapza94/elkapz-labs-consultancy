# Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all email-client CTAs with a bilingual embedded form delivered securely through Gmail SMTP.

**Architecture:** A client contact component submits JSON to a Next.js Node route. Pure validation and email formatting live in focused server modules; Nodemailer credentials remain environment-only. Existing CTA components link to the form anchor.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Nodemailer, Vitest, Testing Library, Playwright CLI

---

### Task 1: Server Validation

**Files:**
- Create: `lib/contact/types.ts`
- Create: `lib/contact/validation.ts`
- Test: `tests/contact-validation.test.ts`

- [ ] Write failing tests for required values, email format, lengths, locale, optional phone, service allowlist, consent, and honeypot.
- [ ] Run `npm test -- tests/contact-validation.test.ts`; confirm failure because modules do not exist.
- [ ] Implement `validateContactSubmission(input: unknown)` returning a discriminated success/error result with normalized fields.
- [ ] Run focused tests; expect pass.
- [ ] Commit `feat: validate contact submissions`.

### Task 2: Gmail Delivery Route

**Files:**
- Create: `lib/contact/mailer.ts`
- Create: `app/api/contact/route.ts`
- Create: `.env.example`
- Test: `tests/contact-route.test.ts`

- [ ] Write failing tests for valid delivery, invalid payload, honeypot, missing Gmail config, and provider failure.
- [ ] Run focused tests; confirm expected module failure.
- [ ] Install `nodemailer` and `@types/nodemailer`.
- [ ] Implement escaped text/HTML email generation, Gmail transport, reply-to handling, and safe status responses.
- [ ] Run focused and full tests; expect pass.
- [ ] Commit `feat: deliver contact enquiries through Gmail`.

### Task 3: Bilingual Contact Form

**Files:**
- Create: `components/landing/contact-form.tsx`
- Modify: `components/landing/final-cta.tsx`
- Modify: `i18n/types.ts`
- Modify: `i18n/dictionaries.ts`
- Test: `tests/contact-form.test.tsx`

- [ ] Write failing UI tests for field labels, bilingual switching, required consent, submitted payload, loading, success reset, and error recovery.
- [ ] Run focused tests; confirm component failure.
- [ ] Add all form copy to both typed dictionaries.
- [ ] Implement accessible controlled form with client constraints and `fetch("/api/contact")`.
- [ ] Embed it in final CTA as `id="contact"`.
- [ ] Run focused and full tests; expect pass.
- [ ] Commit `feat: add bilingual contact form`.

### Task 4: Replace Public Email Actions

**Files:**
- Modify: `components/landing/header.tsx`
- Modify: `components/landing/hero.tsx`
- Modify: `components/landing/pricing.tsx`
- Modify: `components/landing/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `i18n/types.ts`
- Modify: `i18n/dictionaries.ts`
- Modify: `tests/header.test.tsx`
- Modify: `tests/landing-sections.test.tsx`
- Modify: `tests/landing-page.test.tsx`

- [ ] Write failing assertions that CTAs target `#contact`, no `mailto:` links exist, no email is rendered, and JSON-LD omits email.
- [ ] Run tests; confirm existing email links fail assertions.
- [ ] Replace all public email references and remove email from client dictionaries and structured data.
- [ ] Remove the dedicated customer-support service card in both locales and rebalance the remaining three-card grid.
- [ ] Run full tests; expect pass.
- [ ] Commit `refactor: route all enquiries through contact form`.

### Task 5: Verification and Delivery

**Files:**
- Modify only files identified by visual QA

- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
- [ ] Start local server and inspect form at 320px, 768px, and 1280px.
- [ ] Test English and Serbian, keyboard order, validation, loading, server error, and success state using Playwright CLI with SMTP mocked through missing-config behavior locally.
- [ ] Confirm no `mailto:` links or rendered email address.
- [ ] Commit any refinement.
- [ ] Push `feature/contact-form`.
- [ ] Merge into `dev`, run post-merge checks, and push `dev`.
- [ ] Leave `main` unchanged.
