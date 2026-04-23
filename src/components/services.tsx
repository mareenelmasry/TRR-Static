"use client";

import { useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type IconProps = { size?: number };
type ServiceIcon = ComponentType<IconProps>;

/* ------------------------------------------------------------------ */
/*  PREVIEW: three distinct icon styles — one per service card.        */
/*  Pick your favorite and I'll apply it to all three.                 */
/* ------------------------------------------------------------------ */

// STYLE A — DUOTONE (filled shape + solid accent). Modern, dimensional.
function DuotoneVideoIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="22" height="16" rx="3.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="2" y="8" width="22" height="16" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M24 12.5L31 8.5v15l-7-4v-7z" fill="currentColor" />
      <circle cx="7" cy="13" r="1.1" fill="currentColor" />
    </svg>
  );
}

// STYLE B — HAND-DRAWN / SKETCHY (uneven strokes, organic curves). Human, not AI.
function SketchUsersIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Main head — slightly asymmetric curve */}
      <path d="M12.5 5.3c-3.1.2-4.5 2.6-4.1 5.1.4 2.4 1.9 3.6 4.4 3.6 2.4 0 4.3-1.1 4.3-3.7 0-2.8-1.6-5.2-4.6-5z" />
      {/* Main body — wobbly base */}
      <path d="M3.2 25.5c.3-4.6 3.2-8 9-8.2 5.7-.2 8.6 3 9.1 8" />
      {/* Secondary head — smaller, offset */}
      <path d="M22.8 8.5c-2 .3-2.8 1.9-2.5 3.4.3 1.5 1.4 2.3 2.9 2.3 1.5 0 2.8-.8 2.7-2.5-.1-1.9-1-3.4-3.1-3.2z" />
      {/* Secondary body */}
      <path d="M20 22.3c.4-3.2 1.9-5.5 4.6-5.6 2.7-.1 4.2 1.9 4.6 5.3" />
    </svg>
  );
}

// STYLE C — GEOMETRIC / BAUHAUS (bold shapes, no strokes). Editorial, confident.
function GeometricTargetIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor">
      <circle cx="16" cy="16" r="13.5" opacity="0.22" />
      <circle cx="16" cy="16" r="9" opacity="0.45" />
      <circle cx="16" cy="16" r="4.5" />
      {/* Arrow hitting the target — diagonal */}
      <path d="M27 5l-3.2 3.2-1.5-1.5L27 5z" />
      <path d="M16 16l8.2-8.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
  fullDescription: string;
  includes: string[];
  category: string;
  accent: string;
  accentBg: string;
  gradient: string;
  videos?: string[];
}

const services: Service[] = [
  {
    icon: DuotoneVideoIcon,
    title: "Content Creation",
    description: "Scroll-stopping content that builds community and drives organic reach.",
    fullDescription: "Our content creation stands out by creating a deep emotional connection with audiences, driving higher engagement and reach. We focus on authentic storytelling and understanding social media trends, resulting in content that resonates and is widely shared.",
    includes: ["Content strategy & planning", "Trend-driven reels & TikToks", "Community-building posts", "Platform-optimized formats", "Monthly content calendars"],
    category: "Content",
    accent: "text-mint",
    accentBg: "bg-mint/10",
    gradient: "from-mint/20 to-transparent",
    videos: [
      "https://www.instagram.com/reel/thereelrecipe",
    ],
  },
  {
    icon: SketchUsersIcon,
    title: "UGC",
    description: "Authentic user-generated content from real creators that drives trust and conversion.",
    fullDescription: "User-generated content at its most authentic. We partner with real creators and everyday users to produce raw, relatable content that builds trust and drives conversions — the kind of content that stops the scroll because it doesn't look like an ad.",
    includes: ["Creator network & matching", "Content brief development", "Raw, authentic production", "Multi-platform optimization", "Performance tracking"],
    category: "Content",
    accent: "text-cyan-400",
    accentBg: "bg-cyan-400/10",
    gradient: "from-cyan-400/20 to-transparent",
  },
  {
    icon: GeometricTargetIcon,
    title: "Media Buying",
    description: "Strategic ad placement across platforms for maximum impact.",
    fullDescription: "We handle end-to-end media buying across Meta, TikTok, Google, and more. Our team optimizes ad spend to maximize reach and conversions, using real-time data to adjust campaigns for the best possible ROAS.",
    includes: ["Multi-platform ad management", "Audience targeting & segmentation", "Budget optimization", "Real-time performance tracking", "Weekly reporting"],
    category: "Marketing",
    accent: "text-rose-400",
    accentBg: "bg-rose-400/10",
    gradient: "from-rose-400/20 to-transparent",
  },
];

function ServiceModal({
  service,
  onClose,
}: {
  service: Service;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(22, 18, 65, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, type: "spring", bounce: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-strong p-6 sm:p-10"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white transition-colors p-1 z-10"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl ${service.accentBg} ${service.accent}`}
          >
            <service.icon size={26} />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 block">
              {service.category}
            </span>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-white font-bold">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-[2px] rounded-full bg-gradient-to-r ${service.gradient} mb-6`} />

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
          {service.fullDescription}
        </p>

        {/* What's included */}
        <div className="mb-8">
          <h4 className="font-[family-name:var(--font-heading)] text-lg text-white font-bold mb-4">
            What&apos;s Included
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.includes.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={16}
                  className={`flex-shrink-0 mt-0.5 ${service.accent}`}
                />
                <span className="text-sm text-gray-400">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample videos section */}
        {service.videos && service.videos.length > 0 && (
          <div className="mb-6">
            <h4 className="font-[family-name:var(--font-heading)] text-lg text-white font-bold mb-4">
              See It In Action
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {service.videos.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass rounded-xl p-4 hover:border-white/15 transition-all group"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${service.accentBg} ${service.accent} group-hover:scale-110 transition-transform`}
                  >
                    <service.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white font-medium">
                      Watch Example
                    </span>
                    <span className="text-xs text-gray-500 block">
                      View on Instagram
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.a
          href="#contact-form"
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-medium text-white transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(108,86,164,0.85), rgba(133,112,184,0.85))",
            border: "0.5px solid rgba(255,255,255,0.2)",
            boxShadow:
              "inset 0 0.5px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(108,86,164,0.35)",
          }}
        >
          Get a Free Quote
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      <section id="services" className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center mb-12 sm:mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-xs sm:text-sm text-purple-light mb-4 sm:mb-6"
            >
              What We Do
            </motion.div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white">
              Everything you need
              <br />
              under one roof.
            </h2>
          </motion.div>

          {/* Featured services */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 80, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3 },
                }}
                onClick={() => setSelectedService(service)}
                className="group relative rounded-2xl sm:rounded-3xl glass-strong shimmer-overlay p-5 sm:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.03] to-transparent rounded-bl-full" />

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${service.accentBg} ${service.accent} transition-colors duration-300 mb-4 sm:mb-6`}
                >
                  <service.icon size={24} />
                </motion.div>
                <span className="relative text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-gray-600 mb-1 block">
                  {service.category}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] relative text-lg sm:text-xl text-white font-bold mb-2">
                  {service.title}
                </h3>
                <p className="relative text-sm text-gray-400 leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className={`relative text-xs font-medium ${service.accent} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Learn more <ArrowRight size={12} />
                </span>

                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${service.gradient}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
