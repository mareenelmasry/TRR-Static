const CACHE_KEY = 'tiktok_followers';
const CACHE_TTL = 86400; // 24 hours — max ~30 RapidAPI calls/month

export async function onRequest({ env }) {
  // 1. Return cached value immediately if fresh
  const cached = await env.TRR_CACHE.get(CACHE_KEY, { type: 'json' });
  if (cached) {
    return Response.json(cached, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }

  // 2. Cache miss — call RapidAPI
  let count;
  try {
    const res = await fetch(
      'https://tiktok-scraper7.p.rapidapi.com/user/info?unique_id=thereelrecipe',
      {
        headers: {
          'x-rapidapi-key': env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
        },
      }
    );
    const data = await res.json();
    count = data?.data?.stats?.followerCount;
  } catch (e) {
    return Response.json({ error: 'fetch failed' }, { status: 502 });
  }

  if (!count) {
    return Response.json({ error: 'no count in response' }, { status: 502 });
  }

  // 3. Store in KV with 24-hour TTL
  const payload = { count };
  await env.TRR_CACHE.put(CACHE_KEY, JSON.stringify(payload), {
    expirationTtl: CACHE_TTL,
  });

  return Response.json(payload, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
