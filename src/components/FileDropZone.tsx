"use client";

import { useCallback, useState, useRef } from "react";

interface FileDropZoneProps {
  accept: string;
  multiple?: boolean;
  label: string;
  onFiles: (files: File[]) => void;
}

export default function FileDropZone({ accept, multiple = false, label, onFiles }: FileDropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFiles(files);
    },
    [onFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length) onFiles(files);
      e.target.value = "";
    },
    [onFiles]
  );

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragging
          ? "border-primary bg-primary/10"
          : "border-card-border hover:border-primary hover:bg-accent"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <div className="text-muted text-sm">
        <p className="font-medium text-foreground mb-1">{label}</p>
        <p>Drag & drop or click to browse</p>
      </div>
    </div>
  );
}
