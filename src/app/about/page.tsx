import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — nickfig.dev",
};

export default function About() {
  return (
    <main className="mx-auto max-w-[780px] px-6 py-20 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-6">
        About
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text)]">
        About Me
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
        QA Engineer turned Software Engineer
      </p>

      <div className="mt-12 space-y-8 text-[var(--muted)] leading-loose max-w-[600px]">
        <p>
          I started in QA and moved into software engineering — which means I
          think carefully about correctness and edge cases, not just getting
          things to work the happy path.
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

      <div className="mt-12 flex gap-6">
        <a
          href="https://github.com/njf2125"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--faint)] underline-offset-4 hover:decoration-[var(--accent)]"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/nickfigliolia"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--faint)] underline-offset-4 hover:decoration-[var(--accent)]"
        >
          LinkedIn
        </a>
      </div>
    </main>
  );
}
