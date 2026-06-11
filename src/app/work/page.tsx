import type { Metadata } from "next";
import WorkCard from "@/components/WorkCard";
import { getAllCaseStudies } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Work — nickfig.dev",
  description:
    "Custom dashboards, client portals, and internal tools — built for specific teams and shipped to production.",
  openGraph: {
    title: "Work — nickfig.dev",
    description:
      "Custom dashboards, client portals, and internal tools — built for specific teams and shipped to production.",
  },
};

export default function WorkIndex() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest mb-4 text-[var(--accent)]">
        Work
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] mb-4">
        Selected work
      </h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed max-w-[520px] mb-14">
        Custom dashboards, portals, and apps — each built for a specific team&apos;s
        real workflow, and shipped to production.
      </p>

      <div className="flex flex-col gap-6">
        {caseStudies.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
