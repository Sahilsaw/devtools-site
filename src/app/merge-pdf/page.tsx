import type { Metadata } from "next";
import MergePdfClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Merge PDF — Combine PDF Files Online Free",
  description:
    "Merge multiple PDF files into one document for free. Reorder pages, no file size limit, and completely private — files never leave your browser.",
  keywords: ["merge pdf", "combine pdf", "join pdf", "merge pdf online", "pdf merger", "combine pdf files free"],
};

const content = `Merging PDFs is one of the most common document tasks — whether you're combining invoices, assembling a report from multiple sources, or putting together a presentation package. Our free PDF merger lets you combine any number of PDF files into a single document, all within your browser.

Simply drag and drop your PDF files, arrange them in the order you want, and click Merge. The tool processes everything client-side using the pdf-lib library, which means your files never leave your device. There's no upload to any server, no file size limits imposed by a backend, and no waiting for server processing.

You can reorder files before merging using the Up and Down buttons, remove files you don't need, and add more files at any time. The merged output preserves the original quality, formatting, bookmarks, and links from each source PDF.

This tool handles PDFs of any size that your browser's memory can support — typically up to 50MB per file on modern devices. For standard documents like invoices, contracts, and reports, this is more than sufficient. The merge operation typically completes in seconds, even for documents with hundreds of pages.

Common use cases include combining scanned documents, merging chapters of an ebook, assembling application packages (resume + cover letter + references), and consolidating monthly reports into quarterly or annual compilations.`;

const faqs = [
  {
    question: "How do I merge PDF files?",
    answer: "Click the upload area or drag and drop your PDF files. Arrange them in the desired order using the Up/Down buttons. Click 'Merge PDFs' and the combined file will download automatically. It's that simple — no signup, no email required.",
  },
  {
    question: "Is there a limit on the number of PDFs I can merge?",
    answer: "There's no hard limit on the number of files. You can merge as many PDFs as your browser's memory allows. For most devices, this means dozens of files or several hundred pages without any issues.",
  },
  {
    question: "Are my PDF files uploaded to a server?",
    answer: "No. All processing happens entirely in your browser using JavaScript. Your files never leave your device, are never uploaded to any server, and are never stored anywhere. This makes it the most private way to merge PDFs online.",
  },
  {
    question: "Does merging affect the quality of my PDFs?",
    answer: "No. The merge operation copies pages from each source PDF without any re-encoding or compression. All text, images, formatting, links, and bookmarks are preserved exactly as they are in the original files.",
  },
  {
    question: "Can I reorder pages before merging?",
    answer: "Yes. Use the Up and Down buttons next to each file to change the order. The files will be merged in the order shown in the list. You can also remove files you don't want to include.",
  },
];

export default function MergePdfPage() {
  return (
    <ToolLayout
      title="Merge PDFs"
      description="Combine multiple PDF files into a single document. Reorder pages easily."
      slug="merge-pdf"
      content={content}
      faqs={faqs}
    >
      <MergePdfClient />
    </ToolLayout>
  );
}
