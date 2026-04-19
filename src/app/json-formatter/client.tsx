"use client";

import { useState } from "react";

export default function JsonFormatterClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-48 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Paste your JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={format}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-colors font-medium text-sm"
        >
          Minify
        </button>
        <label className="flex items-center gap-2 text-sm text-muted">
          Indent:
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="border border-card-border rounded px-2 py-1 bg-card"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>Tab (8)</option>
          </select>
        </label>
      </div>

      {error && (
        <div className="p-3 bg-error-bg text-error-text rounded-lg text-sm border border-error-border">
          {error}
        </div>
      )}

      {output && (
        <div className="relative">
          <button
            onClick={copyOutput}
            className="absolute top-2 right-2 px-3 py-1 text-xs bg-card border border-card-border rounded hover:bg-accent transition-colors"
          >
            Copy
          </button>
          <pre className="w-full p-3 border border-card-border rounded-lg font-mono text-sm bg-accent overflow-auto max-h-96">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
