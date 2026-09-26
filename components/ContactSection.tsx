"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const ease = [0.16, 1, 0.3, 1] as const;
const EMAIL = "itzanimefam@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=Video%20Editing%20Inquiry%20-%20GRAVIT`;

const POINTS = ["Free sample edit", "24–48 hr turnaround", "Since 2017"];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <section id="contact" className="relative w-full px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="micro-label text-crimson-bright"
        >
          Commission
        </motion.p>

        <div className="mask-reveal mt-4">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-[10vw] leading-[0.98] text-bone sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            Let&apos;s build something
            <br />
            memorable
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-8 max-w-2xl text-base leading-relaxed text-smoke md:text-lg"
        >
          Ready to take your content to an elite standard? I offer a free
          20-second sample edit using your raw footage — zero risk, full
          proof of concept.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3"
        >
          {POINTS.map((p) => (
            <span key={p} className="micro-label flex items-center gap-2 text-bone/60">
              <span className="h-1 w-1 rounded-full bg-crimson-bright" />
              {p}
            </span>
          ))}
        </motion.div>

        {/* Large interactive email */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-14 md:mt-16"
        >
          <button
            type="button"
            onClick={handleCopy}
            data-cursor="hover"
            className="group block w-full text-left"
          >
            <span className="font-display block break-words text-[9vw] leading-[1.02] text-bone underline decoration-crimson-bright/40 decoration-[1.5px] underline-offset-[10px] transition-colors duration-300 group-hover:text-crimson-bright sm:text-5xl md:text-6xl">
              {EMAIL}
            </span>
          </button>
          <span
            className={`micro-label mt-3 block transition-opacity duration-300 ${
              copied ? "opacity-100 text-crimson-bright" : "opacity-0"
            }`}
          >
            Copied to clipboard
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
        >
          <MagneticButton href={MAILTO}>Get a Free Sample Edit</MagneticButton>
          <MagneticButton
            href="https://x.com/Grav1tEdit"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            DM on X — @Grav1tEdit
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center gap-3"
        >
          <span className="micro-label text-bone/40">Discord</span>
          <span className="text-sm text-bone/70">@imgravit</span>
        </motion.div>
      </div>
    </section>
  );
}
