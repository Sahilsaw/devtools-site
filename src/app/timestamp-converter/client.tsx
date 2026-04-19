"use client";

import { useState, useEffect } from "react";

export default function TimestampClient() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [currentTs, setCurrentTs] = useState(Math.floor(Date.now() / 1000));
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  function tsToDate(): string | null {
    const ts = Number(timestamp);
    if (isNaN(ts)) return null;
    const ms = unit === "seconds" ? ts * 1000 : ts;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  }

  function dateToTs(): { seconds: number; milliseconds: number } | null {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return {
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    };
  }

  const convertedDate = timestamp ? tsToDate() : null;
  const convertedTs = dateStr ? dateToTs() : null;

  const now = new Date();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-accent border border-card-border rounded-lg text-center">
        <div className="text-xs text-muted mb-1">Current Unix Timestamp</div>
        <div className="text-3xl font-mono font-bold text-primary">{currentTs}</div>
        <div className="text-sm text-muted mt-1">{now.toUTCString()}</div>
        <button
          onClick={() => navigator.clipboard.writeText(String(currentTs))}
          className="mt-2 px-3 py-1 text-xs bg-card border border-card-border rounded hover:bg-background transition-colors"
        >
          Copy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Timestamp → Date</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="e.g. 1700000000"
              className="flex-1 border border-card-border rounded-lg px-3 py-2 font-mono text-sm bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "seconds" | "milliseconds")}
              className="border border-card-border rounded-lg px-2 py-2 text-sm bg-card"
            >
              <option value="seconds">Seconds</option>
              <option value="milliseconds">Milliseconds</option>
            </select>
          </div>
          {convertedDate && (
            <div className="p-3 bg-card border border-card-border rounded-lg space-y-1">
              <div className="text-sm"><span className="text-muted">ISO 8601:</span> <code className="font-mono">{convertedDate}</code></div>
              <div className="text-sm"><span className="text-muted">UTC:</span> <code className="font-mono">{new Date(unit === "seconds" ? Number(timestamp) * 1000 : Number(timestamp)).toUTCString()}</code></div>
              <div className="text-sm"><span className="text-muted">Local:</span> <code className="font-mono">{new Date(unit === "seconds" ? Number(timestamp) * 1000 : Number(timestamp)).toString()}</code></div>
              <button
                onClick={() => navigator.clipboard.writeText(convertedDate)}
                className="px-2 py-1 text-xs bg-accent border border-card-border rounded hover:bg-background transition-colors mt-1"
              >
                Copy ISO
              </button>
            </div>
          )}
          {timestamp && !convertedDate && (
            <div className="p-3 bg-error-bg text-error-text rounded-lg text-sm border border-error-border">Invalid timestamp</div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Date → Timestamp</h3>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {convertedTs && (
            <div className="p-3 bg-card border border-card-border rounded-lg space-y-1">
              <div className="text-sm"><span className="text-muted">Seconds:</span> <code className="font-mono">{convertedTs.seconds}</code></div>
              <div className="text-sm"><span className="text-muted">Milliseconds:</span> <code className="font-mono">{convertedTs.milliseconds}</code></div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => navigator.clipboard.writeText(String(convertedTs.seconds))}
                  className="px-2 py-1 text-xs bg-accent border border-card-border rounded hover:bg-background transition-colors"
                >
                  Copy Seconds
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(String(convertedTs.milliseconds))}
                  className="px-2 py-1 text-xs bg-accent border border-card-border rounded hover:bg-background transition-colors"
                >
                  Copy Milliseconds
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
