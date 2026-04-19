import type { Metadata } from "next";
import UuidClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "UUID Generator — Free Online Tool",
  description:
    "Generate random v4 UUIDs instantly. Copy with one click. Free and runs in your browser.",
};

export default function UuidPage() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random v4 UUIDs for your projects."
    >
      <UuidClient />
    </ToolLayout>
  );
}
