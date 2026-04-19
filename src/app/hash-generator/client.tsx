"use client";

import { useState } from "react";

async function hash(text: string, algo: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashClient() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<{ algo: string; value: string }[]>([]);

  async function generateHashes() {
    if (!input) return;
    const results = await Promise.all([
      hash(input, "SHA-1").then((v) => ({ algo: "SHA-1", value: v })),
      hash(input, "SHA-256").then((v) => ({ algo: "SHA-256", value: v })),
      hash(input, "SHA-512").then((v) => ({ algo: "SHA-512", value: v })),
    ]);
    setHashes(results);
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-28 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Enter text to hash..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={generateHashes}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
      >
        Generate Hashes
      </button>

      {hashes.length > 0 && (
        <div className="space-y-3">
          {hashes.map((h) => (
            <div key={h.algo} className="p-3 bg-accent border border-card-border rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-muted">{h.algo}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(h.value)}
                  className="px-2 py-1 text-xs bg-card border border-card-border rounded hover:bg-background transition-colors"
                >
                  Copy
                </button>
              </div>
              <code className="text-sm font-mono break-all">{h.value}</code>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted">
        Note: MD5 is not available in the Web Crypto API. SHA-1, SHA-256, and SHA-512 are provided.
      </p>
    </div>
  );
}
