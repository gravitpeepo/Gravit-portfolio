"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import FloatingLogos from "./FloatingLogos";

const CAPABILITIES = [
  "After Effects",
  "Motion Design",
  "3D Camera Tracking",
  "Dynamic Typography",
  "Visual Storytelling",
  "Retention Strategy",
  "Cinematic Long-Form",
  "Sound Design",
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-32 md:pt-36"
    >
      <FloatingLogos />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="micro-label text-crimson-bright"
        >
          After Effects Editor / Visual Storyteller
        </motion.p>

        <div className="mask-reveal mt-5">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="font-display text-[16vw] leading-[0.92] text-bone sm:text-[13vw] md:text-[9.5vw] lg:text-[8vw]"
          >
            Gravit
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="mt-8 max-w-2xl md:mt-10"
        >
          <p className="font-display text-2xl italic text-bone/95 md:text-3xl">
            9 years of After Effects mastery.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke md:text-lg">
            Turning raw footage into cinematic retention engines that keep
            audiences locked in.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
        >
          <MagneticButton href="#work">View Work</MagneticButton>
          <MagneticButton href="#contact" variant="outline">
            Get a Free Sample Edit
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="micro-label mt-8 text-bone/35 md:mt-10"
        >
          Editing since 2017 · After Effects specialist
        </motion.p>
      </div>

      <div className="relative z-10 w-full overflow-hidden border-t border-bone/10 py-5">
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...CAPABILITIES, ...CAPABILITIES].map((cap, i) => (
            <span key={i} className="micro-label flex items-center gap-10 text-bone/35">
              {cap}
              <span className="h-1 w-1 rounded-full bg-crimson-bright/60" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
