export interface Hero {
  headline: string;
  subheadline: string;
  cta: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LandingPageData {
  hero: Hero;
  features: Feature[];
  faq: FaqItem[];
  footer_cta: string;
}

export type StreamSection =
  | { section: "hero"; data: Hero }
  | { section: "features"; data: Feature[] }
  | { section: "faq"; data: FaqItem[] }
  | { section: "footer_cta"; data: string };

export interface SavedPage {
  id: string;
  productName: string;
  price: string;
  content: LandingPageData;
  stripeUrl?: string;
  createdAt: number;
}
