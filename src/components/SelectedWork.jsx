import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";

const gradients = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-fuchsia-600 via-pink-600 to-rose-600",
  "from-cyan-500 via-blue-600 to-violet-700",
];

const accents = ["text-violet-300", "text-pink-300", "text-cyan-300"];

async function getFeaturedProjects() {
  try {
    return await client.fetch(PROJECTS_QUERY);
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export default async function SelectedWork() {
  const projects = await getFeaturedProjects();

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-[#15132f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl">
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

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-12 text-center">
            <h3 className="text-xl font-bold">Our work is coming soon.</h3>

            <p className="mt-3 text-sm text-slate-400">
              Featured projects will appear here once they are published.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const projectSlug = project.slug?.current || project.slug || "";

              return (
                <Link
                  key={project._id}
                  href={`/portfolio/${projectSlug}`}
                  className="block h-full"
                >
                  <article
                    className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-2xl sm:p-6 ${gradients[index % gradients.length]}`}
                  >
                    <div className="relative aspect-[5/3] overflow-hidden rounded-xl bg-slate-800">
                      {project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl font-black text-white/50">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      )}

                      <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        LEEX / WORK
                      </span>

                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-lg text-white backdrop-blur-md transition duration-300 group-hover:rotate-45">
                        ↗
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accents[index % accents.length]}`}
                        >
                          {project.category}
                        </span>

                        <span className="text-xs text-slate-500">
                          {project.year || ""}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-violet-200 sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {project.description ||
                          "Creative work developed by LEEX Creative Studio."}
                      </p>

                      <div className="mt-6 h-px w-full bg-white/10">
                        <div
                          className={`h-px w-0 bg-gradient-to-r ${
                            gradients[index % gradients.length]
                          } transition-all duration-500 group-hover:w-full`}
                        />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

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
