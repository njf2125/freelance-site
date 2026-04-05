export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <p className="font-mono text-xs text-zinc-500">
          © {new Date().getFullYear()} nickfig.dev
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/njf2125"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nickfigliolia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
