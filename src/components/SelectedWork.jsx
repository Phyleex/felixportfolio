const projects = [
  {
    title: "Brand Identity",
    category: "Branding",
    year: "2026",
  },
  {
    title: "Social Campaign",
    category: "Social Media",
    year: "2026",
  },
  {
    title: "Creative Direction",
    category: "Art Direction",
    year: "2026",
  },
];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="bg-black px-6 py-24 text-white lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Ideas brought to life.
            </p>

            <h2 className="text-5xl font-black tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Recent projects.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/60">
            A selection of creative work developed for brands, businesses and
            individuals.
          </p>
        </div>

        {/* Project list */}
        <div className="border-t border-white/20">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group grid border-b border-white/20 py-8 transition-colors duration-300 hover:bg-white hover:px-6 hover:text-black md:grid-cols-[80px_1fr_auto_auto] md:items-center md:gap-8"
            >
              <span className="text-sm text-white/40 group-hover:text-black/40">
                0{index + 1}
              </span>

              <h3 className="mt-3 text-3xl font-bold tracking-tight md:mt-0 md:text-5xl">
                {project.title}
              </h3>

              <span className="mt-4 text-sm text-white/50 group-hover:text-black/50 md:mt-0">
                {project.category}
              </span>

              <span className="mt-2 text-sm text-white/50 group-hover:text-black/50 md:mt-0">
                {project.year}
              </span>
            </article>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12">
          <a
            href="/portfolio"
            className="inline-flex border-b border-white pb-2 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
          >
            View all work →
          </a>
        </div>
      </div>
    </section>
  );
}
