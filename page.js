"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateBrand from "./components/CreateBrand";
import BrandCard from "./components/BrandCard";

export default function Page() {
  const [brands, setBrands] = useState([]);

  async function loadBrands() {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/brands`);
      setBrands(res.data);
    } catch (error) {
      console.log("Backend not connected");
    }
  }

  useEffect(() => {
    loadBrands();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">
        HanssFree — Brand Engine
      </h1>

      <CreateBrand refresh={loadBrands} />

      <div className="space-y-4">
        {brands.length === 0 && (
          <p className="text-zinc-500 text-sm">
            No brands created yet. Create one above.
          </p>
        )}

        {brands.map(brand => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
