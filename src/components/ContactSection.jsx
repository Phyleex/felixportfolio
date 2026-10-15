export default function ContactSection() {
  const email = "popoolafelixoladotun@gmail.com";

  const emailLink = `mailto:${email}?subject=${encodeURIComponent(
    "Project Inquiry - LEEX Creative Studio"
  )}`;

  const whatsappMessage = encodeURIComponent(
    "Hello LEEX Creative Studio, I would like to discuss a project."
  );

  const whatsappNumbers = [
    {
      label: "WhatsApp 1",
      link: "2348100977788",
    },
    {
      label: "WhatsApp 2",
      link: "2349010466336",
    },
  ];

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
                  aria-label="Send an email to LEEX Creative Studio"
                  className="mt-4 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition duration-300 hover:border-violet-400/50 hover:bg-violet-500/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 text-violet-300"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  Send an Email
                  <span>↗</span>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="border-b border-white/10 py-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-green-400">
                  WhatsApp
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {whatsappNumbers.map((contact) => (
                    <a
                      key={contact.link}
                      href={`https://wa.me/${contact.link}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Chat with LEEX Creative Studio using ${contact.label}`}
                      className="inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition duration-300 hover:border-green-400/50 hover:bg-green-500/10"
                    >
                      {/* WhatsApp logo */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="h-6 w-6 shrink-0 text-[#25D366]"
                        aria-hidden="true"
                      >
                        <path d="M16.04 2.67A13.25 13.25 0 0 0 4.65 22.7L2.8 29.33l6.8-1.78a13.3 13.3 0 0 0 6.35 1.62h.01A13.25 13.25 0 0 0 16.04 2.67Zm-.07 24.26h-.01a11 11 0 0 1-5.6-1.53l-.4-.24-4.03 1.06L7 22.3l-.26-.41a10.94 10.94 0 1 1 9.23 5.04Zm6.01-8.2c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.39.25-.72.08-.33-.17-1.39-.51-2.65-1.63-.98-.88-1.64-1.96-1.83-2.29-.19-.33-.02-.51.14-.67.15-.15.33-.39.5-.58.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.79-1.01-2.45-.27-.65-.54-.56-.74-.57l-.63-.01c-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73s1.18 3.17 1.34 3.39c.17.22 2.32 3.54 5.62 4.96.79.34 1.41.55 1.89.7.79.25 1.5.21 2.07.13.63-.09 1.95-.8 2.23-1.57.27-.77.27-1.43.19-1.57-.08-.14-.3-.22-.63-.39Z" />
                      </svg>

                      {contact.label}
                      <span>↗</span>
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
                  aria-label="Call LEEX Creative Studio"
                  className="mt-4 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium transition duration-300 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 text-fuchsia-300"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
                  </svg>
                  Call LEEX
                  <span>↗</span>
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
