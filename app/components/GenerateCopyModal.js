"use client";

import { useState } from "react";

export default function GenerateCopyModal({ brand }) {
  const [copy, setCopy] = useState("");

  return (
    <div className="border p-4 rounded mt-4">
      <h2 className="font-semibold mb-2">Generate Copy</h2>
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Generated content will appear here"
        value={copy}
        onChange={(e) => setCopy(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => setCopy("Generated text for " + brand.name)}
      >
        Generate
      </button>
    </div>
  );
}
