import Link from "next/link";
import Image from "next/image";
import { CaseStudy } from "@/lib/types";

// Static map of slug → public screenshot path.
// Add matching files to /public/work/ — see README Step 0.
const WORK_IMAGES: Record<string, string> = {
  clientroom: "/work/clientroom.png",
  "cdr-dash": "/work/cdr.png",
  samepage: "/work/samepage.png",
};

// `client: true` marks real paid client work (loud "live client work" signal).
// Everything else is a personal project — also live, but quietly tagged.
const WORK_META: Record<
  string,
  { type: string; year: string; url: string; client: boolean; appStore?: string }
> = {
  clientroom: {
    type: "Product · SaaS",
    year: "2025",
    url: "https://clientroom.app",
    client: false,
  },
  "cdr-dash": {
    type: "Dashboard",
    year: "2025",
    url: "https://cdr.fignacious.com",
    client: true,
  },
  samepage: {
    type: "iOS · Android · Web",
    year: "2025",
    url: "https://samepage.pages.dev",
    client: false,
    appStore:
      "https://apps.apple.com/us/app/samepage-read-together/id6770348751",
  },
};

interface WorkCardProps {
  project: CaseStudy;
}

export default function WorkCard({ project }: WorkCardProps) {
  const img = WORK_IMAGES[project.slug];
  const meta =
    WORK_META[project.slug] ?? { type: "—", year: "—", url: "#", client: false };

  return (
    <article
      className="group relative grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: meta.client ? "rgba(45,212,191,0.35)" : "var(--border)",
        ...(meta.client && {
          boxShadow:
            "0 0 0 1px rgba(45,212,191,0.06), 0 24px 48px -28px rgba(45,212,191,0.25)",
        }),
      }}
    >
      {/* Client cards get a top accent bar instead of a static left border */}
      {meta.client && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-[3]"
          style={{
            background:
              "linear-gradient(90deg, var(--accent), rgba(45,212,191,0))",
          }}
        />
      )}

      {/* Screenshot */}
      {img && (
        <div className="relative overflow-hidden w-full h-full min-h-[260px]">
          <Image
            src={img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-w-md) 100vw, 400px"
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
          {meta.client ? (
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
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--border)]">
          <a href={meta.url} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
            Visit live ↗
          </a>
          {meta.appStore && (
            <a href={meta.appStore} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              App Store ↗
            </a>
          )}
          {meta.client ? (
            <Link href={`/work/${project.slug}`}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}>
              Case study →
            </Link>
          ) : (
            <Link href={`/work/${project.slug}`}
              className="ml-auto text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Case study →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
