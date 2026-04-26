# Freelance Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete dark-themed freelance portfolio site for a senior React/TypeScript engineer, deployed to Cloudflare Pages.

**Architecture:** Next.js 14 App Router with TypeScript strict mode and Tailwind CSS. MDX files serve as case study content, parsed with gray-matter for frontmatter and rendered via next-mdx-remote/rsc. Contact form POSTs to an edge API route that sends email through Resend.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, MDX, gray-matter, next-mdx-remote, Resend, @cloudflare/next-on-pages, Geist fonts

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: entire project via create-next-app

- [ ] **Step 1: Run create-next-app in the current directory**

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

Accept all prompts. This installs Next.js, TypeScript, Tailwind, ESLint, and sets up the App Router with a `src/` directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install @cloudflare/next-on-pages
npm install resend
npm install gray-matter
npm install next-mdx-remote
npm install -D @types/mdx wrangler
```

- [ ] **Step 3: Initialize git**

```bash
git init
```

- [ ] **Step 4: Commit scaffold**

```bash
git add .
git commit -m "chore: scaffold Next.js 14 project"
```

---

## Task 2: Configure .gitignore, .env.local, wrangler.toml, package.json scripts, and next.config.ts

**Files:**
- Create: `.gitignore`
- Create: `.env.local`
- Create: `wrangler.toml`
- Modify: `package.json` (add scripts)
- Modify: `next.config.ts`

- [ ] **Step 1: Write .gitignore**

Create `.gitignore` at the project root with this exact content:

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

- [ ] **Step 2: Write .env.local**

Create `.env.local` at the project root:

```
RESEND_API_KEY=your_resend_api_key_here
```

Do NOT commit this file. It is already in .gitignore.

- [ ] **Step 3: Write wrangler.toml**

Create `wrangler.toml` at the project root:

```toml
name = "freelance-portfolio"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

- [ ] **Step 4: Add scripts to package.json**

Open `package.json` and add these three scripts inside the `"scripts"` object (alongside the existing dev, build, start, lint scripts):

```json
"pages:build": "npx @cloudflare/next-on-pages",
"pages:dev": "npx @cloudflare/next-on-pages --watch",
"preview": "npm run pages:build && wrangler pages dev"
```

- [ ] **Step 5: Overwrite next.config.ts**

Replace the entire contents of `next.config.ts` with:

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

- [ ] **Step 6: Commit config**

```bash
git add .gitignore wrangler.toml next.config.ts package.json
git commit -m "chore: add Cloudflare Pages config and MDX support"
```

---

## Task 3: TypeScript types and MDX utility

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/mdx.ts`

- [ ] **Step 1: Create src/lib/types.ts**

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

- [ ] **Step 2: Create src/lib/mdx.ts**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CaseStudy } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return { slug: file.replace(".mdx", ""), ...data } as CaseStudy;
  });
}

export function getCaseStudy(slug: string): {
  frontmatter: Omit<CaseStudy, "slug">;
  content: string;
} {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Omit<CaseStudy, "slug">, content };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/mdx.ts
git commit -m "feat: add TypeScript types and MDX utility"
```

---

## Task 4: MDX case study content files

**Files:**
- Create: `src/content/work/samepage.mdx`
- Create: `src/content/work/recipe-bookmarks.mdx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/content/work
```

- [ ] **Step 2: Create src/content/work/samepage.mdx**

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

- [ ] **Step 3: Create src/content/work/recipe-bookmarks.mdx**

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

- [ ] **Step 4: Commit**

```bash
git add src/content/
git commit -m "feat: add MDX case study content"
```

---

## Task 5: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create src/components/Nav.tsx**

```tsx
import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-teal-400"
        >
          NF
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/work"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component"
```

---

## Task 6: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create src/components/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <p className="font-mono text-xs text-zinc-500">
          © {new Date().getFullYear()} Nick Figliolia
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/njf2125"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nickfigliolia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 7: ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create src/components/ProjectCard.tsx**

```tsx
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  stack: string[];
  slug: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  stack,
  slug,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded border border-amber-400/30 bg-amber-400/10 text-amber-400"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-2">
        <Link
          href={`/work/${slug}`}
          className="text-sm text-teal-400 hover:text-teal-300"
        >
          View case study →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard component"
```

---

## Task 8: CaseStudyLayout component

**Files:**
- Create: `src/components/CaseStudyLayout.tsx`

- [ ] **Step 1: Create src/components/CaseStudyLayout.tsx**

