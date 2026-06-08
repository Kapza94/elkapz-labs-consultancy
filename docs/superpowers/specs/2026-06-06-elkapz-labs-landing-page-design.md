# elkapz labs Landing Page Design

## Goal

Build a premium bilingual landing page for a husband-and-wife AI implementation business. The page must position elkapz labs as experienced operators and software builders who deliver practical AI systems, not as a traditional consultancy or influencer-led AI brand.

Primary conversion: start a conversation by emailing `elkapzlabs@gmail.com`.

## Audience

- Small businesses
- Growing startups and SaaS companies
- Customer support organizations
- Operations-heavy and logistics businesses
- Local service businesses
- Founders who need practical AI adoption but do not know where to start

## Positioning

Core proposition: business expertise meets technical execution.

elkapz labs combines:

- Customer support, operations, logistics, management, SOP, KPI, reporting, and escalation experience
- Workflow analysis and process improvement
- AI adoption, training, and practical implementation
- Software engineering, custom tools, integrations, automation, and technical architecture

Tone must be practical, reliable, hands-on, and outcome-focused. Avoid claims about being gurus or experts and avoid language such as revolutionary, transform your business, or change the world.

## Visual Direction

Use the selected **Editorial Operations** direction:

- Near-black background with slightly raised charcoal surfaces
- Warm-white text and muted gray-green secondary copy
- Restrained acid-lime accent reserved for primary actions, active states, status, and select highlights
- Large geometric sans-serif display typography
- Neutral sans-serif body typography
- Monospace labels for process markers, section numbers, and operational details
- Thin borders, controlled corner radii, subtle depth, and a consistent grid
- No stock photography, robots, floating brains, glowing orbs, or generic blue-purple AI gradients

The page should feel like an operational system presented with editorial clarity.

## Page Structure

### Header

- elkapz labs wordmark
- Desktop anchor navigation: Services, Why Us, Process, Pricing, FAQ
- English / Serbian language picker
- Primary Book an AI Audit action
- Compact responsive mobile navigation

### Hero

Headline: “Practical AI systems for businesses drowning in repetitive work.”

Supporting copy explains practical AI implementation across support, operations, administration, and content without jargon, bloated tools, or expensive consulting layers.

Actions:

- Book an AI Audit
- See Services

Supporting trust line:

- Husband-and-wife team
- Operations + software engineering
- Based in Belgrade, working with businesses across Europe

Hero visual: a compact operational workflow map. Repeated tasks enter as scattered items and resolve into structured AI-assisted workflows. It should explain the value proposition rather than act as abstract decoration.

### Problem

Use a strong editorial statement plus six operational symptoms:

- Copy-paste work
- Slow customer replies
- Messy or outdated SOPs
- Repeated internal and customer questions
- Manual reporting
- Team hours lost to administrative handoffs

End with a measurable framing: AI should remove friction from work already happening.

### Services

Use a responsive bento grid with four service cards:

1. AI Business Audit
2. AI Starter Setup
3. Customer Support AI System
4. AI Automation & Integration

Each card includes a short outcome statement and the supplied deliverables. Card size and layout vary to create hierarchy without reducing scanability.

### Why Work With Us

Headline: “Business Expertise Meets Technical Execution”

Body: successful AI adoption requires understanding both real operations and technical delivery.

Use two complementary role cards without personal names:

- Operations & AI Implementation
- Software Engineering & Automation

Connect the cards visually to show one delivery team, not two separate vendors. Mention Luka’s 8+ years of operations and leadership experience in supporting copy, without using his surname as company branding.

### Process

Four steps:

1. Audit
2. Map workflows
3. Build AI systems
4. Train, measure, and improve

Desktop uses a horizontal progression. Mobile uses a clear vertical sequence. Each step states its concrete output.

### Pricing

Four commercial options:

- Launch — €999
- Build — €2,499
- Automate — from €4,999
- AI Advisor — from €499/month

