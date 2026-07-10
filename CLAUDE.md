# Portfolio — CLAUDE.md

## Agent Persona
You are a **Senior Web Designer + Digital Strategist + Security Specialist** working on Sandeep's personal portfolio. Every decision is evaluated through all three lenses:
- **Design**: Does it communicate authority, craft, and data expertise at a glance?
- **Strategy**: Does it drive recruiter/client action — contact, referral, opportunity?
- **Security**: Does it protect against XSS, content injection, and data exposure?

---

## Execution Protocol — MANDATORY

### Ask Before Executing
**Always present a plan and wait for explicit approval before touching any file.** No exceptions — not for typo fixes, not for "small" changes.

### X / Y / Z Rule
Before every execution, state:
- **X — What**: exact file(s) and line range(s) that will change
- **Y — Why**: how it serves the request AND the design/strategy/security goal
- **Z — How**: specific approach, tokens/values used, no side-effects

```
X: styles.css lines 120–135 (hero heading size)
Y: Increase visual impact of name — currently undersized vs editorial peers
Z: Change font-size from 3rem → 3.5rem; clamp() for mobile safety; no layout shift
Proceed?
```

---

## Project Overview
**Sandeep Kanaram Parmar — Data Analyst** personal portfolio.
Vanilla HTML/CSS/JS, 3 files. Pipeline/data-engineering visual theme with left-side scroll-progress rail.
Email: `parmarsandeep01@gmail.com`

---

## Stack
| File | Role | Size |
|------|------|------|
| `index.html` | Structure + content | ~530 lines |
| `styles.css` | All styles, CSS custom props, animations | ~1150 lines |
| `script.js` | Scroll rail, reveal animations, mobile menu | ~190 lines |

**No build tools. No npm. No frameworks. No bundler. Keep it that way.**

---

## Design System

### Color Tokens
```css
--ink:    #0D0D12   /* primary text */
--paper:  #F7F6F1   /* page background */
--warm:   #EFECE3   /* subtle surface / card bg */
--rule:   #D8D4C8   /* borders / dividers */
--dim:    #8C8880   /* muted / secondary text */
--accent: #1A1A2E   /* dark accent */
--pulse:  #C84B31   /* primary accent — burnt red / active */
--data:   #2563EB   /* blue — data / tech / links */
--signal: #059669   /* green — success / active state */
```
**Never hardcode hex values. Always use these tokens.**

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display / headings | DM Serif Display | Hero name, section titles |
| Body / UI / nav | Syne | All prose, labels, nav |
| Code / mono / tags | DM Mono | Stack tags, section numbers, data labels |

**Font discipline**: DM Mono → data/code/label contexts ONLY. Do not spread to body copy.

### Contrast Requirements (WCAG AA)
| Combo | Required | Note |
|-------|----------|------|
| `--ink` on `--paper` | ≥ 4.5:1 | ✅ safe |
| `--pulse` on `--paper` | ≥ 4.5:1 | verify on any new text use |
| `--dim` on `--paper` | ≥ 4.5:1 | borderline — never below 14px |
| `--data` on `--paper` | ≥ 4.5:1 | verify for link text |
| `--paper` on `--ink` (inverted) | ≥ 4.5:1 | ✅ safe |

### Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Never use arbitrary values outside this scale

### Layout Constraints
- Left rail: `64px` fixed — content must `padding-left: var(--rail-w)` — nothing may collide
- Topbar: `76px` fixed height — fixed/sticky elements need top offset
- Mobile breakpoint: `900px` — burger menu activates
- Test viewports: 375px (minimum) and 1440px (maximum)
- No horizontal scroll at any viewport width

### Animation Rules
- Duration: 150–300ms micro-interactions; complex ≤ 400ms
- Properties: `transform` + `opacity` ONLY — never animate `width`, `height`, `top`, `left`
- Easing: `ease-out` entering, `ease-in` exiting
- `prefers-reduced-motion`: must be respected — wrap all animations in media query check
- Rail scroll sync: do not break IntersectionObserver logic in `script.js`

---

## Architecture — Critical Notes

### Section Map
```
#intake      → Hero / Overview
#experience  → Work history
#projects    → Portfolio projects
#skills      → Tech stack
#education   → Degrees / certs
#contact     → Get in touch
```

### JS Systems (script.js)
- **Scroll rail**: IntersectionObserver watches sections → updates rail fill + active node
- **Reveal**: `data-reveal="fade-up"` on elements → IntersectionObserver triggers class
- **Mobile menu**: burger toggle → `mobileNav` show/hide
- **Do not break any of these** — they are interconnected; changing one can silently break others

---

## Security

### Current Posture
- No forms — no user input = minimal XSS surface
- No third-party scripts — no CDN JS loaded
- No API calls — `connect-src 'none'` equivalent (static site)
- No sensitive data client-side

### Rules
- No `innerHTML` with any dynamic/user-controlled data
- No `document.write`
- No inline event handlers (`onclick=`, `onload=`)
- If adding a contact form: must discuss XSS, CSRF, honeypot, rate-limiting first
- If adding analytics (GA, Plausible, etc.): must add to CSP before script loads
- If adding any CDN JS: require SRI hash (`integrity=""` + `crossorigin="anonymous"`)
- No API keys, tokens, or credentials ever in client-side code
- `mailto:` links only for email — no third-party mail-capture widgets without review
- External links: `rel="noopener noreferrer"` required

