"use client";

import { useState } from "react";

export default function Base64Client() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  function convert() {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setOutput("Error: Invalid input for " + mode);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("encode")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "encode" ? "bg-primary text-white" : "bg-accent border border-card-border"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "decode" ? "bg-primary text-white" : "bg-accent border border-card-border"}`}
        >
          Decode
        </button>
      </div>

      <textarea
        className="w-full h-36 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={convert}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
      >
        Convert
      </button>

      {output && (
        <div className="relative">
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="absolute top-2 right-2 px-3 py-1 text-xs bg-card border border-card-border rounded hover:bg-accent transition-colors"
          >
            Copy
          </button>
          <pre className="w-full p-3 border border-card-border rounded-lg font-mono text-sm bg-accent overflow-auto max-h-96 whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
