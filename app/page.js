"use client";

import { useState, useEffect } from "react";
import { generateBrand } from "@/lib/generateBrand";

export default function Page() {
  const [name,setName]=useState("");
  const [brand,setBrand]=useState(null);
  const [unlocked,setUnlocked]=useState(false);

  useEffect(()=>{
    if(new URLSearchParams(window.location.search).get("unlocked")){
      localStorage.setItem("hf_unlock",Date.now()+86400000);
      setUnlocked(true);
    }
    const u=localStorage.getItem("hf_unlock");
    if(u && Date.now()<u) setUnlocked(true);
  },[]);

  const checkout=async()=>{
    const r=await fetch("/api/checkout",{method:"POST"});
    const d=await r.json();
    window.location=d.url;
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mb-3">HannsFree</h1>
      <p className="text-center text-zinc-400 mb-10">
        Generate a complete brand in seconds.
      </p>

      <div className="card mb-8">
        <input className="input mb-4" placeholder="Brand name"
          value={name} onChange={e=>setName(e.target.value)} />
        <button className="btn btn-primary w-full"
          onClick={()=>setBrand(generateBrand(name))}>
          Generate preview
        </button>
      </div>

      {brand && (
        <div className="card">
          <h2 className="text-xl font-semibold">{brand.name}</h2>
          <p className="text-zinc-400 mb-4">{brand.tagline}</p>

          {!unlocked ? (
            <>
              <div className="blur-sm text-zinc-500 mb-4">
                Full brand kit locked
              </div>
              <button className="btn btn-primary w-full"
                onClick={checkout}>
                Unlock full kit — £9.99
              </button>
            </>
          ) : (
            <pre className="text-sm text-zinc-300 whitespace-pre-wrap">
              {JSON.stringify(brand,null,2)}
            </pre>
          )}
        </div>
      )}
    </>
  );
}
