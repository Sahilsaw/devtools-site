"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

export default function WatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.15);
  const [rotation, setRotation] = useState(-45);
  const [processing, setProcessing] = useState(false);

  async function handleFile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
  }

  async function addWatermark() {
    if (!file || !text.trim()) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.HelveticaBold);
      const pages = pdf.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const x = (width - textWidth) / 2;
        const y = height / 2;

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotation),
        });
      }

      const data = await pdf.save();
      download(data, `watermarked_${file.name}`);
    } catch (e) {
      alert("Error adding watermark: " + (e as Error).message);
    }
    setProcessing(false);
  }

  return (
    <div className="space-y-4">
      <FileDropZone accept=".pdf" label="Upload a PDF to watermark" onFiles={handleFile} />

      {file && (
        <>
          <div className="p-3 bg-accent border border-card-border rounded-lg text-sm">
            <span className="font-medium">{file.name}</span>
            <span className="text-muted ml-2">({pageCount} pages)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Watermark Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Font Size</label>
              <input
                type="number"
                min={12}
                max={120}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-accent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Opacity ({Math.round(opacity * 100)}%)</label>
              <input
                type="range"
                min={0.05}
                max={0.5}
                step={0.05}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Rotation ({rotation}°)</label>
              <input
                type="range"
                min={-90}
                max={90}
                step={5}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          <button
            onClick={addWatermark}
            disabled={processing || !text.trim()}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
          >
            {processing ? "Adding..." : "Add Watermark & Download"}
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
