import Link from "next/link";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "color-mix(in oklab, var(--bg) 82%, transparent)",
        backdropFilter: "blur(10px)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          nickfig.dev
        </Link>

        <ul className="flex items-center gap-4 sm:gap-6">
          <li>
            <Link
              href="/work"
              className="text-sm transition-colors hover:text-[var(--text)]"
              style={{ color: "var(--muted)" }}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-sm transition-colors hover:text-[var(--text)]"
              style={{ color: "var(--muted)" }}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm transition-colors hover:text-[var(--text)]"
              style={{ color: "var(--muted)" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-sm whitespace-nowrap rounded-lg border px-3 py-2 sm:px-3.5 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ borderColor: "var(--border-2)", color: "var(--text)" }}
            >
              <span className="hidden sm:inline">Start a project</span>
              <span className="sm:hidden">Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
