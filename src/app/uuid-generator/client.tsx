"use client";

import { useState } from "react";

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UuidClient() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(1);

  function generate() {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join("\n"));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <label className="flex items-center gap-2 text-sm">
          Count:
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-20 border border-card-border rounded px-2 py-1 bg-card text-sm"
          />
        </label>
        <button
          onClick={generate}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm"
        >
          Generate
        </button>
        <button
          onClick={copyAll}
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-colors font-medium text-sm"
        >
          Copy All
        </button>
      </div>

      <div className="space-y-2">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-2 bg-accent border border-card-border rounded-lg"
          >
            <code className="flex-1 font-mono text-sm break-all">{uuid}</code>
            <button
              onClick={() => navigator.clipboard.writeText(uuid)}
              className="px-2 py-1 text-xs bg-card border border-card-border rounded hover:bg-background transition-colors shrink-0"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
