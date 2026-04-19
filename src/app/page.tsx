import Link from "next/link";
import { tools } from "@/lib/tools";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          Free Online Developer Tools
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Fast, free, and private. All tools run in your browser — no data
          leaves your machine.
        </p>
      </section>

      <AdBanner slot="home-top" />

      {categories.map((category) => (
        <section key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools
              .filter((t) => t.category === category)
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="block bg-card border border-card-border rounded-xl p-5 hover:shadow-md hover:border-primary transition-all group"
                >
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-muted text-sm mt-1">{tool.description}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <AdBanner slot="home-bottom" />
    </main>
  );
}
