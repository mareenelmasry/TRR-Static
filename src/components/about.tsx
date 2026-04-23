"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Decorative blurs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple/8 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-1/4 left-0 w-[200px] h-[200px] bg-mint/8 blur-[100px] rounded-full"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="h-1.5 bg-gradient-to-r from-mint via-purple to-transparent mb-6 rounded-full"
              />
              <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="block"
                >
                  Built for brands that
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="block text-white"
                >
                  refuse to blend in.
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block text-lg sm:text-xl lg:text-2xl text-mint/60 mt-2"
                  dir="rtl"
                  style={{ fontFamily: "'VIP Hala', sans-serif" }}
                >
                  لا نقبل بالعادي
                </motion.span>
              </h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-400 text-base sm:text-lg max-w-md leading-relaxed"
            >
              We combine creative instinct with data-driven strategy to build
              content ecosystems that don&apos;t just perform — they dominate.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
