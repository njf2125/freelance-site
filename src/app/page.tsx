import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const processSteps = [
  {
    number: "1",
    title: "Discovery",
    description:
      "We start with a focused conversation about your problem, your users, and what success looks like. I ask the questions that surface hidden requirements before a line of code is written.",
  },
  {
    number: "2",
    title: "Build",
    description:
      "I work in short cycles with frequent check-ins. You see real, working software early — not mockups — so feedback is grounded in reality.",
  },
  {
    number: "3",
    title: "Launch",
    description:
      "Handoff includes deployment, documentation, and a walkthrough. I stay available for the first month to handle anything that comes up in production.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6">
      {/* Hero */}
      <section className="py-20 sm:py-32 border-b border-[var(--border)]">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] tracking-tight max-w-3xl">
          <span className="block font-light text-[var(--muted)]">
            That project living rent-free in your head?
          </span>
          <span className="block font-bold text-[var(--text)]">
            I&apos;m already thinking about the architecture.
          </span>
        </h1>

        <p className="mt-10 text-xl text-[var(--muted)] leading-relaxed max-w-lg">
          Some clients come with a detailed spec.
          <br />
          Some come with a napkin sketch.
          <br />
          Either way, we ship.
        </p>

        <p className="mt-6 text-sm text-[var(--faint)] max-w-lg leading-relaxed">
          Specializing in React and TypeScript — working with small teams to build tools that actually fit their workflow.
        </p>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors"
        >
          Let&apos;s talk about it →
        </a>
      </section>

      {/* Selected Work */}
      <section className="mt-16">
        <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-6">
          Selected work
        </p>

        <div className="flex flex-col gap-3">
          {/* Card 1 — Recipe Bookmarks */}
          <Link href="/work/recipe-bookmarks">
            <div className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-5 grid grid-cols-[1fr_auto] gap-3 items-start transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-amber-950/40 text-amber-400 border-amber-800/60">
                    Full-stack · AI
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-[var(--surface)] text-[var(--faint)] border-[var(--border)]">
                    Edge infra
                  </span>
                  <span className="text-[11px] font-mono text-[var(--faint)]">2025</span>
                </div>
                <h3 className="font-medium text-[var(--text)] mb-1.5">Recipe Bookmarks</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                  Server-side OG scraping, FTS5 full-text search at the edge, and an AI feature
                  that parses handwritten grocery lists via Gemini Vision.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Cloudflare D1", "Workers", "Gemini Vision"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--faint)] border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors mt-0.5">
                →
              </span>
            </div>
          </Link>

          {/* Card 2 — SamePage */}
          <Link href="/work/samepage">
            <div className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-5 grid grid-cols-[1fr_auto] gap-3 items-start transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-teal-950/40 text-teal-400 border-teal-800/60">
                    PWA · Real-time
                  </span>
                  <span className="text-[11px] font-mono text-[var(--faint)]">2025</span>
                </div>
                <h3 className="font-medium text-[var(--text)] mb-1.5">SamePage</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">
                  Collaborative reading tracker installable on iOS and Android. Includes a
                  mid-production auth migration from Supabase to Firebase with no downtime.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Firebase Auth", "Firestore", "Cloudflare Pages"].map(
                    (t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--faint)] border border-[var(--border)]"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
              <span className="text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors mt-0.5">
                →
              </span>
            </div>
          </Link>

          {/* Placeholder card */}
          <div className="border border-dashed border-[var(--border)] rounded-xl px-5 py-4 text-sm text-[var(--faint)]">
            <span className="font-medium text-[var(--muted)]">Coming soon:</span>
            {" "}A speculative concept — a custom internal dashboard built for a real business type.
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 border-b border-[var(--border)]">
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)] mb-12">
          How I Work
        </h2>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <p className="font-mono text-sm text-[var(--muted)] mb-4">
                {step.number} &mdash;
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <h3 className="font-sans text-base font-medium text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-20">
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)] mb-8">
          Got a project? Let&apos;s talk.
        </h2>
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
