import type { Metadata } from "next";
import LoremClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Free Online Tool",
  description:
    "Generate placeholder Lorem Ipsum text for your designs and mockups. Choose the number of paragraphs. Free, no signup required.",
  keywords: ["lorem ipsum generator", "placeholder text", "dummy text generator", "lorem ipsum online", "filler text"],
};

const content = `Lorem Ipsum is the industry-standard placeholder text used by designers, developers, and content creators to fill layouts before final copy is ready. It allows you to visualize how a design will look with real text without being distracted by readable content.

The Lorem Ipsum text has its origins in a work by Cicero from 45 BC called "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil). The standard Lorem Ipsum passage has been used since the 1500s when an unknown printer scrambled sections of the text to create a type specimen book. It survived five centuries of typesetting and made the leap to digital with desktop publishing software like Aldus PageMaker in the 1980s.

Our Lorem Ipsum generator creates randomized paragraphs based on the classic Lorem Ipsum vocabulary. Each generation produces unique text while maintaining the natural look and feel of the original. You can generate between 1 and 20 paragraphs at a time, making it easy to fill anything from a small text block to an entire page layout.

Lorem Ipsum is preferred over random text or repeated phrases because its letter distribution and word lengths closely resemble natural English text. This gives a more realistic impression of how the final design will look with actual content, without the distraction of meaningful text that might draw attention away from the design itself.

Common uses include website mockups, mobile app prototypes, print design layouts, presentation templates, theme and template demos, and any situation where you need realistic-looking text without the content being finalized.`;

const faqs = [
  {
    question: "What is Lorem Ipsum and why is it used?",
    answer: "Lorem Ipsum is placeholder text derived from a 1st-century BC Latin text by Cicero. It's used in design and development to fill layouts with text that looks natural but doesn't distract from the design. Its letter distribution resembles English, giving a realistic preview of how the final design will look with real content.",
  },
  {
    question: "Is Lorem Ipsum real Latin?",
    answer: "Lorem Ipsum is based on real Latin from Cicero's 'de Finibus Bonorum et Malorum,' but it's been altered and scrambled over the centuries. The standard Lorem Ipsum text contains some real Latin words but also includes nonsensical modifications. The famous opening 'Lorem ipsum dolor sit amet' is actually a corrupted version of the original text.",
  },
  {
    question: "Should I use Lorem Ipsum or real content in my designs?",
    answer: "For early-stage mockups and wireframes, Lorem Ipsum is ideal because it lets you focus on layout and visual design. However, as your design matures, switching to real (or realistic) content is recommended because it reveals issues with text length, tone, and formatting that placeholder text can mask.",
  },
  {
    question: "How many words are in a standard Lorem Ipsum paragraph?",
    answer: "Our generator creates paragraphs with 4-7 sentences, each containing 6-15 words. A typical generated paragraph contains approximately 60-100 words, similar to an average paragraph in web content. You can generate multiple paragraphs to fill larger content areas.",
  },
  {
    question: "Can I use Lorem Ipsum for production websites?",
    answer: "Lorem Ipsum should not appear on production websites. Search engines may flag pages with placeholder text as low-quality or incomplete content, which can hurt your SEO rankings. Always replace Lorem Ipsum with real content before publishing. It's strictly a design and development tool.",
  },
];

export default function LoremPage() {
  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and mockups."
      slug="lorem-ipsum"
      content={content}
      faqs={faqs}
    >
      <LoremClient />
    </ToolLayout>
  );
}
