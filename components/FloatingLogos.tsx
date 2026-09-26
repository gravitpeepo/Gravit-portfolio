"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type LogoSpec = {
  src: string;
  alt: string;
  className: string;
  size: number;
  floatDuration: number;
  floatDelay: number;
  depth: number;
};

const LOGOS: LogoSpec[] = [
  {
    src: "/logos/after-effects-logo.svg",
    alt: "Adobe After Effects",
    className: "left-[7%] top-[18%] md:left-[11%] md:top-[16%]",
    size: 18,
    floatDuration: 9,
    floatDelay: 0,
    depth: 0.03,
  },
  {
    src: "/logos/premiere-pro-logo.svg",
    alt: "Adobe Premiere Pro",
    className: "right-[5%] top-[63%] md:right-[9%] md:top-[61%]",
    size: 15,
    floatDuration: 11,
    floatDelay: 1.2,
    depth: 0.05,
  },
  {
    src: "/logos/after-effects-logo.svg",
    alt: "Adobe After Effects",
    className: "right-[11%] top-[11%] md:right-[17%] md:top-[9%]",
    size: 11,
    floatDuration: 7.5,
    floatDelay: 0.6,
    depth: 0.02,
  },
  {
    src: "/logos/premiere-pro-logo.svg",
    alt: "Adobe Premiere Pro",
    className: "left-[3%] top-[69%] md:left-[5%] md:top-[71%]",
    size: 10,
    floatDuration: 10,
    floatDelay: 2,
    depth: 0.02,
  },
];

// Soft ambient glow accents — pure CSS, no imagery — placed near the logos
// to keep that part of the frame visually interesting now that the logos
// themselves are small and quiet.
type GlowSpec = {
  className: string;
  size: number;
  color: string;
  floatDuration: number;
  floatDelay: number;
};

const GLOWS: GlowSpec[] = [
  {
    className: "left-[4%] top-[12%] md:left-[8%] md:top-[10%]",
    size: 220,
    color: "rgba(138,31,26,0.16)",
    floatDuration: 14,
    floatDelay: 0,
  },
  {
    className: "right-[2%] top-[56%] md:right-[6%] md:top-[54%]",
    size: 260,
    color: "rgba(95,209,217,0.07)",
    floatDuration: 17,
    floatDelay: 1.5,
  },
  {
    className: "right-[14%] top-[6%] md:right-[20%] md:top-[4%]",
    size: 140,
    color: "rgba(138,31,26,0.12)",
    floatDuration: 12,
    floatDelay: 0.8,
  },
];

export default function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const items = containerRef.current?.querySelectorAll<HTMLElement>(
        "[data-depth]"
      );
      items?.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0.02");
        el.style.setProperty("--px", `${dx * depth}px`);
        el.style.setProperty("--py", `${dy * depth}px`);
      });
    };

    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {GLOWS.map((glow, i) => (
        <div
          key={`glow-${i}`}
          className={`ambient-glow absolute rounded-full ${glow.className}`}
          style={
            {
              width: glow.size,
              height: glow.size,
              background: `radial-gradient(circle, ${glow.color} 0%, rgba(0,0,0,0) 72%)`,
              filter: "blur(2px)",
              "--float-duration": `${glow.floatDuration}s`,
              "--float-delay": `${glow.floatDelay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {LOGOS.map((logo, i) => (
        <div
          key={i}
          data-depth={logo.depth}
          className={`floating-logo absolute opacity-[0.07] md:opacity-[0.11] blur-[0.4px] ${logo.className}`}
          style={
            {
              "--float-duration": `${logo.floatDuration}s`,
              "--float-delay": `${logo.floatDelay}s`,
              transform:
                "translate3d(var(--px, 0px), var(--py, 0px), 0)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            } as React.CSSProperties
          }
        >
          <div className="floating-logo-inner">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.size}
              height={logo.size}
              className="h-auto w-auto"
              priority={false}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        .floating-logo-inner {
          animation: float var(--float-duration) ease-in-out infinite;
          animation-delay: var(--float-delay);
        }
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-18px) rotate(2deg);
          }
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
        }
        .ambient-glow {
          animation: drift var(--float-duration) ease-in-out infinite;
          animation-delay: var(--float-delay);
        }
        @keyframes drift {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(14px, -22px) scale(1.08);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-logo-inner,
          .ambient-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
