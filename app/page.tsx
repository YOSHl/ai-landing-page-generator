"use client";

import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import LandingPagePreview from "@/components/LandingPagePreview";
import PaymentLinkCard from "@/components/PaymentLinkCard";
import type { LandingPageData } from "@/lib/types";

export default function HomePage() {
  const [preview, setPreview] = useState<Partial<LandingPageData>>({});
  const [complete, setComplete] = useState<LandingPageData | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stripeUrl, setStripeUrl] = useState<string | undefined>();

  function handleComplete(data: LandingPageData, name: string, p: string) {
    setComplete(data);
    setProductName(name);
    setPrice(p);
  }

  const showPreview = Object.keys(preview).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <h1 className="font-bold text-gray-900">Landing Page Generator</h1>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
            Powered by Claude
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className={`grid gap-8 ${showPreview ? "lg:grid-cols-[380px_1fr]" : "max-w-lg mx-auto"}`}>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-5">Product details</h2>
              <ProductForm
                onData={(data) => {
                  setPreview(data);
                  setComplete(null);
                }}
                onComplete={handleComplete}
              />
            </div>

            {complete && (
              <PaymentLinkCard
                productName={productName}
                price={price}
                content={complete}
                onStripeUrl={setStripeUrl}
                onShareId={() => {}}
              />
            )}
          </div>

          {showPreview && (
            <div>
              <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">
                Live preview
              </p>
              <LandingPagePreview data={preview} price={price} stripeUrl={stripeUrl} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
