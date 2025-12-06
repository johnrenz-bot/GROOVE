import React from "react";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 py-6 text-center text-zinc-300">
            <div className="mx-auto max-w-6xl px-4 md:px-5">
                <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                    <p className="text-xs sm:text-sm">
                        &copy; <span>{year}</span> GROOVE. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:Groove1152000@gmail.com"
                            className="text-xs sm:text-sm hover:text-white transition"
                        >
                            Groove1152000@gmail.com
                        </a>
                        <a
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:bg-white/10 text-xs"
                            href="#home"
                            aria-label="Back to top"
                        >
                            <i className="fa-solid fa-arrow-up" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
