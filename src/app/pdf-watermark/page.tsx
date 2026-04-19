import type { Metadata } from "next";
import WatermarkClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Add Watermark to PDF — Free Online Tool",
  description:
    "Add a text watermark to every page of your PDF. Customize text, opacity, rotation, and font size. Free and private.",
  keywords: ["add watermark to pdf", "pdf watermark", "watermark pdf online", "pdf stamp", "text watermark pdf", "watermark pdf free"],
};

const content = `Adding a watermark to PDFs is essential for protecting confidential documents, marking drafts, branding materials, and indicating document status. Our free watermark tool lets you add a customizable text watermark to every page of your PDF in seconds.

You have full control over the watermark appearance: set any text (CONFIDENTIAL, DRAFT, DO NOT COPY, your company name), adjust the font size from 12pt to 120pt, control opacity from 5% to 50% for subtle or prominent marks, and rotate the text from -90° to +90° (the classic diagonal watermark uses -45°).

The watermark is rendered in Helvetica Bold in a neutral gray color that works on both light and dark backgrounds. It's positioned in the center of each page and applied as a text overlay — meaning it doesn't interfere with the underlying content and can be read through on most documents.

All processing happens entirely in your browser. Your PDF files are never uploaded to any server, making this tool safe for sensitive documents like legal contracts, financial statements, medical records, and proprietary business documents.

The tool works with any standard PDF file. It preserves all existing content, formatting, images, links, and bookmarks. The watermark is added on top of existing content on each page.`;

const faqs = [
  {
    question: "How do I add a watermark to a PDF?",
    answer: "Upload your PDF, enter your watermark text (e.g., CONFIDENTIAL, DRAFT), adjust the font size, opacity, and rotation angle, then click 'Add Watermark & Download'. Every page in the PDF will have the watermark applied.",
  },
  {
    question: "Can I customize the watermark appearance?",
    answer: "Yes. You can set any text, adjust font size (12-120pt), control opacity (5-50%), and set the rotation angle (-90° to +90°). The default -45° diagonal angle is the most common for document watermarks.",
  },
  {
    question: "Will the watermark cover the text in my document?",
    answer: "The watermark is semi-transparent (you control the opacity), so underlying text remains readable. For documents with dense content, use a lower opacity (10-15%). For documents that need a prominent mark, use higher opacity (30-50%).",
  },
  {
    question: "Can I remove the watermark later?",
    answer: "The watermark is permanently embedded in the PDF. There's no undo once you download the watermarked file. Always keep your original unwatermarked file as a backup before applying the watermark.",
  },
  {
    question: "Is this tool safe for confidential documents?",
    answer: "Yes. Your PDF is processed entirely in your browser and never leaves your device. No data is uploaded, stored, or transmitted to any server. This is the most private way to watermark PDFs online.",
  },
];

export default function WatermarkPage() {
  return (
    <ToolLayout
      title="Add Watermark to PDF"
      description="Add a text watermark to every page of your PDF document."
      slug="pdf-watermark"
      content={content}
      faqs={faqs}
    >
      <WatermarkClient />
    </ToolLayout>
  );
}