Build is the recommended package. Pricing remains transparent, concise, and easy to compare. Each card has a contact action pre-addressed to `elkapzlabs@gmail.com`.

### FAQ

Accessible accordion covering:

- Do I need technical knowledge?
- Can this work for a small local business?
- Do you replace employees?
- What tools do you use?
- How fast can we start?

### Final CTA

Headline: “Start with an AI audit and find out where your business is wasting time.”

Primary action opens an email addressed to `elkapzlabs@gmail.com`. Secondary text sets expectation for an initial workflow discussion.

### Footer

- elkapz labs
- Belgrade, Serbia
- Email
- Anchor links
- Current year

## Internationalization

The complete website must be available in:

- English: `en`
- Serbian Latin: `sr-Latn`

Implementation requirements:

- All user-facing copy lives in typed locale dictionaries
- Language picker is available in the header on desktop and mobile
- Selected locale persists in local storage
- Initial locale uses saved preference, then browser language, then English fallback
- Document `lang` updates when locale changes
- Page metadata has localized titles and descriptions
- Prices, brand name, email address, and tool names remain semantically unchanged
- Serbian copy must read naturally rather than mirror English word order
- Layout must tolerate longer Serbian labels without truncation or overflow

No translation backend or CMS is needed.

## Motion

Motion must clarify state or sequence:

- Hero content enters with a short, ordered opacity and translate reveal
- Workflow visual demonstrates scattered repetitive work becoming a structured system
- Process connector progresses as the section enters view
- Buttons and pressable cards use immediate active feedback
- FAQ panels animate disclosure without animating layout-heavy properties where avoidable
- Navigation and language selection provide fast state feedback

Animation rules:

- UI interactions stay around 120–220ms
- Marketing explanation may run longer but cannot block input
- Use transform and opacity for performant motion
- Use strong ease-out curves for entry and ease-in-out for movement
- Respect `prefers-reduced-motion` and provide a static equivalent
- Avoid continuous ambient motion, mouse-following effects, and decorative parallax

## Technical Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion for React for purposeful reveals and workflow explanation
- Lucide icons
- No backend

Suggested structure:

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  landing/
    header.tsx
    hero.tsx
    problem.tsx
    services.tsx
    why-us.tsx
    process.tsx
    pricing.tsx
    faq.tsx
    final-cta.tsx
    footer.tsx
  ui/
    button.tsx
    section-heading.tsx
    reveal.tsx
i18n/
  dictionaries.ts
  locale-provider.tsx
  types.ts
```

Client-side locale state is appropriate because this is a single static landing page. Components receive translated section objects from a locale provider. No API data flow or server mutation is required.

## Accessibility

- Semantic landmarks and sequential heading hierarchy
- Skip link
- Visible keyboard focus
- Minimum 44px interactive targets
- WCAG AA text contrast
- Buttons and links use descriptive labels
- FAQ uses native button semantics and correct ARIA state
- Language picker exposes current selection
- Motion is reduced or removed when requested
- No information relies only on color

## Responsive Behavior

- Mobile-first implementation
- No horizontal scrolling at 320px width
- Hero stacks with copy before workflow visual
- Bento grid collapses to one column
- Founder role cards and pricing cards stack
- Process changes from horizontal to vertical
- Navigation remains usable without tiny targets
- Type uses fluid sizing with controlled line lengths

## SEO

Localized metadata should target:

- AI implementation for small businesses
- AI automation for customer support and operations
- Business workflow automation
- AI consulting and implementation in Belgrade and Europe

Include Open Graph metadata, a descriptive title, and structured page copy. Omit the canonical URL until a production domain is known. Do not add unverifiable testimonials or fabricated client logos.

## Validation

- TypeScript and lint checks pass
- Production build passes
- Test English and Serbian at mobile, tablet, and desktop widths
- Verify keyboard navigation, focus states, language persistence, mail links, and FAQ behavior
- Inspect reduced-motion mode
- Review the implemented UI against Emil Kowalski animation principles and UI/UX Pro Max accessibility and responsive guidance
