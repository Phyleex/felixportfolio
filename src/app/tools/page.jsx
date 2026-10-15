import { client } from "@/sanity/lib/client";
import { TOOLS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export const metadata = {
  title: "Tools & Technologies | LEEX Creative Studio",
  description:
    "Explore the creative tools and technologies used by LEEX Creative Studio.",
};

export default async function ToolsPage() {
  let tools = [];

  try {
    tools = await client.fetch(TOOLS_QUERY);
  } catch (error) {
    console.error("Failed to load tools:", error);
  }

  return (
    <main className="min-h-screen bg-[#15132f] px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/#tools"
          className="inline-flex items-center gap-2 text-sm text-violet-300 transition hover:text-white"
        >
          <span aria-hidden="true">←</span>
          Back to Home
        </Link>

        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            My Creative Toolkit
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            All Tools & Technologies
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Explore the tools and technologies I use to create designs,
            develop visual experiences, and bring creative ideas to life.
          </p>
        </div>

        {tools.length === 0 ? (
          <p className="mt-10 text-slate-400">
            No tools are available yet. Publish tools in Sanity and enable
            Show on Website to display them here.
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
                    <h2 className="font-bold">{tool.name}</h2>
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

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/#tools"
            className="text-sm font-semibold text-violet-300 transition hover:text-white"
          >
            ← Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}