import type { Metadata } from "next";
import UrlEncoderClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "URL Encode & Decode — Free Online Tool",
  description:
    "Encode or decode URLs and query string parameters online for free. Handles special characters and Unicode. No signup required.",
  keywords: ["url encode", "url decode", "url encoder", "percent encoding", "urlencode online", "encode url"],
};

const content = `URL encoding (also known as percent encoding) is the process of converting special characters in a URL into a format that can be safely transmitted over the internet. Since URLs can only contain a limited set of ASCII characters, any characters outside this set — like spaces, ampersands, question marks, and Unicode characters — must be encoded.

Our free URL encoder and decoder converts characters to their percent-encoded equivalents (e.g., a space becomes %20, an ampersand becomes %26) and back. This is essential when constructing query strings, building API requests, or debugging URLs that contain special characters.

URL encoding is defined by RFC 3986 and is fundamental to how the web works. Every time you click a link that contains a search query or fill out a web form, your browser automatically URL-encodes the data before sending it to the server. Understanding URL encoding is crucial for web developers working with APIs, redirects, and dynamic URLs.

Common characters that need encoding include spaces (%20 or +), ampersands (%26), question marks (%3F), hash/pound signs (%23), equals signs (%3D), and forward slashes (%2F). Unicode characters like accented letters and emojis are first converted to UTF-8 bytes, then each byte is percent-encoded.

This tool processes everything in your browser — no data is sent to any server. It's safe to use with URLs containing sensitive parameters like API keys, session tokens, or personal information.`;

const faqs = [
  {
    question: "What is URL encoding and when do I need it?",
    answer: "URL encoding converts special characters into a percent-encoded format (e.g., space → %20) that's safe for use in URLs. You need it when building query strings with special characters, constructing API requests, handling user input in URLs, or working with redirect URLs that contain parameters.",
  },
  {
    question: "What's the difference between encodeURI and encodeURIComponent?",
    answer: "encodeURI encodes a full URI but preserves characters that have special meaning in URLs (like ?, &, =, #, /). encodeURIComponent encodes everything except letters, digits, and a few special characters (- _ . ! ~ * ' ( )). Use encodeURIComponent for query parameter values and encodeURI for complete URLs.",
  },
  {
    question: "Why are spaces encoded as %20 sometimes and + other times?",
    answer: "Both represent a space, but in different contexts. %20 is the standard URL encoding defined by RFC 3986. The + sign for spaces comes from the application/x-www-form-urlencoded format used in HTML forms. Our tool uses %20 as it's the universal standard that works everywhere.",
  },
  {
    question: "Can I encode Unicode characters in URLs?",
    answer: "Yes. Unicode characters (like é, ñ, 中文, or emojis) are first converted to their UTF-8 byte representation, then each byte is percent-encoded. For example, the character é becomes %C3%A9. Our tool handles this automatically.",
  },
  {
    question: "Is this tool safe for encoding sensitive URL parameters?",
    answer: "Yes. All encoding and decoding happens entirely in your browser using JavaScript. No data is transmitted to any server, stored, or logged. You can safely encode URLs containing API keys, tokens, or personal information.",
  },
];

export default function UrlEncoderPage() {
  return (
    <ToolLayout
      title="URL Encode / Decode"
      description="Encode or decode URLs and query string parameters."
      slug="url-encoder"
      content={content}
      faqs={faqs}
    >
      <UrlEncoderClient />
    </ToolLayout>
  );
}
