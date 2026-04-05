import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  stack: string[];
  slug: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  stack,
  slug,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
          {title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-2 py-0.5 rounded border border-amber-400/30 bg-amber-400/10 text-amber-400"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-2">
        <Link
          href={`/work/${slug}`}
          className="text-sm text-teal-400 hover:text-teal-300"
        >
          View case study →
        </Link>
      </div>
    </div>
  );
}
