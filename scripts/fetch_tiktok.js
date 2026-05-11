/**
 * Fetch TikTok follower count for @thereelrecipe using a real browser
 * and write the result to scripts/.tiktok_count so the Python script can read it.
 */
const { chromium } = require('playwright');
const fs = require('fs');

const USERNAME = 'thereelrecipe';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'en-US',
  });
  const page = await context.newPage();

  try {
    await page.goto(`https://www.tiktok.com/@${USERNAME}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for follower count element (TikTok's data-e2e attribute)
    await page.waitForSelector('[data-e2e="followers-count"]', { timeout: 15000 });

    const raw = await page.$eval('[data-e2e="followers-count"]', el => el.textContent.trim());

    // TikTok displays counts like "523.4K" or "1.2M" — parse to integer
    let count;
    const m = raw.match(/^([\d.]+)([KMB]?)$/i);
    if (m) {
      const num = parseFloat(m[1]);
      const suffix = m[2].toUpperCase();
      count = Math.round(
        suffix === 'B' ? num * 1e9 :
        suffix === 'M' ? num * 1e6 :
        suffix === 'K' ? num * 1e3 : num
      );
    }

    if (count) {
      console.log(`Fetched: ${raw} → ${count}`);
      fs.writeFileSync('scripts/.tiktok_count', String(count));
    } else {
      console.error(`Could not parse follower text: "${raw}"`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
