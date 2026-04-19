"use client";

import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorClient() {
  const [hex, setHex] = useState("#2563eb");
  const [r, setR] = useState(37);
  const [g, setG] = useState(99);
  const [b, setB] = useState(235);

  const [h, s, l] = rgbToHsl(r, g, b);
  const currentHex = rgbToHex(r, g, b);

  function handleHexChange(value: string) {
    setHex(value);
    const rgb = hexToRgb(value);
    if (rgb) {
      setR(rgb[0]); setG(rgb[1]); setB(rgb[2]);
    }
  }

  function handleRgbChange(nr: number, ng: number, nb: number) {
    setR(nr); setG(ng); setB(nb);
    setHex(rgbToHex(nr, ng, nb));
  }

  function handleColorPicker(value: string) {
    handleHexChange(value);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-6 flex-wrap">
        <div
          className="w-32 h-32 rounded-xl border border-card-border shadow-inner shrink-0"
          style={{ backgroundColor: currentHex }}
        />
        <input
          type="color"
          value={currentHex}
          onChange={(e) => handleColorPicker(e.target.value)}
          className="w-16 h-16 cursor-pointer rounded border-0"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-semibold text-muted block mb-1">HEX</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full border border-card-border rounded-lg px-3 py-2 font-mono text-sm bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted block mb-1">RGB</label>
          <div className="flex gap-1">
            {[
              { value: r, set: (v: number) => handleRgbChange(v, g, b), label: "R" },
              { value: g, set: (v: number) => handleRgbChange(r, v, b), label: "G" },
              { value: b, set: (v: number) => handleRgbChange(r, g, v), label: "B" },
            ].map((ch) => (
              <input
                key={ch.label}
                type="number"
                min={0}
                max={255}
                value={ch.value}
                onChange={(e) => ch.set(Math.min(255, Math.max(0, Number(e.target.value))))}
                className="w-full border border-card-border rounded px-2 py-2 text-sm bg-accent text-center"
                title={ch.label}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted block mb-1">HSL</label>
          <input
            type="text"
            readOnly
            value={`hsl(${h}, ${s}%, ${l}%)`}
            className="w-full border border-card-border rounded-lg px-3 py-2 font-mono text-sm bg-accent"
          />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[currentHex, `rgb(${r}, ${g}, ${b})`, `hsl(${h}, ${s}%, ${l}%)`].map((val) => (
          <button
            key={val}
            onClick={() => navigator.clipboard.writeText(val)}
            className="px-3 py-1.5 text-xs bg-card border border-card-border rounded-lg hover:bg-accent transition-colors font-mono"
          >
            Copy {val}
          </button>
        ))}
      </div>
    </div>
  );
}
