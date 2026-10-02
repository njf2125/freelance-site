import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "@/components/callout";
import { formatPostDate, getAllPosts, getPost } from "@/lib/mdx";

const components = { Callout };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };

  const { title, description, date } = post.frontmatter;
  return {
    title: `${title} — nickfig.dev`,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `https://nickfig.dev/blog/${slug}`,
      publishedTime: date,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { title, description, date, tags } = post.frontmatter;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url: `https://nickfig.dev/blog/${slug}`,
    author: { "@id": "https://nickfig.dev/#person" },
    keywords: tags?.join(", "),
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--text)] transition-colors mb-6 whitespace-nowrap"
      >
        ← Blog
      </Link>

      <article className="max-w-2xl">
        <time
          dateTime={date}
          className="block font-mono text-[11px] uppercase tracking-widest mb-5 text-[var(--accent)]"
        >
          {formatPostDate(date)}
        </time>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)]">
          {title}
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--bg)] text-[var(--faint)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 prose max-w-none prose-p:text-[var(--muted)] prose-p:leading-loose prose-headings:font-display prose-headings:font-normal prose-headings:text-[var(--text)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text)] prose-strong:font-medium prose-li:text-[var(--muted)] prose-ul:text-[var(--muted)] prose-ol:text-[var(--muted)] prose-code:text-[var(--text)] prose-pre:bg-[var(--surface)] prose-pre:border prose-pre:border-[var(--border)]">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>

      <div className="mt-20 pt-12 border-t" style={{ borderColor: "var(--border)" }}>
        <h2 className="font-display text-2xl font-normal text-[var(--text)] mb-2">
          Got something in mind?
        </h2>
        <p className="text-[var(--muted)] mb-6">
          I build custom tools for small teams. Let&apos;s figure out if it&apos;s a good fit.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Start a project →
          </Link>
          <Link
            href="/blog"
            className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            ← All posts
          </Link>
        </div>
      </div>
    </main>
  );
}
