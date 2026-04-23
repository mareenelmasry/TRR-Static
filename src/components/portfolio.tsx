"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Users, TrendingUp, Sparkles } from "lucide-react";

const caseStudies = [
  {
    image: "/portfolio/results-1.png",
    client: "PARIS",
    category: "Clothing Brand",
    before: "1 post, 113 followers",
    after: "28 posts, 62.8K followers",
  },
  {
    image: "/portfolio/results-2.png",
    client: "DTX",
    category: "Digital Printing",
    before: "97 posts, 2,250 followers",
    after: "123 posts, 44.3K followers",
  },
  {
    image: "/portfolio/results-3.png",
    client: "TAPIOCA",
    category: "Bubble Tea",
    before: "0 posts, 9,564 followers",
    after: "29 posts, 23.9K followers",
  },
];

const contentTypes = [
  {
    title: "Storytelling",
    titleAr: "قصص",
    description: "One of the secret ingredients that made The Reel Recipe possible. Deep emotional connection through authentic narratives.",
    icon: Sparkles,
    accent: "from-purple to-purple-light",
    accentText: "text-purple-light",
  },
  {
    title: "Skits",
    titleAr: "سكتشات",
    description: "A bit of acting to convey a hidden message with the fun factor we've mastered. Entertainment meets strategy.",
    icon: Play,
    accent: "from-mint to-mint-light",
    accentText: "text-mint",
  },
  {
    title: "Voxpop",
    titleAr: "مقابلات",
    description: "Street interviews reinvented. We changed the style and made it more youthful, raw, and shareable.",
    icon: Users,
    accent: "from-rose-500 to-orange-400",
    accentText: "text-rose-400",
  },
  {
    title: "UGC",
    titleAr: "محتوى المستخدم",
    description: "User generated content at its best — in the most authentic form. Real people, real results.",
    icon: TrendingUp,
    accent: "from-cyan-400 to-blue-400",
    accentText: "text-cyan-400",
  },
];

const results = [
  { value: "80+", label: "Clients Served", sublabel: "in just 15 months" },
  { value: "50M+", label: "Total Reach", sublabel: "across platforms" },
  { value: "3x", label: "Avg. Engagement", sublabel: "vs industry standard" },
  { value: "15+", label: "Industries", sublabel: "covered" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background accents */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple/8 blur-[140px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-mint/6 blur-[120px] rounded-full"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-xs sm:text-sm text-mint mb-4 sm:mb-6"
          >
            Our Work
          </motion.div>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white">
            Content that
            <br />
            breaks the algorithm.
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            From storytelling that moves people to skits that go viral — we&apos;ve
            cracked the code on what makes content spread.
          </p>
          <p
            className="mt-2 text-sm text-mint/60"
            dir="rtl"
            style={{ fontFamily: "'VIP Hala', sans-serif" }}
          >
            محتوى يكسر الخوارزميات
          </p>
        </motion.div>

        {/* Results bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-24"
        >
          {results.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="glass-strong rounded-2xl p-5 sm:p-6 text-center cursor-default"
            >
              <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Before & After — client results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Real Results
          </h3>
          <p className="text-center text-gray-400 text-sm mb-10 sm:mb-14">
            Before & after — what happens when brands work with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-20 sm:mb-28">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group glass-strong rounded-2xl sm:rounded-3xl overflow-hidden cursor-default"
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={study.image}
                  alt={`${study.client} before and after results`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Info */}
              <div className="p-4 sm:p-5">
                <h4 className="font-[family-name:var(--font-heading)] text-lg text-white font-bold">
                  {study.client}
                </h4>
                <p className="text-xs text-gray-500 mb-3">{study.category}</p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex-1 rounded-lg bg-white/5 p-2.5 text-center">
                    <span className="text-gray-500 block mb-0.5">Before</span>
                    <span className="text-gray-300 font-medium">{study.before}</span>
                  </div>
                  <span className="text-mint font-bold">→</span>
                  <div className="flex-1 rounded-lg bg-mint/5 p-2.5 text-center border border-mint/10">
                    <span className="text-mint/70 block mb-0.5">After</span>
                    <span className="text-mint font-medium">{study.after}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content types — what we create */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-white text-center mb-10 sm:mb-14">
            What We Create
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contentTypes.map((type, i) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, type: "spring" }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-8 cursor-default overflow-hidden shimmer-overlay"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${type.accent} mb-5 shadow-lg`}
              >
                <type.icon size={22} className="text-white" />
              </motion.div>

              <h4 className={`font-[family-name:var(--font-heading)] text-xl sm:text-2xl font-bold text-white mb-1`}>
                {type.title}
              </h4>
              <span
                className={`text-sm ${type.accentText} opacity-60 block mb-3`}
                dir="rtl"
                style={{ fontFamily: "'VIP Hala', sans-serif" }}
              >
                {type.titleAr}
              </span>
              <p className="text-sm text-gray-400 leading-relaxed">
                {type.description}
              </p>

              {/* Bottom accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${type.accent} origin-left`}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA to become a client */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <motion.a
            href="https://airtable.com/app9vu99FNclhXxIV/pagEYrGXpEo0ZyMzz/form"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(108,86,164,0.85), rgba(133,112,184,0.85))",
              border: "0.5px solid rgba(255,255,255,0.2)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(108,86,164,0.35), 0 12px 40px rgba(108,86,164,0.2)",
            }}
          >
            Get a Free Quote →
          </motion.a>
          <p className="mt-3 text-xs text-gray-500">One click away</p>
        </motion.div>
      </div>
    </section>
  );
}
