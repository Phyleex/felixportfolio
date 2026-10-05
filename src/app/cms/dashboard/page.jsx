// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { verifyCmsSession } from "@/lib/cms-auth";

// const sections = [
//   {
//     title: "Projects",
//     description:
//       "Manage portfolio projects, images, descriptions and categories.",
//     href: "/cms/dashboard/projects",
//     number: "01",
//     color: "from-violet-600 to-indigo-600",
//     light: "bg-violet-50",
//     text: "text-violet-700",
//     icon: "◈",
//   },
//   {
//     title: "Services",
//     description: "Edit the services displayed on your website.",
//     href: "/cms/dashboard/services",
//     number: "02",
//     color: "from-orange-500 to-rose-500",
//     light: "bg-orange-50",
//     text: "text-orange-700",
//     icon: "✳",
//   },
//   {
//     title: "About",
//     description: "Manage your studio introduction and about section.",
//     href: "/cms/dashboard/about",
//     number: "03",
//     color: "from-cyan-500 to-blue-600",
//     light: "bg-cyan-50",
//     text: "text-cyan-700",
//     icon: "◎",
//   },
//   {
//     title: "Testimonials",
//     description: "Manage client feedback and testimonials.",
//     href: "/cms/dashboard/testimonials",
//     number: "04",
//     color: "from-emerald-500 to-teal-600",
//     light: "bg-emerald-50",
//     text: "text-emerald-700",
//     icon: "❝",
//   },
//   {
//     title: "Website Settings",
//     description: "Manage general website information and settings.",
//     href: "/cms/dashboard/settings",
//     number: "05",
//     color: "from-pink-500 to-fuchsia-600",
//     light: "bg-pink-50",
//     text: "text-pink-700",
//     icon: "⚙",
//   },
// ];

// export default async function CmsDashboardPage() {
//   const isAuthenticated = await verifyCmsSession();

//   if (!isAuthenticated) {
//     redirect("/cms/login");
//   }

//   return (
//     <main className="min-h-screen bg-[#f6f7fb] text-slate-900">
//       <div className="flex min-h-screen">
//         <aside className="hidden w-64 shrink-0 flex-col bg-[#17152e] p-6 text-white md:flex">
//           <Link href="/" className="inline-block">
//             <span className="text-xl font-bold tracking-[0.28em]">LEEX</span>
//             <span className="mt-1 block text-[10px] tracking-[0.25em] text-violet-200">
//               CREATIVE STUDIO
//             </span>
//           </Link>

//           <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-bold">
//                 L
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">LEEX Workspace</p>
//                 <p className="mt-1 text-xs text-slate-400">
//                   Content management
//                 </p>
//               </div>
//             </div>
//           </div>

//           <p className="mb-3 mt-10 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
//             Workspace
//           </p>

//           <nav className="space-y-2">
//             {sections.map((section, index) => (
//               <Link
//                 key={section.number}
//                 href={section.href}
//                 className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
//               >
//                 <span
//                   className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${section.color} text-sm text-white`}
//                 >
//                   {section.icon}
//                 </span>
//                 <span>{section.title}</span>
//                 <span className="ml-auto text-xs text-slate-500">
//                   {section.number}
//                 </span>
//               </Link>
//             ))}
//           </nav>

//           <div className="mt-auto space-y-2 border-t border-white/10 pt-5">
//             <Link
//               href="/"
//               className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
//             >
//               ↗ View website
//             </Link>

//             <form action="/api/cms/logout" method="POST">
//               <button
//                 type="submit"
//                 className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
//               >
//                 ↪ Log out
//               </button>
//             </form>
//           </div>
//         </aside>

//         <section className="min-w-0 flex-1">
//           <header className="flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-5 sm:px-10">
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-600">
//                 LEEX / Administration
//               </p>
//               <h1 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
//                 Content manager
//               </h1>
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="hidden rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:inline-flex">
//                 ● Workspace active
//               </span>
//               <form action="/api/cms/logout" method="POST">
//                 <button
//                   type="submit"
//                   className="text-sm font-medium text-slate-500 hover:text-rose-600 md:hidden"
//                 >
//                   Log out
//                 </button>
//               </form>
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-sm font-bold text-white shadow-md shadow-violet-200">
//                 L
//               </div>
//             </div>
//           </header>

//           <div className="px-6 py-8 sm:px-10 sm:py-10">
//             <div className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-r from-[#30206b] via-violet-700 to-[#b33c86] p-7 text-white shadow-xl shadow-violet-200/50 sm:p-10">
//               <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
//               <div className="pointer-events-none absolute -bottom-24 right-36 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />

//               <div className="relative max-w-2xl">
//                 <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]">
//                   Your creative workspace
//                 </span>
//                 <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
//                   Make good things
//                   <br />
//                   happen.
//                 </h2>
//                 <p className="mt-4 max-w-lg text-sm leading-6 text-violet-100 sm:text-base">
//                   Manage your portfolio and keep your studio website fresh, all
//                   from one place.
//                 </p>
//                 <Link
//                   href="/cms/dashboard/projects"
//                   className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
//                 >
//                   Manage projects <span>↗</span>
//                 </Link>
//               </div>
//             </div>

