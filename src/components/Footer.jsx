export default function Footer() {
  return (
    <footer className="bg-black px-6 pb-8 text-white lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="border-t border-white/20 pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            {/* Brand */}
            <div>
              <div className="text-3xl font-black tracking-tight">LEEX</div>

              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Creative Studio
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/60">
              <a href="#work" className="transition-colors hover:text-white">
                Work
              </a>

              <a href="#about" className="transition-colors hover:text-white">
                About
              </a>

              <a
                href="#services"
                className="transition-colors hover:text-white"
              >
                Services
              </a>

              <a href="#contact" className="transition-colors hover:text-white">
                Contact
              </a>
            </nav>
          </div>

          {/* Bottom */}
          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} LEEX Creative Studio. All rights
              reserved.
            </p>

            <a href="#" className="w-fit transition-colors hover:text-white">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
