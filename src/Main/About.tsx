import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpConfig } from "./animations";

const About: React.FC = () => {
    return (
        <section id="about" className="py-12 md:py-16 relative">
            <div className="absolute inset-0 -z-10 opacity-[0.05] flex items-center justify-center">
                <img src="/Image/bg/LOG.png" alt="" className="max-w-[340px] w-[52vw]" />
            </div>
            <div className="mx-auto max-w-6xl px-4 md:px-5">
                <motion.div
                    className="text-center mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <motion.img
                        src="/Image/wc/logo.png"
                        alt="Groove Logo"
                        className="h-12 w-auto mx-auto mb-3 drop-shadow-[0_0_18px_rgba(255,255,255,0.16)]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400">
                        Why we built Groove
                    </p>
                    <h2 className="mt-2 text-2xl md:3xl font-semibold text-zinc-50">
                        A focused support system for performing artists
                    </h2>
                    <p className="mt-2 text-sm text-zinc-300 max-w-2xl mx-auto">
                        Designed for San Jose Del Monte, Bulacan — Groove bridges gaps between artists, studios,
                        and clients through a modern, always-available platform.
                    </p>
                </motion.div>

                <motion.section
                    className="mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4">
                            <div className="mb-2">
                                <i className="fa-solid fa-magnifying-glass text-base text-violet-300" />
                            </div>
                            <h3 className="text-sm font-semibold mb-1.5 text-zinc-50">Finding coaches</h3>
                            <p className="text-xs text-zinc-300">
                                78.9% of artists in San Jose Del Monte struggled to find available and qualified
                                coaches or choreographers.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4">
                            <div className="mb-2">
                                <i className="fa-solid fa-comments text-base text-violet-300" />
                            </div>
                            <h3 className="text-sm font-semibold mb-1.5 text-zinc-50">Slow replies</h3>
                            <p className="text-xs text-zinc-300">
                                82.2% experienced delays when asking about rates, schedules, and availability.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4">
                            <div className="mb-2">
                                <i className="fa-solid fa-location-dot text-base text-violet-300" />
                            </div>
                            <h3 className="text-sm font-semibold mb-1.5 text-zinc-50">Studio access</h3>
                            <p className="text-xs text-zinc-300">
                                86.8% had difficulty finding nearby studios suitable for rehearsals and practice.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className="mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <h3 className="text-sm font-semibold mb-2 text-violet-300">Our mission</h3>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                To give performing artists a single, reliable space where they can offer their
                                services, showcase their work, and easily connect with the right people — without
                                losing time to scattered chats and hard-to-find studios.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <h3 className="text-sm font-semibold mb-2 text-violet-300">Our vision</h3>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                To build a sustainable digital backbone for the local performing arts community —
                                one that supports creativity, professional growth, and real opportunities for every
                                artist.
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </section>
    );
};

export default About;
