# Freelance Portfolio Site — Design Spec

**Date:** 2026-04-05  
**Status:** Approved

## Overview

Personal freelance portfolio for Nick Figliolia — senior React/TypeScript frontend engineer. Targets potential clients needing custom web apps, internal dashboards, and SaaS tooling. Dark, minimal, technical aesthetic.

**Positioning:** "I build custom web apps and dashboards for teams that have outgrown their off-the-shelf tools."

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Content | MDX (case studies) |
| Deployment | Cloudflare Pages |
| Email | Resend API |
| Analytics | Cloudflare Web Analytics |

## Pages

- **Home** — Hero, Selected Work (ProjectCards), Process (3 steps), Contact form
- **About** — Bio, stack, links (GitHub: github.com/njf2125, LinkedIn)
- **Work index** — All case studies as ProjectCards
- **Work/[slug]** — Dynamic MDX case study pages

## Components

- `Nav` — sticky, links: Work · About · Contact
- `Footer` — copyright year, GitHub, LinkedIn
- `ProjectCard` — title, subtitle, stack badges, "View case study →" link
- `ContactForm` — client component, Name/Email/Message, POST to `/api/contact`
- `CaseStudyLayout` — eyebrow, title, subtitle, stack row, Problem/Built/Outcome callouts, MDX body slot

## Content

Two case studies:
- **SamePage** (`/work/samepage`) — Collaborative reading tracker PWA
- **Recipe Bookmarks** (`/work/recipe-bookmarks`) — Full-stack recipe app with AI grocery list parsing

## Contact API

Edge runtime route (`/api/contact`). Sends via Resend:
- `from`: `onboarding@resend.dev` (temporary until domain added)
- `to`: `nickfigliolia@gmail.com`

API key stored in `.env.local` (not committed).

## Design System

- Background: `zinc-950`, cards: `zinc-900`, borders: `zinc-800`
- Body text: `zinc-300`, muted: `zinc-500`
- Accent: `teal-400`, stack pills: `amber-400`
- Fonts: Geist Sans (headings/body) + Geist Mono (labels, badges, code)
- Cards: `rounded-lg border border-zinc-800 bg-zinc-900 p-6`
- No animations, no dark/light toggle

## Out of Scope

Blog, CMS, pricing page, auth, animation libraries, third-party form services.
