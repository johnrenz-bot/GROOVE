import "./index.css";

import Header from "./Main/Header";
import About from "./Main/About";
import Footer from "./Main/Footer";
import Studio from "./Main/Studio";
import Features from "./Main/Features";
import Hero from "./Main/Hero";
import Talent from "./Main/Talent"

export default function Index() {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-950 via-zinc-950 to-black text-white relative">

            <Header />
            <section
                id="home"
                className="min-h-screen flex items-center justify-center"
            >
                <Hero />
            </section>

            <section
                id="talent"
                className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-12 bg-linear-to-b from-slate-950 via-zinc-950 to-black"
            >
                <Talent />
            </section>


            <section
                id="studio"
                className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
            >
                <Studio />
            </section>

            <section
                id="about"
                className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
            >
                <About />
            </section>

            <section
                id="features"
                className="min-h-[70vh] flex items-start justify-center px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="w-full max-w-6xl">
                    <Features />
                </div>
            </section>


            <Footer />
        </div>
    );
}

