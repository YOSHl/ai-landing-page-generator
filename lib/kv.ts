import type { SavedPage } from "./types";

// In-memory fallback for local dev without Vercel KV credentials
const memStore = new Map<string, SavedPage>();

function hasKv(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function savePage(page: SavedPage): Promise<void> {
  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    await kv.set(`page:${page.id}`, page, { ex: 60 * 60 * 24 * 7 }); // 7 days
  } else {
    memStore.set(page.id, page);
  }
}

export async function getPage(id: string): Promise<SavedPage | null> {
  if (hasKv()) {
    const { kv } = await import("@vercel/kv");
    return kv.get<SavedPage>(`page:${id}`);
  }
  return memStore.get(id) ?? null;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
