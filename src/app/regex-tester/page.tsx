import type { Metadata } from "next";
import RegexClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Regex Tester — Free Online Regular Expression Tester",
  description:
    "Test and debug regular expressions with live matching, syntax highlighting, and flag support. Free regex tester for JavaScript.",
  keywords: ["regex tester", "regular expression tester", "regex online", "test regex", "regex checker", "regex debugger"],
};

const content = `Regular expressions (regex) are powerful patterns used to match, search, and manipulate text. They're essential in programming for tasks like input validation, text parsing, search-and-replace operations, and data extraction. However, writing correct regex patterns can be tricky — our Regex Tester lets you build and test patterns with instant visual feedback.

As you type your pattern and test string, matches are highlighted in real time. You can see exactly what your regex captures, where each match starts, and how many matches are found. This immediate feedback loop makes it much faster to develop and debug complex patterns compared to testing in code.

The tester supports all JavaScript regex flags: g (global — find all matches), i (case insensitive), m (multiline — ^ and $ match line boundaries), and s (dotall — . matches newline characters). Toggle flags with one click to see how they affect your results.

Regular expressions follow a standard syntax shared across most programming languages, though some features vary between flavors. This tool uses JavaScript's regex engine (the same one used in Node.js and all modern browsers), so patterns you test here will work directly in your JavaScript, TypeScript, or Node.js code.

Common regex patterns include email validation, URL matching, phone number extraction, IP address detection, and HTML tag parsing. Whether you're a beginner learning regex for the first time or an experienced developer debugging a complex pattern, this tool gives you the fast iteration cycle you need.`;

const faqs = [
  {
    question: "What is a regular expression (regex)?",
    answer: "A regular expression is a sequence of characters that defines a search pattern. It's used in programming to match, find, and manipulate text. For example, the pattern \\d{3}-\\d{4} matches phone number formats like 555-1234. Regex is supported in virtually every programming language and many text editors.",
  },
  {
    question: "What do the regex flags (g, i, m, s) mean?",
    answer: "g (global) finds all matches instead of stopping at the first one. i (case insensitive) ignores uppercase/lowercase differences. m (multiline) makes ^ and $ match the start/end of each line instead of the whole string. s (dotall) makes the . character match newline characters as well.",
  },
  {
    question: "Why isn't my regex matching anything?",
    answer: "Common reasons: you forgot to escape special characters (use \\. instead of . to match a literal dot), your flags are wrong (add 'i' for case-insensitive matching), your pattern is too specific, or you're missing the global flag and only checking for the first match. Try simplifying your pattern and building it up step by step.",
  },
  {
    question: "Will patterns tested here work in Python, Java, or other languages?",
    answer: "Most basic regex syntax is universal across languages. However, advanced features like lookbehinds, named groups, and Unicode properties may differ. This tool uses JavaScript's regex engine. Patterns using \\d, \\w, \\s, character classes, quantifiers, and groups will work in most languages. Check language-specific docs for advanced features.",
  },
  {
    question: "What are some common regex patterns I can use?",
    answer: "Email: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}. URL: https?://[\\w.-]+(?:\\.[\\w]+)+[/\\w.-]*. Phone: \\(\\d{3}\\)\\s?\\d{3}-\\d{4}. IP address: \\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}. Numbers only: ^\\d+$. These are starting points — adjust them to match your specific requirements.",
  },
];

export default function RegexPage() {
  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions with live matching and highlight results."
      slug="regex-tester"
      content={content}
      faqs={faqs}
    >
      <RegexClient />
    </ToolLayout>
  );
}
