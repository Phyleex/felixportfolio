import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyCmsSession } from "@/lib/cms-auth";

const sections = [
  {
    title: "Projects",
    description:
      "Manage portfolio projects, images, videos, descriptions and categories.",
    href: "/cms/dashboard/projects",
    number: "01",
    color: "from-violet-600 to-indigo-600",
    light: "bg-violet-50",
    text: "text-violet-700",
    icon: "◈",
  },
  {
    title: "Brands",
    description:
      "Manage clients, brand identities, logos and project relationships.",
    href: "/cms/dashboard/brands",
    number: "02",
    color: "from-fuchsia-600 to-pink-600",
    light: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    icon: "◇",
  },
  {
    title: "Tools",
    description:
      "Manage your creative tools, technologies, logos and proficiency levels.",
    href: "/cms/dashboard/tools",
    number: "03",
    color: "from-violet-500 to-fuchsia-500",
    light: "bg-violet-50",
    text: "text-violet-700",
    icon: "⚒",
  },
  {
    title: "Services",
    description:
      "Add, edit, reorder and hide services and their sub-services on your website.",
    href: "/cms/dashboard/services",
    number: "04",
    color: "from-orange-500 to-rose-500",
    light: "bg-orange-50",
    text: "text-orange-700",
    icon: "✳",
  },
  {
    title: "About",
    description: "Manage your studio introduction and about section.",
    href: "/cms/dashboard/about",
    number: "05",
    color: "from-cyan-500 to-blue-600",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    icon: "◎",
  },
  {
    title: "Testimonials",
    description: "Manage client feedback and testimonials.",
    href: "/cms/dashboard/testimonials",
    number: "06",
    color: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "❝",
  },
  {
    title: "Website Settings",
    description: "Manage general website information and settings.",
    href: "/cms/dashboard/settings",
    number: "07",
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

  const activeSections = sections.filter((section) =>
    ["Projects", "Brands", "Tools", "Services"].includes(section.title),
  );

  const comingSoonSections = sections.filter(
    (section) =>
      !["Projects", "Brands", "Tools", "Services"].includes(section.title),
  );

  return (
    <main className="min-h-screen w-full bg-[#f5f3ff] text-slate-900">
      {/* TOP BAR */}
      <header className="border-b border-slate-200/80 bg-white">
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
              LEEX / Administration
            </p>
            <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
              Content manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
              <span className="mr-2">●</span>
              Workspace active
            </span>

            <form action="/api/cms/logout" method="POST">
              <button
                type="submit"
                className="hidden text-sm font-medium text-slate-500 transition hover:text-rose-600 sm:block lg:hidden"
              >
                Log out
              </button>
            </form>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white shadow-md shadow-violet-200">
              L
            </div>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <div className="w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#28195e] via-violet-700 to-[#b63b87] p-7 text-white shadow-2xl shadow-violet-200/60 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-[45px] border-white/[0.07]" />
          <div className="pointer-events-none absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
              Creative workspace
            </span>

            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Make good things
              <br />
              happen.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
              Manage your portfolio, clients, tools and studio content from one
              place. Keep the LEEX experience fresh and consistent.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/cms/dashboard/projects"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Manage projects <span>↗</span>
              </Link>

              <Link
                href="/cms/dashboard/brands"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Manage brands <span>→</span>
              </Link>

              <Link
                href="/cms/dashboard/tools"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Manage tools <span>→</span>
              </Link>

              <Link
                href="/cms/dashboard/services"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Manage services <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Sections
            </p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {sections.length}
            </p>
            <p className="mt-1 text-xs text-slate-400">Content areas</p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
              Projects
            </p>
            <p className="mt-2 text-2xl font-black text-violet-700">CMS</p>
            <p className="mt-1 text-xs text-violet-500">Portfolio manager</p>
          </div>

          <div className="rounded-2xl border border-fuchsia-100 bg-fuchsia-50/60 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fuchsia-500">
              Brands
            </p>
            <p className="mt-2 text-2xl font-black text-fuchsia-700">CMS</p>
            <p className="mt-1 text-xs text-fuchsia-500">Client manager</p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-500">
              Backend
            </p>
            <p className="mt-2 text-2xl font-black text-emerald-700">LIVE</p>
            <p className="mt-1 text-xs text-emerald-500">Sanity connected</p>
          </div>
        </div>

        {/* ACTIVE MANAGEMENT */}
        <div className="mb-5 mt-10 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
              Content centre
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Manage your studio
            </h2>
          </div>
          <p className="text-sm text-slate-500">Your active CMS sections.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {activeSections.map((section) => (
            <Link
              key={section.number}
              href={section.href}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60 sm:p-7"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.color}`}
              />

              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${section.light} ${section.text} text-2xl`}
                >
                  {section.icon}
                </div>
                <span className="text-xs font-bold tracking-[0.18em] text-slate-300">
                  {section.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold">{section.title}</h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {section.description}
              </p>

              <div
                className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${section.text}`}
              >
                Open manager
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* COMING SOON */}
        {comingSoonSections.length > 0 && (
          <>
            <div className="mb-5 mt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Coming next
              </p>
              <h2 className="mt-2 text-xl font-bold">More studio controls</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {comingSoonSections.map((section) => (
                <div
                  key={section.number}
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 opacity-75"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.color}`}
                  />

                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${section.light} ${section.text}`}
                    >
                      {section.icon}
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                      Soon
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold">{section.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SYSTEM STATUS */}
        <div className="mt-7 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xl text-white shadow-lg shadow-emerald-100">
              ◉
            </div>

            <div>
              <h3 className="font-bold">Content system online</h3>
              <p className="mt-1 text-sm text-slate-500">
                Your custom CMS is connected to the Sanity backend.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Operational
          </span>
        </div>

        <footer className="py-8 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
          LEEX CREATIVE STUDIO · CONTENT MANAGEMENT
        </footer>
      </div>
    </main>
  );
}
