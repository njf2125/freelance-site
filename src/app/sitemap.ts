import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { BLOG_DIR, getAllCaseStudies, getAllPosts } from "@/lib/mdx";

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllCaseStudies();
  const posts = getAllPosts();

  return [
    {
      url: "https://nickfig.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://nickfig.dev/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://nickfig.dev/work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((study) => ({
      url: `https://nickfig.dev/work/${study.slug}`,
      lastModified: fs.statSync(path.join(CONTENT_DIR, `${study.slug}.mdx`)).mtime,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: "https://nickfig.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `https://nickfig.dev/blog/${post.slug}`,
      lastModified: fs.statSync(path.join(BLOG_DIR, `${post.slug}.mdx`)).mtime,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
