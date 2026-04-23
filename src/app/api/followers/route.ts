import { NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Follower-count endpoint                                            */
/*                                                                     */
/*  Resolution order per platform:                                     */
/*    1. Official API (env vars set) — authoritative, live, reliable  */
/*    2. Public-page scrape — best-effort, may fail                   */
/*    3. Hardcoded fallback — keeps the UI from going empty           */
/*                                                                     */
/*  Required env vars to enable the APIs (all in .env.local):         */
/*                                                                     */
/*  Instagram Graph API:                                               */
/*    IG_USER_ID        — the numeric Instagram Business/Creator ID    */
/*    IG_ACCESS_TOKEN   — long-lived Graph API token                   */
/*                                                                     */
/*  TikTok Business API (Display API v2):                              */
/*    TIKTOK_ACCESS_TOKEN — OAuth access token for the account owner   */
/*                                                                     */
/*  Setup guide: see /docs/follower-api-setup.md (or ask Claude).     */
/* ------------------------------------------------------------------ */

const FALLBACK = {
  instagram: 228_000,
  tiktok: 228_000,
};

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function parseShortNumber(raw: string): number {
  const s = raw.replace(/,/g, "").trim();
  if (/[Kk]$/.test(s)) return Math.round(parseFloat(s) * 1_000);
  if (/[Mm]$/.test(s)) return Math.round(parseFloat(s) * 1_000_000);
  return parseInt(s, 10);
}

/* ---------- Instagram ---------- */

async function getInstagramViaGraphAPI(): Promise<number | null> {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!userId || !token) return null;
  try {
    const url = `https://graph.facebook.com/v21.0/${userId}?fields=followers_count&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { followers_count?: number };
    return typeof json.followers_count === "number" ? json.followers_count : null;
  } catch {
    return null;
  }
}

async function getInstagramViaScrape(): Promise<number | null> {
  try {
    const res = await fetch("https://www.instagram.com/thereelrecipe/", {
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
      next: { revalidate: 3600 },
    });
    const html = await res.text();

    const patterns = [
      /"edge_followed_by"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
      /"follower_count"\s*:\s*(\d+)/,
      /"userInteractionCount"\s*:\s*"?(\d+)"?/,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return parseInt(m[1], 10);
    }

    const metaMatch = html.match(/(\d[\d,.]*[KkMm]?)\s*Followers/i);
    if (metaMatch) return parseShortNumber(metaMatch[1]);

    return null;
  } catch {
    return null;
  }
}

async function getInstagramFollowers(): Promise<{
  value: number;
  source: "graph-api" | "scrape" | "fallback";
}> {
  const viaApi = await getInstagramViaGraphAPI();
  if (viaApi !== null) return { value: viaApi, source: "graph-api" };
  const viaScrape = await getInstagramViaScrape();
  if (viaScrape !== null) return { value: viaScrape, source: "scrape" };
  return { value: FALLBACK.instagram, source: "fallback" };
}

/* ---------- TikTok ---------- */

async function getTikTokViaDisplayAPI(): Promise<number | null> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) return null;
  try {
    const url =
      "https://open.tiktokapis.com/v2/user/info/?fields=follower_count";
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: { user?: { follower_count?: number } };
    };
    const count = json.data?.user?.follower_count;
    return typeof count === "number" ? count : null;
  } catch {
    return null;
  }
}

async function getTikTokViaScrape(): Promise<number | null> {
  try {
    const res = await fetch("https://www.tiktok.com/@thereelrecipe", {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 3600 },
    });
    const html = await res.text();

    const patterns = [
      /"followerCount"\s*:\s*(\d+)/,
      /"stats"\s*:\s*\{[^}]*?"followerCount"\s*:\s*(\d+)/,
      /"userInteractionCount"\s*:\s*"?(\d+)"?/,
      /"fans"\s*:\s*(\d+)/,
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) return parseInt(m[1], 10);
    }

    const metaMatch = html.match(/>(\d[\d,.]*[KkMm]?)<[^>]*>\s*Followers/i);
    if (metaMatch) return parseShortNumber(metaMatch[1]);
    const plainMatch = html.match(/(\d[\d,.]*[KkMm]?)\s*Followers/i);
    if (plainMatch) return parseShortNumber(plainMatch[1]);

    return null;
  } catch {
    return null;
  }
}

async function getTikTokFollowers(): Promise<{
  value: number;
  source: "display-api" | "scrape" | "fallback";
}> {
  const viaApi = await getTikTokViaDisplayAPI();
  if (viaApi !== null) return { value: viaApi, source: "display-api" };
  const viaScrape = await getTikTokViaScrape();
  if (viaScrape !== null) return { value: viaScrape, source: "scrape" };
  return { value: FALLBACK.tiktok, source: "fallback" };
}

/* ---------- Handler ---------- */

export async function GET() {
  const [ig, tt] = await Promise.all([
    getInstagramFollowers(),
    getTikTokFollowers(),
  ]);

  return NextResponse.json(
    {
      instagram: ig.value,
      tiktok: tt.value,
      total: ig.value + tt.value,
      sources: { instagram: ig.source, tiktok: tt.source },
      lastUpdated: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
