"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TRACK_HEIGHT = 160;

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const dotY = useTransform(smoothProgress, [0, 1], [0, TRACK_HEIGHT]);

  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) =>
      setPercent(Math.round(v * 100))
    );
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3">
      <div
        className="relative w-px bg-bone/10 overflow-visible rounded-full"
        style={{ height: TRACK_HEIGHT }}
      >
        <motion.div
          style={{ scaleY: smoothProgress, transformOrigin: "top" }}
          className="absolute inset-0 bg-gradient-to-b from-crimson-bright to-crimson-bright/10"
        />
        <motion.span
          style={{ top: dotY }}
          className="absolute -left-[3.5px] h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-crimson-bright shadow-[0_0_12px_3px_rgba(210,59,46,0.7)]"
        />
      </div>
      <span className="micro-label text-bone/50 tabular-nums">
        {String(percent).padStart(2, "0")}%
      </span>
    </div>
  );
}
