import AdBanner from "./AdBanner";

export default function ToolLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted mb-6">{description}</p>
      <AdBanner slot="top-banner" />
      <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
        {children}
      </div>
      <AdBanner slot="bottom-banner" />
      <section className="mt-8 prose prose-sm max-w-none text-muted">
        <h2 className="text-lg font-semibold text-foreground">
          About this tool
        </h2>
        <p>{description} This tool runs entirely in your browser — no data is sent to any server.</p>
      </section>
    </main>
  );
}
