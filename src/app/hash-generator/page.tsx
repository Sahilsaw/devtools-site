import type { Metadata } from "next";
import HashClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Hash Generator (MD5, SHA-1, SHA-256) — Free Online Tool",
  description:
    "Generate MD5, SHA-1, and SHA-256 hashes from any text. Free, fast, and runs entirely in your browser.",
};

export default function HashPage() {
  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, and SHA-256 hashes from any text."
    >
      <HashClient />
    </ToolLayout>
  );
}
