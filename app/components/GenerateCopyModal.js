"use client";
import { useState } from "react";
import axios from "axios";

export default function GenerateCopyModal({ brand, close, refresh }) {
  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!instruction) return alert("Enter a prompt");

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/ai/generate-copy`,
        { brandId: brand.id, instruction }
      );

      setResult(res.data.copy || "No output returned.");
      refresh();
    } catch (err) {
      console.log(err.message);
      setResult("Generation failed.");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
      <div className="card w-full max-w-md space-y-4">
        <h3 className="font-semibold text-lg">
          Generate Copy for {brand.name}
        </h3>

        <textarea
          className="input h-28"
          placeholder="Example: Write a slogan for launch."
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />

        <button className="button w-full" onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate Copy"}
        </button>

        {result && (
          <div className="text-sm text-zinc-200 whitespace-pre-wrap bg-zinc-800 p-3 rounded border border-zinc-700">
            {result}
          </div>
        )}

        <button
          className="button bg-zinc-700 text-white w-full mt-3"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
}
