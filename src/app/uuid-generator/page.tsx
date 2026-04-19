import type { Metadata } from "next";
import UuidClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "UUID Generator (v4) — Free Online Tool",
  description:
    "Generate random UUID v4 identifiers instantly. Bulk generation, one-click copy. Free and runs in your browser.",
  keywords: ["uuid generator", "uuid v4", "random uuid", "generate uuid online", "guid generator", "unique id generator"],
};

const content = `A UUID (Universally Unique Identifier) is a 128-bit identifier that is guaranteed to be unique across all devices and time. UUIDs are used extensively in software development for database primary keys, API request tracking, session identifiers, file naming, and distributed system coordination.

Our UUID generator creates version 4 (v4) UUIDs, which are randomly generated. A v4 UUID looks like this: 550e8400-e29b-41d4-a716-446655440000. It follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where x is any hexadecimal digit and y is one of 8, 9, a, or b. The 4 in the third group indicates this is a version 4 UUID.

The probability of generating two identical v4 UUIDs is astronomically small — you'd need to generate about 2.71 quintillion UUIDs to have a 50% chance of a collision. This makes them practically unique without requiring any central coordination or registry.

UUIDs are preferred over auto-incrementing integers in many scenarios because they can be generated independently on any device, they don't reveal information about how many records exist, they're harder to guess (improving security), and they work seamlessly in distributed databases where multiple nodes need to create records simultaneously.

This tool uses the Web Crypto API (crypto.randomUUID()) for cryptographically secure random number generation, ensuring high-quality randomness. You can generate up to 100 UUIDs at once and copy them individually or all at once.`;

const faqs = [
  {
    question: "What is a UUID and how is it different from a GUID?",
    answer: "UUID stands for Universally Unique Identifier, and GUID stands for Globally Unique Identifier. They are essentially the same thing — a 128-bit identifier in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx. The term GUID is more common in Microsoft ecosystems, while UUID is the standard term used in RFC 4122 and most other platforms.",
  },
  {
    question: "Are UUIDs truly unique?",
    answer: "For practical purposes, yes. A v4 UUID is randomly generated from 122 bits of randomness, giving 5.3 × 10^36 possible values. The probability of a collision is so small that you'd need to generate 103 trillion UUIDs to have a one-in-a-billion chance of a duplicate. In practice, UUID collisions are not a concern.",
  },
  {
    question: "When should I use UUIDs vs auto-incrementing IDs?",
    answer: "Use UUIDs when you need IDs that can be generated without a central authority (distributed systems), when you don't want to expose sequential ordering, when merging data from multiple sources, or when security matters (UUIDs are harder to guess). Use auto-incrementing IDs when you need smaller storage size, better index performance, or human-readable identifiers.",
  },
  {
    question: "What's the difference between UUID versions (v1, v4, v7)?",
    answer: "UUID v1 uses the current timestamp and MAC address (partially predictable). UUID v4 is entirely random and most commonly used. UUID v7 (newer) embeds a Unix timestamp for natural sorting while remaining mostly random. This tool generates v4 UUIDs, which are the most widely used version.",
  },
  {
    question: "Are these UUIDs cryptographically secure?",
    answer: "Yes. This tool uses the Web Crypto API (crypto.randomUUID()), which provides cryptographically secure random number generation. This means the generated UUIDs are suitable for security-sensitive applications like session tokens and access keys.",
  },
];

export default function UuidPage() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random v4 UUIDs for your projects."
      slug="uuid-generator"
      content={content}
      faqs={faqs}
    >
      <UuidClient />
    </ToolLayout>
  );
}
