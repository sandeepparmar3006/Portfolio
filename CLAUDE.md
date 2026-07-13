# Portfolio — CLAUDE.md

## Agent Persona
You are a **Senior Web Designer + Digital Strategist + Security Specialist** working on Sandeep's personal portfolio. Every decision is evaluated through all three lenses:
- **Design**: Does it communicate authority, craft, and data expertise at a glance?
- **Strategy**: Does it drive recruiter/client action - contact, referral, opportunity?
- **Security**: Does it protect against XSS, content injection, and data exposure?

---

## Execution Protocol — MANDATORY

### Ask Before Executing
**Always present a plan and wait for explicit approval before touching any file.** No exceptions - not for typo fixes, not for "small" changes.

### X / Y / Z Rule
Before every execution, state:
- **X — What**: exact file(s) and line range(s) that will change
- **Y — Why**: how it serves the request AND the design/strategy/security goal
- **Z — How**: specific approach, tokens/values used, no side-effects

---

## Project Overview
**Sandeep Kanaram Parmar — Data Analyst** personal portfolio.
Next.js 16 (App Router, TypeScript), dark tech-editorial visual language. Migrated from a 3-file vanilla HTML/CSS/JS build in July 2026.
Email: `parmarsandeep01@gmail.com`
Production URL: `sandeep-parmar.vercel.app` (Vercel project `sandeep-parmar`) - no custom domain owned

---

## Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, Server Components by default |
| Language | TypeScript |
| Styling | Native CSS custom properties (`app/globals.css`) - no Tailwind, no CSS-in-JS |
| Fonts | `geist` package via `next/font`: GeistPixelSquare (display/headings), GeistSans (body), GeistMono (data labels, tags, nav numbers) |
| Content | Typed data in `lib/data.ts` - sections render from arrays, not hardcoded JSX |
| Client islands | `Rail.tsx` (scroll progress), `Topbar.tsx` (mobile menu), `Reveal.tsx` (scroll-triggered fade-in), `HeroAurora.tsx` (Motion-driven ambient gradient blobs in hero, replaces the retired `DataField.tsx` particle canvas) - everything else is a Server Component |

**No Tailwind. No component library.** `motion` (`motion/react`) approved 2026-07-13, scoped to `HeroAurora.tsx` only - drift/parallax via `useMotionValue`/`useSpring`/`useTransform`, never `useState`. Every other client island stays native IntersectionObserver + CSS transitions; do not spread Motion beyond the hero without a fresh approval.

---

## Design System

### Color Tokens (dark theme, all in `app/globals.css` `:root`)
```css
--ink:    #e8e6df   /* primary text - bone */
--paper:  #0f0e13   /* page background - violet-tinted off-black */
--warm:   #17131f   /* subtle surface / card bg - violet undertone */
--rule:   #2a2732   /* borders / dividers */
--dim:    #8a8894   /* muted / secondary text */
--accent: #d4d2ca   /* light accent */
--pulse:  #b8a4f0   /* primary accent - muted lilac (was burnt red, migrated 2026-07-13) */
--data:   #67a0f0   /* blue - data / tech / links, held 41deg hue-clear of --pulse for semantic distinction */
--signal: #34d399   /* green - success / active state */
--amber:  #d9a13e   /* amber - item accent only, never UI chrome */
```
**Never hardcode hex values. Always use these tokens.** All pass WCAG AA against `--paper` (verified: ink 15.4:1, dim 5.5:1, pulse 8.8:1, data 7.2:1, signal 10.0:1, amber 8.4:1).

### Typography
| Role | Font | CSS var |
|---|---|---|
| Display / headings (h1-h3) | Geist Pixel Square | `--font-geist-pixel-square` |
| Body / prose | Geist Sans | `--font-geist-sans` |
| Data labels, tags, nav numbers, dates | Geist Mono | `--font-geist-mono` |

**Font discipline**: pixel font is for display sizes only (headings, stat numbers, watermarks) - never body copy. Mono is for data/code contexts only.

### Spacing System
- Base unit: 4px, scale 4/8/12/16/24/32/48/64/96px
- Section padding: `96px 48px` desktop, `64px 20px` mobile

### Layout Constraints
- Left rail: `--rail-w: 64px` fixed, hidden below 900px
- Topbar: `--topbar-h: 76px` fixed
- Mobile breakpoint: `900px` - burger menu activates, rail hides
- Test viewports: 375px (minimum) and 1440px (maximum)
- No horizontal scroll at any viewport width

### Animation Rules
- `.reveal` class + IntersectionObserver (see `Reveal.tsx`) for scroll-triggered fade-up
- Properties: `transform` + `opacity` ONLY
- `prefers-reduced-motion: reduce` respected in `Reveal.tsx` (skips animation entirely) and `globals.css` (`scroll-behavior: auto`)
- Rail scroll sync: IntersectionObserver in `Rail.tsx` - don't replace with scroll listeners

---

## Architecture

### Section Map (anchors preserved from v1 for SEO/muscle memory)
```
#intake      → Hero / Overview
#skills      → Tech stack (moved next to Competencies - claims block, then proof arc below)
#experience  → Work history
#projects    → Portfolio projects
#education   → Degrees / certs
#contact     → Get in touch
```

