import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(request) {
  if (!(await verifyCmsSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Please select an image." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Images must be 50 MB or smaller." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error) {
    console.error("Image upload failed:", error);

    return NextResponse.json(
      { error: "Image upload failed." },
      { status: 500 },
    );
  }
}
