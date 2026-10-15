import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/cms") ||
    pathname.startsWith("/api") ||
    pathname === "/maintenance" ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  try {
    const settings = await client.fetch(
      '*[_id == "siteSettings"][0]{ maintenanceMode }',
    );

    console.log("[Maintenance Proxy]", {
      pathname,
      maintenanceMode: settings?.maintenanceMode,
    });

    if (settings?.maintenanceMode === true) {
      return NextResponse.rewrite(new URL("/maintenance", request.url));
    }
  } catch (error) {
    console.error("[Maintenance Proxy] Sanity error:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
