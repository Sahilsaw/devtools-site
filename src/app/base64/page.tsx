import type { Metadata } from "next";
import Base64Client from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode — Free Online Tool",
  description:
    "Encode text to Base64 or decode Base64 strings instantly. Free, fast, and runs in your browser.",
};

export default function Base64Page() {
  return (
    <ToolLayout
      title="Base64 Encode / Decode"
      description="Encode text to Base64 or decode Base64 strings instantly."
    >
      <Base64Client />
    </ToolLayout>
  );
}
