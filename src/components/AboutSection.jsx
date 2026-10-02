
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#15132f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-600/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">
          {/* Section label and visual */}
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">
                About LEEX
              </p>
            </div>

            <div className="relative mt-10 flex aspect-square max-w-xs items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-[#211b49] to-pink-600/20">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-violet-300/20 transition-transform duration-700 hover:scale-110" />
              <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full border border-pink-300/20" />

              <div className="absolute h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="relative text-center">
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-8xl font-black tracking-[-0.1em] text-transparent">
                  LX
                </span>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-300">
                  Creative Studio
                </p>
              </div>

              <span className="absolute bottom-5 left-6 text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                Ideas into impact.
              </span>
            </div>
          </div>

          {/* About content */}
          <div>
            <h2 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-7xl">
              We turn ideas into visuals that{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                people remember.
              </span>
            </h2>

            <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-slate-300 sm:mt-10 sm:text-base sm:leading-8">
              <p>
                LEEX Creative Studio is a visual design studio focused on
                creating bold and purposeful work for brands, businesses and
                individuals.
              </p>

              <p>
                From brand identities and social media designs to creative
                campaigns and digital experiences, we combine strategy,
                creativity and visual storytelling to bring ideas to life.
              </p>
            </div>

            {/* Studio principles */}
            <div className="mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
              <div>
                <span className="text-2xl font-bold text-violet-300">01</span>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Strategy
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Purpose behind every idea.
                </p>
              </div>

              <div>
                <span className="text-2xl font-bold text-fuchsia-300">02</span>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Creativity
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Visuals with a distinct identity.
                </p>
              </div>

              <div>
                <span className="text-2xl font-bold text-pink-300">03</span>
                <h3 className="mt-3 text-sm font-semibold text-white">
                  Impact
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Work designed to make a difference.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-4 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/10"
            >
              More about LEEX
              <span className="text-lg text-violet-300 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

