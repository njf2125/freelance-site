import Link from "next/link";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight"
          style={{ color: "var(--accent)" }}
        >
          nickfig.dev
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/work"
              className="text-sm"
              style={{ color: "var(--muted)" }}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm"
              style={{ color: "var(--muted)" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-sm"
              style={{ color: "var(--muted)" }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
