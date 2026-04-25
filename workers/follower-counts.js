/**
 * Cloudflare Worker — The Reel Recipe follower counts
 *
 * Fetches live Instagram + TikTok follower counts and returns them as JSON.
 * Results are cached at the edge for 1 hour to stay within API rate limits.
 *
 * ── Required secrets (set in Cloudflare dashboard → Worker → Settings → Variables) ──
 *   INSTAGRAM_TOKEN    Long-lived Instagram Graph API access token
 *   INSTAGRAM_USER_ID  Numeric Instagram Business Account ID
 *
 * ── Optional secrets ──
 *   TIKTOK_TOKEN       TikTok API access token (add when ready)
 *
 * ── Optional plain variables ──
 *   INSTAGRAM_FALLBACK  Shown if Instagram API fails  (default: 228000)
 *   TIKTOK_FALLBACK     Shown if TikTok API fails     (default: 228000)
 */

const CACHE_TTL = 3600; // 1 hour

export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Edge cache ──
    const cache = caches.default;
    const cacheKey = new Request(new URL('/follower-counts', request.url).toString());
    const cached = await cache.match(cacheKey);
    if (cached) {
      return new Response(await cached.text(), {
        headers: { ...corsHeaders, 'X-Cache': 'HIT' },
      });
    }

    const fallbackInstagram = parseInt(env.INSTAGRAM_FALLBACK ?? '228000', 10);
    const fallbackTiktok    = parseInt(env.TIKTOK_FALLBACK    ?? '228000', 10);

    let instagram = fallbackInstagram;
    let tiktok    = fallbackTiktok;

    // ── Instagram Graph API ──
    if (env.INSTAGRAM_TOKEN && env.INSTAGRAM_USER_ID) {
      try {
        const res = await fetch(
          `https://graph.instagram.com/${env.INSTAGRAM_USER_ID}` +
          `?fields=followers_count&access_token=${env.INSTAGRAM_TOKEN}`
        );
        if (res.ok) {
          const data = await res.json();
          if (typeof data.followers_count === 'number') {
            instagram = data.followers_count;
          }
        }
      } catch (_) { /* falls back to env fallback value */ }
    }

    // ── TikTok API ──
    if (env.TIKTOK_TOKEN) {
      try {
        const res = await fetch(
          'https://open.tiktokapis.com/v2/user/info/?fields=follower_count',
          { headers: { Authorization: `Bearer ${env.TIKTOK_TOKEN}` } }
        );
        if (res.ok) {
          const data = await res.json();
          const count = data?.data?.user?.follower_count;
          if (typeof count === 'number') tiktok = count;
        }
      } catch (_) { /* falls back to env fallback value */ }
    }

    const body = JSON.stringify({ instagram, tiktok });

    const response = new Response(body, {
      headers: {
        ...corsHeaders,
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'X-Cache': 'MISS',
      },
    });

    // Store in edge cache
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
