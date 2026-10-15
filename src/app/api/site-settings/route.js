import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const runtime = "nodejs";

export async function GET() {
  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
        studioName,
        tagline,
        contactEmail,
        phone,
        location,
        websiteTitle,
        metaDescription,
        xUrl,
        tiktokUrl,
        footerText
      }`,
      {},
      { next: { revalidate: 60 } },
    );

    return NextResponse.json(
      { settings: settings || null },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=60",
        },
      },
    );
  } catch (error) {
    console.error("Failed to load public website settings:", error);

    return NextResponse.json({ settings: null }, { status: 200 });
  }
}
