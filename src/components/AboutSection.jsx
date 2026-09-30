export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white px-6 py-24 text-black lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Label */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
              About LEEX
            </p>
          </div>

          {/* Content */}
          <div>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl md:text-6xl">
              We turn ideas into visuals that people remember.
            </h2>

            <div className="mt-10 max-w-2xl space-y-6 text-base leading-7 text-black/60 md:text-lg">
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

            <a
              href="/about"
              className="mt-10 inline-flex border-b-2 border-black pb-2 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
            >
              More about LEEX →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
