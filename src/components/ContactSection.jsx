export default function ContactSection() {
  const email = "popoolafelixoladotun@gmail.com";

  const emailLink = `mailto:${email}?subject=${encodeURIComponent(
    "Project Inquiry - LEEX Creative Studio"
  )}`;

  const whatsappNumbers = [
    {
      number: "08100977788",
      link: "2348100977788",
    },
    {
      number: "0901 046 6336",
      link: "2349010466336",
    },
  ];

  const whatsappMessage = encodeURIComponent(
    "Hello LEEX Creative Studio, I would like to discuss a project."
  );

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
              href={emailLink}
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
                  href={emailLink}
                  className="mt-3 inline-block break-all text-base font-medium text-white transition-colors hover:text-fuchsia-300 sm:text-lg"
                >
                  {email}
                </a>
              </div>

              {/* WhatsApp contacts */}
              <div className="border-b border-white/10 py-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400">
                  WhatsApp
                </p>

                <div className="mt-4 space-y-4">
                  {whatsappNumbers.map((contact) => (
                    <a
                      key={contact.link}
                      href={`https://wa.me/${contact.link}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat with LEEX Creative Studio on WhatsApp at ${contact.number}`}
                      className="flex items-center gap-3 text-base font-medium text-white transition-colors hover:text-green-400 sm:text-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6 shrink-0 text-green-400"
                        aria-hidden="true"
                      >
                        <path d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.27-1.65a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93a11.85 11.85 0 0 0-3.49-8.42ZM12.08 21.8a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.84 9.84 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                      </svg>

                      <span>{contact.number}</span>
                      <span className="text-sm">↗</span>
                    </a>
                  ))}
                </div>
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
