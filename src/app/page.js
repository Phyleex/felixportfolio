import Navbar from "@/components/Navbar";
import SelectedWork from "@/components/SelectedWork";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="bg-white text-black">
      <Navbar />

      {/* Hero */}
      <section className="flex min-h-screen items-center px-6 pt-32 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-5xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-black/60">
              Creative Design Studio
            </p>

            <h1 className="text-6xl font-black leading-[0.9] tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-[9rem]">
              We create
              <br />
              visuals that
              <br />
              <span className="text-black/40">stand out.</span>
            </h1>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-base leading-7 text-black/60 md:text-lg">
                LEEX Creative Studio creates bold, purposeful visual experiences
                for brands, businesses and people.
              </p>

              <a
                href="#work"
                className="w-fit border-b-2 border-black pb-2 text-sm font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
              >
                Explore our work →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SelectedWork />
      <AboutSection />
    </main>
  );
}
