"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

export default function MergePdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  function addFiles(newFiles: File[]) {
    const pdfs = newFiles.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function merge() {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const output = await merged.save();
      download(output, "merged.pdf");
    } catch (e) {
      alert("Error merging PDFs: " + (e as Error).message);
    }
    setProcessing(false);
  }

  return (
    <div className="space-y-4">
      <FileDropZone
        accept=".pdf"
        multiple
        label="Upload PDF files to merge"
        onFiles={addFiles}
      />

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-accent border border-card-border rounded-lg">
              <span className="text-xs text-muted w-6">{i + 1}</span>
              <span className="flex-1 text-sm truncate">{file.name}</span>
              <span className="text-xs text-muted">{(file.size / 1024).toFixed(0)} KB</span>
              <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="px-2 py-1 text-xs bg-card border border-card-border rounded disabled:opacity-30 hover:bg-background transition-colors">Up</button>
              <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="px-2 py-1 text-xs bg-card border border-card-border rounded disabled:opacity-30 hover:bg-background transition-colors">Down</button>
              <button onClick={() => removeFile(i)} className="px-2 py-1 text-xs text-error-text bg-error-bg border border-error-border rounded hover:opacity-80 transition-colors">Remove</button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={merge}
        disabled={files.length < 2 || processing}
        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
      >
        {processing ? "Merging..." : `Merge ${files.length} PDFs`}
      </button>
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
