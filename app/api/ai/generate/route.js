import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { seed, style, count } = await req.json();

    if (!seed || seed.length < 2) {
      return NextResponse.json({ error: "Invalid seed" }, { status: 400 });
    }

    const prompt = `
You are a world-class brand strategist.

Generate ${count} premium brand names.

Seed: "${seed}"
Style: "${style}"

Rules:
- Names must feel real, established, credible
- Avoid gimmicks, avoid obvious AI names
- No emojis, no explanations
- Just a clean list, one per line
- Short, strong, brandable

Output only the names.
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85
      })
    });

    const data = await res.json();

    const text = data.choices?.[0]?.message?.content || "";
    const names = text
      .split("\n")
      .map(n => n.replace(/^[0-9\.\-\s]+/, "").trim())
      .filter(Boolean);

    return NextResponse.json({ names });
  } catch (e) {
    return NextResponse.json({ error: "AI failed" }, { status: 500 });
  }
}
