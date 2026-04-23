"use client";

import { motion } from "framer-motion";
import { Rocket, Briefcase, Video, ArrowRight } from "lucide-react";

const links = [
  {
    label: "Become Our Client",
    url: "https://airtable.com/app9vu99FNclhXxIV/pagEYrGXpEo0ZyMzz/form",
    icon: Rocket,
    bgFrom: "rgba(108,86,164,0.85)",
    bgTo: "rgba(133,112,184,0.85)",
    shadow: "rgba(108,86,164,0.35)",
    shadowLight: "rgba(108,86,164,0.2)",
  },
  {
    label: "Apply to Jobs",
    url: "https://airtable.com/appU9qIR5pV4srObg/pagEGxabyiTNG3NSt/form",
    icon: Briefcase,
    bgFrom: "rgba(108,86,164,0.85)",
    bgTo: "rgba(133,112,184,0.85)",
    shadow: "rgba(108,86,164,0.35)",
    shadowLight: "rgba(108,86,164,0.2)",
  },
  {
    label: "Become a UGC Creator",
    url: "https://airtable.com/appsmm2D6eL0BBwiS/pagh6fdLG8U0M9e8Z/form",
    icon: Video,
    bgFrom: "rgba(108,86,164,0.85)",
    bgTo: "rgba(133,112,184,0.85)",
    shadow: "rgba(108,86,164,0.35)",
    shadowLight: "rgba(108,86,164,0.2)",
  },
];

export function ContactForm() {
  return (
    <section id="contact-form" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Get Started
          </h2>
          <p className="mt-3 text-gray-400 text-base">
            Choose how you want to work with us.
          </p>
          <p
            className="mt-1 text-sm text-mint/50"
            dir="rtl"
            style={{ fontFamily: "'VIP Hala', sans-serif" }}
          >
            ابدأ معنا
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full px-8 py-3.5 sm:py-4 text-sm font-medium text-white transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${link.bgFrom}, ${link.bgTo})`,
                border: "0.5px solid rgba(255,255,255,0.2)",
                boxShadow: `inset 0 0.5px 0 rgba(255,255,255,0.25), 0 4px 16px ${link.shadow}, 0 12px 40px ${link.shadowLight}`,
              }}
            >
              <link.icon size={16} />
              {link.label}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
