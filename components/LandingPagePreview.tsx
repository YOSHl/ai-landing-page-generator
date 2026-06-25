"use client";

import type { LandingPageData } from "@/lib/types";

interface Props {
  data: Partial<LandingPageData>;
  price: string;
  stripeUrl?: string;
}

export default function LandingPagePreview({ data, price, stripeUrl }: Props) {
  const { hero, features, faq, footer_cta } = data;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white px-8 py-14 text-center">
        {hero ? (
          <>
            <h1 className="text-3xl font-bold leading-tight mb-4">{hero.headline}</h1>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">{hero.subheadline}</p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl font-bold">${price}</span>
              {stripeUrl ? (
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  {hero.cta}
                </a>
              ) : (
                <button className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl opacity-80 cursor-default">
                  {hero.cta}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="h-40 flex items-center justify-center text-slate-400 animate-pulse">
            Generating hero section...
          </div>
        )}
      </section>

      {/* Features */}
      {features && features.length > 0 && (
        <section className="px-8 py-12 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">Why it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <p className="font-semibold text-gray-900 mb-2">{f.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="px-8 py-12">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">Questions & Answers</h2>
          <div className="max-w-2xl mx-auto space-y-5">
            {faq.map((item, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl px-5 py-4">
                <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {footer_cta && (
        <section className="bg-slate-900 text-white px-8 py-12 text-center">
          <p className="text-lg font-medium mb-6">{footer_cta}</p>
          {stripeUrl ? (
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              {hero?.cta ?? "Get started"}
            </a>
          ) : (
            <button className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl opacity-80 cursor-default">
              {hero?.cta ?? "Get started"}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
