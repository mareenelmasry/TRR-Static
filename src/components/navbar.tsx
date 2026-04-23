"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Results", href: "#stats" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const radius = isOpen ? "24px" : "9999px";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-2 sm:pt-3">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl"
        style={{ borderRadius: radius }}
      >
        {/* === CLEAR GLASS LAYERS === */}

        {/* Layer 1: Deep blur — makes everything behind warp and refract */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 overflow-hidden"
          style={{
            borderRadius: radius,
            backdropFilter: "blur(20px) saturate(1.4) brightness(1.05)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4) brightness(1.05)",
          }}
        />

        {/* Layer 2: Clear glass tint — nearly invisible, just enough to see the edge */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{
            borderRadius: radius,
            background: "linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.03) 100%)",
          }}
        />

        {/* Layer 3: Top specular reflection — bright caustic line */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-[5%] right-[5%] h-[1px] pointer-events-none"
          style={{
            borderRadius: radius,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.4) 75%, transparent 100%)",
          }}
        />

        {/* Layer 4: Inner top glow — light catching the inside surface */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 right-0 h-[50%] pointer-events-none overflow-hidden"
          style={{
            borderRadius: radius,
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
          }}
        />

        {/* Layer 5: Bottom inner reflection — subtle light bounce */}
        <motion.div
          animate={{ opacity: scrolled ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-[15%] right-[15%] h-[1px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Layer 6: Outer border — hair-thin edge catch */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: radius,
            border: "0.5px solid rgba(255,255,255,0.1)",
          }}
        />

        {/* Layer 7: Depth shadow — lifts off the page */}
        <motion.div
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: radius,
            boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.1), 0 12px 40px rgba(0,0,0,0.08)",
          }}
        />

        {/* === CONTENT === */}
        <div className="relative px-4 sm:px-6">
          <div className="flex h-12 sm:h-14 items-center justify-between">
            <motion.a
              href="#"
              className="flex items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple/40 blur-lg rounded-full scale-150" />
                <Image
                  src="/logo-icon.png"
                  alt="The Reel Recipe"
                  width={40}
                  height={40}
                  className="relative h-8 sm:h-9 w-auto drop-shadow-[0_0_8px_rgba(108,86,164,0.6)]"
                  priority
                />
              </div>
              <Image
                src="/logo-wordmark.png"
                alt="The Reel Recipe"
                width={200}
                height={30}
                className="h-7 sm:h-8 w-auto translate-y-[5px] sm:translate-y-[6px]"
                priority
              />
            </motion.a>

            <div className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative text-sm text-gray-400 hover:text-white transition-all duration-300 px-4 py-1.5 rounded-full hover:bg-white/[0.06]"
                  style={{ border: "0.5px solid transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "0.5px solid rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "0.5px solid transparent";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 rounded-full px-5 py-1.5 text-sm font-medium text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, rgba(108,86,164,0.8), rgba(133,112,184,0.8))",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.2), 0 2px 12px rgba(108,86,164,0.3)",
                }}
              >
                Get Started
              </motion.a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 -mr-2 relative z-10"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — full overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-0 left-0 right-0 bottom-0 md:hidden z-40"
              style={{
                background: "rgba(22, 18, 65, 0.95)",
                backdropFilter: "blur(40px) saturate(1.8)",
                WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              }}
            >
              {/* Close button */}
              <div className="flex justify-end px-5 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white p-2"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 pt-10 px-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="font-[family-name:var(--font-heading)] text-3xl text-white hover:text-mint transition-colors py-3"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact-form"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-6 rounded-full bg-gradient-to-r from-purple to-purple-light px-10 py-4 text-base font-medium text-white text-center shadow-lg shadow-purple/20"
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
