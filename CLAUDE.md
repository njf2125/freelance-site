# Freelance Portfolio Site — Claude Code Setup Plan

You are setting up a complete freelance developer portfolio site from scratch. The folder you are currently running in is the project root. Initialize everything here — do not create a subdirectory.

---

## Project Overview

A personal freelance portfolio site for a senior React/TypeScript frontend engineer. The site targets potential clients who need custom web apps, internal dashboards, and SaaS tooling. It should feel professional, minimal, and technical — not a template.

**Positioning line (used in the hero):**
> "I build custom web apps and dashboards for teams that have outgrown their off-the-shelf tools."

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Content | MDX (for case studies) |
| Deployment target | Cloudflare Pages |
| Contact form backend | Web3Forms (no backend secret needed) |
| Analytics | Cloudflare Web Analytics (script tag only, no config needed) |

> **Deviations from original spec:**
> - **Tailwind CSS v4** is in use (not v3). Config is in `globals.css` via `@theme` — no `tailwind.config.js`.
> - **Web3Forms** replaces Resend for the contact form. No `RESEND_API_KEY` needed. Uses a Web3Forms access key in the POST body.
> - **`WorkTable` component** is used instead of `ProjectCard` for listing case studies on both the home page and the work index.
> - **Fonts** are Playfair Display (headings) + DM Sans (body) + DM Mono (labels/code), loaded via `next/font/google` — not Geist Sans/Mono as originally specified.

---

## Step 1 — Initialize the Project

Run the following in the current directory:

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git
```

Then install additional dependencies:

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install @cloudflare/next-on-pages
npm install resend
npm install -D @types/mdx wrangler
```

---

## Step 2 — Git Setup

Initialize git and create a `.gitignore`:

```bash
git init
```

`.gitignore` should include:

```
node_modules/
.next/
.vercel/
.wrangler/
out/
dist/
.env
.env.local
.env*.local
*.log
.DS_Store
```

---

## Step 3 — Cloudflare Pages Configuration

Create `wrangler.toml` in the project root:

```toml
name = "freelance-portfolio"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

Update `next.config.ts` to support MDX and Cloudflare:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
```

Add to `package.json` scripts:

```json
"pages:build": "npx @cloudflare/next-on-pages",
"pages:dev": "npx @cloudflare/next-on-pages --watch",
"preview": "npm run pages:build && wrangler pages dev"
```

---

## Step 4 — Folder Structure

Create the following directory structure (create all folders and placeholder files):

```
src/
  app/
    layout.tsx          ← root layout with nav, footer, global styles
    page.tsx            ← home page
    about/
      page.tsx          ← about page
    work/
      page.tsx          ← work index (lists all case studies)
      [slug]/
        page.tsx        ← dynamic case study page
    api/
      contact/
        route.ts        ← contact form POST handler
  components/
    Nav.tsx
    Footer.tsx
    ProjectCard.tsx     ← card used on home page for each project
    CaseStudyLayout.tsx ← wrapper layout for case study pages
    ContactForm.tsx     ← client component with form state
  content/
    work/
      samepage.mdx          ← SamePage case study
      recipe-bookmarks.mdx  ← Recipe app case study
  lib/
    mdx.ts              ← utility to load and parse MDX files
    types.ts            ← shared TypeScript interfaces
```

---

## Step 5 — TypeScript Types

Create `src/lib/types.ts`:

```ts
export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  featured: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
```

---

## Step 6 — MDX Utility

Create `src/lib/mdx.ts` to read case study frontmatter and content:

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Install gray-matter: npm install gray-matter @types/gray-matter
const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export function getAllCaseStudies() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return { slug: file.replace(".mdx", ""), ...data };
  });
}

export function getCaseStudy(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}
```

Also run:

```bash
npm install gray-matter
```

---

## Step 7 — MDX Case Study Files

### `src/content/work/samepage.mdx`

```mdx
---
title: SamePage
subtitle: Collaborative reading tracker PWA
stack: [React, TypeScript, Vite, Firebase Auth, Firestore, Cloudflare Pages, PWA]
problem: Two people reading the same book needed a shared space to log progress, leave notes, and stay in sync — without spreadsheets or constant texting. No existing app supported the lightweight collaborative workflow they needed.
whatWasBuilt: A Progressive Web App installable on iOS and Android, with real-time sync powered by Firestore listeners, shared reading state, comment threads, and invite-based access control. Migrated from Supabase to Firebase Auth + Firestore mid-development when requirements evolved — maintaining continuity in a live production app.
outcome: A fully functional multi-user PWA used daily. Demonstrates end-to-end app architecture including auth, real-time data sync, mobile UX, and mid-project infrastructure decisions under real constraints.
featured: true
---

