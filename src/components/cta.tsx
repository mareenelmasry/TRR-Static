"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail, Users } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple via-purple-dark to-navy-light" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(61,226,170,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(118,64,224,0.3),transparent_50%)]" />

          {/* Animated orbs */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 30, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-mint/30 blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.3, 1, 1.3],
              x: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-purple-light/30 blur-[80px]"
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Animated border shimmer */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[1px] rounded-3xl sm:rounded-[2rem] bg-[conic-gradient(from_0deg,transparent,rgba(61,226,170,0.3),transparent,rgba(118,64,224,0.3),transparent)] opacity-50"
            style={{ zIndex: -1 }}
          />

          <div className="relative px-6 py-14 sm:px-16 sm:py-24 text-center">
            {/* Floating emblem with rocket */}
            <motion.div
              initial={{ scale: 0, y: 40, rotate: -180 }}
              whileInView={{ scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-[3]"
                />
                <Image
                  src="/logo-icon.png"
                  alt=""
                  width={80}
                  height={80}
                  className="relative h-14 sm:h-20 w-auto brightness-[1.5] drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                />
              </motion.div>
            </motion.div>

            {/* Arabic pre-headline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-mint/60 mb-3"
              dir="rtl"
              style={{ fontFamily: "'VIP Hala', sans-serif" }}
            >
              !هل أنت مستعد؟
            </motion.p>

            {/* Headline with dramatic reveal */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0, rotateX: 30 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white"
              >
                Let&apos;s build something
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 80, opacity: 0, rotateX: 30 }}
                whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-heading)] text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(61,226,170,0)",
                      "0 0 30px rgba(61,226,170,0.5)",
                      "0 0 10px rgba(61,226,170,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-mint"
                >
                  unforgettable.
                </motion.span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-4 sm:mt-6 text-white/60 text-base sm:text-lg max-w-lg mx-auto"
            >
              Whether you need viral content, a full rebrand, or a complete
              digital ecosystem — we&apos;re ready when you are.
            </motion.p>

            {/* Buttons with strong entrance */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: "spring", bounce: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full px-8 py-3.5 sm:py-4 text-sm font-semibold text-navy transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95))",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                  border: "0.5px solid rgba(255,255,255,0.5)",
                  boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.8), 0 4px 16px rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.1)",
                }}
              >
                <Mail size={16} />
                Get Your Free Quote
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-8 py-3.5 sm:py-4 text-sm font-medium text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(40px) saturate(2)",
                  WebkitBackdropFilter: "blur(40px) saturate(2)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,0,0,0.15)",
                }}
              >
                <Users size={14} />
                Join Our Team
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
