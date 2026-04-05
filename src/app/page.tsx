import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { getAllCaseStudies } from "@/lib/mdx";
import { CaseStudy } from "@/lib/types";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a focused conversation about your problem, your users, and what success looks like. I ask the questions that surface hidden requirements before a line of code is written.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "I work in short cycles with frequent check-ins. You see real, working software early — not mockups — so feedback is grounded in reality.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Handoff includes deployment, documentation, and a walkthrough. I stay available for the first month to handle anything that comes up in production.",
  },
];

export default function Home() {
  const featured = getAllCaseStudies().filter((p: CaseStudy) => p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          I build custom web apps and dashboards for teams that have outgrown
          their off-the-shelf tools.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Senior frontend engineer specializing in React and TypeScript. I work
          with small teams to ship internal tools, dashboards, and SaaS products
          that actually fit their workflow.
        </p>
        <p className="mt-3 font-mono text-sm text-zinc-500">
          Projects typically start at $2,500.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block rounded bg-teal-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-teal-300"
        >
          Start a conversation
        </a>
      </section>

      {/* Selected Work */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          Selected Work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {featured.map((project: CaseStudy) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          How I Work
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-6"
            >
              <p className="font-mono text-xs text-zinc-500">{step.number}</p>
              <h3 className="mt-2 text-base font-semibold tracking-tight text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
          Got a project? Let&apos;s talk.
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Prefer email?{" "}
          <a
            href="mailto:nickfigliolia@gmail.com"
            className="text-teal-400 hover:text-teal-300"
          >
            nickfigliolia@gmail.com
          </a>
        </p>
        <div className="mt-8 max-w-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
