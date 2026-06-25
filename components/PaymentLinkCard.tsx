"use client";

import { useState } from "react";
import type { LandingPageData } from "@/lib/types";

interface Props {
  productName: string;
  price: string;
  content: LandingPageData;
  onStripeUrl: (url: string) => void;
  onShareId: (id: string) => void;
}

export default function PaymentLinkCard({
  productName,
  price,
  content,
  onStripeUrl,
  onShareId,
}: Props) {
  const [stripeUrl, setStripeUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    setLoading(true);
    setError("");

    let url: string | undefined;

    // Create Stripe Payment Link
    const stripeRes = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: productName, price }),
    });

    if (stripeRes.ok) {
      const data = await stripeRes.json();
      url = data.url;
      setStripeUrl(url ?? null);
      if (url) onStripeUrl(url);
    }

    // Save page and get share URL
    const saveRes = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productName, price, content, stripeUrl: url }),
    });

    if (saveRes.ok) {
      const { id } = await saveRes.json();
      setShareId(id);
      onShareId(id);
    } else {
      setError("Could not save the page.");
    }

    setLoading(false);
  }

  async function copyShareUrl() {
    if (!shareId) return;
    const url = `${window.location.origin}/p/${shareId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <h2 className="font-semibold text-gray-900">Next steps</h2>

      {!shareId ? (
        <>
          <p className="text-sm text-gray-500">
            Create a Stripe payment link and a shareable URL for this landing page.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? "Creating..." : "Create payment link + share URL"}
          </button>
        </>
      ) : (
        <div className="space-y-3">
          {stripeUrl && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Stripe payment link</p>
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm underline break-all"
              >
                {stripeUrl}
              </a>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Shareable page URL</p>
            <div className="flex gap-2 items-center">
              <code className="text-sm bg-gray-100 px-3 py-2 rounded-lg flex-1 break-all">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/p/${shareId}`
                  : `/p/${shareId}`}
              </code>
              <button
                onClick={copyShareUrl}
                className="shrink-0 text-xs bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
