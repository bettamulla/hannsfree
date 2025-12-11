"use client";

import { useState } from "react";

export default function CreateBrand({ onCreate }) {
  const [name, setName] = useState("");

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Create Brand</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Brand Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={() => onCreate(name)}
      >
        Create
      </button>
    </div>
  );
}

