import type { Metadata } from "next";
import ImageToPdfClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Image to PDF — Convert JPG, PNG to PDF Online Free",
  description:
    "Convert JPG, PNG, and WebP images to a PDF document. Combine multiple images into one PDF. Free, private, browser-based.",
  keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "photo to pdf", "picture to pdf"],
};

const content = `Converting images to PDF is one of the most common document tasks — whether you're scanning receipts, digitizing documents, creating photo albums, or assembling a portfolio. Our free Image to PDF converter lets you turn JPG, PNG, and WebP images into a professional PDF document in seconds.

Upload one or multiple images and arrange them in the order you want. Each image becomes a page in the output PDF. You can choose between two page size modes: A4 (standard paper size with the image centered and scaled to fit) or Match Image Size (the page matches the exact dimensions of each image).

The A4 mode is ideal for documents you plan to print — it ensures consistent page sizes with proper margins. The Match Image Size mode preserves the exact dimensions of each image, making it perfect for digital distribution where you want the full resolution without whitespace.

The converter supports JPEG, PNG, and WebP formats. Other image formats are automatically converted to PNG before embedding. Images are embedded at their full quality — there's no additional compression applied, so your output PDF looks exactly as sharp as the original images.

All processing happens entirely in your browser. Your images are never uploaded to any server, making this tool safe for sensitive photos and documents. The conversion typically completes in seconds, even for dozens of high-resolution images.`;

const faqs = [
  {
    question: "How do I convert images to PDF?",
    answer: "Click the upload area or drag and drop your images (JPG, PNG, or WebP). Arrange them in the desired order using Up/Down buttons. Choose the page size (A4 or match image size). Click 'Convert to PDF' and the file downloads automatically.",
  },
  {
    question: "Can I combine multiple images into one PDF?",
    answer: "Yes. Upload as many images as you want — each image becomes one page in the PDF. Use the Up/Down buttons to reorder them and the Remove button to exclude any you don't need.",
  },
  {
    question: "What's the difference between A4 and Match Image Size?",
    answer: "A4 mode creates standard 8.27 x 11.69 inch pages (common paper size) with your image centered and scaled to fit. Match Image Size creates pages that exactly match each image's pixel dimensions — no whitespace, no scaling. Use A4 for printing, Match Image Size for digital use.",
  },
  {
    question: "Does conversion reduce image quality?",
    answer: "No. Images are embedded in the PDF at their original quality without additional compression. JPEG images remain JPEG, PNG images remain PNG. The output PDF looks identical to your source images.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer: "No. Everything runs in your browser using JavaScript. Your images are never uploaded, stored, or accessible to anyone else. This is the most private way to convert images to PDF online.",
  },
];

export default function ImageToPdfPage() {
  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert JPG, PNG, or WebP images into a PDF document."
      slug="image-to-pdf"
      content={content}
      faqs={faqs}
    >
      <ImageToPdfClient />
    </ToolLayout>
  );
}
