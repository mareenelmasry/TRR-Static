"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  const numericPart = parseInt(target.replace(/\D/g, ""), 10);

  useEffect(() => {
    if (!isInView) return;
    const start = 0;
    const end = numericPart;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, numericPart]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { target: "500", suffix: "M+", label: "Views Generated", color: "from-purple to-purple-light", emoji: "👀" },
  { target: "200", suffix: "+", label: "Brands Scaled", color: "from-mint to-mint-light", emoji: "🚀" },
  { target: "10", suffix: "x", label: "Average ROAS", color: "from-orange-400 to-amber-400", emoji: "📈" },
  { target: "24", suffix: "/7", label: "Always On", color: "from-cyan-400 to-blue-400", emoji: "⚡" },
];

export function Stats() {
  return (
    <section id="stats" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, rotateX: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                type: "spring",
                bounce: 0.3,
              }}
              whileHover={{
                scale: 1.08,
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="relative rounded-2xl sm:rounded-3xl glass-strong p-5 sm:p-8 text-center overflow-hidden group cursor-default"
            >
              {/* Hover glow bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 blur-xl`} />

              {/* Emoji bounce */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring", bounce: 0.6 }}
                className="text-2xl sm:text-3xl mb-2 sm:mb-3"
              >
                {stat.emoji}
              </motion.div>

              <div className={`relative text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedNumber target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="relative mt-1 sm:mt-2 text-xs sm:text-sm text-gray-400 tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-sm text-gray-400">
            Ready to see these results for your brand?{" "}
            <a href="#contact-form" className="text-mint hover:text-mint-light transition-colors">
              Let&apos;s talk →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
