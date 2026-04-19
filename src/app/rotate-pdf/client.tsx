"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

export default function RotatePdfClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotation, setRotation] = useState(90);
  const [processing, setProcessing] = useState(false);

  async function handleFile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
  }

  async function rotate() {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = pdf.getPages();
      for (const page of pages) {
        page.setRotation(degrees(page.getRotation().angle + rotation));
      }
      const data = await pdf.save();
      download(data, `rotated_${file.name}`);
    } catch (e) {
      alert("Error rotating PDF: " + (e as Error).message);
    }
    setProcessing(false);
  }

  return (
    <div className="space-y-4">
      <FileDropZone accept=".pdf" label="Upload a PDF to rotate" onFiles={handleFile} />

      {file && (
        <>
          <div className="p-3 bg-accent border border-card-border rounded-lg text-sm">
            <span className="font-medium">{file.name}</span>
            <span className="text-muted ml-2">({pageCount} pages)</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-sm text-muted">Rotate:</label>
            {[90, 180, 270].map((deg) => (
              <button
                key={deg}
                onClick={() => setRotation(deg)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  rotation === deg
                    ? "bg-primary text-white"
                    : "bg-accent border border-card-border"
                }`}
              >
                {deg}°
              </button>
            ))}
          </div>

          <button
            onClick={rotate}
            disabled={processing}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
          >
            {processing ? "Rotating..." : "Rotate & Download"}
          </button>
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
