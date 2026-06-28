import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/config/site";

// `client: true` marks real paid client work (loud "live client work" signal).
// Everything else is a personal project — also live, but quietly tagged.
const projects = [
  {
    slug: "clientroom",
    title: "Client Room",
    description:
      "A private portal for every client. Instead of scattered email threads, each client gets their own room — messaging, shared files, milestones, and invoices in one place.",
    tech: ["Firebase", "Stripe", "Cloudflare Pages"],
    meta: "Product · live",
    year: "2025",
    img: "/work/clientroom.png",
    client: false,
    url: "https://clientroom.app",
    caseStudy: "/work/clientroom",
  },
  {
    slug: "cdr-dash",
    title: "CDR Dashboard",
    description:
      "A real-time job tracker for a paintless dent repair workshop — Kanban board for techs, TV display mode for the shop floor, and role-based PIN access.",
    tech: ["React", "TypeScript", "Firestore", "Cloudflare Pages Functions"],
    meta: "Dashboard · in production since 2025",
    year: "2025",
    img: "/work/cdr.png",
    client: true,
    url: "https://cdr.fignacious.com",
    caseStudy: "/work/cdr-dash",
  },
  {
    slug: "samepage",
    title: "SamePage",
    description:
      "A collaborative reading tracker built for two people to stay on the same page with real-time sync and spoiler protection.",
    tech: ["React", "TypeScript", "Firebase Auth", "Firestore"],
    meta: "iOS · Android · Web · live",
    year: "2025",
    img: "/work/samepage.png",
    client: false,
    url: "https://samepage.pages.dev",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://nickfig.dev/#person",
      name: "Nick Figliolia",
      url: "https://nickfig.dev",
      jobTitle: "Software Engineer",
      description:
        "React/TypeScript engineer available for freelance work. I build custom web apps, dashboards, and internal tools for teams that have outgrown off-the-shelf software.",
      email: "dev@nickfig.dev",
      sameAs: [
        "https://github.com/njf2125",
        "https://linkedin.com/in/nickfigliolia",
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Next.js",
        "Firebase",
        "Cloudflare",
        "Frontend Engineering",
        "Dashboards",
        "Internal Tools",
        "Web Applications",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://nickfig.dev/#website",
      url: "https://nickfig.dev",
      name: "nickfig.dev",
      description:
        "Portfolio of Nick Figliolia — freelance React/TypeScript engineer building custom web apps, dashboards, and internal tools.",
      publisher: { "@id": "https://nickfig.dev/#person" },
    },
  ],
};

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-14 sm:py-20 border-b border-[var(--border)]">
        <div className="grid grid-cols-1 gap-12 items-center sm:grid-cols-2 sm:gap-16">

          {/* Copy */}
          <div>
            <div className="flex items-center gap-2.5">
              {siteConfig.availability === "available" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    Available for new projects
                  </span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    Booked up for now
                  </span>
                </>
              )}
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
              <span className="text-[var(--text)]">A QA background means I think about what breaks before I build it</span>{" "}
              — not after your users find it.
            </p>

            <p className="mt-4 text-sm text-[var(--faint)] leading-relaxed max-w-sm">
              Custom dashboards, client portals, and internal tools for small teams.
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
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
              borderColor: "var(--border-2)",
              boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)",
            }}
          >
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/work/cdr.png"
                alt="CDR Dashboard — real-time Kanban board"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 460px"
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
              className="group relative grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: project.client
                  ? "rgba(45,212,191,0.35)"
                  : "var(--border)",
                ...(project.client && {
                  boxShadow:
                    "0 0 0 1px rgba(45,212,191,0.06), 0 24px 48px -28px rgba(45,212,191,0.25)",
                }),
              }}
            >
              {/* Client cards get a top accent bar instead of a static left border */}
              {project.client && (
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-[3]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent), rgba(45,212,191,0))",
                  }}
                />
              )}

              {/* Screenshot */}
              <div className="relative overflow-hidden w-full h-full min-h-[230px]">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 400px"
                />

                {/* Edge fade so the image reads into the content column on desktop */}
                <div
                  className="absolute inset-0 hidden sm:block pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 55%, var(--surface) 100%)",
                  }}
                />

                {/* Status pill — overlaid on the screenshot */}
                {project.client ? (
                  <div
                    className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full px-2.5 py-1.5"
                    style={{
                      backgroundColor: "var(--accent)",
                      boxShadow: "0 4px 14px -2px rgba(45,212,191,0.5)",
                    }}
                  >
                    <span className="relative flex h-[7px] w-[7px]">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: "var(--accent-ink)" }}
                      ></span>
                      <span
                        className="relative inline-flex rounded-full h-[7px] w-[7px]"
                        style={{ backgroundColor: "var(--accent-ink)" }}
                      ></span>
                    </span>
                    <span
                      className="font-mono text-[11px] font-medium uppercase tracking-wider"
                      style={{ color: "var(--accent-ink)" }}
                    >
                      Live client work
                    </span>
                  </div>
                ) : (
                  <div
                    className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border px-2.5 py-1.5"
                    style={{
                      backgroundColor: "rgba(9,9,11,0.7)",
                      backdropFilter: "blur(4px)",
                      borderColor: "var(--border-2)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--faint)]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                      Personal project
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex flex-col">
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <Link href={`/work/${project.slug}`} className="hover:underline">
                    <h3 className="font-display text-2xl font-semibold text-[var(--text)] tracking-tight">
                      {project.title}
                    </h3>
                  </Link>
                  <span className="font-mono text-[11px] text-[var(--faint)] whitespace-nowrap">
                    {project.year}
                  </span>
                </div>

                <p
                  className="font-mono text-[11px] mb-3.5 tracking-wide"
                  style={{
                    color: project.client ? "var(--accent)" : "var(--faint)",
                  }}
                >
                  {project.meta}
                </p>

                <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--border)]">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    Visit live ↗
                  </a>
                  {"appStore" in project && project.appStore && (
                    <a
                      href={project.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      App Store ↗
                    </a>
                  )}
                  {project.client ? (
                    <Link
                      href={project.caseStudy}
                      className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "var(--accent-ink)",
                      }}
                    >
                      Case study →
                    </Link>
                  ) : (
                    <Link
                      href={project.caseStudy}
                      className="ml-auto text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      Case study →
                    </Link>
                  )}
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
            <p className="mt-2 text-base text-[var(--muted)] leading-relaxed">
              Let&apos;s figure out if it&apos;s a good fit. I take on {siteConfig.maxClients} clients at a time. Projects start from {siteConfig.rate}.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a href="mailto:dev@nickfig.dev"
                className="font-mono text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                dev@nickfig.dev ↗
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
