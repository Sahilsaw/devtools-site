import type { Metadata } from "next";
import UrlEncoderClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "URL Encode & Decode — Free Online Tool",
  description:
    "Encode or decode URLs and query parameters online for free. Fast and private.",
};

export default function UrlEncoderPage() {
  return (
    <ToolLayout
      title="URL Encode / Decode"
      description="Encode or decode URLs and query string parameters."
    >
      <UrlEncoderClient />
    </ToolLayout>
  );
}
