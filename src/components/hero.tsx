"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Rocket, Sparkles } from "lucide-react";
import { FollowerCount } from "@/components/follower-count";
import { MorphingEmblem } from "@/components/morphing-emblem";

const wordVariants = {
  hidden: { y: 100, opacity: 0, rotateX: 40 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.4 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const headlineWords = ["We", "make", "brands"];

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 pb-6 sm:pt-14 sm:pb-0"
    >
      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full border border-purple/[0.06]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[1000px] sm:h-[1000px] rounded-full border border-mint/[0.04]"
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/40" />
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple/40" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
            height: i % 3 === 0 ? 5 : i % 3 === 1 ? 3 : 2,
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 11) % 90}%`,
            background: i % 3 === 0 ? "#3DE2AA" : i % 3 === 1 ? "#7640E0" : "#F472B6",
          }}
          animate={{
            y: [0, -(30 + i * 8), 0],
            x: [0, (i % 2 === 0 ? 15 : -15), 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-8 sm:px-10 lg:px-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: 0.2 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(61,226,170,0)", "0 0 20px rgba(61,226,170,0.3)", "0 0 0px rgba(61,226,170,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-mint mb-4 sm:mb-5"
            style={{
              background: "rgba(61,226,170,0.08)",
              backdropFilter: "blur(40px) saturate(2)",
              WebkitBackdropFilter: "blur(40px) saturate(2)",
              border: "0.5px solid rgba(61,226,170,0.2)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.08)",
            }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} />
            </motion.span>
            Leading the viral content market
          </motion.div>
        </motion.div>

        {/* Morphing emblem — shrinks into navbar on scroll */}
        <MorphingEmblem />

        {/* Word-by-word headline reveal */}
        <div className="overflow-hidden perspective-[1000px]">
          <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 lg:gap-x-7">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="font-[family-name:var(--font-heading)] text-[2.25rem] sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden perspective-[1000px] mt-1 sm:mt-2">
          <motion.div
            initial={{ y: 120, opacity: 0, rotateX: 50, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="font-[family-name:var(--font-heading)] text-[2.25rem] sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white inline-block"
            >
              go viral.
            </span>
          </motion.div>
        </div>

        {/* Subtitle with staggered words */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-3 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed px-2"
        >
          Full-service content agency specializing in viral strategies,
          performance marketing, and end-to-end digital solutions that
          drive real results.
        </motion.p>

        {/* Arabic tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-2 text-sm sm:text-base text-mint/70"
          dir="rtl"
          style={{ fontFamily: "'VIP Hala', sans-serif" }}
        >
          نصنع محتوى يصنع الفرق
        </motion.p>

        {/* Live follower count */}
        <FollowerCount />

        {/* CTAs with dramatic entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
          className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
        >
          <motion.a
            href="https://airtable.com/app9vu99FNclhXxIV/pagEYrGXpEo0ZyMzz/form"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="group flex items-center justify-center gap-2 rounded-full px-7 py-3 sm:py-3.5 text-sm font-medium text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(118,64,224,0.85), rgba(148,102,240,0.85))",
              backdropFilter: "blur(20px) saturate(1.8)",
              WebkitBackdropFilter: "blur(20px) saturate(1.8)",
              border: "0.5px solid rgba(255,255,255,0.2)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(118,64,224,0.35), 0 12px 40px rgba(118,64,224,0.2)",
            }}
          >
            <Rocket size={14} />
            Become Our Client
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
          <motion.a
            href="https://airtable.com/appU9qIR5pV4srObg/pagEGxabyiTNG3NSt/form"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center gap-2 rounded-full px-7 py-3 sm:py-3.5 text-sm font-medium text-white transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(40px) saturate(2)",
              WebkitBackdropFilter: "blur(40px) saturate(2)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.12), 0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <Briefcase size={14} />
            Apply to Jobs
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
