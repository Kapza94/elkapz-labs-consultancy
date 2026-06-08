# elkapz labs Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a premium bilingual Next.js landing page for elkapz labs with accessible language switching, purposeful motion, transparent pricing, and email conversion.

**Architecture:** Use a static Next.js App Router application. A client locale provider owns English and Serbian Latin state, persistence, and document language; focused landing-page components consume one typed dictionary. Motion stays isolated in reusable reveal primitives and explanatory workflow/process components.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Motion for React, Lucide React, Vitest, Testing Library

---

## File Map

- `app/layout.tsx`: root metadata, fonts, viewport, providers
- `app/page.tsx`: page composition only
- `app/globals.css`: design tokens, global layout, focus, motion fallback
- `components/landing/*`: one focused component per page section
- `components/ui/*`: reusable button, section heading, reveal primitives
- `i18n/types.ts`: locale and dictionary contracts
- `i18n/dictionaries.ts`: complete English and Serbian Latin content
- `i18n/locale-provider.tsx`: locale selection and persistence
- `tests/i18n.test.tsx`: dictionary completeness and locale switching
- `tests/landing-page.test.tsx`: semantic content and accessible interactions

### Task 1: Scaffold and Tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1:** Scaffold Next.js with TypeScript, Tailwind, App Router, ESLint, and `src` disabled.
- [ ] **Step 2:** Install `motion`, `lucide-react`, Vitest, jsdom, and Testing Library.
- [ ] **Step 3:** Add `test`, `typecheck`, and `check` scripts.
- [ ] **Step 4:** Run `npm run lint`, `npm run typecheck`, and `npm run build`; expect exit code 0.
- [ ] **Step 5:** Commit with `chore: scaffold Next.js landing page`.

### Task 2: Typed Internationalization

**Files:**
- Create: `i18n/types.ts`
- Create: `i18n/dictionaries.ts`
- Create: `i18n/locale-provider.tsx`
- Test: `tests/i18n.test.tsx`

- [ ] **Step 1:** Write tests asserting both locales expose identical top-level keys and Serbian includes translated hero, navigation, services, pricing, FAQ, and CTA content.
- [ ] **Step 2:** Run `npm test -- tests/i18n.test.tsx`; expect failure because dictionaries do not exist.
- [ ] **Step 3:** Implement typed dictionaries and locale provider with `localStorage`, browser-language detection, English fallback, and `document.documentElement.lang` updates.
- [ ] **Step 4:** Run the focused test; expect all tests to pass.
- [ ] **Step 5:** Commit with `feat: add English and Serbian translations`.

### Task 3: Shared Design Primitives and Header

**Files:**
- Create: `components/ui/button-link.tsx`
- Create: `components/ui/section-heading.tsx`
- Create: `components/ui/reveal.tsx`
- Create: `components/landing/header.tsx`
- Test: `tests/header.test.tsx`

- [ ] **Step 1:** Write tests for accessible navigation, current language state, English/Serbian switching, and audit mail link.
- [ ] **Step 2:** Run `npm test -- tests/header.test.tsx`; expect failure because components do not exist.
- [ ] **Step 3:** Implement primitives and responsive header with explicit `EN` and `SR` controls, visible focus, 44px targets, and active press feedback.
- [ ] **Step 4:** Run focused and full test suites; expect all tests to pass.
- [ ] **Step 5:** Commit with `feat: add bilingual navigation`.

### Task 4: Hero, Problem, and Services

**Files:**
- Create: `components/landing/hero.tsx`
- Create: `components/landing/workflow-visual.tsx`
- Create: `components/landing/problem.tsx`
- Create: `components/landing/services.tsx`
- Test: `tests/landing-content.test.tsx`

