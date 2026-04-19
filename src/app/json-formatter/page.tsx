import type { Metadata } from "next";
import JsonFormatterClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool",
  description:
    "Format, validate, and beautify JSON data online for free. Instant syntax highlighting, error detection, and minification. No signup required.",
  keywords: ["json formatter", "json validator", "json beautifier", "json minifier", "format json online", "validate json"],
};

const content = `JSON (JavaScript Object Notation) is one of the most widely used data formats in software development. Whether you're debugging API responses, configuring applications, or working with databases, properly formatted JSON is essential for readability and error detection.

Our free online JSON Formatter & Validator helps you instantly format, beautify, and validate JSON data right in your browser. Simply paste your JSON, click Format, and get clean, indented output. The tool also detects syntax errors and shows you exactly where the problem is, making debugging faster.

You can choose between 2-space, 4-space, or tab indentation depending on your project's coding style. Need to send JSON over a network or store it compactly? Use the Minify button to strip all whitespace and reduce the payload size.

This tool processes everything client-side — your JSON data never leaves your browser. There's no server processing, no data storage, and no signup required. It's completely free and private, making it safe for working with sensitive configuration files, API keys, or production data.

Common use cases include formatting API responses from tools like Postman or curl, validating JSON configuration files (package.json, tsconfig.json, etc.), cleaning up database exports, and converting minified JSON to a readable format for code reviews.`;

const faqs = [
  {
    question: "What is JSON and why do I need to format it?",
    answer: "JSON (JavaScript Object Notation) is a lightweight data interchange format used by APIs, configuration files, and databases. Formatting JSON adds proper indentation and line breaks, making it much easier to read, debug, and understand the data structure.",
  },
  {
    question: "Is my JSON data safe when using this tool?",
    answer: "Yes, completely. This tool runs 100% in your browser using JavaScript. Your JSON data is never sent to any server, stored, or logged. You can even use it offline once the page is loaded.",
  },
  {
    question: "What's the difference between formatting and minifying JSON?",
    answer: "Formatting (or beautifying) adds indentation and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to make the JSON as compact as possible, which is useful for reducing payload size in API calls and data storage.",
  },
  {
    question: "Why am I getting a JSON validation error?",
    answer: "Common JSON errors include: missing or extra commas, unquoted keys (JSON requires double quotes), single quotes instead of double quotes, trailing commas after the last item in an array or object, and unescaped special characters in strings.",
  },
  {
    question: "Can I format large JSON files with this tool?",
    answer: "Yes. Since the tool runs in your browser, it can handle files up to several megabytes without issues. For extremely large files (100MB+), you may experience slower processing depending on your device's memory and processing power.",
  },
];

export default function JsonFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, validate, and beautify JSON data with syntax highlighting."
      slug="json-formatter"
      content={content}
      faqs={faqs}
    >
      <JsonFormatterClient />
    </ToolLayout>
  );
}
