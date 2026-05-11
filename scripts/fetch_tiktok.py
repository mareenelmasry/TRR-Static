#!/usr/bin/env python3
"""Fetch TikTok follower count for @thereelrecipe and update index.html."""

import re
import subprocess
import sys

USERNAME = "thereelrecipe"
HTML_FILE = "index.html"


def fetch_follower_count():
    result = subprocess.run(
        [
            "curl", "-s", "-L", "--max-time", "20",
            "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "-H", "Accept-Language: en-US,en;q=0.9",
            "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "-H", "Referer: https://www.tiktok.com/",
            f"https://www.tiktok.com/@{USERNAME}",
        ],
        capture_output=True,
        text=True,
    )
    html = result.stdout

    match = re.search(r'"followerCount"\s*:\s*(\d+)', html)
    if match:
        return int(match.group(1))

    match = re.search(r'"fans"\s*:\s*(\d+)', html)
    if match:
        return int(match.group(1))

    return None


def format_count(n):
    if n >= 1_000_000:
        v = n / 1_000_000
        return f"{v:.1f}M" if n % 1_000_000 else f"{int(v)}M"
    if n >= 1_000:
        v = n / 1_000
        return f"{v:.1f}K" if n % 1_000 else f"{int(v)}K"
    return str(n)


def update_html(count, formatted):
    with open(HTML_FILE, "r", encoding="utf-8") as f:
        html = f.read()

    new_html = re.sub(
        r'(href="https://tiktok\.com/@thereelrecipe".*?<strong class="follower-num" data-count=")(\d+)(">)([^<]*)(</strong>)',
        rf'\g<1>{count}\g<3>{formatted}\g<5>',
        html,
        flags=re.DOTALL,
    )

    if new_html == html:
        print("Count unchanged — skipping write.")
        return False

    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(new_html)
    return True


if __name__ == "__main__":
    count = fetch_follower_count()
    if count is None:
        print("Could not fetch follower count — exiting without changes.")
        sys.exit(0)

    formatted = format_count(count)
    print(f"Fetched: {count} → {formatted}")

    changed = update_html(count, formatted)
    if changed:
        print(f"index.html updated: TikTok followers → {formatted}")
