"use client";

import { useState, useMemo } from "react";

export default function RegexClient() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testString) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number; groups?: Record<string, string> }[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((m = regex.exec(testString)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.groups });
          if (m[0].length === 0) regex.lastIndex++;
        }
      } else {
        m = regex.exec(testString);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.groups });
      }

      // Build highlighted string
      let highlighted = "";
      let lastIndex = 0;
      for (const match of matches) {
        highlighted += escapeHtml(testString.slice(lastIndex, match.index));
        highlighted += `<mark class="bg-highlight-bg text-highlight-text rounded px-0.5">${escapeHtml(match.match)}</mark>`;
        lastIndex = match.index + match.match.length;
      }
      highlighted += escapeHtml(testString.slice(lastIndex));

      return { matches, highlighted, error: null };
    } catch (e) {
      return { matches: [], highlighted: "", error: (e as Error).message };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold text-muted block mb-1">
            Pattern
          </label>
          <div className="flex items-center border border-card-border rounded-lg bg-accent overflow-hidden">
            <span className="px-2 text-muted">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 py-2 bg-transparent font-mono text-sm focus:outline-none"
            />
            <span className="px-1 text-muted">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-12 py-2 bg-transparent font-mono text-sm text-center focus:outline-none"
              placeholder="gi"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap text-xs">
        {[
          { flag: "g", label: "Global" },
          { flag: "i", label: "Case Insensitive" },
          { flag: "m", label: "Multiline" },
          { flag: "s", label: "Dotall" },
        ].map(({ flag, label }) => (
          <button
            key={flag}
            onClick={() =>
              setFlags((f) =>
                f.includes(flag) ? f.replace(flag, "") : f + flag
              )
            }
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              flags.includes(flag)
                ? "bg-primary text-white"
                : "bg-accent border border-card-border"
            }`}
          >
            {flag} — {label}
          </button>
        ))}
      </div>

      <div>
        <label className="text-xs font-semibold text-muted block mb-1">
          Test String
        </label>
        <textarea
          className="w-full h-32 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter text to test against..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
        />
      </div>

      {result?.error && (
        <div className="p-3 bg-error-bg text-error-text rounded-lg text-sm border border-error-border">
          {result.error}
        </div>
      )}

      {result && !result.error && testString && (
        <>
          <div>
            <label className="text-xs font-semibold text-muted block mb-1">
              Matches ({result.matches.length})
            </label>
            <div
              className="w-full p-3 border border-card-border rounded-lg font-mono text-sm bg-accent whitespace-pre-wrap break-all"
              dangerouslySetInnerHTML={{ __html: result.highlighted }}
            />
          </div>

          {result.matches.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted block">
                Match Details
              </label>
              <div className="max-h-48 overflow-auto space-y-1">
                {result.matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm p-2 bg-accent border border-card-border rounded"
                  >
                    <span className="text-xs text-muted w-8">#{i + 1}</span>
                    <code className="font-mono flex-1">{m.match}</code>
                    <span className="text-xs text-muted">
                      index: {m.index}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
