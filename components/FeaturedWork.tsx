"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * All 13 supplied Cloudinary source files, in their original order.
 * URLs are unchanged — do not edit.
 */
const VIDEO_SOURCES = [
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368905/Featured_video_1.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368898/Featured_video_2.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368891/Featured_video_3.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368891/Featured_video_4.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368907/Featured_video_5.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368912/Featured_video_6.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368901/Featured_video_7.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368891/Featured_video_8.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368905/Featured_video_9.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368930/Featured_video_10.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790369054/Featured_video_11.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368891/Featured_video_12.mp4",
  "https://res.cloudinary.com/vqnzf9cb/video/upload/v1790368926/Featured_video_13.mp4",
];

// 1-indexed lookup to keep the mapping readable against the brief.
const V = (n: number) => VIDEO_SOURCES[n - 1];
const filenameOf = (url: string) => url.split("/").pop() ?? url;

type Aspect = "landscape" | "portrait";

type Slide = {
  aspect: Aspect;
  videos: number[]; // 1-indexed video numbers, order preserved
  heading: string;
  copy: string;
};

/**
 * Slide sequence per the approved order: all five landscape videos first
 * (each its own slide, same landscape container as before), then all
 * portrait videos in pairs (same two-up reel container as before).
 * Heading/copy for each slide is carried over unchanged from whichever
 * video already had it assigned (the lead video in each pair keeps its
 * original heading/copy) — no new copy was written for this reorder.
 */
const SLIDES: Slide[] = [
  {
    aspect: "landscape",
    videos: [10],
    heading: "Product Presentation",
    copy: "Clean, considered landscape compositions that keep focus on the subject.",
  },
  {
    aspect: "landscape",
    videos: [3],
    heading: "Cinematic Pacing",
    copy: "Wide-frame storytelling with a deliberate rhythm, letting shots breathe without losing momentum.",
  },
  {
    aspect: "landscape",
    videos: [5],
    heading: "Motion Graphics",
    copy: "Custom graphic elements layered into live footage for a more polished, produced feel.",
  },
  {
    aspect: "landscape",
    videos: [8],
    heading: "Color Treatment",
    copy: "A considered grade and mood pass that ties every shot in the sequence together.",
  },
  {
    aspect: "landscape",
    videos: [11],
    heading: "Visual Effects",
    copy: "Compositing and effects work layered directly into the cut rather than bolted on top.",
  },
  {
    aspect: "portrait",
    videos: [1, 2],
    heading: "Featured Work",
    copy: "Cinematic pacing, custom motion graphics, and advanced visual narrative execution.",
  },
  {
    aspect: "portrait",
    videos: [4, 6],
    heading: "Fast-Paced Editing",
    copy: "Rapid-fire cuts and tight timing, built for a scroll-stopping first three seconds.",
  },
  {
    aspect: "portrait",
    videos: [7, 9],
    heading: "Sound-Driven Cuts",
    copy: "Edits timed to audio hits and rhythm so every transition lands exactly on beat.",
  },
  {
    aspect: "portrait",
    videos: [12, 13],
    heading: "Dynamic Composition",
    copy: "Reframing and transitions that keep a pair of vertical cuts moving without feeling repetitive.",
  },
];

export default function FeaturedWork() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [atBottom, setAtBottom] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setAtTop(el.scrollTop < 8);
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Autoplay each video only while its slide is actually visible inside the
  // internally-scrolling showcase, and pause it otherwise.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root, threshold: [0, 0.6, 1] }
    );

    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, []);

  const registerVideo = (el: HTMLVideoElement | null) => {
    if (el && !videoRefs.current.includes(el)) {
      videoRefs.current.push(el);
    }
  };

  return (
    <section id="work" className="relative w-full px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
              className="micro-label text-crimson-bright"
            >
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
              className="mt-3 font-display text-5xl text-bone md:text-6xl"
            >
              Featured work
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="max-w-sm text-sm leading-relaxed text-smoke md:text-base"
          >
            A contained archive of recent cuts — long-form narrative and
            high-retention short-form, scroll within the frame to move
            through the reel.
          </motion.p>
        </div>

        <div className="relative mt-12 md:mt-16">
          <div
            className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-14 bg-gradient-to-b from-void to-transparent transition-opacity duration-500 ${
              atTop ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-void to-transparent transition-opacity duration-500 ${
              atBottom ? "opacity-0" : "opacity-100"
            }`}
          />

          <div className="glass-strong absolute -top-9 right-0 z-20 hidden items-center gap-2 rounded-full px-4 py-2 md:flex">
            <span className="micro-label text-bone/50">Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-crimson-bright"
            >
              ↓
            </motion.span>
          </div>

          <div
            ref={scrollRef}
            className="thin-scroll relative overflow-y-auto overscroll-contain rounded-2xl border border-bone/10"
            style={{
              height: "78vh",
              maxHeight: "820px",
              scrollSnapType: "y mandatory",
            }}
          >
            {SLIDES.map((slide, slideIdx) => {
              const label = slide.aspect === "landscape" ? "Landscape" : "Portrait";
              const isFirst = slideIdx === 0;

              return (
                <div key={slideIdx}>
                  {!isFirst && <div className="mx-6 h-px bg-bone/10 md:mx-14" />}

                  <div
                    className="relative flex min-h-full flex-col justify-center gap-8 p-6 md:flex-row md:items-center md:gap-14 md:p-14"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="w-full md:w-[38%]">
                      <span className="micro-label text-crimson-bright">
                        {String(slideIdx + 1).padStart(2, "0")} — {label}
                      </span>
                      <h3 className="mt-4 font-display text-3xl text-bone md:text-4xl">
                        {slide.heading}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-smoke md:text-base">
                        {slide.copy}
                      </p>
                      {slide.aspect === "landscape" && (
                        <span className="micro-label mt-6 inline-block text-bone/35">
                          {filenameOf(V(slide.videos[0]))}
                        </span>
                      )}
                    </div>

                    {slide.aspect === "landscape" ? (
                      <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-bone/10 bg-ink md:w-[62%]">
                        <video
                          ref={registerVideo}
                          className="h-full w-full object-cover"
                          src={V(slide.videos[0])}
                          muted
                          loop
                          playsInline
                          controls
                          preload="metadata"
                          aria-label={slide.heading}
                        />
                      </div>
                    ) : (
                      <div className="flex w-full gap-4 md:w-[62%]">
                        {slide.videos.map((n) => (
                          <div
                            key={n}
                            className="group relative aspect-[9/16] w-1/2 overflow-hidden rounded-xl border border-bone/10 bg-ink"
                          >
                            <video
                              ref={registerVideo}
                              className="h-full w-full object-cover"
                              src={V(n)}
                              muted
                              loop
                              playsInline
                              controls
                              preload="metadata"
                              aria-label={filenameOf(V(n))}
                            />
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <span className="micro-label text-bone/80">
                                {filenameOf(V(n))}
                              </span>
                              <span className="micro-label text-bone/60">9:16</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
