import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { blogContent } from "@/lib/blog-content";
import AdBanner from "@/components/AdBanner";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post || !content) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "DevToolKit",
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        &larr; Back to Blog
      </Link>

      <article className="mt-6">
        <div className="flex items-center gap-3 text-xs text-muted mb-3">
          <time>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

        <AdBanner slot="article-top" />

        <div className="prose prose-sm max-w-none space-y-4 text-[15px] leading-relaxed">
          {content.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-semibold mt-8 mb-3">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-muted mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        <AdBanner slot="article-bottom" />
      </article>
    </main>
  );
}
