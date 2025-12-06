import React, { useEffect, useState } from "react";
import { Link } from "react-router";


const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToId = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setMobileOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled
                ? "backdrop-blur-xl bg-zinc-950/75 border-b border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.6)]"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto max-w-6xl px-4 md:px-5">
                <div className="flex h-14 md:h-16 items-center justify-between">
                    <button
                        onClick={() => scrollToId("home")}
                        className="inline-flex items-center gap-2.5 group"
                    >
                        <img
                            src="/Image/bg/LOG.png"
                            alt="GROOVE"
                            className="h-8 w-auto object-contain transition-transform duration-300 rounded-xl group-hover:rotate-6 group-hover:scale-[1.03]"
                        />
                        <span className="hidden sm:inline text-xs font-semibold tracking-[0.18em] uppercase text-zinc-200 group-hover:text-white">
                            GROOVE
                        </span>
                    </button>

                    <ul className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
                        <li>
                            <button
                                onClick={() => scrollToId("talent")}
                                className="hover:text-white transition"
                            >
                                Talents
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("studio")}
                                className="hover:text-white transition"
                            >
                                Studios
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("about")}
                                className="hover:text-white transition"
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("features")}
                                className="hover:text-white transition"
                            >
                                Services
                            </button>
                        </li>
                    </ul>

                    <div className="hidden md:flex items-center gap-2.5">
                        <Link
                            to="/Login"
                            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide hover:bg-white/10"
                        >
                            Sign In
                        </Link>
                    </div>

                    <button
                        className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {mobileOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <>
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M10 18h10" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-x-0 top-14 origin-top transition-all duration-300 ${mobileOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="mx-3 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl p-3 shadow-xl">
                    <ul className="grid gap-1.5 text-sm text-zinc-100">
                        <li>
                            <button
                                onClick={() => scrollToId("home")}
                                className="w-full text-left rounded-xl px-4 py-2.5 hover:bg-white/5"
                            >
                                Home
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("talent")}
                                className="w-full text-left rounded-xl px-4 py-2.5 hover:bg-white/5"
                            >
                                Talents
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("studio")}
                                className="w-full text-left rounded-xl px-4 py-2.5 hover:bg-white/5"
                            >
                                Studios
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("about")}
                                className="w-full text-left rounded-xl px-4 py-2.5 hover:bg-white/5"
                            >
                                About
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToId("features")}
                                className="w-full text-left rounded-xl px-4 py-2.5 hover:bg-white/5"
                            >
                                Services
                            </button>
                        </li>

                        <li>
                            <Link
                                to="/Login"
                                className="block mt-2 text-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5"
                                onClick={() => setMobileOpen(false)}
                            >
                                Sign In
                            </Link>



                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
