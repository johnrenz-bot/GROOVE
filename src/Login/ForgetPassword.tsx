import React, { useMemo, useState } from "react";

type PasswordResetMode = "request" | "reset";

type PasswordResetProps = {
    mode?: PasswordResetMode;
};

const PasswordReset: React.FC<PasswordResetProps> = ({ mode = "request" }) => {
    const [requestEmail, setRequestEmail] = useState("");
    const [requestLoading, setRequestLoading] = useState(false);
    const [requestStatus, setRequestStatus] = useState<string | null>(null);
    const [requestError, setRequestError] = useState<string | null>(null);

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const resetScore = useMemo(() => {
        let s = 0;
        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return s;
    }, [password]);

    const resetValid = useMemo(
        () => resetScore === 4 && password === passwordConfirm && password.length > 0,
        [resetScore, password, passwordConfirm]
    );

    const resetLabel = useMemo(() => {
        const labels = ["Very weak", "Weak", "Good", "Strong", "Excellent"];
        return labels[resetScore] ?? labels[0];
    }, [resetScore]);

    const resetBarClass = useMemo(() => {
        if (resetScore <= 1) return "bg-red-500";
        if (resetScore === 2) return "bg-amber-500";
        return "bg-emerald-500";
    }, [resetScore]);

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setRequestStatus(null);
        setRequestError(null);
        if (!requestEmail.trim()) {
            setRequestError("Please enter your email.");
            return;
        }
        setRequestLoading(true);
        setTimeout(() => {
            setRequestLoading(false);
            setRequestStatus("We’ve sent a password reset link to your email.");
        }, 1100);
    };

    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetValid) return;
        alert("Password has been reset (mock). Connect this to your API.");
    };

    const isRequestMode = mode === "request";

    return (
        <div className="min-h-screen bg-linear-to-b from-white via-white to-slate-100 text-black antialiased overflow-x-hidden flex items-center justify-center px-4 py-10">

            <main className="w-full max-w-xl">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-700 hover:text-black mb-6 group"
                >
                    <span className="text-2xl font-extrabold group-hover:-translate-x-1 transition-transform">
                        &lt;
                    </span>
                    <span className="px-3 py-1 rounded-full border border-gray-300 bg-white text-[11px] sm:text-xs shadow-sm">
                        Back to Login
                    </span>
                </button>

                <div className="relative rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                    <div className="px-6 sm:px-8 pt-8 pb-7">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute -inset-3 rounded-2xl bg-emerald-400/15 blur-xl" />
                                <img
                                    src="/image/bg/LOG.png"
                                    alt="Groove Logo"
                                    className="relative h-16 w-16 object-contain"
                                />
                            </div>
                        </div>

                        <div className="text-center mt-5 mb-6">
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                {isRequestMode ? "Password Reset" : "Set New Password"}
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Move to your own rhythm.
                            </p>
                        </div>

                        {isRequestMode && (
                            <div className="space-y-4">
                                {requestStatus && (
                                    <div
                                        className="rounded-xl border border-emerald-500/40 bg-emerald-50 px-4 py-3 text-emerald-700 text-sm"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <div className="flex items-start gap-3">
                                            <svg
                                                className="mt-0.5 h-5 w-5 flex-none"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.8 14.7l6.7-6.7 1.4 1.4-8.1 8.1L5.1 11l1.4-1.4 4.3 4.3z"
                                                />
                                            </svg>
                                            <p>{requestStatus}</p>
                                        </div>
                                    </div>
                                )}

                                {requestError && (
                                    <div
                                        className="rounded-xl border border-red-400 bg-red-50 px-4 py-3 text-red-700 text-sm"
                                        role="alert"
                                    >
                                        <div className="flex items-start gap-3">
                                            <svg
                                                className="mt-0.5 h-5 w-5 flex-none"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2l10 18H2L12 2zm0 5a1 1 0 00-1 1v5a1 1 0 002 0V8a1 1 0 00-1-1zm0 10a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
                                                />
                                            </svg>
                                            <p>{requestError}</p>
                                        </div>
                                    </div>
                                )}

                                <form
                                    onSubmit={handleRequestSubmit}
                                    className="space-y-5"
                                    noValidate
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-xs font-semibold tracking-wide text-slate-700"
                                        >
                                            EMAIL
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={requestEmail}
                                                onChange={e => setRequestEmail(e.target.value)}
                                                required
                                                autoComplete="email"
                                                placeholder="you@gmail.com"
                                                className="peer w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-base text-black shadow-inner shadow-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                                            />
                                            <svg
                                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 peer-focus:text-slate-700"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 13L2 6.76V18a2 2 0 002 2h16a2 2 0 002-2V6.76L12 13z" />
                                                <path d="M22 6H2l10 6 10-6z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={requestLoading}
                                        className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-slate-900 to-slate-700 px-4 py-3 font-semibold text-white shadow-sm ring-1 ring-slate-900/10 transition hover:from-black hover:to-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <span>Send reset link</span>
                                        {!requestLoading && (
                                            <svg
                                                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M13 5l7 7-7 7M5 12h14" />
                                            </svg>
                                        )}
                                        {requestLoading && (
                                            <svg
                                                className="h-5 w-5 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}

                        {!isRequestMode && (
                            <form
                                onSubmit={handleResetSubmit}
                                className="space-y-5"
                                noValidate
                            >
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-xs font-semibold tracking-wide text-slate-800"
                                    >
                                        NEW PASSWORD
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            required
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="peer w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-24 text-base text-black shadow-inner shadow-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(p => !p)}
                                            aria-pressed={showPassword}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-xs font-medium text-slate-800 ring-1 ring-slate-200 hover:bg-slate-100"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="mb-2 block text-xs font-semibold tracking-wide text-slate-800"
                                    >
                                        CONFIRM PASSWORD
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={passwordConfirm}
                                        onChange={e => setPasswordConfirm(e.target.value)}
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-black shadow-inner shadow-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
                                    />
                                </div>

                                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between text-xs text-slate-800">
                                        <span>Password strength</span>
                                        <span className="font-medium text-slate-900">
                                            {resetLabel}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className={`h-full ${resetBarClass} transition-all`}
                                            style={{ width: `${resetScore * 25}%` }}
                                        />
                                    </div>
                                    <ul className="grid gap-1 text-xs sm:text-sm sm:grid-cols-2 text-slate-700">
                                        <li
                                            className={
                                                password.length >= 8
                                                    ? "text-emerald-600"
                                                    : "text-slate-500"
                                            }
                                        >
                                            • At least 8 characters
                                        </li>
                                        <li
                                            className={
                                                /[A-Z]/.test(password)
                                                    ? "text-emerald-600"
                                                    : "text-slate-500"
                                            }
                                        >
                                            • At least one uppercase
                                        </li>
                                        <li
                                            className={
                                                /[0-9]/.test(password)
                                                    ? "text-emerald-600"
                                                    : "text-slate-500"
                                            }
                                        >
                                            • At least one number
                                        </li>
                                        <li
                                            className={
                                                /[^A-Za-z0-9]/.test(password)
                                                    ? "text-emerald-600"
                                                    : "text-slate-500"
                                            }
                                        >
                                            • At least one special
                                        </li>
                                        <li
                                            className={`sm:col-span-2 ${password &&
                                                passwordConfirm &&
                                                password === passwordConfirm
                                                ? "text-emerald-600"
                                                : "text-slate-500"
                                                }`}
                                        >
                                            • Passwords match
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!resetValid}
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 px-4 py-3 font-semibold text-white shadow-sm ring-1 ring-emerald-500/50 transition hover:from-emerald-700 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span>Reset password</span>
                                    <svg
                                        className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13 5l7 7-7 7M5 12h14" />
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="h-2 w-full rounded-b-[28px] bg-linear-to-r from-transparent via-slate-200 to-transparent" />
                </div>

                <div className="mt-4 text-center text-xs text-slate-500">
                    Having trouble?{" "}
                    <a
                        href="/support"
                        className="font-medium text-slate-800 underline decoration-dotted underline-offset-4 hover:text-black"
                    >
                        Contact support
                    </a>
                </div>
            </main>
        </div>
    );
};

export default PasswordReset;
