// src/Main/Hero.tsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpConfig } from "./animations";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tryPlay = () => {
      if (prefersReduced) return;
      video.muted = true;
      video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!video) return;
          if (entry.isIntersecting) tryPlay();
          else video.pause();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-screen overflow-hidden p-b"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_65%)]" />
      </div>

      <section className="relative z-0 flex min-h-svh items-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none grid place-items-center opacity-10 filter-[drop-shadow(0_4px_30px_rgba(0,0,0,0.4))]"
        >
          <motion.img
            src="/Image/bg/LOG.png"
            className="w-[52vw] max-w-[520px]"
            alt=""
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 md:px-5">
          <div className="grid items-center gap-10 md:grid-cols-[1.1fr_minmax(0,0.9fr)] pt-24 md:pt-28">
            <motion.div
              className="space-y-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              {...fadeUpConfig}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-200 backdrop-blur-xl">
                <i className="fa-solid fa-bolt text-xs text-amber-300" />
                Performing Arts Hub
              </span>
              <h1 className="max-w-xl text-3xl sm:text-[1.9rem] md:text-[2.1rem] font-semibold leading-tight text-zinc-50">
                Discover a{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-300 to-fuchsia-300">
                  smoother way
                </span>{" "}
                to connect with coaches, studios, and performers.
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-zinc-300">
                GROOVE is a focused, web-based space for performers and coaches in San Jose del
                Monte, Bulacan—with 24/7 smart chat support and a studio locator, so you always know
                who to work with and where to practice.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1.5">
                <a
                  href="#talent"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-black hover:scale-[1.02] active:scale-[.98] transition shadow-[0_14px_40px_rgba(255,255,255,0.2)]"
                >
                  Discover Talents & Studios
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-100 hover:bg-white/10"
                >
                  Learn More
                </a>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-200 backdrop-blur-2xl">
                <img src="/Image/wc/logo.png" className="w-10 h-5 rounded-full" alt="Groove" />
                Built with the Groove community
              </div>
            </motion.div>

          <motion.div
              className="w-full md:justify-self-end"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              {...fadeUpConfig}
            >
              <figure className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
                <div className="relative aspect-3/4">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster="/Image/bg/LOG.png"
                  >
                    <source src="/media/Groove.mp4" type="video/mp4"  />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/25 to-transparent" />
                  <figcaption className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] md:hidden">
                    HD Preview
                  </figcaption>
                </div>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
