# Freelance Portfolio Site — nickfig.dev

Personal freelance portfolio for Nick Figliolia — a React/TypeScript frontend engineer available for custom web app and dashboard work.

The site targets potential clients who have outgrown off-the-shelf tools and need something built for them specifically.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Deployment | Cloudflare Pages |
| Contact form | Web3Forms (key in `NEXT_PUBLIC_WEB3FORMS_KEY` env var, no backend needed) |
| Analytics | Cloudflare Web Analytics (beacon script in layout) |

**Tailwind v4 note:** There is no `tailwind.config.js`. Theme config lives in `globals.css` via `@theme`. Do not create a config file.

---

## Design System

### CSS Variables (defined in `src/app/globals.css`)

```css
--bg:         #09090b  /* zinc-950 — page background */
--glow:       radial-gradient(...)  /* teal ambient glow fixed to top-left corner */
--surface:    #18181b  /* zinc-900 — card backgrounds */
--surface-2:  #1d1d20  /* nested surface — stat backgrounds inside cards */
--border:     #27272a  /* zinc-800 — borders */
--border-2:   #34343a  /* stronger border — window frames, nav CTA */
--text:       #fafafa  /* zinc-50  — primary text */
--muted:      #a1a1aa  /* zinc-400 — secondary text */
--faint:      #71717a  /* zinc-500 — de-emphasized text, tags */
--accent:     #2dd4bf  /* teal-400 — links, hover states, badges */
--accent-ink: #06201c  /* dark ink — text on accent-coloured backgrounds */
```

**Always use these CSS variables.** Never use Tailwind's shadcn semantic classes (`text-foreground`, `bg-muted`, `border-border`, `text-muted-foreground`) — they are not defined and will produce invisible or broken styles.

Correct: `text-[var(--muted)]`
Wrong: `text-muted-foreground`

### Fonts (loaded via `next/font/google` in `src/app/layout.tsx`)

- `font-display` — Playfair Display (serif) — headings, hero
- `font-sans` — DM Sans — body text
- `font-mono` — DM Mono — labels, badges, code, eyebrows

### Dark-only

This site has no light mode. Never add `dark:` prefixed classes — they will never apply and add noise.

### Card pattern

```
bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-6 transition-colors
```

---

## Folder Structure

```
src/
  app/
    layout.tsx              ← root layout: Nav, Footer, fonts, analytics
    page.tsx                ← home page
    about/page.tsx          ← about page
    robots.ts               ← Next.js robots.txt generation
    sitemap.ts              ← Next.js sitemap.xml generation (includes all case study slugs)
    icon.png                ← favicon
    opengraph-image.png     ← OG image for social sharing
    work/
      page.tsx              ← work index (lists all case studies via getAllCaseStudies())
      [slug]/page.tsx       ← dynamic case study page (MDXRemote + CaseStudyLayout)
    ContactForm.tsx         ← "use client" form, posts directly to Web3Forms API
  components/
    Nav.tsx                 ← sticky top nav: Work · About · Contact
    Footer.tsx              ← copyright, "Built by me, obviously.", GitHub, LinkedIn
    CaseStudyLayout.tsx     ← case study wrapper: back-link, header, stats, 3-col callouts, MDX slot
    ContactForm.tsx         ← "use client" form, posts directly to https://api.web3forms.com/submit
    WorkCard.tsx            ← image + content card used on /work index page
    WorkTable.tsx           ← (legacy) table view, still present
    callout.tsx             ← <Callout> MDX component for highlighted decisions
  config/
    site.ts                 ← SiteConfig: availability ("available"|"busy"), rate, maxClients, analyticsToken
  content/work/
    clientroom.mdx          ← Client Room case study
    cdr-dash.mdx            ← CDR Dashboard case study
    samepage.mdx            ← SamePage case study
  lib/
    mdx.ts                  ← getAllCaseStudies() + getCaseStudy(slug) using gray-matter
    types.ts                ← CaseStudy, StatCard, NavLink interfaces
```

---

## Home Page Structure (`src/app/page.tsx`)

Sections in order, all left-aligned, `max-w-5xl` (the container width used site-wide — Nav, Footer, home, about, work, and case study pages all share it). Projects are defined inline in `page.tsx` as a `projects` array (not pulled from MDX) — this array is the source of truth for home-page card content (title, description, tech, links, image path).

1. **Hero** — Two-column layout (`sm:grid-cols-2`). Left: availability pulsing dot + headline + subhead + CTA buttons ("Start a project →" fills teal, "See the work →" is text link). Right: a clean `aspect-[16/10]` bordered screenshot frame showing the CDR dashboard (`/work/cdr.png`), displayed uncropped with a soft shadow — no browser chrome.
2. **Work** — All three projects (Client Room, CDR Dashboard, SamePage) as horizontal image+content cards. Each card: screenshot on the left, title/type/year/description/tech tags/links on the right. Hover lifts with teal shadow.
3. **How I Work** — Three steps with large accent numerals, border-top dividers: Discovery, Build, Launch.
4. **Contact** — Two-column layout (`sm:grid-cols-[0.8fr_1.2fr]`). Left: heading, one-liner about capacity/rate from `siteConfig`, direct links (email, GitHub, LinkedIn). Right: `<ContactForm />`.

### Site config (`src/config/site.ts`)

Controls dynamic copy on the home page:

```ts
siteConfig.availability  // "available" | "busy" — toggles pulsing dot vs. static grey dot
siteConfig.rate          // e.g. "$2,500" — shown in contact section
siteConfig.maxClients    // e.g. "1–2" — shown in contact section
siteConfig.analyticsToken // Cloudflare Web Analytics token
```

---

## Case Study MDX Frontmatter

Each `.mdx` file in `src/content/work/` uses this frontmatter shape:

```yaml
title: string
subtitle: string
stack: [string, ...]
problem: string
whatWasBuilt: string
outcome: string
featured: boolean
stats:
  - label: string
    value: string
    highlight: boolean   # optional — renders in emerald-400 if true
```

The `<Callout>` component is available inside MDX for highlighting key technical decisions.

---

## Conventions

- **CSS variables everywhere** — see Design System above
- **No `dark:` prefixes** — dark-only site
- **No shadcn classes** — not installed, variables not defined
- **Section numbers** use `1 —` format, not `01 —`
- **External links** get `target="_blank" rel="noopener noreferrer"`
- **No new components** for one-off patterns — inline is fine for a portfolio this size
- **Animations** — CSS keyframes only; no Framer Motion or animation libraries. Currently defined in `globals.css`: `ping` (pulsing availability dot) and `fadeIn` (subtle enter for transient UI). New animations must use CSS `@keyframes`, not JS libraries.

---

## What's Out of Scope

Do not add these unless explicitly requested:

- Blog or writing section
- CMS integration
- Pricing page
- Authentication
- Dark/light mode toggle
- Animation libraries
- Additional form services (Web3Forms is the one)
