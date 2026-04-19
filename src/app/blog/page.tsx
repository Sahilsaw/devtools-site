import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Blog — Developer Guides & Tutorials",
  description:
    "Learn about JSON, Base64, hashing, regex, and other developer topics with our in-depth guides and tutorials.",
};

export default function BlogIndex() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-muted mb-8">
        In-depth guides and tutorials on developer tools and concepts.
      </p>

      <AdBanner slot="blog-top" />

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-card border border-card-border rounded-xl p-6 hover:shadow-md hover:border-primary transition-all group"
          >
            <div className="flex items-center gap-3 text-xs text-muted mb-2">
              <time>{post.date}</time>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-semibold group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-muted text-sm">{post.description}</p>
          </Link>
        ))}
      </div>

      <AdBanner slot="blog-bottom" />
    </main>
  );
}