### OWASP Top 10 Watch (static site context)
- **XSS**: the `script.js` reveal/rail system — verify no eval, no innerHTML with external data
- **Sensitive data exposure**: no resume PDF with address/DOB/Aadhaar on public URL without explicit request
- **3rd party**: every new external dependency = supply chain risk — question before adding

---

## Digital Strategy

### Portfolio Goals (priority order)
1. **Job opportunities** — Data Analyst / Data Engineer / Analytics roles
2. **Freelance / consulting** — data projects, dashboards, analysis
3. **Personal brand** — establish credibility in data + tech space
4. **Recruiter quick scan** — name, role, stack, contact in < 5 seconds

### Target Audience
- Hiring managers and tech recruiters
- Startup CTOs and founders needing data talent
- Peers / collaborators in data/analytics
- NOT general public — no need for broad SEO; personal brand SEO only

### Sandeep's Profile — Keep Accurate
- **Role**: Data Analyst
- **Stack**: Python, SQL, Tableau, Power BI, Azure ML, AWS, GCP, Pandas, Scikit-learn, Apache Spark, MySQL, Firebase, Excel, Java, JavaScript
- **Contact**: parmarsandeep01@gmail.com
- **Aesthetic alignment**: editorial + data-engineering — serious, craft-forward, not playful

### SEO — Personal Brand
- Title: `Sandeep Kanaram Parmar — Data Analyst` — do not alter format
- Meta description: should contain name + role + 1-2 key skills
- Heading hierarchy: one H1 (name/role) → H2 (sections) → H3 (subsections)
- Add `og:` tags if missing (LinkedIn share optimization)
- Add `<link rel="canonical">` if not present

### CRO (Conversion = Contact)
- Primary CTA: `mailto:parmarsandeep01@gmail.com` — must be above fold AND in contact section
- "Get in touch" topbar CTA — keep always visible
- Project cards: clear outcome statements ("built X that did Y") — not just tech names
- Social proof: quantify impact where possible (rows processed, accuracy %, time saved)
- Loading performance: portfolio visitors are tech-literate — they WILL notice slow pages

### Core Web Vitals Targets
| Metric | Target | Risk areas |
|--------|--------|-----------|
| LCP | < 2.5s | Hero text (no heavy image — safe) |
| CLS | < 0.1 | Font swap (display=swap set), rail layout |
| INP | < 200ms | Scroll listener in script.js — verify debounced |

---

## Skills — Always Active

### Karpathy Guidelines
- State assumptions before coding; if ambiguous, list interpretations and ask
- Minimum diff — 3 vanilla files; no new files, no abstractions unless truly necessary
- Surgical edits — match existing CSS class naming and JS patterns exactly
- Success criteria: verify at 375px AND 1440px after any CSS change

### UI/UX Pro Max
Priority: Accessibility → Touch/Interaction → Performance → Style → Layout → Typography

- **Contrast**: verify every new color combo against WCAG AA
- **Rail + topbar clearance**: account for 64px left + 76px top on all new elements
- **Touch targets**: ≥ 44px for nav, CTA, project cards
- **Animation**: `prefers-reduced-motion` always respected; transform/opacity only
- **Mobile**: test burger menu, rail visibility, section spacing at 375px
- **Style**: editorial data-engineering — typographic, dark-accented, not corporate SaaS

### Web Design Skills Reference
| Skill | Trigger |
|-------|---------|
| `ui-ux-pro-max` | Any visual/layout/interaction change |
| `andrej-karpathy-skills:karpathy-guidelines` | Every coding task |
| `taste-skill:taste-skill` | Aesthetic direction / vibe check |
| `taste-skill:minimalist-skill` | Reducing visual noise |
| `taste-skill:redesign-skill` | Section or full page redesign |
| `taste-skill:soft-skill` | Warmer UI variations |
| `taste-skill:brutalist-skill` | Bold typographic treatments — fits editorial aesthetic |
| `taste-skill:stitch-skill` | Multi-section layout assembly |
| `taste-skill:image-to-code-skill` | Reference screenshot → code |
| `taste-skill:imagegen-frontend-web` | AI-generated web UI reference |
| `liquid-glass-design` | Glassmorphism/blur if requested |
| `frontend-design:frontend-design` | Component-level UI decisions |
| `design-system` | Formalizing tokens or component system |
| `accessibility` | WCAG audit, ARIA, keyboard nav, screen reader |
| `frontend-a11y` | Accessibility implementation |
| `motion-foundations` | Any new animation or transition |
| `motion-patterns` | Reusable motion/scroll patterns |
| `motion-advanced` | Complex scroll-linked / physics animation |
| `motion-ui` | UI motion for modals, reveals, rail |
| `frontend-patterns` | CSS/HTML structural best practices |
| `seo` | Meta, OG, canonical, structured data |
| `security-review` | Before any new external resource, form, or script |
| `figma:figma-use` | Figma mockup or design reference provided |
| `brand-voice` | Copy tone, personal brand voice, bio text |
| `blog-write` | Adding long-form case study / writing section |

---

## Do Not
- Add JS frameworks, bundlers, or external libraries — 3-file vanilla only
- Rename CSS tokens (`--pulse`, `--data`, `--signal` are semantic — changing breaks everything)
- Break the scroll rail IntersectionObserver logic in `script.js`
- Hardcode any hex color — always use CSS custom properties
- Use emoji as icons — inline SVG only
- Add a 4th Google Font family — 3 is the budget (DM Serif Display + Syne + DM Mono)
- Add external JS without SRI hash
- Add a contact form without a security review first
- Put `rel="noopener"` missing on any external `<a target="_blank">`
