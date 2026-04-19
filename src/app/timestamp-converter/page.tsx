import type { Metadata } from "next";
import TimestampClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Free Online Tool",
  description:
    "Convert between Unix timestamps and human-readable dates. Live clock, seconds and milliseconds support. Free and instant.",
  keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "date to timestamp", "unix time", "epoch time"],
};

const content = `Unix timestamps (also called Epoch time or POSIX time) represent time as the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. This simple numeric format is the standard way computers store and communicate time, used in databases, APIs, log files, and programming languages worldwide.

Our Timestamp Converter provides two-way conversion: enter a Unix timestamp to see the human-readable date, or select a date to get its Unix timestamp. The tool supports both seconds (standard Unix time) and milliseconds (used by JavaScript, Java, and many APIs). A live clock shows the current Unix timestamp updating in real time.

Unix timestamps are used because they're timezone-independent (always based on UTC), easy to compare and sort numerically, compact to store, and unambiguous — unlike date strings that can be interpreted differently depending on locale and format. Every major programming language has functions to convert between timestamps and date objects.

Common timestamp values developers encounter: 0 is January 1, 1970 (the Unix Epoch), 1000000000 is September 9, 2001, and 2000000000 will be May 18, 2033. JavaScript uses millisecond timestamps (multiply by 1000), while most backend languages and databases use second timestamps.

The converter shows dates in three formats: ISO 8601 (2024-01-15T10:30:00.000Z), UTC (Mon, 15 Jan 2024 10:30:00 GMT), and your local timezone. All conversion happens in your browser — no data is sent to any server.`;

const faqs = [
  {
    question: "What is a Unix timestamp?",
    answer: "A Unix timestamp is a number representing the count of seconds since January 1, 1970 00:00:00 UTC (called the Unix Epoch). For example, the timestamp 1700000000 represents November 14, 2023. It's the standard way computers internally represent time, used by virtually every programming language, database, and operating system.",
  },
  {
    question: "What's the difference between seconds and milliseconds timestamps?",
    answer: "A seconds timestamp is the standard Unix format (e.g., 1700000000 — 10 digits). A milliseconds timestamp is the same but multiplied by 1000 (e.g., 1700000000000 — 13 digits). JavaScript's Date.now() returns milliseconds, while most backend languages (Python, PHP, Ruby) and databases use seconds. If your timestamp has 13 digits, it's probably milliseconds.",
  },
  {
    question: "Why do programmers use Unix timestamps instead of dates?",
    answer: "Unix timestamps are timezone-independent (always UTC), making them unambiguous. They're simple numbers, easy to compare, sort, and store. They avoid the complexities of date formatting, daylight saving time, and locale differences. Converting to a human-readable date in any timezone is a simple operation in any language.",
  },
  {
    question: "What is the Year 2038 problem?",
    answer: "32-bit systems store Unix timestamps as signed 32-bit integers, which can hold a maximum value of 2,147,483,647 — corresponding to January 19, 2038 03:14:07 UTC. After this, the integer overflows. Most modern systems use 64-bit timestamps, which won't overflow for billions of years. But legacy systems may need updates before 2038.",
  },
  {
    question: "How do I get the current Unix timestamp in my code?",
    answer: "JavaScript: Math.floor(Date.now() / 1000). Python: import time; time.time(). PHP: time(). Ruby: Time.now.to_i. Java: System.currentTimeMillis() / 1000. Go: time.Now().Unix(). All return the current time as a Unix timestamp in seconds (except JavaScript's Date.now() which returns milliseconds).",
  },
];

export default function TimestampPage() {
  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates."
      slug="timestamp-converter"
      content={content}
      faqs={faqs}
    >
      <TimestampClient />
    </ToolLayout>
  );
}
