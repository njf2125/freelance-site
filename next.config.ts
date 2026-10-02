import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return ["clientroom", "samepage"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work#syconos",
      permanent: false,
    }));
  },
};

export default withMDX(nextConfig);
