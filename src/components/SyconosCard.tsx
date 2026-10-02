import Image from "next/image";

const products = [
  {
    name: "PlotLock",
    description:
      "A reading companion for groups — progress tracking, margin notes, and real-time sync with friends, without spoilers.",
    img: "/work/plotlock.png",
    links: [
      { label: "Visit live ↗", href: "https://plotlock.app" },
      { label: "App Store ↗", href: "https://apps.apple.com/us/app/plotlock/id6809834021" },
      {
        label: "Google Play ↗",
        href: "https://play.google.com/store/apps/details?id=app.fig.plotlock",
      },
    ],
  },
  {
    name: "Client Room",
    description:
      "A private portal for every client — messaging, shared files, milestones, and Stripe invoices in one place.",
    img: "/work/clientroom.png",
    links: [{ label: "Visit live ↗", href: "https://clientroom.app" }],
  },
  {
    name: "PitchInILM",
    description:
      "Weekend volunteer spots from Wilmington-area non-profits, scraped nightly and reviewed before they go live.",
    img: "/work/pitchinilm.png",
    links: [{ label: "Visit live ↗", href: "https://pitchinilm.com" }],
  },
];

export default function SyconosCard() {
  return (
    <section
      id="syconos"
      className="scroll-mt-24 rounded-2xl border p-6 sm:p-7"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-baseline justify-between gap-4 mb-1.5">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-[var(--text)]">
          Syconos
        </h3>
        <span className="font-mono text-[11px] text-[var(--faint)] whitespace-nowrap">
          Product studio
        </span>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-6 max-w-xl">
        My own products live under{" "}
        <a
          href="https://syconos.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] hover:underline"
        >
          Syconos
        </a>
        , the studio I run alongside client work.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="group flex flex-col overflow-hidden rounded-xl border transition-colors hover:border-[var(--accent)]"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={product.img}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 320px"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h4 className="font-display text-lg font-semibold text-[var(--text)] mb-1.5">
                {product.name}
              </h4>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
                {product.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
