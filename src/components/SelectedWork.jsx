import Link from "next/link";

const projects = [
  {
    title: "Brand Identity",
    category: "Branding",
    year: "2026",
    number: "01",
    description: "Building distinctive visual identities for memorable brands.",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    glow: "group-hover:shadow-violet-500/10",
    accent: "text-violet-300",
  },
  {
    title: "Social Campaign",
    category: "Social Media",
    year: "2026",
    number: "02",
    description:
      "Creating engaging digital campaigns that connect with people.",
    gradient: "from-fuchsia-600 via-pink-600 to-rose-600",
    glow: "group-hover:shadow-pink-500/10",
    accent: "text-pink-300",
  },
  {
    title: "Creative Direction",
    category: "Art Direction",
    year: "2026",
    number: "03",
    description: "Turning ambitious ideas into purposeful visual stories.",
    gradient: "from-cyan-500 via-blue-600 to-violet-700",
    glow: "group-hover:shadow-cyan-500/10",
    accent: "text-cyan-300",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#15132f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 flex flex-col gap-7 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-200 sm:text-xs">
                Ideas brought to life
              </p>
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-6xl md:text-7xl">
              Recent{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                projects.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-300 sm:text-base">
            A selection of creative work developed for brands, businesses and
            individuals.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl ${project.glow} sm:p-7`}
            >
              {/* Colorful project visual */}
              <div
                className={`relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20 transition duration-500 group-hover:scale-125" />
                <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-white/20 transition duration-500 group-hover:scale-110" />
                <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-2xl" />

                <span className="relative text-7xl font-black tracking-[-0.08em] text-white/90 transition duration-500 group-hover:scale-110 sm:text-8xl">
                  {project.number}
                </span>

                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  LEEX / WORK
                </span>

                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg text-white backdrop-blur-md transition duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-violet-700">
                  ↗
                </span>
              </div>

              {/* Project details */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${project.accent}`}
                  >
                    {project.category}
                  </span>

                  <span className="text-xs text-slate-500">{project.year}</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-violet-200 sm:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 h-px w-full bg-white/10">
                  <div
                    className={`h-px w-0 bg-gradient-to-r ${project.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Thoughtful ideas. Distinctive execution.
          </p>

          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-4 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition hover:border-violet-400/50 hover:bg-violet-500/10"
          >
            View all work
            <span className="text-lg text-violet-300 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
