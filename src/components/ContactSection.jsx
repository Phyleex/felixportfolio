export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-black px-6 py-24 text-white lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          {/* Main CTA */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              Contact
            </p>

            <h2 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              Have an idea?
              <br />
              Let&apos;s bring it
              <br />
              to life.
            </h2>

            <a
              href="mailto:hello@leexcreative.com"
              className="mt-10 inline-flex border-b-2 border-white pb-2 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
            >
              Start a project →
            </a>
          </div>

          {/* Contact details */}
          <div className="flex flex-col justify-end gap-10">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Email
              </p>

              <a
                href="mailto:Leexcr8vstudio@gmail.com"
                className="text-lg transition-opacity hover:opacity-50"
              >
                Leexcr8vstudio@gmail.com
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Phone
              </p>

              <a
                href="tel:+2348100977788"
                className="text-lg transition-opacity hover:opacity-50"
              >
                +234 810 097 7788
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Social
              </p>

              <div className="flex flex-col gap-2">

                <a
                  href="https://www.tiktok.com/@phyleex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-lg hover:opacity-50"
                >
                  TikTok
                </a>
                <a
                  href="https://x.com/@phyleex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-lg hover:opacity-50"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
