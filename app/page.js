"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const paletteStyle = useMemo(() => {
    const accent = data?.palette?.colors?.[3] || "#8AA2FF";
    const accent2 = data?.palette?.colors?.[4] || "#6D28D9";
    return { "--accent": accent, "--accent2": accent2 };
  }, [data]);

  async function onGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setData(null);

    // local generator so it works even with zero backend setup
    const mod = await import("../lib/generateBrand");
    const result = mod.generateBrand(name);
    setData(result);

    setLoading(false);
  }

  return (
    <div style={paletteStyle} className="wrap">
      <div className="bgGlow" />

      <header className="hero">
        <div className="badge">HannsFree • Brand Engine</div>
        <h1>Generate a full brand kit in seconds.</h1>
        <p>Name → vibe → palette → copy. This is an actual generator.</p>
      </header>

      <section className="card">
        <h2>Create Brand</h2>

        <form onSubmit={onGenerate} className="row">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Brand name (e.g. Cupcake, Puffer Gurlz)"
            className="input"
          />
          <button className="btn" disabled={loading}>
            {loading ? "Generating…" : "Generate"}
          </button>
        </form>
      </section>

      {data && (
        <section className="grid">
          <div className="panel">
            <h3>Brand Suggestions</h3>
            <div className="chips">
              {data.suggestions?.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>Tagline</h3>
            <p className="big">{data.tagline}</p>
            <p className="muted">{data.vibe}</p>
          </div>

          <div className="panel">
            <h3>Palette: {data.palette?.name}</h3>
            <div className="swatches">
              {data.palette?.colors?.map((c) => (
                <div key={c} className="swatch">
                  <span style={{ background: c }} />
                  <code>{c}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <h3>What you get</h3>
            <ul className="list">
              {data.deliverables?.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
