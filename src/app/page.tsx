import WorkTable from "@/components/WorkTable";
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
    <main className="mx-auto max-w-[780px] px-6">
      {/* Hero */}
      <section className="py-24 sm:py-32 border-b border-[var(--border)]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-6">
          Senior Frontend Engineer
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-normal leading-[1.1] text-[var(--text)] tracking-tight [&>em]:text-[var(--accent)] [&>em]:italic [&>em]:not-italic">
          I build <em>custom web apps</em> and dashboards for teams that have outgrown
          their off-the-shelf tools.
        </h1>
        <p className="mt-8 max-w-[480px] text-lg text-[var(--muted)] leading-relaxed">
          Specializing in React and TypeScript. I work
          with small teams to ship internal tools, dashboards, and SaaS products
          that actually fit their workflow.
        </p>
      </section>

      {/* Selected Work */}
      <section className="py-20 sm:py-24 border-b border-[var(--border)]">
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)] mb-8">
          Selected Work
        </h2>
        <WorkTable projects={featured} />
      </section>

      {/* Process */}
      <section className="py-20 sm:py-24 border-b border-[var(--border)]">
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)] mb-12">
          How I Work
        </h2>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="flex flex-col">
              <p className="font-mono text-sm text-[var(--muted)] mb-4">
                {step.number} &mdash;
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <h3 className="font-sans text-base font-medium text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-24">
        <h2 className="font-display text-3xl font-normal tracking-tight text-[var(--text)] mb-8">
          Got a project? Let&apos;s talk.
        </h2>
        <div className="max-w-[480px]">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
