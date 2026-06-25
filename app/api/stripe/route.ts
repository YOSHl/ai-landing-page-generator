import Stripe from "stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { name, price } = await req.json();

  const priceInCents = Math.round(parseFloat(price) * 100);
  if (isNaN(priceInCents) || priceInCents <= 0) {
    return Response.json({ error: "Invalid price" }, { status: 400 });
  }

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
  });

  return Response.json({ url: paymentLink.url });
}
