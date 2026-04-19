"use client";

import { useState, useMemo } from "react";

interface DiffLine {
  type: "same" | "added" | "removed";
  text: string;
  lineNum1?: number;
  lineNum2?: number;
}

function computeDiff(text1: string, text2: string): DiffLine[] {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  const result: DiffLine[] = [];

  // Simple LCS-based diff
  const m = lines1.length;
  const n = lines2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack
  let i = m, j = n;
  const stack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      stack.push({ type: "same", text: lines1[i - 1], lineNum1: i, lineNum2: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", text: lines2[j - 1], lineNum2: j });
      j--;
    } else {
      stack.push({ type: "removed", text: lines1[i - 1], lineNum1: i });
      i--;
    }
  }

  stack.reverse().forEach((line) => result.push(line));
  return result;
}

export default function DiffClient() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const diff = useMemo(() => {
    if (!text1 && !text2) return [];
    return computeDiff(text1, text2);
  }, [text1, text2]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.type === "added").length;
    const removed = diff.filter((d) => d.type === "removed").length;
    const same = diff.filter((d) => d.type === "same").length;
    return { added, removed, same };
  }, [diff]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-muted block mb-1">
            Original Text
          </label>
          <textarea
            className="w-full h-48 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste original text here..."
            value={text1}
            onChange={(e) => setText1(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted block mb-1">
            Modified Text
          </label>
          <textarea
            className="w-full h-48 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Paste modified text here..."
            value={text2}
            onChange={(e) => setText2(e.target.value)}
          />
        </div>
      </div>

      {diff.length > 0 && (
        <>
          <div className="flex gap-4 text-sm">
            <span className="text-green-700 font-medium">+{stats.added} added</span>
            <span className="text-red-700 font-medium">-{stats.removed} removed</span>
            <span className="text-muted">{stats.same} unchanged</span>
          </div>

          <div className="border border-card-border rounded-lg overflow-hidden">
            <div className="max-h-[500px] overflow-auto">
              {diff.map((line, i) => (
                <div
                  key={i}
                  className={`flex font-mono text-sm border-b border-card-border last:border-0 ${
                    line.type === "added"
                      ? "bg-green-50"
                      : line.type === "removed"
                        ? "bg-red-50"
                        : "bg-card"
                  }`}
                >
                  <span className="w-10 text-xs text-muted text-right px-2 py-1 select-none border-r border-card-border shrink-0">
                    {line.lineNum1 ?? ""}
                  </span>
                  <span className="w-10 text-xs text-muted text-right px-2 py-1 select-none border-r border-card-border shrink-0">
                    {line.lineNum2 ?? ""}
                  </span>
                  <span
                    className={`w-6 text-center py-1 select-none shrink-0 font-bold ${
                      line.type === "added"
                        ? "text-green-600"
                        : line.type === "removed"
                          ? "text-red-600"
                          : "text-transparent"
                    }`}
                  >
                    {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                  </span>
                  <span className="py-1 px-2 whitespace-pre-wrap break-all flex-1">
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
