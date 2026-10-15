import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function getWebsiteSettings() {
  try {
    return await client.fetch(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        studioName,
        tagline,
        footerText
      }`,
      {},
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Failed to load footer settings:", error);
    return null;
  }
}

export default async function Footer() {
  const settings = await getWebsiteSettings();

  const studioName = settings?.studioName || "LEEX Creative Studio";
  const tagline = settings?.tagline || "Creative Studio";
  const footerText = settings?.footerText;

  return (
    <footer className="relative overflow-hidden bg-[#15132f] px-6 pb-8 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <Link href="#top" className="group w-fit">
              <div className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-4xl font-black tracking-[-0.06em] text-transparent transition-opacity group-hover:opacity-80">
                {studioName}
              </div>

              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                {tagline}
              </div>
            </Link>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-7 gap-y-4 text-sm text-slate-400"
            >
              {[
                ["Work", "#work"],
                ["About", "#about"],
                ["Services", "#services"],
                ["Tools", "#tools"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition-colors duration-200 hover:text-violet-300"
                >
                  {label}
                </a>
              ))}
            </nav>

            <a
              href="#top"
              className="group inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              Back to top
              <span className="text-lg text-violet-300 transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {footerText ||
                `© ${new Date().getFullYear()} ${studioName}. All rights reserved.`}
            </p>

            <p className="text-slate-400">
              Designed & developed by{" "}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text font-semibold text-transparent">
                Xhina Tech
              </span>
              <span aria-hidden="true" className="ml-2 text-pink-400">
                ✦
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
