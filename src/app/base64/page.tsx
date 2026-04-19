import type { Metadata } from "next";
import Base64Client from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Base64 Encode & Decode — Free Online Tool",
  description:
    "Encode text to Base64 or decode Base64 strings instantly online for free. Supports UTF-8 text. No signup required.",
  keywords: ["base64 encode", "base64 decode", "base64 converter", "base64 online", "encode base64", "decode base64"],
};

const content = `Base64 is a binary-to-text encoding scheme that converts binary data into a sequence of printable ASCII characters. It's commonly used to embed images in HTML or CSS, transmit binary data over text-based protocols like email (MIME) and HTTP, and encode authentication credentials in HTTP Basic Auth headers.

Our free Base64 encoder and decoder lets you convert text to Base64 and back instantly in your browser. It fully supports UTF-8 characters, so you can encode text in any language — including characters with accents, emojis, and CJK characters.

Base64 encoding works by taking groups of three bytes (24 bits) and splitting them into four groups of six bits each. Each six-bit group is then mapped to one of 64 printable characters (A-Z, a-z, 0-9, +, and /). If the input isn't evenly divisible by three bytes, padding characters (=) are added to the output.

This encoding increases the size of the data by approximately 33%, which is the trade-off for being able to safely transmit binary data as text. Despite this overhead, Base64 remains essential for many web technologies including data URIs, JSON Web Tokens (JWTs), and email attachments.

All processing happens entirely in your browser — no data is sent to any server. This makes it safe to encode sensitive information like API tokens, passwords, or private keys without worrying about data exposure.`;

const faqs = [
  {
    question: "What is Base64 encoding used for?",
    answer: "Base64 encoding is used to convert binary data into text format. Common uses include embedding images in HTML/CSS using data URIs, encoding email attachments (MIME), transmitting binary data in JSON APIs, encoding credentials in HTTP Basic Authentication, and storing binary data in text-based formats like XML or JSON.",
  },
  {
    question: "Is Base64 encoding the same as encryption?",
    answer: "No. Base64 is an encoding scheme, not encryption. It doesn't provide any security — anyone can decode a Base64 string back to its original form. It's designed for data transport, not data protection. For security, use proper encryption methods like AES or RSA.",
  },
  {
    question: "Why does Base64 encoded data end with = or ==?",
    answer: "The padding characters (=) are added to make the output length a multiple of 4 characters. Base64 processes input in groups of 3 bytes. If the input length isn't divisible by 3, one or two = characters are added as padding. One = means the last group had 2 bytes, and == means it had 1 byte.",
  },
  {
    question: "Does Base64 encoding support Unicode and special characters?",
    answer: "Yes. Our tool first converts the text to UTF-8 bytes before Base64 encoding, so it correctly handles Unicode characters including emojis, accented letters, Chinese/Japanese/Korean characters, and other non-ASCII text.",
  },
  {
    question: "How much larger does Base64 make my data?",
    answer: "Base64 encoding increases data size by approximately 33%. For every 3 bytes of input, Base64 produces 4 bytes of output. So a 1 MB file becomes roughly 1.33 MB when Base64 encoded. This overhead is the trade-off for safe text-based transmission of binary data.",
  },
];

export default function Base64Page() {
  return (
    <ToolLayout
      title="Base64 Encode / Decode"
      description="Encode text to Base64 or decode Base64 strings instantly."
      slug="base64"
      content={content}
      faqs={faqs}
    >
      <Base64Client />
    </ToolLayout>
  );
}
