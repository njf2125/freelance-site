import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work — Nick Figliolia",
};

export default function WorkIndex() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-teal-400 mb-3">
        Portfolio
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-100">Work</h1>
      <p className="mt-3 text-zinc-400">
        Selected projects from freelance and personal work.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {caseStudies.map((project: CaseStudy) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </main>
  );
}
