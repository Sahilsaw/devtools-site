import type { Metadata } from "next";
import PageNumbersClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF — Free Online Tool",
  description:
    "Add page numbers to any PDF file with customizable position, starting number, and font size. Free, private, browser-based.",
  keywords: ["add page numbers to pdf", "pdf page numbers", "number pdf pages", "page numbering pdf", "pdf page counter"],
};

const content = `Adding page numbers to a PDF is essential for professional documents — reports, manuscripts, contracts, and manuals all benefit from numbered pages. Our free tool lets you add page numbers to any PDF with full control over position, starting number, and font size.

Choose where to place the numbers: bottom center (most common), bottom left, bottom right, top center, top left, or top right. Set the starting number — useful when your document begins at a page other than 1, such as when it's part of a larger publication.

The tool uses Helvetica font in a subtle gray color that works well on both white and off-white backgrounds. You can adjust the font size from 8pt to 36pt depending on your needs. The page numbers are added as a text overlay and don't affect the existing content.

All processing happens in your browser using the pdf-lib library. Your PDF is never uploaded to any server, making it safe for confidential documents like contracts, financial reports, and legal filings. The operation completes in seconds even for documents with hundreds of pages.

This tool works with any standard PDF file. It preserves all existing content, formatting, images, links, and bookmarks. The page numbers are added on top of the existing content, so make sure your document has sufficient margins.`;

const faqs = [
  {
    question: "How do I add page numbers to a PDF?",
    answer: "Upload your PDF, choose the position (bottom center, top right, etc.), set the starting number and font size, then click 'Add Page Numbers & Download'. The numbered PDF downloads automatically.",
  },
  {
    question: "Can I start numbering from a page other than 1?",
    answer: "Yes. Change the 'Start Number' field to any number you want. For example, if your document is a continuation starting at page 15, set the start number to 15.",
  },
  {
    question: "Will page numbers overlap with existing content?",
    answer: "Page numbers are placed with a 30-point margin from the edge. If your document has very small margins, there could be overlap. In that case, try a different position (e.g., switch from bottom-center to top-right) or reduce the font size.",
  },
  {
    question: "What font and color are used for page numbers?",
    answer: "Page numbers use Helvetica font in a subtle dark gray color (RGB 0.3, 0.3, 0.3). This is professional and readable on most backgrounds. The font size is adjustable from 8pt to 36pt.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer: "No. Everything runs in your browser. Your file is processed locally using JavaScript and is never uploaded, stored, or shared with anyone. This is the most private way to add page numbers to a PDF.",
  },
];

export default function PageNumbersPage() {
  return (
    <ToolLayout
      title="Add Page Numbers to PDF"
      description="Add page numbers to any PDF with customizable position and format."
      slug="pdf-page-numbers"
      content={content}
      faqs={faqs}
    >
      <PageNumbersClient />
    </ToolLayout>
  );
}
