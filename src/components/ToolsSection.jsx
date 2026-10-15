import { client } from "@/sanity/lib/client";
import { FEATURED_TOOLS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export default async function ToolsSection() {
  let tools = [];

  try {
    tools = await client.fetch(FEATURED_TOOLS_QUERY);
    tools = tools.slice(0, 6);
  } catch (error) {
    console.error("Failed to load featured tools:", error);
  }

  return (
    <section
      id="tools"
      className="bg-[#15132f] px-6 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
          My Creative Toolkit
        </p>

        <h2 className="mt-3 text-3xl font-black sm:text-5xl">
          Tools & Technologies
        </h2>

        <p className="mt-4 max-w-2xl text-slate-400">
          The creative tools I use to transform ideas into impactful designs
          and visual experiences.
        </p>

        {tools.length === 0 ? (
          <p className="mt-8 text-slate-400">
            Featured tools will be displayed here once they are published
            and selected for the homepage.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <article
                key={tool._id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-violet-400/50 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-4">
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt={`${tool.name} logo`}
                      className="h-14 w-14 rounded-xl bg-white p-2 object-contain"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/20 text-xl font-bold text-violet-300">
                      {tool.name?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold">{tool.name}</h3>
                    <p className="mt-1 text-sm capitalize text-violet-300">
                      {tool.category?.replaceAll("-", " ")}
                    </p>
                  </div>
                </div>

                {tool.description && (
                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>
                )}

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-xs text-slate-400">
                    <span>Proficiency</span>
                    <span>{tool.proficiency ?? 0}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, tool.proficiency ?? 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:bg-violet-500/10"
          >
            View All Tools
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
