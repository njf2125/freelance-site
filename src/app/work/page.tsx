import type { Metadata } from "next";
import WorkTable from "@/components/WorkTable";
import { getAllCaseStudies } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Work — nickfig.dev",
};

export default function WorkIndex() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest mb-4 text-[var(--accent)]">
        Portfolio
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-[var(--text)] mb-6">Work</h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed max-w-[480px] mb-12">
        Selected projects from freelance and personal work.
      </p>
      <WorkTable projects={caseStudies} />
    </main>
  );
}
