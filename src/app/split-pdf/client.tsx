"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

export default function SplitPdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeInput, setRangeInput] = useState("");
  const [processing, setProcessing] = useState(false);

  async function handleFile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
    setRangeInput(`1-${pdf.getPageCount()}`);
  }

  function parseRanges(input: string, max: number): number[] {
    const pages: Set<number> = new Set();
    const parts = input.split(",").map((s) => s.trim());
    for (const part of parts) {
      if (part.includes("-")) {
        const [a, b] = part.split("-").map(Number);
        if (!isNaN(a) && !isNaN(b)) {
          for (let i = Math.max(1, a); i <= Math.min(max, b); i++) pages.add(i);
        }
      } else {
        const n = Number(part);
        if (!isNaN(n) && n >= 1 && n <= max) pages.add(n);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  }

  async function split() {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);
      const pages = parseRanges(rangeInput, pageCount);
      if (pages.length === 0) { alert("No valid pages selected"); setProcessing(false); return; }

      const output = await PDFDocument.create();
      const copied = await output.copyPages(source, pages.map((p) => p - 1));
      copied.forEach((page) => output.addPage(page));
      const data = await output.save();
      download(data, `split_${pages[0]}-${pages[pages.length - 1]}.pdf`);
    } catch (e) {
      alert("Error splitting PDF: " + (e as Error).message);
    }
    setProcessing(false);
  }

  async function splitAll() {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const source = await PDFDocument.load(bytes);
      for (let i = 0; i < source.getPageCount(); i++) {
        const output = await PDFDocument.create();
        const [page] = await output.copyPages(source, [i]);
        output.addPage(page);
        const data = await output.save();
        download(data, `page_${i + 1}.pdf`);
      }
    } catch (e) {
      alert("Error splitting PDF: " + (e as Error).message);
    }
    setProcessing(false);
  }

  return (
    <div className="space-y-4">
      <FileDropZone accept=".pdf" label="Upload a PDF to split" onFiles={handleFile} />

      {file && (
        <>
          <div className="p-3 bg-accent border border-card-border rounded-lg text-sm">
            <span className="font-medium">{file.name}</span>
            <span className="text-muted ml-2">({pageCount} pages)</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted block mb-1">
              Page Range (e.g. 1-3, 5, 7-10)
            </label>
            <input
              type="text"
              value={rangeInput}
              onChange={(e) => setRangeInput(e.target.value)}
              className="w-full border border-card-border rounded-lg px-3 py-2 font-mono text-sm bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={split}
              disabled={processing}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
            >
              {processing ? "Processing..." : "Extract Pages"}
            </button>
            <button
              onClick={splitAll}
              disabled={processing}
              className="px-6 py-2.5 bg-foreground text-background rounded-lg hover:opacity-80 transition-colors font-medium text-sm disabled:opacity-50"
            >
              Split Into Individual Pages
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function download(data: Uint8Array, filename: string) {
  const blob = new Blob([data as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
