export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-validate-json",
    title: "How to Validate JSON — A Complete Guide for Developers",
    description:
      "Learn how to validate JSON data in JavaScript, Python, and online. Covers common errors, best practices, and free tools.",
    date: "2026-04-20",
    readTime: "5 min read",
    keywords: ["validate json", "json validation", "check json", "json syntax error"],
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Explained — What It Is and When to Use It",
    description:
      "A beginner-friendly guide to Base64 encoding. Learn how it works, why it exists, and common use cases in web development.",
    date: "2026-04-20",
    readTime: "6 min read",
    keywords: ["base64 encoding", "what is base64", "base64 explained", "base64 use cases"],
  },
  {
    slug: "sha256-vs-md5-which-hash-to-use",
    title: "SHA-256 vs MD5 — Which Hash Algorithm Should You Use?",
    description:
      "Compare SHA-256 and MD5 hash algorithms. Learn the security differences, performance trade-offs, and when to use each.",
    date: "2026-04-20",
    readTime: "7 min read",
    keywords: ["sha256 vs md5", "hash algorithm comparison", "md5 vs sha256", "which hash to use"],
  },
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files — The Complete Guide",
    description:
      "Learn how to combine multiple PDF files into one document. Covers free tools, command-line methods, and programming approaches.",
    date: "2026-04-20",
    readTime: "6 min read",
    keywords: ["merge pdf", "combine pdf files", "join pdf", "how to merge pdf"],
  },
  {
    slug: "image-to-pdf-conversion-guide",
    title: "How to Convert Images to PDF — JPG, PNG, and More",
    description:
      "A complete guide to converting images to PDF. Learn about different methods, quality considerations, and the best free tools.",
    date: "2026-04-20",
    readTime: "5 min read",
    keywords: ["image to pdf", "jpg to pdf", "convert image to pdf", "photo to pdf"],
  },
];