- [ ] **Step 1:** Write tests for one `h1`, both hero actions, six problem signals, four service headings, and translated content after locale change.
- [ ] **Step 2:** Run focused test; expect failure because sections do not exist.
- [ ] **Step 3:** Implement editorial hero, explanatory workflow animation, problem grid, and service bento cards.
- [ ] **Step 4:** Ensure animations use transform/opacity, stop under reduced motion, and never block interaction.
- [ ] **Step 5:** Run focused and full tests; expect all tests to pass.
- [ ] **Step 6:** Commit with `feat: build hero and service narrative`.

### Task 5: Why Us and Process

**Files:**
- Create: `components/landing/why-us.tsx`
- Create: `components/landing/process.tsx`
- Test: `tests/why-process.test.tsx`

- [ ] **Step 1:** Write tests for the husband-and-wife positioning, two capability cards, Luka’s 8+ years context, and four ordered process steps.
- [ ] **Step 2:** Run focused test; expect failure because sections do not exist.
- [ ] **Step 3:** Implement connected capability cards and responsive process progression with in-view connector motion.
- [ ] **Step 4:** Run focused and full tests; expect all tests to pass.
- [ ] **Step 5:** Commit with `feat: explain team and delivery process`.

### Task 6: Pricing, FAQ, CTA, and Footer

**Files:**
- Create: `components/landing/pricing.tsx`
- Create: `components/landing/faq.tsx`
- Create: `components/landing/final-cta.tsx`
- Create: `components/landing/footer.tsx`
- Test: `tests/conversion.test.tsx`

- [ ] **Step 1:** Write tests for all package prices, Build recommendation, five FAQ buttons with `aria-expanded`, translated answers, and all email actions targeting `elkapzlabs@gmail.com`.
- [ ] **Step 2:** Run focused test; expect failure because sections do not exist.
- [ ] **Step 3:** Implement conversion sections, animated accessible FAQ disclosure, and footer.
- [ ] **Step 4:** Run focused and full tests; expect all tests to pass.
- [ ] **Step 5:** Commit with `feat: add pricing and conversion sections`.

### Task 7: Composition, SEO, and Responsive Polish

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `README.md`
- Test: `tests/landing-page.test.tsx`

- [ ] **Step 1:** Write integration tests for landmarks, heading order, section anchors, skip link, locale provider, and no missing translated strings.
- [ ] **Step 2:** Run focused test; expect failure until the complete page is composed.
- [ ] **Step 3:** Compose all sections and add metadata, Open Graph fields, JSON-LD organization data, responsive tokens, selection colors, and reduced-motion overrides.
- [ ] **Step 4:** Document local development and scripts in README.
- [ ] **Step 5:** Run `npm run check` and `npm run build`; expect exit code 0.
- [ ] **Step 6:** Commit with `feat: complete bilingual landing page`.

### Task 8: Browser Review and Refinement

**Files:**
- Modify: landing components and `app/globals.css` only where inspection finds issues

- [ ] **Step 1:** Run the development server and inspect English at 390px, 768px, and 1440px.
- [ ] **Step 2:** Switch to Serbian and inspect every section for overflow, awkward wrapping, untranslated copy, and control sizing.
- [ ] **Step 3:** Verify keyboard navigation, FAQ disclosure, mail links, sticky header, and language persistence.
- [ ] **Step 4:** Inspect reduced-motion mode and confirm content remains complete and understandable.
- [ ] **Step 5:** Review against Emil Kowalski principles using a Before/After/Why table; apply necessary refinements.
- [ ] **Step 6:** Run `npm run check` and `npm run build` again; expect exit code 0.
- [ ] **Step 7:** Commit with `fix: refine responsive design and motion`.

### Task 9: Feature Delivery

- [ ] **Step 1:** Review `git diff dev...feature/landing-page` for accidental files, secrets, generated output, and unrelated changes.
- [ ] **Step 2:** Push `feature/landing-page`.
- [ ] **Step 3:** Merge feature branch into `dev` only after all checks pass.
- [ ] **Step 4:** Push `dev`.
- [ ] **Step 5:** Leave `main` unchanged until explicit release approval.
