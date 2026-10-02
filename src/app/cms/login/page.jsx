"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "◈",
    title: "Portfolio Management",
    description: "Add and update projects with images and details.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    icon: "✳",
    title: "Content Control",
    description: "Manage services, about information and testimonials.",
    color: "from-orange-500 to-rose-500",
  },
  {
    icon: "⚙",
    title: "Website Settings",
    description: "Keep your studio information up to date.",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: "▥",
    title: "All in One Place",
    description: "Your creative business, managed from one workspace.",
    color: "from-pink-500 to-fuchsia-600",
  },
];

export default function CmsLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/cms/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      window.location.href = "/cms/dashboard";
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* LEFT PANEL */}
      <section className="relative isolate flex min-h-[600px] flex-col justify-between overflow-hidden bg-[#15132f] px-7 py-8 text-white sm:px-12 sm:py-10 lg:min-h-screen lg:px-14 lg:py-12 xl:px-16">
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />

        <div>
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold tracking-[0.32em]">LEEX</span>
            <span className="mt-1 block text-[10px] tracking-[0.3em] text-violet-200">
              CREATIVE STUDIO
            </span>
          </Link>

          <div className="mt-8 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />

          <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-violet-200 sm:mt-12">
            Ideas · Design · Digital · Impact
          </p>

          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl xl:text-6xl">
            Welcome to the{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              studio
            </span>{" "}
            workspace.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
            Manage your portfolio, services, content and website settings — all
            from one place.
          </p>
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:mt-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-xl text-white shadow-lg`}
              >
                {feature.icon}
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-1.5 max-w-48 text-xs leading-5 text-slate-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 hidden items-center gap-3 pt-6 lg:flex">
          <span className="h-px w-10 bg-gradient-to-r from-violet-400 to-pink-400" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
            Built for creators
          </span>
        </div>

        <div className="pointer-events-none absolute right-[-75px] top-[28%] -z-10 hidden h-64 w-64 rounded-full border border-violet-400/20 lg:block" />
        <div className="pointer-events-none absolute right-[-25px] top-[32%] -z-10 hidden h-48 w-48 rounded-full border border-pink-400/20 lg:block" />
      </section>

      {/* RIGHT PANEL */}
      <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-[#faf9ff] px-6 py-10 sm:px-12 sm:py-12 lg:min-h-screen lg:px-12 lg:py-10 xl:px-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative w-full max-w-md">
          <div className="mb-8 sm:mb-10">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-[0.32em] text-slate-950">
                LEEX
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.3em] text-slate-600">
                CREATIVE STUDIO
              </span>
            </Link>

            <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-violet-600 to-pink-500" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Administration
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Content manager
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Sign in to manage your website content.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-white bg-white/80 p-6 shadow-xl shadow-violet-100/70 backdrop-blur-sm sm:p-8"
          >
            <label
              htmlFor="password"
              className="mb-3 block text-sm font-semibold text-slate-800"
            >
              CMS password
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-violet-200 bg-white px-4 transition focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-100">
              <span className="text-lg text-violet-600" aria-hidden="true">
                ♙
              </span>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="text-xs font-medium text-slate-500 hover:text-violet-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p
                className="mt-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>{loading ? "Signing in..." : "Sign in"}</span>
              {!loading && <span className="text-lg">→</span>}
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">or</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 transition hover:text-violet-700"
            >
              <span aria-hidden="true">←</span>
              Return to website
            </Link>
          </form>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            LEEX CREATIVE STUDIO
            <span className="mx-2 text-violet-300">·</span>
            Private administration
          </p>
        </div>
      </section>
    </main>
  );
}
