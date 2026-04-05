import { ReactNode } from "react";

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  children: ReactNode;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  stack,
  problem,
  whatWasBuilt,
  outcome,
  children,
}: CaseStudyLayoutProps) {
  return (
    <main className="mx-auto max-w-[780px] px-6 py-20 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-widest mb-6 text-[var(--accent)]">
        Case Study
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text)]">
        {title}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed max-w-[600px]">{subtitle}</p>

      <div className="mt-6">
        <p className="font-mono text-xs text-[var(--faint)]">
          {stack.join(", ")}
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        <div className="border-l-[2px] border-[var(--border)] pl-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)] mb-3">
            Problem
          </p>
          <p className="text-sm text-[var(--text)] leading-relaxed">{problem}</p>
        </div>
        <div className="border-l-[2px] border-[var(--border)] pl-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)] mb-3">
            What Was Built
          </p>
          <p className="text-sm text-[var(--text)] leading-relaxed">{whatWasBuilt}</p>
        </div>
        <div className="border-l-[2px] border-[var(--border)] pl-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)] mb-3">
            Outcome
          </p>
          <p className="text-sm text-[var(--text)] leading-relaxed">{outcome}</p>
        </div>
      </div>

      <div className="mt-16 prose max-w-none prose-p:text-[var(--muted)] prose-p:leading-loose prose-headings:font-display prose-headings:font-normal prose-headings:text-[var(--text)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text)] prose-strong:font-medium">
        {children}
      </div>
    </main>
  );
}