## Background

SamePage started as a personal project: a way for two people to track their reading together without stitching together spreadsheets and text messages. The goal was something installable on both iOS and Android, lightweight, and always in sync.

## The Problem

Existing reading apps are built for solo readers. There was no lightweight, shared-first reading tracker that felt like a proper app — not a Notion page, not a spreadsheet, not a group chat thread.

## What I Built

A full-stack PWA with:

- **Firebase Auth** for email-based authentication (invite-only access)
- **Firestore** with real-time listeners for live reading state sync between users
- **PWA manifest + service worker** for home screen installation on iOS and Android
- **Comment threads** per book for shared annotations
- **Invite system** to add collaborators without open registration

## Key Technical Decision

Mid-development, I migrated from Supabase (PostgreSQL + Supabase Auth) to Firebase Auth + Firestore. The trigger was Supabase's free-tier inactivity pausing — a real production risk for a small personal app. I migrated auth and data while the app was in active use, with no downtime and no data loss.

This required remapping the relational data model (books, comments, invites tables) to Firestore's document/collection structure — a meaningful architectural shift, not a swap of credentials.

## Stack

React + TypeScript + Vite · Firebase Auth · Firestore · Cloudflare Pages · PWA
```

---

### `src/content/work/recipe-bookmarks.mdx`

```mdx
---
title: Recipe Bookmarks
subtitle: Full-stack recipe saving app with AI grocery list parsing
stack: [React, TypeScript, Cloudflare Pages, Cloudflare D1, Cloudflare Workers, Gemini Vision, FTS5]
problem: A user needed to save, organize, and search recipes from across the web — with rich link previews, multi-category tagging, and full-text search — without a SaaS subscription or recurring cost.
whatWasBuilt: A full-stack web app with server-side Open Graph scraping for automatic link previews, SQLite FTS5 full-text search, multi-category tagging, two-tier auth (user vs admin), and an AI-powered grocery list feature using Gemini Vision to parse photos of handwritten lists into structured ingredient data stored in D1.
outcome: A production app used daily, running entirely on Cloudflare's free tier. Demonstrates full-stack architecture, AI feature integration, custom auth, and edge database design — with zero ongoing infrastructure cost.
featured: true
---

## Background

This started as a practical problem: saving recipes from across the web in a way that's actually useful — with previews, categories, and search — without paying $10/month for a tool that does 80% of what's needed.

## The Problem

Generic bookmark tools don't understand recipes. There's no category structure, no ingredient context, and no admin layer for managing the library. The only option was to build it.

## What I Built

A full-stack web app on Cloudflare's edge infrastructure:

- **Open Graph scraping** via a Cloudflare Worker — paste a URL, get title, image, and description automatically
- **Multi-category tagging** with a junction table in D1 (SQLite at the edge)
- **FTS5 full-text search** across titles, descriptions, and notes — no external search service
- **Two-tier auth** — a shared user password for the main app, a separate admin password for category management and bulk operations
- **AI grocery list parsing** — Gemini Vision (`gemini-2.5-flash`) reads a photo of a handwritten grocery list and returns structured ingredient data, persisted to D1

## Key Technical Decision

SQLite FTS5 at the edge (via Cloudflare D1) instead of an external search service like Algolia. The tradeoff: zero cost, zero latency, no vendor dependency — at the cost of less sophisticated relevance ranking. For a personal recipe app, it's the right call.

The AI grocery feature was added after launch as a self-contained enhancement — a Cloudflare Worker endpoint that accepts a base64-encoded image, calls Gemini Vision, and returns parsed ingredients. Adding AI to an existing app without restructuring the whole thing is a useful skill to demonstrate.

## Stack

