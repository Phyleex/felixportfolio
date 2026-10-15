import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

const SETTINGS_ID = "siteSettings";

function errorResponse(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function clean(value, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidHttpUrl(value) {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function normalizeSettings(body = {}) {
  return {
    studioName: clean(body.studioName, 120),
    tagline: clean(body.tagline, 200),
    contactEmail: clean(body.contactEmail, 254),
    phone: clean(body.phone, 60),
    whatsappNumber2: clean(body.whatsappNumber2, 60),
    location: clean(body.location, 160),
    websiteTitle: clean(body.websiteTitle, 160),
    metaDescription: clean(body.metaDescription, 160),
    xUrl: clean(body.xUrl, 500),
    tiktokUrl: clean(body.tiktokUrl, 500),
    footerText: clean(body.footerText, 240),
    maintenanceMode: body.maintenanceMode === true,
    maintenanceMessage:
      clean(body.maintenanceMessage, 300) ||
      "We're upgrading our website. We'll be back shortly.",
  };
}

function validateSettings(settings) {
  if (!settings.studioName) {
    return "Studio name is required.";
  }

  if (
    settings.contactEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail)
  ) {
    return "Enter a valid contact email address.";
  }

  for (const field of ["xUrl", "tiktokUrl"]) {
    if (!isValidHttpUrl(settings[field])) {
      return `${
        field === "xUrl" ? "X" : "TikTok"
      } must be a valid HTTP or HTTPS URL.`;
    }
  }

  return null;
}

export async function GET() {
  if (!(await verifyCmsSession())) {
    return errorResponse("Unauthorized.", 401);
  }

  try {
    const settings = await client.fetch(
      `*[_type == "siteSettings" && _id == $id][0] {
        _id,
        studioName,
        tagline,
        contactEmail,
        phone,
        whatsappNumber2,
        location,
        websiteTitle,
        metaDescription,
        xUrl,
        tiktokUrl,
        footerText,
        maintenanceMode,
        maintenanceMessage
      }`,
      { id: SETTINGS_ID },
    );

    return NextResponse.json({ settings: settings || null });
  } catch (error) {
    console.error("Failed to load website settings:", error);
    return errorResponse("Could not load website settings.", 500);
  }
}

export async function PUT(request) {
  if (!(await verifyCmsSession())) {
    return errorResponse("Unauthorized.", 401);
  }

  try {
    const body = await request.json();
    const settings = normalizeSettings(body);
    const validationError = validateSettings(settings);

    if (validationError) {
      return errorResponse(validationError);
    }

    await client.createOrReplace({
      _id: SETTINGS_ID,
      _type: "siteSettings",
      ...settings,
    });

    return NextResponse.json({
      success: true,
      message: "Website settings saved successfully.",
      settings,
    });
  } catch (error) {
    console.error("Failed to save website settings:", error);
    return errorResponse("Could not save website settings.", 500);
  }
}
