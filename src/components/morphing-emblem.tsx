"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MorphingEmblem() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.3 }}
      className="flex justify-center mb-4 sm:mb-6"
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [2.5, 3, 2.5],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-purple/40 blur-3xl rounded-full"
        />
        <motion.div
          animate={{
            scale: [2, 2.5, 2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute inset-0 bg-mint/20 blur-2xl rounded-full translate-y-2"
        />
        <Image
          src="/logo-icon.png"
          alt="The Reel Recipe"
          width={160}
          height={160}
          className="relative h-[80px] sm:h-[112px] lg:h-[128px] w-auto drop-shadow-[0_0_30px_rgba(108,86,164,0.7)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
}

export function NavbarEmblem() {
  return null;
}
