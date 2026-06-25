# ai-landing-page-generator

Enter a product name, description, and price. Claude generates a complete sales page in real time — hero, features, FAQ — while you watch the sections appear. Once done, a Stripe Payment Link is created and the page gets a shareable URL.

**Demo**: coming soon

## How it works

1. Fill in the form — product name, a short description, and price
2. Claude streams the copy section by section; the preview updates live
3. Click "Create payment link" — Stripe creates a hosted checkout page
4. Copy the shareable URL and send it to customers

## Stack

- Next.js (App Router, TypeScript)
- Anthropic SDK — `claude-sonnet-4-6` with streaming
- Stripe API — Payment Links
- Vercel KV — page storage (falls back to in-memory for local dev)
- Tailwind CSS
- Vercel

## Setup

```bash
git clone https://github.com/moriyama-dev/ai-landing-page-generator.git
cd ai-landing-page-generator
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |
| `STRIPE_SECRET_KEY` | No | Stripe secret key — Payment Links are skipped if missing |
| `KV_REST_API_URL` | No | Vercel KV URL — falls back to in-memory storage |
| `KV_REST_API_TOKEN` | No | Vercel KV token |

```bash
npm run dev
```

## Project structure

```
app/
  page.tsx                # main page (form + live preview)
  api/
    generate/route.ts     # streams Anthropic response as NDJSON
    stripe/route.ts       # creates Stripe Payment Link
    pages/route.ts        # saves / retrieves pages from KV
  p/[id]/page.tsx         # shareable page view
components/
  ProductForm.tsx          # input form with streaming state
  LandingPagePreview.tsx   # renders sections as they arrive
  PaymentLinkCard.tsx      # Stripe + share URL actions
lib/
  types.ts                # shared TypeScript types
  prompt.ts               # Anthropic prompt builder
  kv.ts                   # KV storage with in-memory fallback
```

---

## 日本語

商品名・説明・価格を入力すると、Claudeがセールスコピーをリアルタイムでストリーミング生成します。ヒーロー・機能・FAQの各セクションが順番に表示され、生成完了後はStripeの決済リンクと共有URLを発行します。

### セットアップ

```bash
npm install
cp .env.example .env.local
# .env.local に ANTHROPIC_API_KEY を記入（最低限これだけで動く）
npm run dev
```
