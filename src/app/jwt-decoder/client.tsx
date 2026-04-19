"use client";

import { useState } from "react";

function decodeBase64Url(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
}

interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean | null;
  expiresAt: string | null;
  issuedAt: string | null;
}

function decodeJWT(token: string): DecodedJWT | null {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return null;

  try {
    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    let isExpired: boolean | null = null;
    let expiresAt: string | null = null;
    let issuedAt: string | null = null;

    if (payload.exp) {
      const expDate = new Date(payload.exp * 1000);
      expiresAt = expDate.toUTCString();
      isExpired = expDate < new Date();
    }

    if (payload.iat) {
      issuedAt = new Date(payload.iat * 1000).toUTCString();
    }

    return { header, payload, signature: parts[2], isExpired, expiresAt, issuedAt };
  } catch {
    return null;
  }
}

export default function JwtClient() {
  const [token, setToken] = useState("");

  const decoded = token ? decodeJWT(token) : null;
  const isInvalid = token.trim().length > 0 && !decoded;

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-32 p-3 border border-card-border rounded-lg font-mono text-sm resize-y bg-accent focus:outline-none focus:ring-2 focus:ring-primary break-all"
        placeholder="Paste your JWT token here (eyJhbGciOi...)..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      {isInvalid && (
        <div className="p-3 bg-error-bg text-error-text rounded-lg text-sm border border-error-border">
          Invalid JWT format. A JWT must have three parts separated by dots (header.payload.signature).
        </div>
      )}

      {decoded && (
        <div className="space-y-4">
          {decoded.isExpired !== null && (
            <div
              className={`p-3 rounded-lg text-sm border ${
                decoded.isExpired
                  ? "bg-error-bg text-error-text border-error-border"
                  : "bg-success-bg text-success-text border-success-border"
              }`}
            >
              {decoded.isExpired
                ? `Token is EXPIRED (expired ${decoded.expiresAt})`
                : `Token is VALID (expires ${decoded.expiresAt})`}
            </div>
          )}

          {[
            { label: "Header", data: decoded.header, color: "text-error-text" },
            { label: "Payload", data: decoded.payload, color: "text-primary" },
          ].map(({ label, data, color }) => (
            <div key={label} className="border border-card-border rounded-lg bg-card">
              <div className="flex items-center justify-between px-4 py-2 border-b border-card-border">
                <span className={`text-sm font-semibold ${color}`}>{label}</span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                  }
                  className="px-2 py-1 text-xs bg-accent border border-card-border rounded hover:bg-background transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 font-mono text-sm overflow-auto max-h-64 bg-accent">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ))}

          {decoded.issuedAt && (
            <div className="text-sm text-muted">
              <span className="font-medium">Issued at:</span> {decoded.issuedAt}
            </div>
          )}

          <div className="border border-card-border rounded-lg bg-card">
            <div className="px-4 py-2 border-b border-card-border">
              <span className="text-sm font-semibold text-primary">Signature</span>
            </div>
            <div className="p-4 font-mono text-xs text-muted break-all bg-accent">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