```tsx
import { ReactNode } from "react";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  children: ReactNode;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  stack,
  problem,
  whatWasBuilt,
  outcome,
  children,
}: CaseStudyLayoutProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-3">
        Case Study
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
        {title}
      </h1>
      <p className="mt-2 text-lg text-zinc-400">{subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded border border-amber-400/30 bg-amber-400/10 text-amber-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            Problem
          </p>
          <p className="text-sm text-zinc-300">{problem}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            What Was Built
          </p>
          <p className="text-sm text-zinc-300">{whatWasBuilt}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            Outcome
          </p>
          <p className="text-sm text-zinc-300">{outcome}</p>
        </div>
      </div>

      <div className="mt-12 prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-teal-400 prose-strong:text-zinc-100">
        {children}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Install Tailwind typography plugin**

```bash
npm install -D @tailwindcss/typography
```

`create-next-app` now installs Tailwind v4, which configures plugins via CSS rather than `tailwind.config.ts`. Open `src/app/globals.css` and add this line after the `@import "tailwindcss"` line:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

If your project has a `tailwind.config.ts` (Tailwind v3), use this approach instead:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseStudyLayout.tsx tailwind.config.ts package.json package-lock.json
git commit -m "feat: add CaseStudyLayout component"
```

---

## Task 9: ContactForm client component

**Files:**
- Create: `src/components/ContactForm.tsx`

- [ ] **Step 1: Create src/components/ContactForm.tsx**

```tsx
"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-teal-400">
        Message sent. I&apos;ll be in touch within a day or two.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-mono text-xs text-zinc-500">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none"
            placeholder="Jane Smith"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-mono text-xs text-zinc-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-mono text-xs text-zinc-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded bg-teal-400 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-teal-300 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat: add ContactForm client component"
```

---

## Task 10: Contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create directory and file**

```bash
mkdir -p src/app/api/contact
```

Create `src/app/api/contact/route.ts`:

```ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "portfolio@nickfig.dev",
    to: "nickfigliolia@gmail.com",
    subject: `New inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact API route with Resend"
```

---

## Task 11: Root layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace src/app/globals.css**

Replace the entire contents. Use the version that matches your Tailwind version:

**Tailwind v4 (default with current create-next-app):**
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Tailwind v3 (if tailwind.config.ts exists in the project root):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 2: Replace src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nick Figliolia — Freelance Frontend Engineer",
  description:
    "I build custom web apps and dashboards for teams that have outgrown their off-the-shelf tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-300 antialiased flex flex-col">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Install geist fonts package**

The `geist` package is installed by default with create-next-app. Verify it's in `package.json` dependencies. If not:

```bash
npm install geist
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add root layout with Nav, Footer, and Geist fonts"
```

---

## Task 12: Home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx**

```tsx
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a focused conversation about your problem, your users, and what success looks like. I ask the questions that surface hidden requirements before a line of code is written.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "I work in short cycles with frequent check-ins. You see real, working software early — not mockups — so feedback is grounded in reality.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Handoff includes deployment, documentation, and a walkthrough. I stay available for the first month to handle anything that comes up in production.",
  },
];

