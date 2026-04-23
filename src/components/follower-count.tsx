"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toLocaleString();
}

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (target <= 0 || startedRef.current) return;
    startedRef.current = true;
    const duration = 3500;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  return <span>{formatNumber(count)}</span>;
}

export function FollowerCount() {
  const [data, setData] = useState<{
    instagram: number | null;
    tiktok: number | null;
    total: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/followers")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || data.total === 0) return null;

  const tiktokPath =
    "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52V7.49a4.81 4.81 0 01-1-.8z";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.7 }}
      className="mt-5 flex flex-col items-center gap-3 sm:gap-4"
    >
      {/* Row 1: Instagram + TikTok */}
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        {data.instagram && (
          <a
            href="https://instagram.com/thereelrecipe"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none" />
              </svg>
              <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-white font-bold">
                <AnimatedNumber target={data.instagram} />
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors">
              Instagram
            </span>
          </a>
        )}

        {/* Divider */}
        <div className="w-px h-10 bg-white/15" />

        {data.tiktok && (
          <a
            href="https://tiktok.com/@thereelrecipe"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="transition-transform group-hover:scale-110">
                <path d={tiktokPath} />
              </svg>
              <span className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-white font-bold">
                <AnimatedNumber target={data.tiktok} />
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors">
              TikTok
            </span>
          </a>
        )}
      </div>

      {/* Row 2: Total — centered below */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-mint font-bold">
          <AnimatedNumber target={data.total} />
        </span>
        <span className="text-[10px] sm:text-xs text-mint/70 uppercase tracking-wider">
          Total Followers
        </span>
      </div>
    </motion.div>
  );
}
