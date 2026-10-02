import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyCmsSession } from "@/lib/cms-auth";

const sections = [
  {
    title: "Projects",
    description:
      "Manage portfolio projects, images, descriptions and categories.",
    href: "/cms/dashboard/projects",
    number: "01",
    color: "from-violet-600 to-indigo-600",
    light: "bg-violet-50",
    text: "text-violet-700",
    icon: "◈",
  },
  {
    title: "Services",
    description: "Edit the services displayed on your website.",
    href: "/cms/dashboard/services",
    number: "02",
    color: "from-orange-500 to-rose-500",
    light: "bg-orange-50",
    text: "text-orange-700",
    icon: "✳",
  },
  {
    title: "About",
    description: "Manage your studio introduction and about section.",
    href: "/cms/dashboard/about",
    number: "03",
    color: "from-cyan-500 to-blue-600",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    icon: "◎",
  },
  {
    title: "Testimonials",
    description: "Manage client feedback and testimonials.",
    href: "/cms/dashboard/testimonials",
    number: "04",
    color: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "❝",
  },
  {
    title: "Website Settings",
    description: "Manage general website information and settings.",
    href: "/cms/dashboard/settings",
    number: "05",
    color: "from-pink-500 to-fuchsia-600",
    light: "bg-pink-50",
    text: "text-pink-700",
    icon: "⚙",
  },
];

export default async function CmsDashboardPage() {
  const isAuthenticated = await verifyCmsSession();

  if (!isAuthenticated) {
    redirect("/cms/login");
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#17152e] p-6 text-white md:flex">
          <Link href="/" className="inline-block">
            <span className="text-xl font-bold tracking-[0.28em]">LEEX</span>
            <span className="mt-1 block text-[10px] tracking-[0.25em] text-violet-200">
              CREATIVE STUDIO
            </span>
          </Link>

          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-bold">
                L
              </div>
              <div>
                <p className="text-sm font-semibold">LEEX Workspace</p>
                <p className="mt-1 text-xs text-slate-400">
                  Content management
                </p>
              </div>
            </div>
          </div>

          <p className="mb-3 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-2">
            {sections.map((section, index) => (
              <Link
                key={section.number}
                href={section.href}
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${section.color} text-sm text-white`}
                >
                  {section.icon}
                </span>
                <span>{section.title}</span>
                <span className="ml-auto text-xs text-slate-500">
                  {section.number}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-2 border-t border-white/10 pt-5">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              ↗ View website
            </Link>

            <form action="/api/cms/logout" method="POST">
              <button
                type="submit"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
              >
                ↪ Log out
              </button>
            </form>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-5 sm:px-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-600">
                LEEX / Administration
              </p>
              <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
                Content manager
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex">
                ● Workspace active
              </span>
              <form action="/api/cms/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm font-medium text-slate-500 hover:text-rose-600 md:hidden"
                >
                  Log out
                </button>
              </form>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white shadow-md shadow-violet-200">
                L
              </div>
            </div>
          </header>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-r from-[#30206b] via-violet-700 to-[#b33c86] p-7 text-white shadow-xl shadow-violet-200/50 sm:p-10">
              <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />

              <div className="relative max-w-2xl">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Your creative workspace
                </span>
                <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Make good things
                  <br />
                  happen.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-violet-100 sm:text-base">
                  Manage your portfolio and keep your studio website fresh, all
                  from one place.
                </p>
                <Link
                  href="/cms/dashboard/projects"
                  className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
                >
                  Manage projects <span>↗</span>
                </Link>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
                  Content centre
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Manage your studio
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Select a section to get started.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sections.map((section) => (
                <Link
                  key={section.number}
                  href={section.href}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.color}`}
                  />

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${section.light} ${section.text} text-2xl`}
                    >
                      {section.icon}
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] text-slate-300">
                      {section.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold">{section.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {section.description}
                  </p>

                  <div
                    className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${section.text}`}
                  >
                    Open section
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xl text-white">
                  ◉
                </div>
                <div>
                  <h3 className="font-bold">Your content, in one place</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your existing Sanity project remains the content backend.
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Sanity connected by configuration
              </span>
            </div>

            <footer className="py-7 text-center text-xs text-slate-400">
              LEEX CREATIVE STUDIO · CONTENT MANAGEMENT
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
