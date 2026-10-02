import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, CaseStudy } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");
export const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

const showDrafts = process.env.NODE_ENV !== "production";

// YAML parses an unquoted `date: 2026-09-30` into a Date; keep it a plain string.
function readPost(file: string): { frontmatter: Omit<BlogPost, "slug">; content: string } {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return { frontmatter: { ...data, date } as Omit<BlogPost, "slug">, content };
}

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(".mdx", ""), ...readPost(file).frontmatter }))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): { frontmatter: Omit<BlogPost, "slug">; content: string } | null {
  if (!fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`))) return null;
  const post = readPost(`${slug}.mdx`);
  if (post.frontmatter.draft && !showDrafts) return null;
  return post;
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const studies = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return { slug: file.replace(".mdx", ""), ...data } as CaseStudy;
  });
  return studies.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getCaseStudy(slug: string): {
  frontmatter: Omit<CaseStudy, "slug">;
  content: string;
} {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as Omit<CaseStudy, "slug">, content };
}
