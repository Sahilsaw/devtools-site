import type { Metadata } from "next";
import JsonFormatterClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool",
  description:
    "Format, validate, and beautify JSON data online for free. Instant syntax highlighting, error detection, and minification.",
};

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate, and beautify JSON data with syntax highlighting."
    >
      <JsonFormatterClient />
    </ToolLayout>
  );
}
