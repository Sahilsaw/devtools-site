import type { Metadata } from "next";
import HashClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Hash Generator (SHA-1, SHA-256, SHA-512) — Free Online Tool",
  description:
    "Generate SHA-1, SHA-256, and SHA-512 hashes from any text. Free, fast, and runs entirely in your browser. No data sent to servers.",
  keywords: ["hash generator", "sha256 hash", "sha1 hash", "sha512 hash", "hash text online", "generate hash"],
};

const content = `A cryptographic hash function takes an input of any size and produces a fixed-length output (called a hash, digest, or checksum) that uniquely represents the input data. Even a tiny change in the input produces a completely different hash, making hash functions essential for data integrity verification, password storage, and digital signatures.

Our Hash Generator supports three widely used algorithms: SHA-1 (160-bit output), SHA-256 (256-bit output), and SHA-512 (512-bit output). SHA stands for Secure Hash Algorithm, and these are part of the SHA family designed by the NSA and published by NIST.

SHA-256 is the most commonly used algorithm today. It's used in blockchain technology (Bitcoin uses SHA-256), TLS/SSL certificates, code signing, and general-purpose data integrity checking. SHA-512 provides even stronger security with a larger output, and is often used in high-security applications and on 64-bit systems where it can be faster than SHA-256.

SHA-1, while still widely used for checksums and non-security purposes (like Git commit hashes), is no longer recommended for security applications because theoretical collision attacks have been demonstrated. For any security-sensitive use case, use SHA-256 or SHA-512.

This tool uses the Web Crypto API built into your browser, which provides native, hardware-accelerated hash computation. All processing happens client-side — your text is never transmitted to any server, making it safe to hash sensitive data like passwords or API keys.`;

const faqs = [
  {
    question: "What is a hash function and what is it used for?",
    answer: "A hash function converts any input data into a fixed-size string of characters (the hash). It's a one-way function — you can't reverse-engineer the original input from the hash. Hash functions are used for verifying file integrity (checksums), storing passwords securely, digital signatures, blockchain technology, and detecting data tampering.",
  },
  {
    question: "What's the difference between SHA-1, SHA-256, and SHA-512?",
    answer: "The main difference is output size and security level. SHA-1 produces a 160-bit (40 character) hash and is considered weak for security. SHA-256 produces a 256-bit (64 character) hash and is the current standard for most security applications. SHA-512 produces a 512-bit (128 character) hash and offers the highest security level. All three are deterministic — the same input always produces the same output.",
  },
  {
    question: "Is SHA-256 the same hash used in Bitcoin?",
    answer: "Yes. Bitcoin uses SHA-256 extensively — for mining (proof of work), creating transaction IDs, building the Merkle tree, and generating addresses. Bitcoin actually uses double-SHA-256 (applying SHA-256 twice) for most operations to provide additional security against length extension attacks.",
  },
  {
    question: "Can I reverse a hash to get the original text?",
    answer: "No. Cryptographic hash functions are designed to be one-way functions. You cannot mathematically reverse a hash to recover the original input. However, short or common inputs can be found using rainbow tables or brute force, which is why passwords should always be hashed with a salt (random extra data added before hashing).",
  },
  {
    question: "Why doesn't this tool include MD5?",
    answer: "MD5 is not available in the Web Crypto API, which this tool uses for native browser-based hashing. MD5 is also considered cryptographically broken — collision attacks can be performed quickly. For integrity checking, SHA-256 is a much better choice. If you specifically need MD5, you would need a JavaScript library implementation.",
  },
];

export default function HashPage() {
  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, and SHA-512 hashes from any text."
      slug="hash-generator"
      content={content}
      faqs={faqs}
    >
      <HashClient />
    </ToolLayout>
  );
}
