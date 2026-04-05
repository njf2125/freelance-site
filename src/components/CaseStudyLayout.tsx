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
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-3">
        Case Study
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
        {title}
      </h1>
      <p className="mt-2 text-lg text-zinc-400">{subtitle}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded border border-amber-400/30 bg-amber-400/10 text-amber-400"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            Problem
          </p>
          <p className="text-sm text-zinc-300">{problem}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            What Was Built
          </p>
          <p className="text-sm text-zinc-300">{whatWasBuilt}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
            Outcome
          </p>
          <p className="text-sm text-zinc-300">{outcome}</p>
        </div>
      </div>

      <div className="mt-12 prose prose-invert prose-zinc max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-teal-400 prose-strong:text-zinc-100">
        {children}
      </div>
    </main>
  );
}
