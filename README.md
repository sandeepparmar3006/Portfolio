# Sandeep Parmar — Portfolio

Personal portfolio site for Sandeep Kanaram Parmar, Data Analyst building AI systems and web products.

**Live:** [sandeep-parmar.vercel.app](https://sandeep-parmar.vercel.app)

## Stack

- Next.js 16 (App Router, TypeScript, Server Components by default)
- Native CSS custom properties for styling, no Tailwind or CSS-in-JS
- `geist` font package via `next/font` (Geist Sans, Geist Mono, Geist Pixel Square)
- Four client islands only: `Rail.tsx` (scroll progress), `Topbar.tsx` (mobile nav), `Reveal.tsx` (scroll-reveal), `HeroAurora.tsx` (Motion-driven ambient gradient blobs in the hero)
- `motion` (`motion/react`), scoped to `HeroAurora.tsx` only, for idle drift + pointer-spring parallax

No component library, no external API calls or third-party scripts. Motion is the one approved exception to the no-animation-library rule, isolated to the hero.

## Structure

```
app/
  layout.tsx        fonts, metadata, html shell
  globals.css        all design tokens and styles
  page.tsx            section composition
  components/          Rail, Topbar, Reveal, HeroAurora, sections
lib/
  data.ts              all content: nav, experience, projects, skills, education, contacts
```

Content changes go in `lib/data.ts` as typed array entries, not directly in JSX.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Deployment

Deployed to Vercel via git integration - pushes to `main` auto-deploy to production.

## Design

Dark tech-editorial visual language with a lilac/midnight-violet accent family. `--pulse` (muted lilac) is the single accent for UI chrome (nav, CTAs, links, focus states). Individual project cards carry their own accent color (`--data`, `--signal`, `--amber`), triggered on scroll-reveal and reinforced on hover, so each project keeps a distinct identity without breaking the site-wide single-accent rule.

See [CLAUDE.md](CLAUDE.md) for the full design system, content rules, and security posture.
