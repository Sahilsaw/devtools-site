import Link from "next/link";
import AdBanner from "./AdBanner";
import { tools } from "@/lib/tools";

export interface FAQ {
  question: string;
  answer: string;
}

export default function ToolLayout({
  title,
  description,
  slug,
  content,
  faqs,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  content: string;
  faqs: FAQ[];
  children: React.ReactNode;
}) {
  const relatedTools = tools.filter((t) => t.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: description,
    url: `https://devtoolkit.dev/${slug}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted mb-6">{description}</p>
      <AdBanner slot="top-banner" />

      <div className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
        {children}
      </div>

      <AdBanner slot="mid-banner" />

      <section className="mt-8 max-w-none">
        <h2 className="text-xl font-semibold mb-3">About this tool</h2>
        <div className="text-muted leading-relaxed text-[15px] space-y-3">
          {content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="border border-card-border rounded-lg bg-card group"
            >
              <summary className="px-4 py-3 cursor-pointer font-medium text-[15px] hover:text-primary transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-muted group-open:rotate-180 transition-transform">
                  &#9660;
                </span>
              </summary>
              <div className="px-4 pb-4 text-muted text-sm leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="block bg-card border border-card-border rounded-lg p-4 hover:shadow-md hover:border-primary transition-all group"
            >
              <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-muted text-xs mt-1">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner slot="bottom-banner" />
    </main>
  );
}
