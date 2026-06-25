export function buildPrompt(name: string, description: string, price: string): string {
  return `You are a conversion-focused copywriter. Generate a landing page for the following product.

Product name: ${name}
Description: ${description}
Price: ${price}

Output NDJSON — one JSON object per line, in this exact order. No other text.

Line 1: {"section":"hero","data":{"headline":"...","subheadline":"...","cta":"..."}}
Line 2: {"section":"features","data":[{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."}]}
Line 3: {"section":"faq","data":[{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."}]}
Line 4: {"section":"footer_cta","data":"..."}

Rules:
- headline: short and punchy, max 8 words, benefit-focused
- subheadline: 1-2 sentences that expand the headline
- cta: action verb + clear benefit (e.g. "Get Instant Access", "Start Free Today")
- features: 5 items, each description 1-2 sentences, focus on outcomes not specs
- faq: 4 items that answer real purchase objections
- footer_cta: one punchy sentence to close the sale
- No markdown, no HTML — plain text values only
- Output ONLY the 4 NDJSON lines, nothing else`;
}
