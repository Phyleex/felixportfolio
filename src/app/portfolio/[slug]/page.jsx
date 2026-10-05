import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PROJECT_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const gradients = [
  "from-violet-600 via-purple-600 to-indigo-700",
  "from-fuchsia-600 via-pink-600 to-rose-600",
  "from-cyan-500 via-blue-600 to-violet-700",
];

async function getProject(slug) {
  try {
    return await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#15132f] text-white">
      {/* HEADER */}
      <section className="relative isolate overflow-hidden px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-10 lg:px-16">
        <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-40 -z-10 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[120px]" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-white"
          >
            <span className="text-base">←</span>
            Back to Recent Works
          </Link>
        </div>
      </section>

      {/* PROJECT INTRO */}
      <section className="px-5 pb-12 sm:px-8 sm:pb-16 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
            {/* TITLE */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                  {project.category || "Creative"}
                </span>

                {project.year && (
                  <span className="text-xs text-slate-500">{project.year}</span>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl break-words text-4xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl sm:leading-[0.92] md:text-7xl lg:text-8xl">
                {project.title}
              </h1>

              {project.brand && (
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300 sm:text-xs">
                  {project.brand}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="min-w-0 lg:pb-2">
              <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:text-lg">
                {project.description ||
                  "Creative work developed by LEEX Creative Studio."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      <section className="px-5 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-3xl">
            {project.coverImage ? (
              <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-violet-700 to-fuchsia-700 sm:aspect-[16/9]">
                <span className="text-5xl font-black text-white/30 sm:text-7xl">
                  LEEX
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS */}
      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 border-y border-white/10 py-8 sm:grid-cols-3 sm:gap-6 sm:py-10">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Client
              </p>

              <p className="mt-2 text-base font-semibold sm:text-lg">
                {project.brand || "—"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Category
              </p>

              <p className="mt-2 text-base font-semibold sm:text-lg">
                {project.category || "—"}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Year
              </p>

              <p className="mt-2 text-base font-semibold sm:text-lg">
                {project.year || "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery?.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-16 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 sm:mb-10">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-violet-300 sm:text-[10px]">
                Project gallery
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight sm:mt-3 sm:text-5xl">
                The work.
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {project.gallery.map((image, index) => {
                const isFeatured = index % 3 === 0;

                return (
                  <div
                    key={`${image.url}-${index}`}
                    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    } p-2.5 sm:rounded-3xl sm:p-3 ${
                      isFeatured ? "md:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden rounded-xl sm:rounded-2xl ${
                        isFeatured
                          ? "aspect-[4/3] sm:aspect-[16/9]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={
                          image.alt || `${project.title} design ${index + 1}`
                        }
                        fill
                        unoptimized
                        sizes={
                          isFeatured
                            ? "(max-width: 768px) 100vw, 100vw"
                            : "(max-width: 768px) 100vw, 50vw"
                        }
                        className="object-cover transition duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="border-t border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-violet-300 sm:text-[10px]">
              More creative work
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl">
              Explore more projects.
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#17142f] transition hover:bg-violet-100"
          >
            View Recent Works
            <span className="text-base">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
