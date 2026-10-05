import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { ALL_PROJECTS_QUERY } from "@/sanity/lib/queries";

const gradients = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-fuchsia-600 via-pink-600 to-rose-600",
  "from-cyan-500 via-blue-600 to-violet-700",
];

const accents = ["text-violet-300", "text-pink-300", "text-cyan-300"];

async function getProjects() {
  try {
    return await client.fetch(ALL_PROJECTS_QUERY);
  } catch (error) {
    console.error("Failed to fetch portfolio projects:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#15132f] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pb-24">
        <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-white"
          >
            ← Back home
          </Link>

          <div className="mt-16 max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-200 sm:text-xs">
                LEEX Creative Studio
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Recent{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Works.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              A collection of creative work developed for brands, businesses and
              individuals.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-300">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-300">
              Creative portfolio
            </span>
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-2xl">
                ◈
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                No projects published yet.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
                Projects added through the LEEX CMS will appear here once they
                are published.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#17142f] transition hover:bg-violet-100"
              >
                Return home
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <Link
                  key={project._id}
                  href={`/portfolio/${project.slug?.current || project.slug}`}
                  className="group block"
                >
                  <article
                    className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    } p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl sm:p-6`}
                  >
                    {/* IMAGE */}
                    <div className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-slate-900">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-6xl font-black text-white/30">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}

                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {project.featured ? "Featured" : "LEEX / WORK"}
                      </span>

                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 group-hover:rotate-45">
                        ↗
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="mt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                            accents[index % accents.length]
                          }`}
                        >
                          {project.category || "Creative"}
                        </span>

                        {project.year && (
                          <span className="text-xs text-white/50">
                            {project.year}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-violet-100 sm:text-3xl">
                        {project.title}
                      </h2>

                      {project.brand && (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                          {project.brand}
                        </p>
                      )}

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/65">
                        {project.description ||
                          "Creative work developed by LEEX Creative Studio."}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                          View project
                        </span>

                        <span className="text-lg text-white transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-white/10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">
              Have a project in mind?
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Let&apos;s create something distinctive.
            </h2>
          </div>

          <Link
            href="/#contact"
            className="inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#17142f] transition hover:bg-violet-100"
          >
            Start a conversation
            <span className="text-base">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
