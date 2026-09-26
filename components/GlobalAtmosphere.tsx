"use client";

import { useEffect, useRef } from "react";

/**
 * Shared atmospheric background for pages 1, 3, 4, 5.
 * Fixed behind all content. Page 2's fullscreen opaque video
 * naturally overdraws this while it is in view, so no manual
 * toggling is required.
 */
export default function GlobalAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const nodeCount = isMobile ? 14 : 34;
    const nodes = Array.from({ length: nodeCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.006;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;

        const flicker = 0.35 + Math.sin(t * 2 + n.phase) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 59, 46, ${Math.max(flicker, 0.08)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 59, 46, ${Math.max(flicker * 0.08, 0.02)})`;
        ctx.fill();
      }

      if (!reduceMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
    if (reduceMotion) draw();

    const handleMouse = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.setProperty("--mx", `${x}%`);
      glowRef.current.style.setProperty("--my", `${y}%`);
    };
    if (!isMobile) window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("resize", resize);
      if (!isMobile) window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 18% -10%, rgba(138,31,26,0.32) 0%, rgba(5,4,3,0) 55%), radial-gradient(90% 70% at 100% 110%, rgba(95,209,217,0.06) 0%, rgba(5,4,3,0) 60%), #050403",
        }}
      />

      {/* faint technical grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,236,225,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,236,225,0.6) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(80% 60% at 50% 20%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 20%, black 0%, transparent 75%)",
        }}
      />

      {/* mouse-following ambient light */}
      <div
        ref={glowRef}
        className="absolute inset-0 hidden md:block transition-opacity duration-700"
        style={
          {
            "--mx": "50%",
            "--my": "40%",
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(138,31,26,0.14), transparent 70%)",
          } as React.CSSProperties
        }
      />

      {/* particle / node canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* grain */}
      <div className="grain-overlay" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 220px 60px rgba(0,0,0,0.75)",
        }}
      />
    </div>
  );
}
