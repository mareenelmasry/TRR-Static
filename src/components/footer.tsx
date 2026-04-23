"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-purple/30 blur-md rounded-full scale-150" />
                <Image
                  src="/logo-icon.png"
                  alt="The Reel Recipe"
                  width={32}
                  height={32}
                  className="relative h-5 sm:h-6 w-auto drop-shadow-[0_0_6px_rgba(118,64,224,0.5)]"
                />
              </div>
              <Image
                src="/logo-wordmark.png"
                alt="The Reel Recipe"
                width={160}
                height={24}
                className="h-5 sm:h-6 w-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Viral content. Real results.
            </p>
            <p className="text-xs text-mint/50 mt-0.5" dir="rtl" style={{ fontFamily: "'VIP Hala', sans-serif" }}>
              محتوى فيروسي. نتائج حقيقية
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-4">
            <div className="flex items-center gap-6 sm:gap-8">
              {[{ label: "Services", href: "#services" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact-form" }].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ color: "#FFFFFF", y: -1 }}
                  className="text-xs sm:text-sm text-gray-500 transition-colors"
                >
                  {label}
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://instagram.com/thereelrecipe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#FFFFFF" }}
                className="text-gray-500 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </motion.a>
              <motion.a
                href="https://tiktok.com/@thereelrecipe"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#FFFFFF" }}
                className="text-gray-500 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52V7.49a4.81 4.81 0 01-1-.8z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] sm:text-xs text-gray-600">
            &copy; {new Date().getFullYear()} The Reel Recipe. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
