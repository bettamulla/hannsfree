"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [brands, setBrands] = useState([]);

  function generateBrand() {
    if (!input) return;

    setBrands([
      `${input} Labs`,
      `${input} Studio`,
      `${input} Co`,
      `${input} Systems`,
      `${input} Group`
    ]);
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px"
    }}>
      <h1>HannsFree</h1>
      <p>Instant brand ideas.</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a word"
        style={{
          padding: "12px",
          width: "260px",
          borderRadius: "6px",
          border: "none"
        }}
      />

      <button
        onClick={generateBrand}
        style={{
          padding: "12px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Generate
      </button>

      <div>
        {brands.map((b, i) => (
          <div key={i}>{b}</div>
        ))}
      </div>
    </main>
  );
}
