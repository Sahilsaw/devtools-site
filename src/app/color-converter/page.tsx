import type { Metadata } from "next";
import ColorClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Color Converter (HEX, RGB, HSL) — Free Online Tool",
  description:
    "Convert colors between HEX, RGB, and HSL formats. Live preview with instant conversion.",
};

export default function ColorPage() {
  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats with live preview."
    >
      <ColorClient />
    </ToolLayout>
  );
}
