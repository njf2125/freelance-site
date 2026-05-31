import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

// Add the `img` field to each project matching the screenshot in /public/work/
const projects = [
  {
    slug: "cdr-dash",
    title: "CDR Dashboard",
    description:
      "A real-time job tracker for a paintless dent repair workshop — Kanban board for techs, TV display mode for the shop floor, and role-based PIN access.",
    tech: ["React", "TypeScript", "Firestore", "Cloudflare Pages Functions"],
    type: "Client work · Dashboard",
    year: "2025",
    img: "/work/cdr.png",
    demo: "https://cdr.fignacious.com",
    caseStudy: "/work/cdr-dash",
  },
  {
    slug: "clientroom",
    title: "Client Room",
    description:
      "A private portal for every client. Instead of scattered email threads, each client gets their own room — messaging, shared files, milestones, and invoices in one place.",
    tech: ["Firebase", "Stripe", "Cloudflare Pages"],
    type: "Product",
    year: "2025",
    img: "/work/clientroom.png",
    github: "https://github.com/njf2125/ClientRoom",
    demo: "https://clientroom.app",
    caseStudy: "/work/clientroom",
  },
  {
    slug: "samepage",
    title: "SamePage",
    description:
      "A collaborative reading tracker built for two people to stay on the same page with real-time sync and spoiler protection.",
    tech: ["React", "TypeScript", "Firebase Auth", "Firestore"],
    type: "iOS · Android · Web",
    year: "2025",
    img: "/work/samepage.png",
    github: "https://github.com/njf2125/SamePage",
    demo: "https://samepage.pages.dev",
    appStore: "https://apps.apple.com/us/app/samepage-read-together/id6770348751",
    caseStudy: "/work/samepage",
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
        <div className="grid grid-cols-1 gap-12 items-center sm:grid-cols-2 sm:gap-16">

          {/* Copy */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] block" />
              </span>
              <span className="font-mono text-xs text-[var(--muted)]">
                Available for new projects
              </span>
            </div>

            <h1 className="font-display mt-6 text-5xl sm:text-[3.4rem] leading-[1.08] tracking-tight">
              <span className="block font-normal text-[var(--muted)] text-[0.66em] leading-snug mb-2">
                Got a workflow held together with spreadsheets and workarounds?
              </span>
              <span className="block font-semibold text-[var(--text)]">
                I build the software that actually fits.
              </span>
            </h1>

            <p className="mt-8 text-lg text-[var(--muted)] leading-relaxed">
              <span className="text-[var(--text)]">Either way, we ship.</span>{" "}
              Some clients come with a detailed spec. Some come with a napkin sketch.
            </p>

            <p className="mt-4 text-sm text-[var(--faint)] leading-relaxed max-w-sm">
              Custom dashboards, client portals, and internal tools for small teams —
              the things off-the-shelf software can&apos;t quite cover.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}
              >
                Start a project →
              </a>
              <Link
                href="/work"
                className="text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors"
              >
                See the work →
              </Link>
            </div>
          </div>

          {/* Screenshot frame */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border-2)",
              boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-1.5 px-3.5 py-3 border-b"
              style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}
            >
              {["bg-[var(--border-2)]", "bg-[var(--border-2)]", "bg-[var(--border-2)]"].map((c, i) => (
                <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
              ))}
              <span className="ml-3 font-mono text-[11px] text-[var(--faint)]">
                cdr.fignacious.com
              </span>
            </div>
            {/* Replace src with whichever screenshot looks best at this size */}
            <div className="relative w-full" style={{ height: "320px" }}>
              <Image
                src="/work/cdr.png"
                alt="CDR Dashboard — real-time Kanban board"
                fill
                className="object-cover"
                sizes="(max-w-md) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="mt-10 pb-10 border-b border-[var(--border)]">
        <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-6">
          Work
        </p>

        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-xl border transition-colors hover:border-[var(--accent)]"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* Screenshot */}
              <div
                className="relative overflow-hidden border-b sm:border-b-0 sm:border-r w-full h-full min-h-[220px]"
                style={{ borderColor: "var(--border)" }}
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-w-md) 100vw, 400px"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Link href={`/work/${project.slug}`} className="hover:underline">
                    <h3 className="font-display text-xl font-semibold text-[var(--text)]">
                      {project.title}
                    </h3>
                  </Link>
                  <span className="text-[10px] font-mono text-[var(--faint)] text-right ml-4 shrink-0">
                    {project.type}<br />{project.year}
                  </span>
                </div>

                <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--faint)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {"github" in project && project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                      GitHub
                    </a>
                  )}
                  {"appStore" in project && project.appStore && (
                    <a href={project.appStore} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                      App Store
                    </a>
                  )}
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--faint)] hover:text-[var(--accent)] transition-colors">
                    Live Demo
                  </a>
                  <Link href={project.caseStudy}
                    className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors ml-auto">
                    Case study →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-10 sm:py-14 border-b border-[var(--border)]">
        <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-2">
          How I Work
        </p>
        <p className="text-sm text-[var(--muted)] mb-10 max-w-lg">
          A QA background means I think about what breaks before it does — not just whether something works when everything goes right.
        </p>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <p className="font-display text-4xl font-medium text-[var(--accent)]">
                {step.number}
              </p>
              <div className="border-t border-[var(--border)] pt-4 mt-4">
                <h3 className="font-sans text-base font-semibold text-[var(--text)]">
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
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[0.8fr_1.2fr] sm:gap-14">
          <div>
            <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)]">
              Got something in mind?
            </h2>
            <p className="mt-2 text-base text-[var(--muted)]">
              Let&apos;s figure out if it&apos;s a good fit. I take on 1–2 clients at a time.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href="mailto:hello@nickfig.dev"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                hello@nickfig.dev ↗
              </a>
              <a href="https://github.com/njf2125" target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/nickfigliolia" target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                LinkedIn ↗
              </a>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
