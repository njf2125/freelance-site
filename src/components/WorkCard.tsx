import Link from "next/link";
import { CaseStudy } from "@/lib/types";

// Static map of slug → public screenshot path.
// Add matching files to /public/work/ — see README Step 0.
const WORK_IMAGES: Record<string, string> = {
  clientroom: "/work/clientroom.png",
  "cdr-dash": "/work/cdr.png",
  samepage: "/work/samepage.png",
};

const WORK_META: Record<string, { type: string; year: string; demo: string; github?: string; appStore?: string; }> = {
  clientroom: { type: "Product · SaaS", year: "2025", demo: "https://clientroom.app", github: "https://github.com/njf2125/ClientRoom" },
  "cdr-dash":  { type: "Client work · Dashboard", year: "2025", demo: "https://cdr.fignacious.com" },
  samepage:    { type: "iOS · Android · Web", year: "2025", demo: "https://samepage.pages.dev", github: "https://github.com/njf2125/SamePage", appStore: "https://apps.apple.com/us/app/samepage-read-together/id6770348751" },
};

interface WorkCardProps {
  project: CaseStudy;
}

export default function WorkCard({ project }: WorkCardProps) {
  const img = WORK_IMAGES[project.slug];
  const meta = WORK_META[project.slug] ?? { type: "—", year: "—", demo: "#" };

  return (
    <article
      className="group grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl border transition-colors hover:border-[var(--accent)]"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Screenshot */}
      {img && (
        <div
          className="overflow-hidden border-b sm:border-b-0 sm:border-r"
          style={{ borderColor: "var(--border)", minHeight: "260px" }}
        >
          <img
            src={img}
            alt={project.title}
            className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ minHeight: "260px" }}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-7 flex flex-col">
        {/* Header row */}
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <Link href={`/work/${project.slug}`}>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--text)] hover:underline">
              {project.title}
            </h3>
          </Link>
          <span className="text-[11px] font-mono text-[var(--faint)] text-right shrink-0 leading-relaxed">
            {meta.type}<br />{meta.year}
          </span>
        </div>

        {/* Subtitle from MDX frontmatter */}
        <p className="font-mono text-xs text-[var(--accent)] mb-3">
          {project.subtitle}
        </p>

        {/* Problem as description */}
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
          {project.problem}
        </p>

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg px-2.5 py-2"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
              >
                <p className="text-[9px] font-mono text-[var(--faint)] uppercase tracking-widest mb-1">
                  {s.label}
                </p>
                <p
                  className="text-xs font-semibold leading-snug"
                  style={{ color: s.highlight ? "var(--accent)" : "var(--text)" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--faint)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto">
          <a href={meta.demo} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Live Demo ↗
          </a>
          {meta.github && (
            <a href={meta.github} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              GitHub ↗
            </a>
          )}
          {meta.appStore && (
            <a href={meta.appStore} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              App Store ↗
            </a>
          )}
          <Link href={`/work/${project.slug}`}
            className="text-xs font-mono text-[var(--text)] hover:text-[var(--accent)] transition-colors ml-auto">
            Case study →
          </Link>
        </div>
      </div>
    </article>
  );
}
