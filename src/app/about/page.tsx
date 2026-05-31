import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About — nickfig.dev",
  description:
    "I build custom dashboards, client portals, and internal tools for small teams that have outgrown off-the-shelf software.",
  openGraph: {
    title: "About — nickfig.dev",
    description:
      "I build custom dashboards, client portals, and internal tools for small teams that have outgrown off-the-shelf software.",
  },
};

const STACK = [
  "React", "TypeScript", "Next.js", "Vite",
  "Cloudflare Pages", "Workers", "D1", "Firebase", "Firestore", "Stripe",
];

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:py-20">

      {/* Page header */}
      <div className="mb-12">
        <p className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest mb-3">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)]">
          Nick Figliolia
        </h1>
        <p className="font-mono text-sm mt-2" style={{ color: "var(--accent)" }}>
          Software Engineer · React &amp; TypeScript
        </p>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px] md:gap-14 items-start">

        {/* Bio */}
        <div>
          <p
            className="font-display text-2xl font-medium leading-snug mb-7"
            style={{ color: "var(--text)" }}
          >
            I started in quality assurance, which means I think about what breaks
            before it does — not just whether something works when everything goes right.
          </p>

          <p className="text-base text-[var(--muted)] leading-relaxed mb-4">
            On the side I take on freelance work for teams that need{" "}
            <strong className="text-[var(--text)] font-semibold">
              custom dashboards, internal tools, and full-stack web apps
            </strong>{" "}
            — things that have outgrown off-the-shelf software.
          </p>

          <p className="text-base text-[var(--muted)] leading-relaxed mb-4">
            Recent builds: <strong className="text-[var(--text)] font-medium">SamePage</strong>,
            a collaborative reading tracker live on iOS and Android;{" "}
            <strong className="text-[var(--text)] font-medium">Client Room</strong>,
            a portal for freelancers with Stripe-powered invoicing; and the{" "}
            <strong className="text-[var(--text)] font-medium">CDR Dashboard</strong>,
            a real-time job tracker built for a repair workshop.
          </p>

          <p className="text-base text-[var(--muted)] leading-relaxed mb-8">
            I work in short cycles with frequent check-ins, so you see real, working software
            early — not mockups. Handoff always includes deployment, documentation, and a walkthrough.
          </p>

          <p className="text-[10px] font-mono text-[var(--faint)] uppercase tracking-widest mb-3">
            Stack I reach for
          </p>
          <div className="flex flex-wrap gap-1.5">
            {STACK.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right rail */}
        <div className="flex flex-col gap-4">

          {/* Portrait — replace src with your actual photo path */}
          <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "280px" }}>
            <Image
              src="/portrait.jpg"
              alt="Nick Figliolia"
              fill
              className="object-cover"
              sizes="(max-w-md) 100vw, 280px"
              priority
            />
          </div>

          {/* Availability card */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4">
            <p className="text-[10px] font-mono text-[var(--faint)] uppercase tracking-widest mb-3">
              Availability
            </p>
            {siteConfig.availability === "available" ? (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                  </span>
                  Open to projects
                </div>
                <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                  {siteConfig.maxClients} clients at a time. Projects from {siteConfig.rate}.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                  Fully Booked
                </div>
                <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                  I&apos;m currently at capacity. Reach out to secure a future slot.
                </p>
              </>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/#contact"
            className="inline-flex justify-center items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-center transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Start a project →
          </Link>

          {/* Social links */}
          <div className="flex flex-col gap-2.5 pt-1">
            <a href="mailto:dev@nickfig.dev"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              dev@nickfig.dev ↗
            </a>
            <a href="https://github.com/njf2125" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/nickfigliolia" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