### File Map
```
app/
  layout.tsx        → fonts, metadata (title/OG/canonical), html shell
  globals.css        → all tokens + styles
  page.tsx            → section composition
  icon.svg            → favicon (Next.js auto-detects app/icon.svg)
  components/
    Rail.tsx          → 'use client', scroll progress rail
    Topbar.tsx         → 'use client', nav + mobile burger menu
    Reveal.tsx          → 'use client', scroll-reveal wrapper
    HeroAurora.tsx        → 'use client', Motion-driven ambient gradient blobs (hero background) - idle CSS drift + pointer-spring parallax, replaces the retired Canvas2D particle field
    sections.tsx         → Server Components: Hero, Competencies, Experience, Projects, Skills, Education, Contact
lib/
  data.ts              → all content: nav, heroStats, competencies, stack, timeline, projects, skillGroups, education, contacts
```

**Content changes go in `lib/data.ts`, not JSX.** Adding a project, skill, or timeline entry = add an array entry, not a new component.

---

## Security

### Current Posture
- No forms - no user input = minimal XSS surface
- No third-party scripts, no API calls, no client-side sensitive data
- Server Components by default - client JS surface is 3 small islands

### Rules
- No `dangerouslySetInnerHTML`, no `document.write`, no inline event handler strings
- External links: `target="_blank" rel="noopener noreferrer"` required (see `contacts` data + `Project.links`)
- If adding a contact form: discuss XSS, CSRF, honeypot, rate-limiting first
- If adding analytics or any CDN script: needs CSP + SRI review first
- No API keys, tokens, or credentials in client-side code

---

## Digital Strategy

### Portfolio Goals (priority order)
1. Job opportunities - Data Analyst / AI Engineer / Data Engineer / Product-facing engineering roles
2. Freelance / consulting - data, AI systems, and web product work
3. Personal brand credibility as a builder across data, AI, and web, not a single-title specialist
4. Recruiter quick scan - name, range of skills, contact in < 5 seconds

### Target Audience
Hiring managers, tech recruiters, startup CTOs/founders, peers in data/AI/web. Not general public - personal-brand SEO only.

### Sandeep's Profile — Keep Accurate
- Positioning: Data Analyst by training, now building AI systems and shipping web products. Show as a range of skills, not one job title.
- Stack: Python, SQL, Tableau, Power BI, Azure ML, AWS, GCP, Pandas, Scikit-learn, Apache Spark, MySQL, Firebase, Excel, Java, JavaScript, Next.js, TypeScript, RAG/LLM engineering
- Contact: parmarsandeep01@gmail.com

### SEO
- Title format: `Sandeep Kanaram Parmar - Data, AI & Product` (hyphen, never em dash - see Copy Rules)
- Metadata (title, description, OG, canonical) lives in `app/layout.tsx`
- One H1 (hero) → H2 (section titles) → H3 (subsections)

### CRO (Conversion = Contact)
- Primary CTA: `mailto:parmarsandeep01@gmail.com` - topbar + contact section
- Project cards: outcome statements, not just tech names
- Quantified impact where possible (accuracy %, Lighthouse scores, time saved)

### Core Web Vitals Targets
| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

---

## Copy Rules
- **No em dashes anywhere in visible copy** - use a hyphen or restructure the sentence. Applies to headlines, labels, body, captions, buttons.
- No section-number eyebrows or fake percentage bars (retired from v1 during the taste-skill audit) - skills render as grouped pills, not `X%` bars.
- **Accent system - chrome vs content items:**
  - `--pulse` is the only accent for UI chrome: nav, CTAs, links, focus rings, active states, text emphasis. Never swapped per section.
  - Content items (currently: project cards) may each own ONE accent from `--pulse` / `--data` / `--signal` / `--amber`, set via `accent` field in `lib/data.ts` and rendered as `data-accent` on the card (`--item-accent` custom property in `globals.css`). Omitted = `--pulse`.
  - Item-accent surfaces are small only: card border, featured border tint, stat numbers, link hover border. Never full backgrounds, headlines, or body text. Color triggers on scroll-reveal (`.reveal.in`, fires once per card as it enters viewport) so it's visible on mobile/trackpad, not hover-gated; `:hover` reinforces the same color on top for desktop pointer users.
  - Same item = same color everywhere it appears, permanently. Consistency lock is per-item, not per-page.
  - Cap: 4 item colors total. Do not add a fifth token for variety.
- Exception: the data-node motif (particle field + its static echoes) uses the semantic tokens (`--pulse`, `--data`, `--signal`) together, since that palette already carries meaning (data/tech, success/active) tied to the "Data · AI Systems" positioning. This is a decorative/background system, not a text or interactive accent.

---

## Do Not
- Add Tailwind, a component library, or an animation library (Motion/GSAP) without explicit approval - current stack is deliberately minimal
- Rename CSS tokens (`--pulse`, `--data`, `--signal` are semantic)
- Replace the rail/reveal IntersectionObserver logic with scroll event listeners
- Hardcode any hex color - always use CSS custom properties
- Use emoji as icons - inline SVG or none
- Add external JS without a security review
- Put content directly in JSX when it belongs in `lib/data.ts`
- Delete/overwrite/move any file without explicit confirmation first (global rule, still applies)
