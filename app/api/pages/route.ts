import { savePage, getPage, generateId } from "@/lib/kv";
import type { LandingPageData } from "@/lib/types";

export async function POST(req: Request) {
  const { productName, price, content, stripeUrl } = await req.json() as {
    productName: string;
    price: string;
    content: LandingPageData;
    stripeUrl?: string;
  };

  const id = generateId();
  await savePage({ id, productName, price, content, stripeUrl, createdAt: Date.now() });

  return Response.json({ id });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

  const page = await getPage(id);
  if (!page) return Response.json({ error: "Not found" }, { status: 404 });

  return Response.json(page);
}
