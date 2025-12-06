// src/Main/Talent.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpConfig } from "./animations";

const talentCards: readonly { title: string; text: string; img: string }[] = [
  {
    title: "Dance",
    text: "Connect and grow with others passionate about dance.",
    img: "/Image/wc/dance.jpg",
  },
  {
    title: "Singing",
    text: "Find your voice and collaborate with fellow singers.",
    img: "/Image/wc/singg.png",
  },
  {
    title: "Acting",
    text: "Join actors and coaches to refine your craft.",
    img: "/Image/wc/acting.jpg",
  },
  {
    title: "Theater",
    text: "Step into the spotlight with our vibrant community.",
    img: "/Image/wc/theater.jpg",
  },
];

const Talent: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <section id="talent" className="py-12 md:py-16 relative bg-transparent">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-10">
            <img src="/Image/bg/LOG.png" className="h-28 w-auto" alt="" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 md:px-5">
          <motion.header
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            {...fadeUpConfig}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              Talent spaces
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-zinc-50">
              Explore performing arts categories
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-300">
              Connect with dancers, singers, actors, and theater performers ready to collaborate,
              teach, or learn.
            </p>
          </motion.header>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            {...fadeUpConfig}
          >
            {talentCards.map((card) => (
              <motion.button
                key={card.title}
                type="button"
                className="group relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 shadow-[0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                whileHover={{ scale: 1.01, translateY: -2 }}
                transition={{ duration: 0.18 }}
                onClick={() => setShowLoginModal(true)}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-base font-semibold">{card.title}</p>
                  <p className="mt-1 text-xs text-zinc-200">{card.text}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {showLoginModal && (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-black/70 p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="loginNoticeTitle"
            className="w-full max-w-sm rounded-2xl border border-white/15 bg-zinc-950/95 p-5 shadow-[0_22px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="loginNoticeTitle" className="text-lg font-semibold text-zinc-50">
              Hold up a second
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              Please create an account or sign in to connect with talents, coaches, and studios.
            </p>
            <div className="mt-4 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowLoginModal(false)}
                className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-zinc-100 hover:bg-white/10"
              >
                Maybe later
              </button>
              <a
                href="/login"
                className="rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-black hover:opacity-90"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Talent;
