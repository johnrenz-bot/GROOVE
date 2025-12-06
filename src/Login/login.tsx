import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Login: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const togglePassword = () => setPasswordVisible((v) => !v);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        if (errors.length > 0) {
            const timeout = setTimeout(() => setErrors([]), 3000);
            return () => clearTimeout(timeout);
        }
    }, [errors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(["Invalid login credentials (sample test error)"]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-white font-[instrument-sans] antialiased px-3 sm:px-4">
            <div className="w-full max-w-6xl mx-auto rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-zinc-800/70 overflow-hidden bg-black/40">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-8 sm:py-10">
                        <div className="glass w-full max-w-md mx-auto rounded-3xl px-6 sm:px-8 py-7 sm:py-9">
                            <div className="flex justify-center mb-4 sm:mb-6">
                                <img
                                    src="/Image/bg/LOG.png"
                                    className="w-20 sm:w-24 md:w-28 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)] animate-float"
                                />
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center bg-linear-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                                Welcome Back
                            </h1>

                            <p className="mt-2 text-center text-xs sm:text-sm text-zinc-400">
                                Move to your own rhythm.
                            </p>

                            {errors.length > 0 && (
                                <div className="mt-5 rounded-xl bg-red-500/10 border border-red-500/40 text-xs sm:text-sm text-red-200 px-4 py-3">
                                    <ul className="space-y-1">
                                        {errors.map((error, i) => (
                                            <li key={i}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-7 sm:mt-8 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400">
                                        Username
                                    </label>
                                    <input
                                        required
                                        className="w-full h-11 sm:h-12 rounded-xl bg-white/5 border border-white/10 px-3.5 sm:px-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-300/80 focus:border-zinc-300/80 transition"
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400">
                                            Password
                                        </label>
                                        <Link
                                            to="/ForgetPassword"
                                            className="text-[11px] sm:text-xs text-zinc-300 hover:text-white underline-offset-4 hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="relative">
                                        <input
                                            required
                                            type={passwordVisible ? "text" : "password"}
                                            className="w-full h-11 sm:h-12 rounded-xl bg-white/5 border border-white/10 pl-3.5 sm:pl-4 pr-11 sm:pr-12 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:ring-2 focus:ring-zinc-300/80 focus:border-zinc-300/80 transition"
                                            placeholder="••••••••"
                                        />

                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-zinc-300/70"
                                        >
                                            {passwordVisible ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 3l18 18M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M6.11 6.11C3.94 7.56 2.25 10 2.25 12c0 0 3.75 6.75 9.75 6.75 1.79 0 3.41-.43 4.83-1.12M17.89 17.89C20.06 16.44 21.75 14 21.75 12c0 0-3.75-6.75-9.75-6.75-1.08 0-2.1.16-3.06.45"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
                                                    />
                                                    <circle cx="12" cy="12" r="3.25" strokeWidth="1.6" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-11 sm:h-12 rounded-xl bg-linear-to-r from-zinc-200 via-zinc-400 to-zinc-600 text-[13px] sm:text-sm font-semibold text-black tracking-wide shadow-lg hover:shadow-[0_0_25px_rgba(200,200,200,0.4)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Sign in
                                </button>
                            </form>

                            <div className="mt-6 sm:mt-7 text-center text-[12px] sm:text-sm text-zinc-400">
                                Don't have an account?
                                <button
                                    onClick={openModal}
                                    className="ml-1 font-medium text-zinc-200 hover:text-white underline underline-offset-4"
                                >
                                    Create Account
                                </button>
                            </div>

                            <div className="mt-5 sm:mt-6 flex justify-center">
                                <button
                                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-zinc-700 bg-zinc-900/60 text-[12px] sm:text-sm text-zinc-100 hover:bg-zinc-800 hover:border-zinc-500 transition"
                                    onClick={() => (window.location.href = "/")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <img
                            src="/Image/login/bright.jpeg"
                            className="w-full h-full object-cover brightness-[.78]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-10 xl:bottom-16 flex flex-col items-center px-6 text-center">
                            <img
                                src="/Image/bg/LOG.png"
                                className="h-14 md:h-16 opacity-95 drop-shadow-2xl animate-float"
                            />
                            <p className="mt-3 text-sm md:text-base text-zinc-200 italic">
                                Move to your own rhythm. Create your own path with courage and passion.
                            </p>
                            <div className="mt-4 w-16 h-[3px] rounded-full bg-linear-to-r from-zinc-200 to-zinc-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

                    <div className="glass w-full max-w-4xl rounded-3xl px-5 sm:px-8 py-6 sm:py-8 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-2xl sm:text-3xl leading-none text-white/90 hover:text-white px-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300/70"
                        >
                            &times;
                        </button>

                        <div className="mb-6 flex justify-center">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-zinc-50 text-center">
                                Choose Your Role
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">

                            <Link
                                to="/CoachRegistration"
                                className="relative group h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-zinc-700/70 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-xl hover:scale-[1.02] hover:border-zinc-400 transition-all duration-300">
                                <img
                                    src="/Image/login/choreo.jpg"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-transparent" />
                                <div className="absolute bottom-0 w-full px-4 sm:px-5 py-4 bg-black/35 backdrop-blur-md text-center">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                                        Choreographer
                                    </h3>
                                    <p className="hidden sm:block mt-1 text-xs sm:text-sm text-zinc-200">
                                        Showcase your skills, build your portfolio, and connect with clients.
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/ClientRegistration"
                                className="relative group h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-zinc-700/70 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-xl hover:scale-[1.02] hover:border-zinc-400 transition-all duration-300">
                                <img
                                    src="/Image/login/arti.jpg"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-transparent" />
                                <div className="absolute bottom-0 w-full px-4 sm:px-5 py-4 bg-black/35 backdrop-blur-md text-center">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                                        Client
                                    </h3>
                                    <p className="hidden sm:block mt-1 text-xs sm:text-sm text-zinc-200">
                                        Find choreographers, book sessions, and manage your dance journey.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Login;
``
