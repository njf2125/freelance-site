import Link from "next/link";
import { CaseStudy } from "@/lib/types";

const projectMeta: Record<string, { year: string; type: string }> = {
  samepage: { year: "2025", type: "PWA · realtime" },
  "recipe-bookmarks": { year: "2025", type: "Full-stack · AI" },
};

export default function WorkTable({ projects }: { projects: CaseStudy[] }) {
  return (
    <div className="mt-8">
      <div
        className="grid pb-2 mb-1 border-b"
        style={{
          gridTemplateColumns: "1fr 64px 180px 20px",
          borderBottomWidth: "1.5px",
          borderColor: "var(--text)",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>Project</span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>Year</span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>Type</span>
        <span />
      </div>
      {projects.map((project) => {
        const meta = projectMeta[project.slug] ?? { year: "—", type: "—" };
        return (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="grid items-baseline py-4 border-b group"
            style={{
              gridTemplateColumns: "1fr 64px 180px 20px",
              borderColor: "var(--border)",
              textDecoration: "none",
            }}
          >
            <span
              className="font-display text-lg"
              style={{ color: "var(--text)" }}
            >
              {project.title}
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
              {meta.year}
            </span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {meta.type}
            </span>
            <span
              className="font-mono text-sm"
              style={{ color: "var(--faint)" }}
            >
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