export default function Home() {
  const featured = getAllCaseStudies().filter((p: CaseStudy) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          I build custom web apps and dashboards for teams that have outgrown
          their off-the-shelf tools.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Senior frontend engineer specializing in React and TypeScript. I work
          with small teams to ship internal tools, dashboards, and SaaS products
          that actually fit their workflow.
        </p>
        <p className="mt-3 font-mono text-sm text-zinc-500">
          Projects typically start at $2,500.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded bg-teal-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-teal-300"
        >
          Start a conversation
        </a>
      </section>

      {/* Selected Work */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          Selected Work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((project: CaseStudy) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          How I Work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="font-mono text-xs text-zinc-500">{step.number}</p>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          Got a project? Let&apos;s talk.
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Prefer email?{" "}
          <a
            href="mailto:nickfigliolia@gmail.com"
            className="text-teal-400 hover:text-teal-300"
          >
            nickfigliolia@gmail.com
          </a>
        </p>
        <div className="mt-8 max-w-xl">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add home page with hero, work, process, and contact sections"
```

---

## Task 13: About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create src/app/about/page.tsx**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Nick Figliolia",
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-3">
        About
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
        Nick Figliolia
      </h1>
      <p className="mt-2 text-lg text-zinc-400">
        Senior Frontend Engineer
      </p>

      <div className="mt-10 max-w-2xl space-y-6 text-zinc-300">
        <p>
          I&apos;m a senior frontend engineer at{" "}
          <span className="text-zinc-100 font-medium">nCino</span>, where I
          build React and TypeScript applications for the financial services
          industry. Day-to-day I work across complex data-heavy UIs, design
          systems, and the kind of internal tooling that quietly makes
          organizations run.
        </p>
        <p>
          On the side, I take on freelance projects for teams that need custom
          software — dashboards, internal tools, SaaS features, and full-stack
          web apps. I also build personal projects: a collaborative reading
          tracker PWA, a recipe-saving app with AI grocery list parsing, and
          various home automation experiments.
        </p>
        <p>
          The stack I reach for most: React, TypeScript, Next.js, and the
          Cloudflare ecosystem (Pages, Workers, D1). I&apos;m comfortable across
          the full stack but I do my best work on the frontend.
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <a
          href="https://github.com/njf2125"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-sm text-zinc-300 hover:text-teal-400 hover:border-teal-400/30"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/nickfigliolia"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-sm text-zinc-300 hover:text-teal-400 hover:border-teal-400/30"
        >
          LinkedIn
        </a>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add about page"
```

---

## Task 14: Work index page

**Files:**
- Create: `src/app/work/page.tsx`

- [ ] **Step 1: Create src/app/work/page.tsx**

```tsx
import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work — Nick Figliolia",
};

export default function WorkIndex() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-3">
        Portfolio
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Work</h1>
      <p className="mt-3 text-zinc-400">
        Selected projects from freelance and personal work.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((project: CaseStudy) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/work/page.tsx
git commit -m "feat: add work index page"
```

---

## Task 15: Dynamic case study page

**Files:**
- Create: `src/app/work/[slug]/page.tsx`

Note: This page uses `next-mdx-remote/rsc` to render the MDX body content (the portion after frontmatter, already stripped by gray-matter in `getCaseStudy`).

- [ ] **Step 1: Create directory**

```bash
mkdir -p src/app/work/\[slug\]
```

- [ ] **Step 2: Create src/app/work/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import { getAllCaseStudies, getCaseStudy } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

export async function generateStaticParams() {
  return getAllCaseStudies().map((study: CaseStudy) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { frontmatter } = getCaseStudy(slug);
    return { title: `${frontmatter.title} — Nick Figliolia` };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let frontmatter: Omit<CaseStudy, "slug">;
  let content: string;

  try {
    ({ frontmatter, content } = getCaseStudy(slug));
  } catch {
    notFound();
  }

  return (
    <CaseStudyLayout {...frontmatter!}>
      <MDXRemote source={content!} />
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/work/[slug]/page.tsx"
git commit -m "feat: add dynamic case study page with MDXRemote"
```

---

## Task 16: Verify build and final commit

**Files:** none (verification only)

- [ ] **Step 1: Run dev server and spot-check pages**

```bash
npm run dev
```

Visit and verify these routes render without errors:
- `http://localhost:3000` — home page with hero, work cards, process steps, contact form
- `http://localhost:3000/about` — about page
- `http://localhost:3000/work` — work index with both project cards
- `http://localhost:3000/work/samepage` — SamePage case study
- `http://localhost:3000/work/recipe-bookmarks` — Recipe Bookmarks case study

Stop the dev server (Ctrl+C) when done.

- [ ] **Step 2: Run TypeScript build**

```bash
npm run build
```

Expected: build completes with no TypeScript errors. If there are errors, fix them before continuing.

- [ ] **Step 3: Final git commit**

```bash
git add -A
git commit -m "init: scaffold freelance portfolio site"
```

---

## Notes

- **LinkedIn URL:** The plan uses `linkedin.com/in/nickfigliolia` as a placeholder — update to the actual LinkedIn profile slug if different.
- **Cloudflare Analytics token:** Replace `YOUR_TOKEN_HERE` in `layout.tsx` once the Cloudflare Pages project is created and you have a real token.
- **Resend domain:** The `from` address is set to `portfolio@nickfig.dev`. Before the contact form works in production, you must verify `nickfig.dev` in your Resend dashboard (resend.com → Domains → Add Domain). Until then, the form will error in production but work locally if you temporarily switch `from` back to `onboarding@resend.dev`.
- **Tests:** No test infrastructure is set up in this phase. The contact form can be manually tested by submitting the live form with the Resend key in `.env.local`.