React + TypeScript · Cloudflare Pages · Cloudflare D1 (SQLite) · Cloudflare Workers · Gemini Vision API · FTS5
```

---

## Step 8 — Components

### `src/components/Nav.tsx`

A sticky top navigation bar with links: **Work · About · Contact** (Contact scrolls to the home page contact section). Simple, no dropdowns.

### `src/components/Footer.tsx`

Minimal footer with copyright year (use `new Date().getFullYear()`), GitHub link, and LinkedIn link. No nav repeat.

### `src/components/WorkTable.tsx` *(was `ProjectCard.tsx`)*

Used in place of `ProjectCard`. Renders case studies as a table/list layout rather than a card grid. Used on both the home page (featured projects) and the work index.

### `src/components/ContactForm.tsx`

Client component (`"use client"`). Fields: Name, Email, Message. On submit, POST to `/api/contact`. Show a success state ("Message sent. I'll be in touch within a day or two.") or an inline error. No page redirect.

### `src/components/CaseStudyLayout.tsx`

Wrapper for case study pages. Receives frontmatter props. Renders:
- Eyebrow label (e.g. "Case Study")
- Title and subtitle
- Stack badges row
- Three summary callouts: Problem / What Was Built / Outcome
- Slot for MDX body content below

---

## Step 9 — Pages

### `src/app/layout.tsx`

Root layout. Includes:
- `<Nav />` and `<Footer />`
- Cloudflare Web Analytics script tag (placeholder — add the actual beacon URL once the Pages project is created):
  ```html
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
  ```
- Global font setup using `next/font/google` — Playfair Display (headings), DM Sans (body), DM Mono (labels/code)

### `src/app/page.tsx` — Home

Sections in order:

1. **Hero** — Positioning headline, 1–2 sentence description, a subtle pricing signal ("Projects typically start at $2,500."), and a CTA button that scrolls to the contact form
2. **Work** — Heading "Selected Work", then `<WorkTable />` for featured case studies (pull from `getAllCaseStudies()`, filter `featured: true`)
3. **Process** — Three steps: Discovery → Build → Launch. Each has a number, short title, and 1–2 sentence description. Keep it plain text, no icons.
4. **Contact** — `<ContactForm />` with a short headline ("Got a project? Let's talk.") and a subline with your email as a plain mailto fallback

### `src/app/about/page.tsx` — About

Content to include:
- Short intro: senior frontend engineer, building React/TypeScript apps professionally (mention nCino by name as your day job context — shows you're employed and serious, not a beginner)
- What you build on the side: custom web apps, tools, home automation projects
- Stack you're most comfortable with: React, TypeScript, Next.js, Cloudflare ecosystem
- Links: GitHub (github.com/njf2125), LinkedIn

### `src/app/work/page.tsx` — Work Index

Lists all case studies with `<WorkTable />`. Pull from `getAllCaseStudies()`.

### `src/app/work/[slug]/page.tsx` — Case Study

Dynamic page. Reads slug from params, loads the corresponding MDX file via `getCaseStudy(slug)`. Renders `<CaseStudyLayout />` with frontmatter props, then renders MDX body content inside it.

Generate static params from `getAllCaseStudies()`.

---

## Step 10 — Contact API Route

### `src/app/api/contact/route.ts`

Uses **Web3Forms** instead of Resend. The `ContactForm` client component POSTs directly to the Web3Forms API (`https://api.web3forms.com/submit`) with a public access key. No server-side API route secret is required.

No `.env.local` needed for the contact form. The Web3Forms access key is embedded in the form payload (it's a public key by design).

---

## Step 11 — Design Direction

Apply these globally via Tailwind — do not use inline styles or a separate CSS file except for the root font variables.

**Color palette:**
- Background: `zinc-950` (`#09090b`)
- Surface cards: `zinc-900`
- Borders: `zinc-800`
- Body text: `zinc-300`
- Muted text: `zinc-500`
- Accent: `teal-400` for links, badges, and hover states
- Amber: `amber-400` for secondary badges / stack pills

**Typography:**
- Display / headings: Playfair Display (serif), via `next/font/google`
- Body: DM Sans, regular weight
- Labels, badges, code: DM Mono

**No animations on first pass.** Get the structure right, then layer in hover states and transitions in Phase 2.

**Cards:** `rounded-lg border border-zinc-800 bg-zinc-900 p-6` — consistent across project cards, case study summaries, and process steps.

---

## Step 12 — Final Checks Before First Commit

- [ ] `npm run build` passes with no TypeScript errors
- [ ] All pages render without runtime errors (`npm run dev`)
- [ ] Contact form POSTs successfully to Web3Forms
- [ ] `/work/samepage` and `/work/recipe-bookmarks` both render correctly
- [ ] No hardcoded personal info left as placeholder (replace email, GitHub, LinkedIn)
- [ ] `.env.local` is NOT committed

---

## Step 13 — First Commit

```bash
git add .
git commit -m "init: scaffold freelance portfolio site"
```

Then push to a new GitHub repo (create it on GitHub first, then):

```bash
git remote add origin https://github.com/njf2125/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Then connect the repo to Cloudflare Pages:
1. Cloudflare Dashboard → Pages → Create a project → Connect to Git
2. Select the repo
3. Build command: `npm run pages:build`
4. Output directory: `.vercel/output/static`
5. No extra environment variables needed (Web3Forms uses a public access key)

---

## What's Intentionally Left Out

These are out of scope for this phase — do not add them:

- Blog or writing section
- CMS integration
- Pricing page
- Authentication of any kind
- Dark/light mode toggle (dark is the default, keep it)
- Animation libraries (Framer Motion, etc.)
- Additional third-party form services beyond Web3Forms (already in use)

These can be added in Phase 2 once the site is live.
