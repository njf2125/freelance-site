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
      <section
        className="py-20 sm:py-32 border-b border-[var(--border)]"
        style={{ background: 'radial-gradient(ellipse 120% 60% at -10% 40%, rgba(45, 212, 191, 0.06) 0%, transparent 70%)' }}
      >
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] tracking-tight max-w-3xl">
          <span className="block font-normal text-[var(--muted)]">
            That project living rent-free in your head?
          </span>
          <span className="block font-semibold text-[var(--text)]">
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

      {/* Work */}
      <section className="mt-16 pb-16 border-b border-[var(--border)]">
        <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-6">
          Work
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/work/recipe-bookmarks">
            <div className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-6 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[var(--text)]">Recipe Bookmarks</h3>
                <span className="text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors">→</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                A recipe organizer that finds meals from what&apos;s already in your kitchen.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Cloudflare D1", "Workers", "Gemini Vision"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--faint)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--faint)] ml-4 shrink-0">Full-stack · AI · 2025</span>
              </div>
            </div>
          </Link>

          <Link href="/work/samepage">
            <div className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-6 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[var(--text)]">SamePage</h3>
                <span className="text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors">→</span>
              </div>
              <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                A collaborative reading tracker built for two people to stay on the same page.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["React", "TypeScript", "Firebase Auth", "Firestore", "Cloudflare Pages"].map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--faint)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--faint)] ml-4 shrink-0">PWA · Real-time · 2025</span>
              </div>
            </div>
          </Link>
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
              <p className="font-mono text-sm text-[var(--accent)] mb-4">
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
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)]">
          Got something in mind?
        </h2>
        <p className="mt-2 text-lg text-[var(--muted)]">
          Let&apos;s figure out if it&apos;s a good fit.
        </p>
        <div className="max-w-2xl mt-8">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
