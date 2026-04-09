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
    return {
      title,
      description,
      openGraph: { title, description },
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

  return (
    <CaseStudyLayout {...frontmatter!}>
      <MDXRemote source={content!} components={components} />
    </CaseStudyLayout>
  );
}
