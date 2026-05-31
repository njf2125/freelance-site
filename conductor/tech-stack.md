# Technology Stack: freelance-site (nickfig.dev)

## Frontend Core
- **Framework:** Next.js (v15.2+) using the App Router. Utilizes React Server Components (RSC) for optimized initial loading and static rendering where possible.
- **Language:** TypeScript (v5+) enforced with strict type checking configured in `tsconfig.json`.
- **Styling:** Tailwind CSS (v4+) compiled with PostCSS, using CSS custom properties for semantic visual variables.

## Content Delivery
- **Format:** MDX (Markdown with JSX component integration).
- **Processing:** Managed locally using `@next/mdx`, `next-mdx-remote`, and `gray-matter` for parsing frontmatter fields (such as project slug, title, stats, and tech tags).

## Services & Integrations
- **Form Submissions:** Client contact inquiries are securely processed through Web3Forms without revealing API keys, utilizing environment variables mapped in Next.js (`NEXT_PUBLIC_WEB3FORMS_KEY`).
- **Analytics:** Cloudflare Web Analytics is conditionally integrated on page load using Next.js `<Script>` loader.

## Hosting & Infrastructure
- **Deployment Platform:** Cloudflare Pages.
- **Compiler/Adapters:** Compiles to Cloudflare edge-compatible routes using `@cloudflare/next-on-pages` and tested locally using Wrangler (`wrangler pages dev`).
- **Local Dev Server:** `next dev` for local workspace work.
