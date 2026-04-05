import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CaseStudy } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export function getAllCaseStudies(): CaseStudy[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    return { slug: file.replace(".mdx", ""), ...data } as CaseStudy;
  });
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
