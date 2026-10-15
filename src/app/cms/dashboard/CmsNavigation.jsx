"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Dashboard",
    href: "/cms/dashboard",
    icon: "⌂",
  },
  {
    title: "Projects",
    href: "/cms/dashboard/projects",
    icon: "◈",
  },
  {
    title: "Brands",
    href: "/cms/dashboard/brands",
    icon: "◇",
  },
  {
    title: "Tools",
    href: "/cms/dashboard/tools",
    icon: "⚒",
  },
  {
    title: "Services",
    href: "/cms/dashboard/services",
    icon: "✳",
  },
  {
    title: "About",
    href: "/cms/dashboard/about",
    icon: "◎",
  },
  {
    title: "Testimonials",
    href: "/cms/dashboard/testimonials",
    icon: "❝",
  },
  {
    title: "Settings",
    href: "/cms/dashboard/settings",
    icon: "⚙",
  },
];

export default function CmsNavigation() {
  const pathname = usePathname();

  function isActive(section) {
    return (
      pathname === section.href ||
      (section.href !== "/cms/dashboard" &&
        pathname.startsWith(`${section.href}/`))
    );
  }

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col overflow-hidden bg-[#17142f] text-white lg:flex">
        {/* BRAND - stays at the top */}
        <div className="shrink-0 px-5 pt-5">
          <Link
            href="/cms/dashboard"
            className="group flex items-center gap-3 px-2 py-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-black shadow-lg shadow-violet-900/30">
              L
            </div>

            <div>
              <span className="block text-lg font-black tracking-[0.25em]">
                LEEX
              </span>

              <span className="block text-[9px] font-medium tracking-[0.22em] text-violet-200">
                CREATIVE STUDIO
              </span>
            </div>
          </Link>
        </div>

        {/* WORKSPACE - stays visible */}
        <div className="shrink-0 px-5">
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold">
                L
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">LEEX Workspace</p>

                <p className="mt-1 text-[11px] text-slate-500">
                  Content management
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Workspace active
            </div>
          </div>
        </div>

        {/* SCROLLABLE NAVIGATION */}
        <div className="mt-7 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 [scrollbar-color:rgba(167,139,250,0.45)_transparent] [scrollbar-width:thin]">
          <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-1">
            {sections.map((section) => {
              const active = isActive(section);

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition ${
                      active
                        ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
                        : "bg-white/[0.05] text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    {section.icon}
                  </span>

                  <span>{section.title}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER - stays at the bottom */}
        <div className="shrink-0 space-y-1 border-t border-white/10 bg-[#17142f] px-5 pb-4 pt-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <span>↗</span>
            View website
          </Link>

          <form action="/api/cms/logout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
            >
              <span>↪</span>
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* MOBILE NAVIGATION */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <Link href="/cms/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-xs font-black text-white">
              L
            </div>

            <div>
              <span className="block text-sm font-black tracking-[0.2em] text-slate-900">
                LEEX
              </span>

              <span className="block text-[8px] font-semibold tracking-[0.16em] text-violet-600">
                CMS
              </span>
            </div>
          </Link>

          <div className="flex max-w-[70%] gap-1.5 overflow-x-auto pb-0.5">
            {sections.map((section) => {
              const active = isActive(section);

              return (
                <Link
                  key={section.href}
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {section.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
