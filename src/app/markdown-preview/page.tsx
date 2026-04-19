import type { Metadata } from "next";
import MarkdownClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Markdown Preview — Free Online Markdown Editor",
  description:
    "Write Markdown and see a live HTML preview side by side. Supports headings, bold, italic, links, code blocks, lists, and more.",
  keywords: ["markdown preview", "markdown editor online", "markdown to html", "live markdown", "markdown renderer", "markdown viewer"],
};

const content = `Markdown is a lightweight markup language that lets you write formatted text using plain text syntax. Created by John Gruber in 2004, it's become the standard for writing documentation, README files, blog posts, forum comments, and technical content. Our Markdown Preview tool gives you a live side-by-side editor and preview so you can see your formatted output as you type.

The editor supports all common Markdown syntax: headings (# through ######), bold (**text**), italic (*text*), strikethrough (~~text~~), links, images, code blocks with syntax highlighting, inline code, blockquotes, ordered and unordered lists, horizontal rules, and more.

Markdown is used everywhere in modern development. GitHub uses it for README files, issues, and pull requests. Platforms like Dev.to, Hashnode, and Reddit support Markdown for posts and comments. Static site generators like Hugo, Jekyll, and Gatsby use Markdown for content. Documentation tools like Docusaurus, MkDocs, and GitBook are built around Markdown.

The preview renders in real time as you type, making it easy to iterate on your formatting without switching between editing and preview modes. You can also copy the generated HTML output to paste into any website, email, or CMS that accepts HTML.

All processing happens in your browser — your Markdown content is never sent to any server. The tool uses a custom parser that handles standard Markdown syntax without any external dependencies, keeping the page fast and lightweight.`;

const faqs = [
  {
    question: "What is Markdown and why should I learn it?",
    answer: "Markdown is a plain text formatting syntax that converts to HTML. It's much faster to write than HTML and is supported by GitHub, Reddit, Dev.to, Stack Overflow, Notion, Slack, and countless other platforms. Learning Markdown takes about 10 minutes and dramatically speeds up writing documentation, blog posts, and technical content.",
  },
  {
    question: "What Markdown syntax does this tool support?",
    answer: "This tool supports headings (# to ######), bold (**text**), italic (*text*), strikethrough (~~text~~), links [text](url), images ![alt](url), code blocks (``` ```), inline code (`code`), blockquotes (> text), unordered lists (- item), ordered lists (1. item), and horizontal rules (---).",
  },
  {
    question: "What's the difference between Markdown and HTML?",
    answer: "Markdown is a simplified syntax that converts to HTML. While HTML uses tags like <strong>bold</strong>, Markdown uses **bold**. Markdown is faster to write and easier to read in plain text. However, HTML offers more control over layout and styling. Many systems accept both — you can even mix HTML into Markdown documents.",
  },
  {
    question: "Which Markdown flavor does this tool use?",
    answer: "This tool implements CommonMark-compatible Markdown, which is the standardized specification. It covers the most commonly used Markdown features. GitHub-Flavored Markdown (GFM) extensions like tables and task lists may have limited support. For full GFM support, you may need a dedicated GFM parser.",
  },
  {
    question: "Can I export the HTML output?",
    answer: "Yes. Click the 'Copy HTML' button above the preview pane to copy the generated HTML to your clipboard. You can paste this HTML into any website, CMS, email template, or HTML file. The output is clean, semantic HTML that you can style with your own CSS.",
  },
];

export default function MarkdownPage() {
  return (
    <ToolLayout
      title="Markdown Preview"
      description="Write Markdown and see a live HTML preview side by side."
      slug="markdown-preview"
      content={content}
      faqs={faqs}
    >
      <MarkdownClient />
    </ToolLayout>
  );
}
