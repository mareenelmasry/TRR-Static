# The Reel Recipe — Static Site

Bilingual (EN/AR) marketing site for The Reel Recipe. Pure HTML, CSS, and JavaScript — no build step, no dependencies.

---

## File structure

```
├── index.html          # Main site (bilingual EN/AR)
├── styles.css          # All styles + RTL overrides
├── script.js           # Animations, i18n, follower count fetch
├── fonts/              # VIP Hala Arabic display font
├── portfolio/          # Case study images (.avif + .png fallback)
├── logo-icon.*         # Logo assets (.avif + .png fallback)
├── logo-wordmark.*     # Wordmark assets (.avif + .png fallback)
└── workers/
    ├── follower-counts.js   # Cloudflare Worker source
    └── wrangler.toml        # Worker deployment config
```

---

## Live follower counts — Cloudflare Worker setup

The site fetches live Instagram and TikTok follower counts from a Cloudflare Worker that acts as a secure proxy. API credentials are stored as secrets inside Cloudflare and are never exposed in the client-side code.

The worker caches results at the edge for 1 hour. TikTok access tokens expire every 24 hours — the worker refreshes them automatically in the background using Cloudflare KV storage, so no manual intervention is needed after the initial setup.

---

### Phase 1 — Create the TikTok Developer App

1. Go to [developers.tiktok.com](https://developers.tiktok.com) and log in with your TikTok account
2. Click **Manage Apps → Create app** — name it anything (e.g. "TRR Counter"), set type to **Web**
3. Under **Products**, add **Login Kit**
4. In the Login Kit settings, add the following as a redirect URI:
   ```
   https://localhost
   ```
5. Under **Scopes**, request both:
   - `user.info.basic`
   - `user.info.stats`
6. Go to the **Sandbox** tab and add your `@thereelrecipe` TikTok account as a sandbox user — this skips TikTok's app review process entirely
7. Save and copy your **Client Key** and **Client Secret**

---

### Phase 2 — One-time TikTok OAuth flow

This is done once in your browser. The worker handles all future token refreshes automatically.

**Step A** — Build the URL below, replace `YOUR_CLIENT_KEY`, then open it in your browser:

```
https://www.tiktok.com/v2/auth/authorize/?client_key=YOUR_CLIENT_KEY&scope=user.info.basic,user.info.stats&response_type=code&redirect_uri=https://localhost&state=trr
```

Log in as `@thereelrecipe` and approve the permissions.

**Step B** — The browser will redirect to a URL like this (the page won't load — that's expected):

```
https://localhost/?code=XXXXXX&scopes=...&state=trr
```

Copy the `code` value from the URL.

> ⚠️ The code expires in 10 minutes — complete Step C immediately.

**Step C** — Run this in your terminal to exchange the code for tokens. Replace the three placeholders:

```bash
curl -X POST 'https://open.tiktokapis.com/v2/oauth/token/' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_key=YOUR_CLIENT_KEY&client_secret=YOUR_CLIENT_SECRET&code=YOUR_CODE&grant_type=authorization_code&redirect_uri=https://localhost'
```

The response will look like:

```json
{
  "access_token": "...",
  "expires_in": 86400,
  "refresh_token": "...",
  "refresh_expires_in": 31536000,
  "scope": "user.info.basic,user.info.stats",
  "token_type": "Bearer"
}
```

Save the `refresh_token` — you will need it in Phase 5. The `access_token` is not needed; the worker manages it from the refresh token onwards.

---

### Phase 3 — Get your Instagram credentials

**Step A** — Go to [developers.facebook.com](https://developers.facebook.com) and log in

**Step B** — Click **My Apps → Create App**, choose **Business** type, and add the **Instagram Graph API** product

**Step C** — Go to **Tools → Graph API Explorer**, select your app, click **Generate Access Token**, and connect your Instagram Business account

**Step D** — In the query field run the following and hit **Submit**:

```
GET /me?fields=id,followers_count
```

Copy the `id` value — this is your **Instagram User ID**. Also copy the access token at the top of the Explorer — this is a short-lived token.

**Step E** — Exchange the short-lived token for a long-lived one (valid 60 days). Run this in your terminal — `YOUR_APP_SECRET` is found under your Facebook app's **Settings → Basic**:

```bash
curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_TOKEN"
```

Save the `access_token` from the response — this is your long-lived Instagram token.

> ℹ️ Long-lived tokens expire after 60 days. Refresh them before they expire by calling:
> ```
> GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_LONG_LIVED_TOKEN
> ```

---

### Phase 4 — Create the Cloudflare KV namespace

The KV namespace stores the TikTok access token and the rotating refresh token between Worker invocations.

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → KV**
2. Click **Create namespace**, name it `TIKTOK_KV`, and save
3. Copy the **namespace ID**
4. Open `workers/wrangler.toml` in this repo and replace `YOUR_KV_NAMESPACE_ID` with the ID you just copied:
   ```toml
   [[kv_namespaces]]
   binding = "TIKTOK_KV"
   id      = "paste-your-namespace-id-here"
   ```
5. Commit and push the change

---

### Phase 5 — Deploy the Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Worker**
2. Name it `trr-follower-counts`
3. Paste the full contents of `workers/follower-counts.js` into the editor and click **Deploy**

**Add secrets** — go to the Worker → **Settings → Variables** and add each one as a **Secret** (not a plain variable):

| Secret name | Value |
|---|---|
| `INSTAGRAM_TOKEN` | Long-lived Instagram access token from Phase 3 Step E |
| `INSTAGRAM_USER_ID` | Numeric Instagram user ID from Phase 3 Step D |
| `TIKTOK_CLIENT_KEY` | Client Key from Phase 1 |
| `TIKTOK_CLIENT_SECRET` | Client Secret from Phase 1 |
| `TIKTOK_REFRESH_TOKEN` | Refresh token from Phase 2 Step C |

**Bind the KV namespace** — still in Worker → Settings → Variables, scroll to **KV Namespace Bindings → Add**:

| Binding name | Namespace |
|---|---|
| `TIKTOK_KV` | Select the `TIKTOK_KV` namespace created in Phase 4 |

**Test the worker** by opening its URL in your browser:

```
https://trr-follower-counts.YOUR-SUBDOMAIN.workers.dev
```

You should get a JSON response like:

```json
{ "instagram": 228000, "tiktok": 228000 }
```

---

### Phase 6 — Connect the site to the Worker

Open `script.js` and fill in the worker URL on line 5:

```js
const WORKER_URL = 'https://trr-follower-counts.YOUR-SUBDOMAIN.workers.dev';
```

Commit and push. The site will now show live counts on every page load. If the worker is unreachable for any reason, it automatically falls back to the hardcoded `data-count` values in `index.html`.

---

## How the TikTok token refresh works

```
Page load
  └─ fetch(WORKER_URL)
       └─ Worker checks Cloudflare KV for a valid TikTok access token
            ├─ Token still valid  →  use it directly
            └─ Token expired      →  POST to TikTok /oauth/token/ with refresh_token
                                       └─ TikTok returns new access_token + new refresh_token
                                            └─ Worker saves both back to KV (token rotates)
                                                 └─ uses new access_token for this request
```

The refresh token is valid for 365 days. As long as the worker runs at least once a year the tokens stay alive indefinitely with no manual steps.

---

## License

Proprietary to The Reel Recipe. Do not redistribute without permission.
