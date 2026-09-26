"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  href,
  onClick,
  children,
  variant = "solid",
  className = "",
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "magnetic-btn relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 micro-label transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-crimson-bright text-bone hover:bg-crimson-bright/90"
      : "border border-bone/25 text-bone hover:border-bone/60";

  const content = (
    <motion.span
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`${base} ${styles} ${className}`}
      data-cursor="hover"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className="inline-block"
      type="button"
    >
      {content}
    </button>
  );
}
