export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div
        className="mx-auto flex max-w-[780px] items-center justify-between px-6 py-6"
      >
        <p className="font-mono text-xs" style={{ color: "var(--faint)" }}>
          © {new Date().getFullYear()} nickfig.dev
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/njf2125"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs"
            style={{ color: "var(--faint)" }}
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nickfigliolia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs"
            style={{ color: "var(--faint)" }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
