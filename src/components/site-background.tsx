"use client";

import { motion } from "framer-motion";

/**
 * Persistent ambient background that spans the full site.
 * Fixed to the viewport so orbs drift continuously as you scroll —
 * no visible seam between sections.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Base gradient — uniform navy with subtle radial warmth so no zone looks dead */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 15%, rgba(108,86,164,0.28), transparent 60%), radial-gradient(ellipse at 85% 40%, rgba(118,64,224,0.22), transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(103,193,159,0.18), transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(108,86,164,0.15), transparent 55%), linear-gradient(180deg, #1A1449 0%, #1E1755 50%, #1A1449 100%)",
        }}
      />

      {/* Drifting purple orb — top right */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.25, 0.9, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[-10%] h-[500px] w-[500px] sm:h-[720px] sm:w-[720px] rounded-full bg-purple/25 blur-[130px]"
      />

      {/* Drifting mint orb — middle left */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 70, -60, 0],
          scale: [1.1, 0.9, 1.25, 1.1],
        }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[-15%] h-[480px] w-[480px] sm:h-[680px] sm:w-[680px] rounded-full bg-mint/18 blur-[130px]"
      />

      {/* Purple-light accent — upper center */}
      <motion.div
        animate={{
          x: [0, -40, 60, 0],
          y: [-20, 40, -30, -20],
        }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[40%] h-[360px] w-[360px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-light/14 blur-[120px]"
      />

      {/* Rose accent — lower right */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[8%] right-[10%] h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] rounded-full bg-rose-500/10 blur-[130px]"
      />

      {/* Extra mint fill — center-bottom, ensures no dark zone mid-scroll */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[25%] h-[320px] w-[320px] sm:h-[480px] sm:w-[480px] rounded-full bg-mint/12 blur-[140px]"
      />

      {/* Very subtle noise/grain — keeps gradients from banding */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
