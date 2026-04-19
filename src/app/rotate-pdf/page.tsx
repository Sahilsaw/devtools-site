import type { Metadata } from "next";
import RotatePdfClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Rotate PDF — Rotate PDF Pages Online Free",
  description:
    "Rotate all pages of a PDF by 90, 180, or 270 degrees. Free, instant, and private — files stay in your browser.",
  keywords: ["rotate pdf", "rotate pdf pages", "rotate pdf online", "pdf rotator", "turn pdf pages", "flip pdf"],
};

const content = `Scanned documents, photos taken in the wrong orientation, or PDFs exported from mobile devices often end up with pages rotated incorrectly. Our free PDF rotator lets you fix this instantly by rotating all pages by 90°, 180°, or 270° with a single click.

The tool works entirely in your browser — upload your PDF, select the rotation angle, and download the corrected file. No signup, no server upload, and no quality loss. The rotation is applied to every page in the document while preserving all content, formatting, and metadata.

Rotation is cumulative with any existing rotation in the PDF. If a page is already rotated 90° and you apply another 90° rotation, it becomes 180°. This makes it easy to correct pages regardless of their current orientation.

The tool uses pdf-lib, a robust JavaScript library for PDF manipulation. It modifies the page rotation property without re-encoding any content, so text remains searchable, images stay at full quality, and links continue to work. The process is nearly instantaneous even for large documents.

Common use cases include fixing scanned documents that came in sideways, correcting PDFs from camera captures, adjusting landscape pages in a portrait document, and preparing documents for printing with the correct orientation.`;

const faqs = [
  {
    question: "How do I rotate a PDF?",
    answer: "Upload your PDF file, select the rotation angle (90°, 180°, or 270°), and click 'Rotate & Download'. The rotated PDF will download automatically. All pages are rotated by the same amount.",
  },
  {
    question: "Can I rotate individual pages instead of all pages?",
    answer: "This tool rotates all pages by the same angle. If you need to rotate individual pages differently, you can split the PDF first using our Split PDF tool, rotate each part separately, then merge them back together with our Merge PDF tool.",
  },
  {
    question: "Does rotating affect the PDF quality?",
    answer: "No. The rotation only changes a metadata property of each page — no content is re-encoded or compressed. Text, images, links, and formatting are all preserved exactly as they are in the original.",
  },
  {
    question: "What's the difference between 90°, 180°, and 270° rotation?",
    answer: "90° rotates clockwise (portrait becomes landscape). 180° flips the page upside down. 270° rotates counter-clockwise (equivalent to 90° counter-clockwise). Choose based on how your pages need to be reoriented.",
  },
  {
    question: "Are my files safe?",
    answer: "Yes. Your PDF is processed entirely in your browser using JavaScript. It's never uploaded to any server, stored anywhere, or accessible to anyone else. Once you close the page, the file is gone from memory.",
  },
];

export default function RotatePdfPage() {
  return (
    <ToolLayout
      title="Rotate PDF"
      description="Rotate all or specific pages of a PDF by 90, 180, or 270 degrees."
      slug="rotate-pdf"
      content={content}
      faqs={faqs}
    >
      <RotatePdfClient />
    </ToolLayout>
  );
}
