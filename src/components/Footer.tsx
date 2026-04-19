import { siteConfig } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-card-border mt-auto py-6 text-center text-sm text-muted">
      <p>
        &copy; {new Date().getFullYear()} {siteConfig.name}. Free developer
        tools — no signup required.
      </p>
    </footer>
  );
}
