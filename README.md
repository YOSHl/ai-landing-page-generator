# ai-landing-page-generator

Enter a product name, description, and price. The app generates sales copy (hero text, features list, FAQ) via the Anthropic API, shows a live preview, creates a Stripe Payment Link, and saves the page to a shareable URL.

**Demo**: coming soon

## Stack

- Next.js 14, TypeScript, App Router
- Anthropic SDK (`claude-sonnet-4-6`)
- Stripe API (Payment Links)
- Tailwind CSS
- Vercel KV (page storage)
- Vercel (hosting)

## Features

- Streaming output — text appears as it generates, no waiting
- Live preview of the generated page while it streams
- Stripe Payment Link created automatically after generation
- QR code for the payment link
- Each generated page gets a unique URL you can share

## Setup

```bash
git clone https://github.com/YOSHl/ai-landing-page-generator.git
cd ai-landing-page-generator
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

```bash
npm run dev
```

## Project structure

```
app/
  page.tsx                    # product input form
  api/
    generate/                 # streaming route (Anthropic)
    stripe/                   # Payment Link creation
  p/[id]/page.tsx             # shared page view
components/
  ProductForm.tsx
  LandingPagePreview.tsx
  PaymentLinkCard.tsx
lib/
  anthropic.ts
  stripe.ts
.env.example
```

---

## 日本語

商品名・説明・価格を入力すると、セールスコピーをAnthropicのAPIで生成し、ライブプレビューを表示しながらStripeの決済リンクも自動で作成するWebアプリです。

### 機能

- ストリーミング出力（生成しながらリアルタイムで表示）
- 生成中のページをライブプレビュー
- 生成完了後にStripe Payment Linkを自動作成
- 決済リンクのQRコード表示
- 生成したページをURLで共有可能

### セットアップ

```bash
git clone https://github.com/YOSHl/ai-landing-page-generator.git
cd ai-landing-page-generator
npm install
cp .env.example .env.local
# .env.local にAPIキーを記入
npm run dev
```

`.env.example` に必要なキーの一覧と説明があります。
