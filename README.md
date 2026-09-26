# GRAVIT — Portfolio

Cinematic, premium portfolio for **GRAVIT** (After Effects Editor / Visual Storyteller), built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

All copy, links and project content are sourced directly from the live portfolio at `https://gravit-portfolio.vercel.app` — nothing invented.

## Stack

- Next.js 14 + React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Google Fonts: Bodoni Moda (display serif), Manrope (body), Space Grotesk (micro-labels)

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

> Note: `next/font/google` fetches font files at build time, so an active internet connection is required for `npm run build` (this is normal — Vercel's build environment has this by default).

## Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). No extra environment variables are required.
4. Deploy.

Or, with the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Assembles all sections
  globals.css        Atmosphere, glass, scrollbar, cursor, grain utilities
components/
  Navigation.tsx      Fixed glass nav + full-screen mobile menu
  GlobalAtmosphere.tsx Shared canvas/CSS background (pages 1, 3, 4, 5)
  ScrollProgress.tsx   Right-side scroll indicator
  CustomCursor.tsx     Desktop-only custom cursor
  MagneticButton.tsx   Reusable magnetic CTA button
  HeroSection.tsx      Page 1 — hero
  FloatingLogos.tsx    Decorative floating AE / Premiere Pro logos (exact supplied assets)
  VideoInterlude.tsx   Page 2 — fullscreen video only
  FeaturedWork.tsx     Page 3 — contained internal-scroll video showcase
  ToolsetSection.tsx   Page 4 — interactive toolset/capabilities
  ContactSection.tsx   Page 5 — contact / CTA
  Footer.tsx           Footer
public/
  logos/               Exact supplied After Effects & Premiere Pro logo assets (untouched)
  videos/background.mp4  Supplied Page 2 background video (untouched)
```

## Notes on the supplied assets

- `public/logos/after-effects-logo.svg` and `public/logos/premiere-pro-logo.svg` are the **exact files you supplied**, used unmodified as subtle floating background elements on Page 1 only (opacity/blur/parallax/rotation applied via CSS, artwork itself untouched).
- `public/videos/background.mp4` is your supplied video, used unmodified as the entire content of Page 2 (`components/VideoInterlude.tsx`). The source path is centralized as `BACKGROUND_VIDEO_SRC` at the top of that file if you ever want to swap it.
- Featured Work videos are the same YouTube embeds as your current portfolio (long-form + two 9:16 reels), inside one internally-scrollable showcase (~78vh) rather than a long vertical list.

## Accessibility & performance

- Respects `prefers-reduced-motion` (atmosphere animation, cursor, marquee, smooth scroll all disabled).
- Custom cursor and mouse-parallax are disabled on touch devices.
- IntersectionObserver pauses the Page 2 video when it's off-screen.
- Video embeds use `loading="lazy"`.
- No horizontal overflow at any breakpoint; internal video showcase scroll uses `overscroll-behavior: contain` so it doesn't hijack page scroll.
