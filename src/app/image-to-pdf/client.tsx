"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileDropZone from "@/components/FileDropZone";

export default function ImageToPdfClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [fitMode, setFitMode] = useState<"fit" | "fill">("fit");

  function addFiles(newFiles: File[]) {
    const images = newFiles.filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...images]);
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

  async function convert() {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        let image;

        if (file.type === "image/png") {
          image = await pdf.embedPng(bytes);
        } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
          image = await pdf.embedJpg(bytes);
        } else {
          // Convert other formats to PNG via canvas
          const bitmap = await createImageBitmap(new Blob([bytes]));
          const canvas = document.createElement("canvas");
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(bitmap, 0, 0);
          const pngBlob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), "image/png")
          );
          const pngBytes = await pngBlob.arrayBuffer();
          image = await pdf.embedPng(pngBytes);
        }

        const imgWidth = image.width;
        const imgHeight = image.height;

        // A4-ish proportions but matching image aspect ratio
        const pageWidth = 595.28; // A4 width in points
        const pageHeight = 841.89; // A4 height in points

        let drawWidth: number;
        let drawHeight: number;
        let x: number;
        let y: number;

        if (fitMode === "fit") {
          const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
          drawWidth = imgWidth * scale;
          drawHeight = imgHeight * scale;
          x = (pageWidth - drawWidth) / 2;
          y = (pageHeight - drawHeight) / 2;
        } else {
          // Fill: use image dimensions as page size
          drawWidth = imgWidth;
          drawHeight = imgHeight;
          x = 0;
          y = 0;
        }

        const page = pdf.addPage(
          fitMode === "fit" ? [pageWidth, pageHeight] : [imgWidth, imgHeight]
        );
        page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
      }

      const data = await pdf.save();
      download(data, "images.pdf");
    } catch (e) {
      alert("Error converting images: " + (e as Error).message);
    }
    setProcessing(false);
  }

  return (
    <div className="space-y-4">
      <FileDropZone
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        multiple
        label="Upload images (JPG, PNG, WebP)"
        onFiles={addFiles}
      />

      {files.length > 0 && (
        <>
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

          <div className="flex items-center gap-3">
            <label className="text-sm text-muted">Page Size:</label>
            <button
              onClick={() => setFitMode("fit")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${fitMode === "fit" ? "bg-primary text-white" : "bg-accent border border-card-border"}`}
            >
              A4 (fit image)
            </button>
            <button
              onClick={() => setFitMode("fill")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${fitMode === "fill" ? "bg-primary text-white" : "bg-accent border border-card-border"}`}
            >
              Match Image Size
            </button>
          </div>

          <button
            onClick={convert}
            disabled={processing}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm disabled:opacity-50"
          >
            {processing ? "Converting..." : `Convert ${files.length} Image${files.length > 1 ? "s" : ""} to PDF`}
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
