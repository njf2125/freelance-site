import { MetadataRoute } from "next";
import { getAllCaseStudies } from "@/lib/mdx";

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
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
