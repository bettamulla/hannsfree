"use client";
import axios from "axios";
import { useState } from "react";
import GenerateCopyModal from "./GenerateCopyModal";

export default function BrandCard({ brand, refresh }) {
  const [open, setOpen] = useState(false);

  async function evolve() {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/brand/evolve`);
      refresh();
    } catch (err) {
      console.log("Evolution error:", err.message);
    }
  }

  return (
    <div className="card mb-4 flex flex-col gap-3">
      <div>
        <h3 className="text-lg font-bold">{brand.name}</h3>
        <p className="text-sm text-zinc-400">{brand.niche}</p>
      </div>

      <div className="text-sm space-y-1">
        <p>Revenue: £{brand.revenue}</p>
        <p>Growth: {(brand.growthRate * 100).toFixed(1)}%</p>
      </div>

      <div className="flex gap-2 mt-2">
        <button className="button" onClick={() => setOpen(true)}>
          Generate Copy
        </button>

        <button
          className="button bg-zinc-700 text-white hover:bg-zinc-600"
          onClick={evolve}
        >
          Evolve
        </button>
      </div>

      {open && (
        <GenerateCopyModal brand={brand} close={() => setOpen(false)} refresh={refresh} />
      )}
    </div>
  );
}
