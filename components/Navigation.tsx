"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Toolset", href: "#toolset" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <div
            className={`glass flex w-full items-center justify-between rounded-full px-5 py-2.5 md:px-6 transition-all duration-500`}
          >
            <a
              href="#top"
              className="font-display text-xl tracking-wide text-bone"
              data-cursor="hover"
            >
              GRAVIT
            </a>

            <nav className="hidden items-center gap-9 md:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  className="micro-label text-bone/60 transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href="#contact"
                data-cursor="hover"
                className="micro-label inline-flex items-center gap-2 rounded-full border border-crimson-bright/50 bg-crimson-bright/10 px-5 py-2.5 text-bone transition-all duration-300 hover:bg-crimson-bright/20"
              >
                Get a Free Sample
              </a>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-bone transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-bone transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-void/98 backdrop-blur-xl md:hidden"
          >
            <div className="grain-overlay" />
            <div className="flex flex-1 flex-col items-start justify-center gap-8 px-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-bone"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="micro-label mt-4 inline-flex items-center gap-2 rounded-full border border-crimson-bright/60 bg-crimson-bright/10 px-6 py-3.5 text-bone"
              >
                Get a Free Sample
              </motion.a>
            </div>
            <div className="px-8 pb-10 text-xs text-bone/40 micro-label">
              Editing since 2017
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
