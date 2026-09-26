"use client";

import { useEffect, useRef } from "react";

export const BACKGROUND_VIDEO_SRC = "/videos/background.mp4";

export default function VideoInterlude() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={wrapperRef}
      aria-label="Cinematic showreel intermission"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={BACKGROUND_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </section>
  );
}
