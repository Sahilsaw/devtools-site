"use client";

import { useState } from "react";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum",
];

function generateSentence(wordCount: number): string {
  const words = Array.from({ length: wordCount }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentenceCount = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentenceCount }, () => generateSentence(6 + Math.floor(Math.random() * 10))).join(" ");
}

export default function LoremClient() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  function generate() {
    const paragraphs = Array.from({ length: count }, () => generateParagraph());
    setOutput(paragraphs.join("\n\n"));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          Paragraphs:
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
            className="w-20 border border-card-border rounded px-2 py-1 bg-card text-sm"
          />
        </label>
        <button
          onClick={generate}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="relative">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1 text-xs bg-card border border-card-border rounded hover:bg-accent transition-colors"
          >
            Copy
          </button>
          <div className="w-full p-4 border border-card-border rounded-lg bg-accent text-sm leading-relaxed max-h-96 overflow-auto whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
