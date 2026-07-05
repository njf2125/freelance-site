import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import { Callout } from "@/components/callout";
import { getAllCaseStudies, getCaseStudy } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

const components = { Callout };

export async function generateStaticParams() {
  return getAllCaseStudies().map((study: CaseStudy) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { frontmatter } = getCaseStudy(slug);
    const title = `${frontmatter.title} — nickfig.dev`;
    const description = frontmatter.problem;
    const image = frontmatter.image ?? "/opengraph-image.png";
    return {
      title,
      description,
      alternates: { canonical: `/work/${slug}` },
      openGraph: {
        title,
        description,
        url: `https://nickfig.dev/work/${slug}`,
        images: [{ url: image, width: 1200, height: 630, alt: frontmatter.title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return { title: "Not Found" };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let frontmatter: Omit<CaseStudy, "slug">;
  let content: string;

  try {
    ({ frontmatter, content } = getCaseStudy(slug));
  } catch {
    notFound();
  }

  const studies = getAllCaseStudies();
  const currentIndex = studies.findIndex((s) => s.slug === slug);
  const nextStudy = studies[(currentIndex + 1) % studies.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: frontmatter!.title,
    description: frontmatter!.problem,
    url: `https://nickfig.dev/work/${slug}`,
    image: `https://nickfig.dev${frontmatter!.image ?? "/opengraph-image.png"}`,
    creator: { "@id": "https://nickfig.dev/#person" },
    keywords: frontmatter!.stack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyLayout
        {...frontmatter!}
        nextStudy={{ slug: nextStudy.slug, title: nextStudy.title }}
      >
        <MDXRemote source={content!} components={components} />
      </CaseStudyLayout>
    </>
  );
}
