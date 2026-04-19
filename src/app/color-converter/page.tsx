import type { Metadata } from "next";
import ColorClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Color Converter (HEX, RGB, HSL) — Free Online Tool",
  description:
    "Convert colors between HEX, RGB, and HSL formats with live preview. Free color picker and converter for designers and developers.",
  keywords: ["color converter", "hex to rgb", "rgb to hex", "hsl converter", "color picker online", "hex color converter"],
};

const content = `Working with colors in web development and design often requires converting between different color formats. CSS supports HEX (#2563eb), RGB (rgb(37, 99, 235)), and HSL (hsl(217, 83%, 53%)) formats, and different tools and frameworks may use different formats. Our Color Converter lets you instantly convert between all three.

HEX colors are the most common format in web development. They represent colors as a six-character hexadecimal string preceded by #. Each pair of characters represents the red, green, and blue components (00-FF). For example, #FF0000 is pure red, #00FF00 is pure green, and #0000FF is pure blue.

RGB (Red, Green, Blue) represents colors as three numbers from 0 to 255, one for each color channel. This format is intuitive because it directly describes how much of each primary color to mix. It's commonly used in CSS, image processing, and programming.

HSL (Hue, Saturation, Lightness) is the most human-friendly color format. Hue is a degree on the color wheel (0-360, where 0 is red, 120 is green, 240 is blue), Saturation is a percentage (0% is gray, 100% is full color), and Lightness is a percentage (0% is black, 50% is normal, 100% is white). HSL makes it easy to create color variations by adjusting just one value.

The built-in color picker lets you visually select any color and instantly see its HEX, RGB, and HSL values. All values are copyable with one click, so you can quickly paste them into your CSS, design files, or code.`;

const faqs = [
  {
    question: "How do I convert HEX to RGB?",
    answer: "To convert HEX to RGB, split the 6-character hex code into three pairs (RR, GG, BB) and convert each pair from hexadecimal to decimal. For example, #2563EB: 25 hex = 37 decimal (Red), 63 hex = 99 decimal (Green), EB hex = 235 decimal (Blue), giving rgb(37, 99, 235). Our tool does this conversion instantly.",
  },
  {
    question: "What's the difference between HEX, RGB, and HSL?",
    answer: "HEX uses hexadecimal notation (#RRGGBB) and is most common in web development. RGB uses decimal values for red, green, and blue channels (0-255 each) and is intuitive for mixing colors. HSL uses Hue (color wheel angle), Saturation (color intensity), and Lightness (brightness), making it easiest for creating color variations and palettes.",
  },
  {
    question: "Which color format should I use in CSS?",
    answer: "All three formats are fully supported in CSS and render identically. Use HEX for simplicity and widespread convention. Use RGB when you need alpha transparency (rgba). Use HSL when you want to easily create color variations — adjusting lightness for hover states or saturation for disabled states is much more intuitive in HSL.",
  },
  {
    question: "What is a color picker and how does it work?",
    answer: "A color picker is a visual tool that lets you select colors by clicking on a color spectrum. Our built-in color picker uses the browser's native color input, which provides a familiar interface for selecting colors. When you pick a color, it automatically updates all three format displays (HEX, RGB, HSL) in real time.",
  },
  {
    question: "How do I create a lighter or darker shade of a color?",
    answer: "The easiest way is using HSL format. To make a color lighter, increase the L (Lightness) value. To make it darker, decrease it. For example, hsl(217, 83%, 53%) is your base color; hsl(217, 83%, 70%) is lighter and hsl(217, 83%, 35%) is darker. The hue and saturation stay the same, so the color family is preserved.",
  },
];

export default function ColorPage() {
  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats with live preview."
      slug="color-converter"
      content={content}
      faqs={faqs}
    >
      <ColorClient />
    </ToolLayout>
  );
}
