import type { Metadata } from "next";
import SplitPdfClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Split PDF — Extract Pages from PDF Online Free",
  description:
    "Split PDF files by extracting specific pages or splitting into individual pages. Free, private, and runs in your browser.",
  keywords: ["split pdf", "extract pdf pages", "split pdf online", "pdf splitter", "separate pdf pages", "extract pages from pdf"],
};

const content = `Need to extract specific pages from a large PDF? Our free PDF splitter lets you pull out exactly the pages you need or break a PDF into individual single-page files. Everything runs in your browser — your documents stay completely private.

Upload your PDF and you'll see the total page count. Then specify which pages you want using a flexible range syntax: "1-5" for pages 1 through 5, "1,3,5" for specific pages, or "1-3, 7, 10-15" to mix ranges and individual pages. Click Extract Pages to download a new PDF containing only your selected pages.

Alternatively, use "Split Into Individual Pages" to create separate PDF files for each page. This is useful when you need to send individual pages to different recipients or when filing documents that need to be stored separately.

The tool preserves all formatting, images, links, and text quality from the original PDF. No re-encoding or compression happens — pages are copied exactly as they are. It works with any standard PDF file up to the memory limits of your browser.

Common use cases include extracting a signature page from a contract, pulling specific chapters from a manual, separating individual invoices from a batch PDF, and creating a condensed version of a report with only the relevant sections.`;

const faqs = [
  {
    question: "How do I extract specific pages from a PDF?",
    answer: "Upload your PDF, then enter the page numbers you want in the range field. Use commas for individual pages (1,3,5) and dashes for ranges (1-5). You can combine both: 1-3, 7, 10-15. Click 'Extract Pages' to download a new PDF with only those pages.",
  },
  {
    question: "Can I split a PDF into individual pages?",
    answer: "Yes. Click the 'Split Into Individual Pages' button and each page will be downloaded as a separate PDF file (page_1.pdf, page_2.pdf, etc.). This is useful for filing or distributing individual pages.",
  },
  {
    question: "Does splitting a PDF reduce quality?",
    answer: "No. Pages are copied from the original PDF without any modification, re-encoding, or compression. All text, images, formatting, and links are preserved exactly as they appear in the original document.",
  },
  {
    question: "Is there a page limit for splitting?",
    answer: "There's no artificial limit. The tool can handle PDFs with hundreds of pages. The only constraint is your browser's available memory. For typical documents (under 50MB), you won't encounter any issues.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer: "No. All processing happens entirely in your browser. Your PDF files are never uploaded, stored, or transmitted to any server. This makes it the most private way to split PDFs online.",
  },
];

export default function SplitPdfPage() {
  return (
    <ToolLayout
      title="Split PDF"
      description="Extract specific pages or split a PDF into separate files."
      slug="split-pdf"
      content={content}
      faqs={faqs}
    >
      <SplitPdfClient />
    </ToolLayout>
  );
}
