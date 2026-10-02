import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/mdx";

const description =
  "Notes on building small, specific software — the decisions, the tradeoffs, and what broke along the way.";

export const metadata: Metadata = {
  title: "Blog — nickfig.dev",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
  openGraph: {
    title: "Blog — nickfig.dev",
    description,
    url: "https://nickfig.dev/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest mb-4 text-[var(--accent)]">
        Blog
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] mb-4">
        Writing
      </h1>
      <p className="text-lg text-[var(--muted)] leading-relaxed max-w-[520px] mb-4">
        {description}
      </p>
      <a
        href="/blog/rss.xml"
        className="font-mono text-xs text-[var(--faint)] hover:text-[var(--accent)] transition-colors"
      >
        RSS ↗
      </a>

      <ul className="mt-12 border-t border-[var(--border)]">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-[var(--border)]">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-2 py-7 sm:grid-cols-[160px_1fr] sm:gap-8"
            >
              <time
                dateTime={post.date}
                className="font-mono text-xs text-[var(--faint)] pt-1.5"
              >
                {formatPostDate(post.date)}
              </time>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                  {post.draft && (
                    <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
                      Draft
                    </span>
                  )}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
                  {post.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
