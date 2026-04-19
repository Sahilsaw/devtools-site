"use client";

import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right" | "top-left";

export default function PageNumbersClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startNum, setStartNum] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [processing, setProcessing] = useState(false);

  async function handleFile(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    const bytes = await f.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    setPageCount(pdf.getPageCount());
  }

  async function addPageNumbers() {
    if (!file) return;
    setProcessing(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();

      pages.forEach((page, i) => {
        const { width, height } = page.getSize();
        const text = `${startNum + i}`;
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        let x = 0;
        let y = 0;

        switch (position) {
          case "bottom-center": x = (width - textWidth) / 2; y = 30; break;
          case "bottom-left": x = 40; y = 30; break;
          case "bottom-right": x = width - textWidth - 40; y = 30; break;
          case "top-center": x = (width - textWidth) / 2; y = height - 30; break;
          case "top-left": x = 40; y = height - 30; break;
          case "top-right": x = width - textWidth - 40; y = height - 30; break;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      });

      const data = await pdf.save();
      download(data, `numbered_${file.name}`);
    } catch (e) {
      alert("Error adding page numbers: " + (e as Error).message);
    }
    setProcessing(false);
  }

  const positions: { value: Position; label: string }[] = [
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-right", label: "Bottom Right" },
    { value: "top-center", label: "Top Center" },
    { value: "top-left", label: "Top Left" },
    { value: "top-right", label: "Top Right" },
  ];

  return (
    <div className="space-y-4">
      <FileDropZone accept=".pdf" label="Upload a PDF to add page numbers" onFiles={handleFile} />

      {file && (
        <>
          <div className="p-3 bg-accent border border-card-border rounded-lg text-sm">
            <span className="font-medium">{file.name}</span>
            <span className="text-muted ml-2">({pageCount} pages)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
                className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-card"
              >
                {positions.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Start Number</label>
              <input
                type="number"
                min={1}
                value={startNum}
                onChange={(e) => setStartNum(Number(e.target.value))}
                className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-accent"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted block mb-1">Font Size</label>
              <input
                type="number"
                min={8}
                max={36}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full border border-card-border rounded-lg px-3 py-2 text-sm bg-accent"
              />
            </div>
          </div>

          <button
            onClick={addPageNumbers}
            disabled={processing}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
          >
            {processing ? "Adding..." : "Add Page Numbers & Download"}
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
