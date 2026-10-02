
const services = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Distinctive visual identities that give brands a clear and memorable presence.",
    accent: "from-violet-400 to-purple-500",
    color: "text-violet-300",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Purposeful designs for campaigns, marketing materials, publications and more.",
    accent: "from-purple-400 to-fuchsia-500",
    color: "text-fuchsia-300",
  },
  {
    number: "03",
    title: "Social Media Design",
    description:
      "Scroll-stopping visuals designed to make your brand stand out across social platforms.",
    accent: "from-fuchsia-400 to-pink-500",
    color: "text-pink-300",
  },
  {
    number: "04",
    title: "Creative Campaigns",
    description:
      "Creative concepts and visual systems that turn ideas into engaging campaigns.",
    accent: "from-pink-400 to-rose-500",
    color: "text-rose-300",
  },
  {
    number: "05",
    title: "Digital Design",
    description:
      "Modern visual experiences for websites, digital products and online platforms.",
    accent: "from-cyan-400 to-violet-500",
    color: "text-cyan-300",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-[#15132f] px-6 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-pink-600/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-200">
                What we offer
              </p>
            </div>

            <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-7xl">
              What we{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                do.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-slate-300 sm:text-base">
            Creative solutions built around your brand, your vision and the
            impression you want to leave.
          </p>
        </div>

        {/* Services list */}
        <div className="border-t border-white/10">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative grid gap-5 border-b border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.025] sm:py-10 md:grid-cols-[70px_1fr_1fr_40px] md:items-center md:gap-8 md:py-11 md:hover:px-5"
            >
              {/* Gradient hover indicator */}
              <div
                className={`absolute bottom-0 left-0 top-0 w-0.5 origin-bottom scale-y-0 bg-gradient-to-b ${service.accent} transition-transform duration-300 group-hover:scale-y-100`}
              />

              <span
                className={`text-xs font-bold tracking-[0.15em] text-slate-500 transition-colors duration-300 group-hover:${service.color}`}
              >
                {service.number}
              </span>

              <h3 className="text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-violet-200 sm:text-3xl md:text-4xl lg:text-5xl">
                {service.title}
              </h3>

              <p className="max-w-md text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:text-base">
                {service.description}
              </p>

              <span
                className={`hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-lg text-slate-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-violet-400/40 group-hover:bg-violet-500/10 group-hover:text-violet-300 md:flex`}
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          ))}
        </div>

        {/* Closing note */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Five ways to bring your ideas to life.
          </p>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-violet-300"
          >
            Discuss your project
            <span className="text-lg text-violet-300 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

