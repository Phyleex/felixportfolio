
import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#15132f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-violet-600/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-600/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">
            Contact LEEX
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-24">
          {/* Main call to action */}
          <div>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl md:text-7xl lg:text-8xl">
              Have an idea?
              <br />
              Let&apos;s bring it
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                to life.
              </span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Have a project in mind? Let&apos;s talk about your ideas and
              create something distinctive together.
            </p>

            <a
              href="mailto:popoolafelixoladotun@gmail.com"
              className="group mt-9 inline-flex items-center gap-5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-violet-950/30 transition duration-300 hover:-translate-y-1 hover:from-violet-500 hover:to-pink-500 hover:shadow-violet-500/20"
            >
              Start a project
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* Contact details */}
          <div className="flex flex-col justify-end">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              {/* Email */}
              <div className="border-b border-white/10 pb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300">
                  Email
                </p>

                <a
                  href="mailto: popoolafelixoladotun@gmail.com"
                  className="mt-3 inline-block break-all text-base font-medium text-white transition-colors hover:text-fuchsia-300 sm:text-lg"
                >
                  popoolafelixoladotun@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="border-b border-white/10 py-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                  Phone
                </p>

                <a
                  href="tel:+2348100977788"
                  className="mt-3 inline-block text-lg font-medium text-white transition-colors hover:text-fuchsia-300"
                >
                  +234 810 097 7788
                </a>
              </div>

              {/* Social links */}
              <div className="pt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-pink-300">
                  Follow LEEX
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://www.tiktok.com/@phyleex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/10"
                  >
                    TikTok <span>↗</span>
                  </a>

                  <a
                    href="https://x.com/phyleex"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition duration-300 hover:border-pink-400/50 hover:bg-pink-500/10"
                  >
                    X <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              Have a vision. We&apos;ll help you bring it to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
