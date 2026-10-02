
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SelectedWork from "@/components/SelectedWork";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const highlights = [
  {
    number: "01",
    title: "Brand Identity",
    description: "Distinctive visuals that make brands memorable.",
    color: "from-violet-500 to-indigo-500",
  },
  {
    number: "02",
    title: "Digital Experiences",
    description: "Creative design built for the digital world.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    number: "03",
    title: "Creative Direction",
    description: "Ideas transformed into purposeful visual stories.",
    color: "from-cyan-400 to-blue-500",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#15132f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-20">
        {/* Ambient background effects */}
        <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-[8%] top-[20%] -z-10 hidden h-80 w-80 rounded-full border border-violet-300/15 lg:block" />
        <div className="pointer-events-none absolute right-[11%] top-[24%] -z-10 hidden h-64 w-64 rounded-full border border-pink-300/15 lg:block" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-6xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-100 sm:text-xs">
                Creative Design Studio
              </p>
            </div>

            <h1 className="mt-9 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              We create
              <br />
              visuals that
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                stand out.
              </span>
            </h1>

            <div className="mt-9 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.45)]" />

            <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                LEEX Creative Studio creates bold, purposeful visual experiences
                for brands, businesses and people.
              </p>

              <Link
                href="#work"
                className="group inline-flex w-fit items-center gap-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-900/30"
              >
                Explore our work
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Studio highlights */}
          <div className="mt-16 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3 lg:mt-20">
            {highlights.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-sm font-bold text-white shadow-lg`}
                  >
                    {item.number}
                  </span>
                  <span className="text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-pink-300">
                    ↗
                  </span>
                </div>

                <h2 className="mt-5 text-base font-bold sm:text-lg">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            <span>Independent creative studio</span>
            <span>Scroll to explore ↓</span>
          </div>
        </div>
      </section>

      {/* Existing website sections */}
      <div className="bg-white text-slate-950">
        <SelectedWork />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}