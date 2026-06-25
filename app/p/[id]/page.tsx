import { notFound } from "next/navigation";
import { getPage } from "@/lib/kv";
import LandingPagePreview from "@/components/LandingPagePreview";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const page = await getPage(id);
  if (!page) return {};
  return {
    title: page.productName,
    description: page.content.hero?.subheadline,
  };
}

export default async function SharedPage({ params }: Props) {
  const { id } = await params;
  const page = await getPage(id);
  if (!page) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <LandingPagePreview
          data={page.content}
          price={page.price}
          stripeUrl={page.stripeUrl}
        />
      </div>
    </div>
  );
}
