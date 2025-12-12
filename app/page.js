"use client";

import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);

  const createBrand = () => {
    if (!brand) return;
    setBrands([...brands, brand]);
    setBrand("");
  };

  return (
    <div className="space-y-12">
      {/* HERO */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          HannsFree
        </h1>
        <p className="text-gray-400 text-lg">
          Simple, fast brand ideation & automation.
        </p>
      </section>

      {/* CREATE CARD */}
      <section className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Create Brand</h2>

        <div className="flex gap-3">
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand name"
            className="flex-1 bg-black border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10"
          />
          <button
            onClick={createBrand}
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Create
          </button>
        </div>
      </section>

      {/* RESULTS */}
      {brands.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm uppercase tracking-wider text-gray-500">
            Generated Brands
          </h3>

          <div className="grid gap-3">
            {brands.map((b, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4"
              >
                <p className="font-medium">{b}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
