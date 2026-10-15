import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  let message = "We're upgrading our website. We'll be back shortly.";

  try {
    const settings = await client.fetch(
      '*[_id == "siteSettings"][0]{ maintenanceMessage }',
    );

    if (settings?.maintenanceMessage) {
      message = settings.maintenanceMessage;
    }
  } catch (error) {
    console.error("Unable to load maintenance message:", error);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#17142f] px-6 text-center text-white">
      <div className="max-w-xl">
        <div className="mb-6 text-5xl">🛠️</div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
          LEEX Creative Studio
        </p>

        <h1 className="mb-5 text-4xl font-bold sm:text-5xl">
          We’ll Be Back Soon
        </h1>

        <p className="whitespace-pre-line text-lg leading-8 text-gray-300">
          {message}
        </p>
      </div>
    </main>
  );
}
