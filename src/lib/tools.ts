export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: string;
}

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, validate, and beautify JSON data with syntax highlighting.",
    category: "Formatters",
  },
  {
    name: "Base64 Encode/Decode",
    slug: "base64",
    description: "Encode text to Base64 or decode Base64 strings instantly.",
    category: "Encoders",
  },
  {
    name: "URL Encode/Decode",
    slug: "url-encoder",
    description: "Encode or decode URLs and query string parameters.",
    category: "Encoders",
  },
  {
    name: "UUID Generator",
    slug: "uuid-generator",
    description: "Generate random v4 UUIDs for your projects.",
    category: "Generators",
  },
  {
    name: "Hash Generator",
    slug: "hash-generator",
    description: "Generate MD5, SHA-1, and SHA-256 hashes from any text.",
    category: "Generators",
  },
  {
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum",
    description:
      "Generate placeholder text for your designs and mockups.",
    category: "Generators",
  },
  {
    name: "Color Converter",
    slug: "color-converter",
    description: "Convert colors between HEX, RGB, and HSL formats.",
    category: "Converters",
  },
];

export const siteConfig = {
  name: "DevToolKit",
  description:
    "Free online developer tools — JSON formatter, Base64 encoder, UUID generator, hash generator, and more.",
  url: "https://devtoolkit.dev",
};
