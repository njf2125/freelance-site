# Freelance Portfolio Site — nickfig.dev

Personal freelance portfolio for Nick Figliolia — a senior React/TypeScript frontend engineer available for custom web app and dashboard work on the side of his day job at nCino.

The site targets potential clients who have outgrown off-the-shelf tools and need something built for them specifically.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` |
| Deployment | Cloudflare Pages |
| Contact form | Web3Forms (public access key, no backend secret) |
| Analytics | Cloudflare Web Analytics (beacon script in layout) |

**Tailwind v4 note:** There is no `tailwind.config.js`. Theme config lives in `globals.css` via `@theme`. Do not create a config file.

---

## Design System

### CSS Variables (defined in `src/app/globals.css`)

```css
--bg:      #09090b  /* zinc-950 — page background */
--surface: #18181b  /* zinc-900 — card backgrounds */
--border:  #27272a  /* zinc-800 — borders */
--text:    #fafafa  /* zinc-50  — primary text */
--muted:   #a1a1aa  /* zinc-400 — secondary text */
--faint:   #52525b  /* zinc-600 — de-emphasized text, tags */
--accent:  #2dd4bf  /* teal-400 — links, hover states, badges */
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
    work/
      page.tsx              ← work index (lists all case studies via getAllCaseStudies())
      [slug]/page.tsx       ← dynamic case study page (MDXRemote + CaseStudyLayout)
    api/contact/route.ts    ← Web3Forms proxy (currently unused — form posts directly)
  components/
    Nav.tsx                 ← sticky top nav: Work · About · Contact
    Footer.tsx              ← copyright, "Built by me, obviously.", GitHub, LinkedIn
    CaseStudyLayout.tsx     ← case study wrapper: back-link, header, stats, 3-col callouts, MDX slot
    ContactForm.tsx         ← "use client" form, posts to Web3Forms
    WorkTable.tsx           ← used on /work index page
    callout.tsx             ← <Callout> MDX component for highlighted decisions
  content/work/
    samepage.mdx            ← SamePage case study
    recipe-bookmarks.mdx    ← Recipe Bookmarks case study
  lib/
    mdx.ts                  ← getAllCaseStudies() + getCaseStudy(slug) using gray-matter
    types.ts                ← CaseStudy, StatCard, NavLink interfaces
```

---

## Home Page Structure (`src/app/page.tsx`)

Sections in order, all left-aligned, `max-w-4xl`:

1. **Hero** — Two-line headline with font-weight contrast (light/bold), stacked subhead, muted credibility line, inline teal CTA link to `#contact`
2. **Selected Work** — Placeholder "Currently booking" dashed card (no real client projects yet)
3. **Other Work** — SamePage and Recipe Bookmarks as cards with project name, one-line problem statement, stack tags, type/year metadata
4. **How I Work** — Three steps (1 —, 2 —, 3 —): Discovery, Build, Launch
5. **Contact** — Two-line heading ("Got something in mind?" / "Let's figure out if it's a good fit.") above `<ContactForm />`

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
- **No animations** — hover `transition-colors` is the extent of it; no Framer Motion or keyframes

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
