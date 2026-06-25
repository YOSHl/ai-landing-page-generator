"use client";

import { useState } from "react";
import type { LandingPageData, StreamSection } from "@/lib/types";

interface Props {
  onData: (data: Partial<LandingPageData>) => void;
  onComplete: (data: LandingPageData, name: string, price: string) => void;
}

export default function ProductForm({ onData, onComplete }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    onData({});

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price }),
    });

    if (!res.ok || !res.body) {
      setError("Generation failed. Check your API key and try again.");
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const accumulated: Partial<LandingPageData> = {};

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const parsed: StreamSection = JSON.parse(trimmed);
          if (parsed.section === "hero") accumulated.hero = parsed.data;
          if (parsed.section === "features") accumulated.features = parsed.data;
          if (parsed.section === "faq") accumulated.faq = parsed.data;
          if (parsed.section === "footer_cta") accumulated.footer_cta = parsed.data;
          onData({ ...accumulated });
        } catch {
          // partial line — keep buffering
        }
      }
    }

    setLoading(false);
    if (
      accumulated.hero &&
      accumulated.features &&
      accumulated.faq &&
      accumulated.footer_cta
    ) {
      onComplete(accumulated as LandingPageData, name, price);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Productivity Masterclass"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does it do? Who is it for? What problem does it solve?"
          required
          rows={4}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (USD)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="49"
          min="1"
          step="0.01"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 hover:bg-slate-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {loading ? "Generating..." : "Generate landing page"}
      </button>
    </form>
  );
}
