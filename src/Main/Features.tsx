import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpConfig } from "./animations";

const Features: React.FC = () => {
    return (
        <section className="py-4 md:py-6">
            <div className="mx-auto max-w-6xl px-4 md:px-5">
                <motion.section
                    className="mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <h3 className="text-sm font-semibold mb-4 text-violet-300 uppercase tracking-[0.2em]">
                        Key features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <div className="flex items-center mb-3">
                                <i className="fa-solid fa-robot text-base mr-3 text-violet-300" />
                                <h4 className="text-sm font-semibold text-zinc-50">Smart chat support</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                24/7 smart responses to inquiries, so clients and artists can communicate clearly
                                without waiting for manual replies.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <div className="flex items-center mb-3">
                                <i className="fa-solid fa-users text-base mr-3 text-violet-300" />
                                <h4 className="text-sm font-semibold text-zinc-50">Artist directory</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                Filter by style, genre, or role to quickly find the right coach, choreographer, or
                                collaborator.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <div className="flex items-center mb-3">
                                <i className="fa-solid fa-map-location-dot text-base mr-3 text-violet-300" />
                                <h4 className="text-sm font-semibold text-zinc-50">Studio locator</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                Quickly see available rehearsal spaces around you, so practice is never blocked by
                                location.
                            </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5">
                            <div className="flex items-center mb-3">
                                <i className="fa-solid fa-handshake text-base mr-3 text-violet-300" />
                                <h4 className="text-sm font-semibold text-zinc-50">Community platform</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-200">
                                Share work, discover new talents, and open doors to performances, gigs, and
                                collaborations.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <section id="Services" className="py-2 md:py-4">
                    <motion.div
                        className="mt-8 rounded-3xl border border-white/10 bg-linear-to-r from-fuchsia-600/25 via-purple-600/20 to-cyan-500/25 p-6 md:p-8 text-center relative overflow-hidden shadow-[0_26px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        {...fadeUpConfig}
                    >
                        <div className="absolute -right-7 -top-10 opacity-15">
                            <img src="/Image/bg/LOG.png" className="h-28 w-auto" alt="" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-zinc-50">
                            Ready to find your groove?
                        </h3>
                        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-100">
                            Create a free account and start discovering artists, coaches, and studios that fit
                            your style and schedule.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="#about"
                                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-black hover:scale-[1.02] active:scale-[.98] transition"
                            >
                                Get Started
                            </a>
                            <a
                                href="/login"
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-100 hover:bg-white/10"
                            >
                                Sign In
                            </a>
                        </div>
                    </motion.div>
                </section>
            </div>
        </section>
    );
};

export default Features;
