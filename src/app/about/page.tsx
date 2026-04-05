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
        QA Engineer turned Software Engineer
      </p>

      <div className="mt-10 max-w-2xl space-y-6 text-zinc-300">
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
