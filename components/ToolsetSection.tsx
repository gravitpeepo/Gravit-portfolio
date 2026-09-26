"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = [
  {
    label: "Motion Design",
    tag: "01",
    items: [
      "After Effects (Advanced)",
      "Cinema 4D + AE Renderer",
      "Custom Expressions (JS)",
      "3D Camera Tracking",
    ],
  },
  {
    label: "Video Editing",
    tag: "02",
    items: [
      "Premiere Pro",
      "Cinematic Long-Form",
      "Pacing & Story Arc",
      "Sound Design Integration",
    ],
  },
  {
    label: "Retention Strategy",
    tag: "03",
    items: [
      "Hook Engineering",
      "Dynamic Typography",
      "Pattern Interrupts",
      "CTR Thumbnail Strategy",
    ],
  },
];

export default function ToolsetSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="toolset" className="relative w-full px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="micro-label text-crimson-bright"
        >
          Arsenal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
          className="mt-3 font-display text-5xl text-bone md:text-6xl"
        >
          Toolset &amp; capabilities
        </motion.h2>

        <div className="relative mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 md:gap-0">
          {/* connective line, desktop only */}
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent md:block" />

          {CATEGORIES.map((cat, i) => {
            const isActive = active === i;
            const isDimmed = active !== null && active !== i;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className={`glass relative z-10 cursor-default rounded-2xl p-7 outline-none transition-all duration-500 md:mx-2.5 md:p-9 ${
                  isActive
                    ? "border-crimson-bright/50 shadow-[0_0_50px_-12px_rgba(210,59,46,0.45)] md:-translate-y-2"
                    : "border-bone/10"
                } ${isDimmed ? "opacity-50" : "opacity-100"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="micro-label text-bone/40">{cat.tag}</span>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                      isActive ? "bg-crimson-bright" : "bg-bone/20"
                    }`}
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl text-bone md:text-[1.7rem]">
                  {cat.label}
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5 border-t border-bone/10 pt-6">
                  {cat.items.map((item, idx) => (
                    <motion.li
                      key={item}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        x: isActive ? 4 : 0,
                      }}
                      transition={{ duration: 0.35, delay: isActive ? idx * 0.05 : 0 }}
                      className="flex items-baseline gap-3 text-sm text-smoke md:text-[0.95rem]"
                    >
                      <span
                        className={`h-px w-3 shrink-0 transition-all duration-500 ${
                          isActive ? "w-5 bg-crimson-bright" : "bg-bone/25"
                        }`}
                      />
                      <span className={isActive ? "text-bone" : ""}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
