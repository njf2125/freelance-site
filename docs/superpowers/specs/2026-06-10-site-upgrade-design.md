# Site Upgrade — Credibility & Differentiation

**Date:** 2026-06-10  
**Goal:** Increase client inquiries by adding credibility signals and surfacing the QA differentiator.

---

## Problem

The site is visually polished but doesn't convert as well as it could. No testimonials or metrics are available. Visitors don't see enough reason to trust that Nick delivers for real clients, and the QA background — the strongest differentiator — is buried in the process section and About page rather than leading the pitch.

---

## Scope

Two targeted changes to `src/app/page.tsx` only. No new components, no new pages, no changes to case study MDX or other pages.

---

## Change 1 — Hero subhead copy (Approach B)

**File:** `src/app/page.tsx`

**What changes:** The `<p>` subhead immediately below the H1 and the fine-print paragraph below it.

### Before

```
<p className="mt-8 text-lg text-[var(--muted)] leading-relaxed">
  <span className="text-[var(--text)]">Either way, we ship.</span>{" "}
  Some clients come with a detailed spec. Some come with a napkin sketch.
</p>

<p className="mt-4 text-sm text-[var(--faint)] leading-relaxed max-w-sm">
  Custom dashboards, client portals, and internal tools for small teams —
  the things off-the-shelf software can't quite cover.
</p>
```

### After

```
<p className="mt-8 text-lg text-[var(--muted)] leading-relaxed">
  <span className="text-[var(--text)]">A QA background means I think about
  what breaks before I build it</span> — not after your users find it.
</p>

<p className="mt-4 text-sm text-[var(--faint)] leading-relaxed max-w-sm">
  Custom dashboards, client portals, and internal tools for small teams.
</p>
```

**Rationale:** The QA background is a genuine differentiator most React freelancers can't claim. Moving it to the hero subhead means every visitor sees it immediately. The original "Either way, we ship" copy is vague and doesn't differentiate.

---

## Change 2 — CDR work card client signaling (Approach C)

**File:** `src/app/page.tsx`

The `projects` array has a `slug` field we can use to conditionally apply the CDR-specific treatment. Three sub-changes:

### 2a — Remove redundant "Client work" from the `type` field

CDR's current `type` is `"Client work · Dashboard"`, which renders in the meta line at the card's top-right. Since the new badge (2c) carries the "client work" signal, change the `type` to just:

```
type: "Dashboard",
```

Without this, "Client work" appears twice on the same card (meta line + badge).

### 2b — Left accent border

The CDR card's wrapping `<div>` (line 183–190) gets a conditional `borderLeft` added to its `style` object when `project.slug === "cdr-dash"`.

**Ordering matters — this is a hard requirement.** The existing `style` object sets `borderColor: "var(--border)"`, which is shorthand for all four border colors. `borderLeft` is shorthand for left width/style/color. In a React inline-style object, properties are applied in insertion order, so `borderLeft` **must come after** `borderColor` — otherwise `borderColor` clobbers the left side back to grey. Correct form:

```jsx
style={{
  backgroundColor: "var(--surface)",
  borderColor: "var(--border)",
  ...(project.slug === "cdr-dash" && {
    borderLeft: "3px solid var(--accent)",
  }),
}}
```

Hover note: the card has `hover:border-[var(--accent)]`, which only changes border *color*. The inline `borderLeft` wins over Tailwind's hover class (inline styles beat stylesheet rules without `!important`), so on hover the left border stays accent at 3px while the other three sides turn accent at 1px. That's the intended effect.

### 2c — Client badge

A teal pill badge is inserted as the **first child** of the content column `<div className="p-6 flex flex-col">` (line 206), directly above the existing title/meta row (`<div className="flex items-center justify-between mb-3">` at line 207), conditionally when `project.slug === "cdr-dash"`:

```jsx
{project.slug === "cdr-dash" && (
  <div className="flex items-center gap-1.5 mb-3 w-fit rounded-full border px-2 py-0.5"
    style={{ background: "rgba(45,212,191,0.08)", borderColor: "rgba(45,212,191,0.25)" }}>
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
    <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent)]">
      Client work · in production
    </span>
  </div>
)}
```

**Rationale:** Client Room and SamePage are personal projects. CDR is real paid client work still running in production. The border + badge creates a visible distinction without annotating every card. The contrast between CDR and the other two cards does the persuasive work.

---

## What is not changing

- The eyebrow ("Got a workflow held together with spreadsheets...") — stays
- The H1 ("I build the software that actually fits.") — stays
- Client Room and SamePage work cards — unchanged
- The process section, About page, case study pages — unchanged
- No new components, no new files beyond this spec

---

## Success criteria

A potential client reading the hero immediately understands Nick's technical background is QA-informed (not just "another React dev"). A potential client scanning the work section can immediately tell CDR was built for a real paying client, not a side project.
