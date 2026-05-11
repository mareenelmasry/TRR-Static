#!/usr/bin/env python3
"""Read TikTok follower count written by fetch_tiktok.js and update index.html."""

import re
import sys
import os

COUNT_FILE = "scripts/.tiktok_count"
HTML_FILE = "index.html"


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
    if not os.path.exists(COUNT_FILE):
        print(f"{COUNT_FILE} not found — did fetch_tiktok.js run successfully?")
        sys.exit(1)

    with open(COUNT_FILE) as f:
        count = int(f.read().strip())

    formatted = format_count(count)
    print(f"Count: {count} → {formatted}")

    changed = update_html(count, formatted)
    if changed:
        print(f"index.html updated: TikTok followers → {formatted}")
