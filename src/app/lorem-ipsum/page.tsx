import type { Metadata } from "next";
import LoremClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Online Tool",
  description:
    "Generate placeholder Lorem Ipsum text for your designs and mockups. Choose paragraphs, sentences, or words.",
};

export default function LoremPage() {
  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and mockups."
    >
      <LoremClient />
    </ToolLayout>
  );
}
