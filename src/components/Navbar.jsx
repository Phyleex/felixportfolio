
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#15132f]/90 text-white shadow-lg shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group relative z-10"
          aria-label="LEEX Creative Studio homepage"
        >
          <div className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-2xl font-black tracking-[-0.06em] text-transparent transition-opacity group-hover:opacity-80">
            LEEX<span className="text-white">.</span>
          </div>

          <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400 transition-colors group-hover:text-violet-300">
            Creative Studio
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-violet-950/20 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-pink-500"
          >
            Let&apos;s Talk <span className="ml-1">↗</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-colors hover:border-violet-400/40 hover:bg-violet-500/10 md:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span className="text-2xl leading-none text-violet-200">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#15132f]/95 transition-all duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "pointer-events-none max-h-0 border-t-transparent opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="px-6 py-6 sm:px-10">
          <div className="flex flex-col gap-1">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-4 text-base font-medium text-slate-200 transition-colors duration-200 hover:bg-white/[0.05] hover:text-violet-300"
              >
                <span>{link.name}</span>
                <span className="text-sm text-slate-500">
                  0{index + 1}
                </span>
              </a>
            ))}

            <a
              href="#contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-4 text-sm font-bold text-white transition hover:from-violet-500 hover:to-pink-500"
            >
              Start a project <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

