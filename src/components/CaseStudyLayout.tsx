import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { StatCard } from "@/lib/types";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  stats?: StatCard[];
  image?: string;   // add `image` to CaseStudy type + MDX frontmatter — see README
  nextStudy?: { slug: string; title: string };
  children: ReactNode;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  stack,
  problem,
  whatWasBuilt,
  outcome,
  stats,
  image,
  nextStudy,
  children,
}: CaseStudyLayoutProps) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:py-20">

      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-6 whitespace-nowrap"
      >
        ← Work
      </Link>

      {/* Header */}
      <p className="font-mono text-[11px] uppercase tracking-widest mb-5 text-[var(--accent)]">
        Case Study
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)]">
        {title}
      </h1>
      <p className="mt-3 font-mono text-sm text-[var(--accent)]">{subtitle}</p>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-2.5 mt-7 max-w-lg">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg px-3 py-2.5"
              style={{ backgroundColor: "var(--surface)" }}
            >
              <p className="text-[9px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: s.highlight ? "var(--accent)" : "var(--text)" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Stack */}
      <p className="mt-5 font-mono text-xs text-[var(--faint)]">
        {stack.join(" · ")}
      </p>

      {/* Hero screenshot — only renders when `image` is provided in MDX frontmatter */}
      {image && (
        <div
          className="mt-10 rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border-2)",
            boxShadow: "0 28px 60px -24px rgba(0,0,0,0.8)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-1.5 px-3.5 py-3 border-b"
            style={{ backgroundColor: "var(--surface-2)", borderColor: "var(--border)" }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2.5 h-2.5 rounded-full bg-[var(--border-2)]" />
            ))}
          </div>
          <div className="relative w-full" style={{ height: "450px" }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-w-4xl) 100vw, 800px"
              priority
            />
          </div>
        </div>
      )}

      {/* 3-col summary */}
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {[
          { label: "Problem", text: problem },
          { label: "What Was Built", text: whatWasBuilt },
          { label: "Outcome", text: outcome },
        ].map(({ label, text }) => (
          <div
            key={label}
            className="pl-4"
            style={{ borderLeft: "2px solid var(--border)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)] mb-3">
              {label}
            </p>
            <p className="text-sm text-[var(--text)] leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* MDX body */}
      <div className="mt-16 prose max-w-none prose-p:text-[var(--muted)] prose-p:leading-loose prose-headings:font-display prose-headings:font-normal prose-headings:text-[var(--text)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text)] prose-strong:font-medium prose-li:text-[var(--muted)] prose-ul:text-[var(--muted)]">
        {children}
      </div>

      {/* Next Case Study Navigation */}
      {nextStudy && (
        <div
          className="mt-20 pt-8 border-t flex justify-between items-center"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-xs font-mono text-[var(--faint)] uppercase tracking-widest">
            Next Project
          </span>
          <Link
            href={`/work/${nextStudy.slug}`}
            className="font-display text-xl font-medium text-[var(--accent)] hover:text-[var(--text)] transition-colors"
          >
            {nextStudy.title} →
          </Link>
        </div>
      )}

      {/* CTA */}
      <div
        className="mt-20 pt-12 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="font-display text-2xl font-normal text-[var(--text)] mb-2">
          Got something in mind?
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Let&apos;s figure out if it&apos;s a good fit.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Start a project →
          </Link>
          <Link
            href="/work"
            className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            ← All work
          </Link>
        </div>
      </div>
    </main>
  );
}
