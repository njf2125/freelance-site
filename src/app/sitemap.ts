import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/mdx";

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllCaseStudies();

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
  ];
}
