const services = [
  {
    number: "01",
    title: "Brand Identity",
    description:
      "Distinctive visual identities that give brands a clear and memorable presence.",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Purposeful designs for campaigns, marketing materials, publications and more.",
  },
  {
    number: "03",
    title: "Social Media Design",
    description:
      "Scroll-stopping visuals designed to make your brand stand out across social platforms.",
  },
  {
    number: "04",
    title: "Creative Campaigns",
    description:
      "Creative concepts and visual systems that turn ideas into engaging campaigns.",
  },
  {
    number: "05",
    title: "Digital Design",
    description:
      "Modern visual experiences for websites, digital products and online platforms.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white px-6 py-24 text-black lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
            Services
          </p>

          <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            What we do.
          </h2>
        </div>

        <div className="border-t border-black/20">
          {services.map((service) => (
            <article
              key={service.number}
              className="group grid gap-6 border-b border-black/20 py-10 transition-all duration-300 md:grid-cols-[80px_1fr_1fr] md:items-start md:gap-8 md:py-12"
            >
              <span className="text-sm font-semibold text-black/40">
                {service.number}
              </span>

              <h3 className="text-3xl font-bold tracking-tight md:text-5xl">
                {service.title}
              </h3>

              <p className="max-w-md text-base leading-7 text-black/60 md:pt-2">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
