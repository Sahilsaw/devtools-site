import type { Metadata } from "next";
import DiffClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Diff Checker — Free Online Text Comparison Tool",
  description:
    "Compare two texts and highlight differences line by line. Free online diff tool with added/removed line counts.",
  keywords: ["diff checker", "text compare", "diff tool online", "compare text", "text difference", "online diff"],
};

const content = `A diff checker compares two pieces of text and highlights the differences between them. It's one of the most essential tools in software development, used daily for code reviews, document editing, configuration management, and debugging.

Our Diff Checker uses the Longest Common Subsequence (LCS) algorithm to accurately detect additions, deletions, and unchanged lines between your original and modified text. Results are displayed in a familiar unified diff format with color coding: green for added lines, red for removed lines, and white for unchanged lines.

Developers use diff tools constantly — when reviewing pull requests, comparing configuration files between environments, checking what changed in a deployment, or debugging by comparing working and broken versions of code. Technical writers use them to track changes in documentation between revisions.

The tool shows line numbers for both the original and modified text, making it easy to locate changes. A summary at the top shows the total count of added, removed, and unchanged lines, giving you a quick overview of how much changed.

All comparisons happen entirely in your browser. No data is sent to any server, making it safe to compare sensitive files like configuration files with API keys, environment variables, or private code. The tool handles any text format — code, prose, CSV data, JSON, YAML, or plain text.`;

const faqs = [
  {
    question: "What is a diff checker and how does it work?",
    answer: "A diff checker compares two pieces of text and identifies the differences between them. It uses algorithms like the Longest Common Subsequence (LCS) to find the optimal matching between lines, then highlights lines that were added (present only in the new text), removed (present only in the original), or unchanged (present in both).",
  },
  {
    question: "What do the colors in the diff output mean?",
    answer: "Green lines with a + sign are additions — lines that exist in the modified text but not the original. Red lines with a - sign are removals — lines that exist in the original but not the modified text. White lines are unchanged — they appear in both texts in the same position.",
  },
  {
    question: "Can I compare code files with this tool?",
    answer: "Yes. This diff checker works with any text, including source code in any programming language. It compares line by line, which is the standard approach for code diffs. For best results, paste the complete file contents. The tool preserves whitespace and indentation, so even spacing changes will be detected.",
  },
  {
    question: "How is this different from git diff?",
    answer: "Git diff compares files in a Git repository and shows changes between commits, branches, or the working directory. Our tool compares any two texts you paste in, regardless of whether they're in a Git repository. The output format is similar — both show added/removed lines — but our tool is more accessible for quick comparisons without needing Git.",
  },
  {
    question: "Is there a size limit for text comparison?",
    answer: "There's no hard limit, but very large texts (tens of thousands of lines) may be slow because the LCS algorithm has O(n*m) complexity. For typical use cases — comparing files under a few thousand lines — the tool performs instantly. All processing happens in your browser, so performance depends on your device.",
  },
];

export default function DiffPage() {
  return (
    <ToolLayout
      title="Diff Checker"
      description="Compare two texts and highlight the differences line by line."
      slug="diff-checker"
      content={content}
      faqs={faqs}
    >
      <DiffClient />
    </ToolLayout>
  );
}