//             <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-600">
//                   Content centre
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold tracking-tight">
//                   Manage your studio
//                 </h2>
//               </div>
//               <p className="text-sm text-slate-500">
//                 Select a section to get started.
//               </p>
//             </div>

//             <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//               {sections.map((section) => (
//                 <Link
//                   key={section.number}
//                   href={section.href}
//                   className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
//                 >
//                   <div
//                     className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${section.color}`}
//                   />

//                   <div className="flex items-start justify-between">
//                     <div
//                       className={`flex h-12 w-12 items-center justify-center rounded-2xl ${section.light} ${section.text} text-2xl`}
//                     >
//                       {section.icon}
//                     </div>
//                     <span className="text-xs font-semibold tracking-[0.18em] text-slate-300">
//                       {section.number}
//                     </span>
//                   </div>

//                   <h3 className="mt-6 text-lg font-bold">{section.title}</h3>
//                   <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
//                     {section.description}
//                   </p>

//                   <div
//                     className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${section.text}`}
//                   >
//                     Open section
//                     <span className="transition-transform group-hover:translate-x-1">
//                       →
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xl text-white">
//                   ◉
//                 </div>
//                 <div>
//                   <h3 className="font-bold">Your content, in one place</h3>
//                   <p className="mt-1 text-sm text-slate-500">
//                     Your existing Sanity project remains the content backend.
//                   </p>
//                 </div>
//               </div>

//               <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
//                 <span className="h-2 w-2 rounded-full bg-emerald-500" />
//                 Sanity connected by configuration
//               </span>
//             </div>

//             <footer className="py-7 text-center text-xs text-slate-400">
//               LEEX CREATIVE STUDIO · CONTENT MANAGEMENT
//             </footer>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

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
    title: "Services",
    description: "Edit the services displayed on your website.",
    href: "/cms/dashboard/services",
    number: "03",
    color: "from-orange-500 to-rose-500",
    light: "bg-orange-50",
    text: "text-orange-700",
    icon: "✳",
  },
  {
    title: "About",
    description: "Manage your studio introduction and about section.",
    href: "/cms/dashboard/about",
    number: "04",
    color: "from-cyan-500 to-blue-600",
    light: "bg-cyan-50",
    text: "text-cyan-700",
    icon: "◎",
  },
  {
    title: "Testimonials",
    description: "Manage client feedback and testimonials.",
    href: "/cms/dashboard/testimonials",
    number: "05",
    color: "from-emerald-500 to-teal-600",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    icon: "❝",
  },
  {
    title: "Website Settings",
    description: "Manage general website information and settings.",
    href: "/cms/dashboard/settings",
    number: "06",
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

  const activeSections = sections.filter(
    (section) => section.title === "Projects" || section.title === "Brands",
  );

  const comingSoonSections = sections.filter(
    (section) => section.title !== "Projects" && section.title !== "Brands",
  );

  return (
    <main className="min-h-screen bg-[#f5f3ff] text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-72 shrink-0 flex-col bg-[#17142f] p-6 text-white lg:flex">
          <Link href="/" className="group inline-block">
            <div className="flex items-center gap-3">
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
            </div>
          </Link>

          {/* WORKSPACE */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-lg font-bold">
                L
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">LEEX Workspace</p>

                <p className="mt-1 text-xs text-slate-500">
                  Content management
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Workspace active
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="mt-9">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
              Workspace
            </p>

            <nav className="space-y-1.5">
              {sections.map((section) => (
                <Link
                  key={section.number}
                  href={section.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${section.color} text-sm text-white shadow-sm`}
                  >
                    {section.icon}
                  </span>

                  <span>{section.title}</span>

                  <span className="ml-auto text-[10px] font-medium text-slate-600 transition group-hover:text-slate-400">
                    {section.number}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="mt-auto space-y-2 border-t border-white/10 pt-5">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
            >
              <span>↗</span>
              View website
            </Link>

            <form action="/api/cms/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-rose-300 transition hover:bg-rose-500/10"
              >
                <span>↪</span>
                Log out
              </button>
            </form>
          </div>
        </aside>

        {/* MAIN */}
        <section className="min-w-0 flex-1">
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

          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10">
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
                  Manage your portfolio, clients and studio content from one
                  place. Keep the LEEX experience fresh and consistent.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/cms/dashboard/projects"
                    className="inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
                  >
                    Manage projects
                    <span>↗</span>
                  </Link>

                  <Link
                    href="/cms/dashboard/brands"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    Manage brands
                    <span>→</span>
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

                <p className="mt-1 text-xs text-violet-500">
                  Portfolio manager
                </p>
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

                <p className="mt-2 text-2xl font-black text-emerald-700">
                  LIVE
                </p>

                <p className="mt-1 text-xs text-emerald-500">
                  Sanity connected
                </p>
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

              <p className="text-sm text-slate-500">
                Your active CMS sections.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
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
        </section>
      </div>
    </main>
  );
}