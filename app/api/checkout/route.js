import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      price_data: {
        currency: "gbp",
        unit_amount: 999,
        product_data: { name: "HannsFree – 24h Brand Kit Access" }
      },
      quantity: 1
    }],
    success_url: `${process.env.DOMAIN}?unlocked=true`,
    cancel_url: process.env.DOMAIN
  });

  return Response.json({ url: session.url });
}
