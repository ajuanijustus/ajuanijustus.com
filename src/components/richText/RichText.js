import React from "react";

// lets text in portfolio.js carry links written like [Pint of Science](https://...)
export default function RichText({ text, linkStyle }) {
  if (!text) return null;
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <React.Fragment key={i}>{part}</React.Fragment>;
    return (
      <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        {m[1]}
      </a>
    );
  });
}

// the same text without the link syntax, for places that need plain text
export const plainText = (text) => (text || "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
