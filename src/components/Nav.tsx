import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-zinc-100 hover:text-teal-400"
        >
          NF
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/work"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="text-sm text-zinc-400 hover:text-zinc-100"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
