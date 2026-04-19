import type { Metadata } from "next";
import JwtClient from "./client";
import ToolLayout from "@/components/ToolLayout";

export const metadata: Metadata = {
  title: "JWT Decoder — Free Online JSON Web Token Decoder",
  description:
    "Decode and inspect JSON Web Tokens (JWT) instantly. View header, payload, expiry, and claims. Free, no signup required.",
  keywords: ["jwt decoder", "jwt decode", "json web token decoder", "jwt parser", "decode jwt online", "jwt debugger"],
};

const content = `JSON Web Tokens (JWTs) are a compact, URL-safe way to represent claims between two parties. They're the standard for authentication and authorization in modern web applications, APIs, and microservices. A JWT consists of three parts separated by dots: a header, a payload, and a signature.

Our JWT Decoder instantly parses any JWT and displays its header (containing the algorithm and token type), payload (containing the claims like user ID, email, roles, and expiration time), and signature. It also automatically detects whether the token has expired, giving you a quick visual indicator.

The header typically contains the signing algorithm (like HS256, RS256, or ES256) and the token type. The payload contains the claims — registered claims like iss (issuer), sub (subject), exp (expiration time), and iat (issued at), plus any custom claims your application includes.

JWTs are used in OAuth 2.0 and OpenID Connect flows, single sign-on (SSO) systems, API authentication (Bearer tokens), stateless session management, and secure information exchange between services. Understanding what's inside a JWT is essential for debugging authentication issues.

Important: This tool only decodes JWTs — it does not verify signatures. Decoding is safe because JWT payloads are only Base64Url-encoded, not encrypted. Never put sensitive information like passwords in JWT payloads. All decoding happens in your browser; your tokens are never sent to any server.`;

const faqs = [
  {
    question: "What is a JWT (JSON Web Token)?",
    answer: "A JWT is a compact token format (RFC 7519) used to securely transmit information between parties as a JSON object. It has three parts: a header (algorithm info), a payload (claims/data), and a signature (for verification). JWTs are commonly used for authentication — after logging in, the server issues a JWT that the client sends with subsequent requests.",
  },
  {
    question: "Is it safe to decode a JWT in the browser?",
    answer: "Yes. JWT payloads are Base64Url-encoded, not encrypted — anyone with the token can read its contents. Decoding doesn't require any secret key. The security of JWTs comes from the signature, which prevents tampering, not from hiding the payload. Our tool decodes entirely in your browser with no server communication.",
  },
  {
    question: "What does it mean when a JWT is expired?",
    answer: "JWTs typically include an 'exp' (expiration) claim containing a Unix timestamp. When the current time is past this timestamp, the token is expired and should no longer be accepted by servers. Our decoder automatically checks this and shows whether your token is still valid or has expired.",
  },
  {
    question: "Can I verify a JWT signature with this tool?",
    answer: "No, this tool only decodes JWTs to show their contents. Signature verification requires the secret key (for HMAC algorithms) or the public key (for RSA/ECDSA algorithms). For security testing, use your application's backend or a dedicated JWT library to verify signatures.",
  },
  {
    question: "What are common JWT claims (iss, sub, exp, iat)?",
    answer: "iss (issuer): who created the token. sub (subject): who the token is about (usually user ID). exp (expiration): when the token expires (Unix timestamp). iat (issued at): when the token was created. nbf (not before): earliest time the token is valid. aud (audience): intended recipient. jti (JWT ID): unique token identifier.",
  },
];

export default function JwtPage() {
  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode JSON Web Tokens to inspect header, payload, and expiry."
      slug="jwt-decoder"
      content={content}
      faqs={faqs}
    >
      <JwtClient />
    </ToolLayout>
  );
}
