import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — nickfig.dev",
  description:
    "QA engineer turned software engineer. I take on freelance work for teams that need custom dashboards, internal tools, and full-stack web apps built with React and TypeScript.",
  openGraph: {
    title: "About — nickfig.dev",
    description:
      "QA engineer turned software engineer. I take on freelance work for teams that need custom dashboards, internal tools, and full-stack web apps built with React and TypeScript.",
  },
};

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 md:gap-12 items-start">
        <div>
          <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">
            About
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-[var(--text)] mb-1">Nick Figliolia</h1>
          <p className="text-sm font-mono text-[var(--muted)] mb-6">
            Software Engineer · nCino
          </p>

          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            QA engineer turned software engineer — which means I think carefully about
            correctness and edge cases, not just the happy path.
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            On the side I take on freelance work for teams that need{" "}
            <strong className="text-[var(--text)] font-medium">
              custom dashboards, internal tools, and full-stack web apps
            </strong>
            {" "}— things that have outgrown off-the-shelf software.
          </p>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
            Personal projects: a collaborative reading tracker PWA, a recipe-saving app with
            AI grocery list parsing, and various home automation experiments.
          </p>

          <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest mb-2">
            Stack I reach for
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["React", "TypeScript", "Next.js", "Cloudflare Pages", "Workers", "D1", "Firebase"].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
                >
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[var(--surface)] rounded-xl p-4">
            <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest mb-2">
              Availability
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              Open to projects
            </div>
            <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
              1–2 clients at a time.
              <br />
              Projects from $2,500.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://github.com/njf2125"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/nickfigliolia"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
