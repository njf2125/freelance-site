import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const projects = [
  {
    slug: "clientroom",
    title: "Client Room",
    description: "A private portal for every client. Instead of scattered email threads, each client gets their own room — messaging, shared files, milestones, and invoices in one place.",
    tech: ["Firebase", "Stripe", "Cloudflare Pages"],
    type: "Product",
    year: "2025",
    github: "https://github.com/njf2125/ClientRoom",
    demo: "https://clientroom.app",
  },
  {
    slug: "cdr-dash",
    title: "CDR Dashboard",
    description: "A real-time job tracker for a paintless dent repair workshop — Kanban board for techs, TV display mode for the shop floor, and role-based PIN access.",
    tech: ["React", "TypeScript", "Firestore", "Cloudflare Pages Functions"],
    type: "Client work · Dashboard",
    year: "2025",
    demo: "https://cdr.fignacious.com",
  },
{
    slug: "samepage",
    title: "SamePage",
    description: "A collaborative reading tracker built for two people to stay on the same page with real-time sync and spoiler protection.",
    tech: ["React", "TypeScript", "Firebase Auth", "Firestore"],
    type: "iOS · Android · Web",
    year: "2025",
    github: "https://github.com/njf2125/SamePage",
    demo: "https://samepage.pages.dev",
    appStore: "https://apps.apple.com/us/app/samepage-read-together/id6770348751",
  },
];

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
      <section className="py-14 sm:py-20 border-b border-[var(--border)]">
        <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] tracking-tight max-w-3xl">
          <span className="block font-normal text-[var(--muted)]">
            Got a workflow held together with spreadsheets and workarounds?
          </span>
          <span className="block font-semibold text-[var(--text)]">
            I build the software that actually fits.
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
          Working with small teams to build custom dashboards, client portals, and internal tools — the things off-the-shelf software can&apos;t quite cover.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-xs text-[var(--muted)]">Available for new projects</span>
        </div>

        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors"
        >
          Let&apos;s talk about it →
        </a>
      </section>

      {/* Work */}
      <section className="mt-10 pb-10 border-b border-[var(--border)]">
        <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-6">
          Work
        </p>

        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div key={project.slug} className="group bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] rounded-xl p-6 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Link href={`/work/${project.slug}`} className="hover:underline">
                  <h3 className="text-lg font-medium text-[var(--text)]">{project.title}</h3>
                </Link>
                <div className="flex items-center gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                      GitHub
                    </a>
                  )}
                  {project.appStore && (
                    <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                      App Store
                    </a>
                  )}
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                    Live Demo
                  </a>
                  <Link href={`/work/${project.slug}`} className="text-[var(--faint)] group-hover:text-[var(--accent)] transition-colors">
                    →
                  </Link>
                </div>
              </div>
              
              <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg)] text-[var(--faint)] border border-[var(--border)]">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono text-[var(--faint)] ml-4 shrink-0">{project.type} · {project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-14 border-b border-[var(--border)]">
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
      <section id="contact" className="py-10 sm:py-14">
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
