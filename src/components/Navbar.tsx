import Link from "next/link";
import { siteConfig } from "@/lib/tools";

export default function Navbar() {
  return (
    <header className="border-b border-card-border bg-card sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <a
            href="https://github.com/Sahilsaw/devtools-site"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
