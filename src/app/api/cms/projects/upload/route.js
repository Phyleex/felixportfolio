import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 50 * 1024 * 1024; // 50 MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg",
];

export async function POST(request) {
  if (!(await verifyCmsSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json(
        { error: "Please select an image or video." },
        { status: 400 },
      );
    }

    const isImage = file.type.startsWith("image/");
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Upload an image or an MP4, WebM, MOV, or OGG video.",
        },
        { status: 400 },
      );
    }

    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: isVideo
            ? "Videos must be 50 MB or smaller."
            : "Images must be 50 MB or smaller.",
        },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const assetType = isVideo ? "file" : "image";

    const asset = await client.assets.upload(assetType, buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
      type: isVideo ? "video" : "image",
      mimeType: file.type,
      filename: file.name,
    });
  } catch (error) {
    console.error("Media upload failed:", error);

    return NextResponse.json(
      { error: "Media upload failed. Please try again." },
      { status: 500 },
    );
  }
}
