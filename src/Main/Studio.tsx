import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpConfig } from "./animations";

const Studio: React.FC = () => {
    return (
        <section id="Studio" className=" w-full md:py-20">
            <div className="mx-auto max-w-7xl px-4">
                <motion.header
                    className="text-center"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                        Studio locator
                    </p>

                    <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                        Find rehearsal spaces near you
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm text-gray-600">
                        Use the built-in map to discover dance studios around San Jose del Monte and nearby areas.
                    </p>
                </motion.header>

                <motion.div
                    className="mt-10 rounded-2xl  shadow-lg p-3"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    {...fadeUpConfig}
                >
                    <div className="relative overflow-hidden rounded-xl aspect-video">
                        <iframe
                            title="Dance Studios near San Jose del Monte"
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d61730.37468240366!2d120.99412321212131!3d14.760667026083794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sDANCE%20studio!5e0!3m2!1sen!2sph!4v1747613518621!5m2!1sen!2sph"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Studio;
