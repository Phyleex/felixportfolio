import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

const CATEGORIES = [
  "graphic-design",
  "ui-ux",
  "3d-design",
  "video-editing",
  "other",
];

function responseError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function authorized() {
  return verifyCmsSession();
}

export async function GET() {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const tools = await client.fetch(
      `*[_type == "tool"] | order(sortOrder asc, name asc) {
        _id,
        name,
        category,
        proficiency,
        description,
        sortOrder,
        featured,
        isVisible,
        "logoId": logo.asset->_id,
        "logoUrl": logo.asset->url
      }`,
    );

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Failed to fetch tools:", error);
    return responseError("Could not load tools.", 500);
  }
}

export async function POST(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const body = await request.json();

    const {
      name,
      category,
      proficiency = 0,
      description = "",
      logoId,
      sortOrder = 0,
      featured = false,
      isVisible = true,
    } = body;

    if (!name?.trim() || !CATEGORIES.includes(category)) {
      return responseError("A tool name and valid category are required.");
    }

    if (
      !Number.isInteger(Number(proficiency)) ||
      Number(proficiency) < 0 ||
      Number(proficiency) > 100
    ) {
      return responseError("Proficiency must be between 0 and 100.");
    }

    if (!logoId) {
      return responseError("Please upload a tool logo.");
    }

    const created = await client.create({
      _type: "tool",
      name: name.trim(),
      category,
      proficiency: Number(proficiency),
      description: description.trim(),
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: logoId },
      },
      sortOrder: Number(sortOrder) || 0,
      featured: Boolean(featured),
      isVisible: Boolean(isVisible),
    });

    return NextResponse.json({ success: true, id: created._id });
  } catch (error) {
    console.error("Failed to create tool:", error);
    return responseError("Could not create tool.", 500);
  }
}

export async function PATCH(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const body = await request.json();

    const {
      id,
      name,
      category,
      proficiency,
      description = "",
      logoId,
      sortOrder = 0,
      featured,
      isVisible,
    } = body;

    if (!id) {
      return responseError("Tool ID is required.");
    }

    const existing = await client.fetch(
      `*[_type == "tool" && _id == $id][0]{
        _id,
        name,
        category,
        proficiency,
        description,
        sortOrder,
        featured,
        isVisible
      }`,
      { id },
    );

    if (!existing) {
      return responseError("Tool not found.", 404);
    }

    const nextName = name === undefined ? existing.name : name;
    const nextCategory =
      category === undefined ? existing.category : category;
    const nextProficiency =
      proficiency === undefined ? existing.proficiency ?? 0 : proficiency;

    if (!nextName?.trim() || !CATEGORIES.includes(nextCategory)) {
      return responseError("Tool name and valid category are required.");
    }

    if (
      !Number.isInteger(Number(nextProficiency)) ||
      Number(nextProficiency) < 0 ||
      Number(nextProficiency) > 100
    ) {
      return responseError("Proficiency must be between 0 and 100.");
    }

    const patchData = {
      name: nextName.trim(),
      category: nextCategory,
      proficiency: Number(nextProficiency),
      description:
        description === undefined
          ? existing.description || ""
          : description.trim(),
      sortOrder:
        sortOrder === undefined
          ? existing.sortOrder ?? 0
          : Number(sortOrder) || 0,
    };

    // Only update these booleans when the request explicitly supplies them.
    // This prevents visibility-only updates from resetting featured status.
    if (featured !== undefined) {
      patchData.featured = Boolean(featured);
    }

    if (isVisible !== undefined) {
      patchData.isVisible = Boolean(isVisible);
    }

    const patch = client.patch(id).set(patchData);

    if (logoId) {
      patch.set({
        logo: {
          _type: "image",
          asset: { _type: "reference", _ref: logoId },
        },
      });
    }

    await patch.commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update tool:", error);
    return responseError("Could not update tool.", 500);
  }
}

export async function DELETE(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return responseError("Tool ID is required.");
    }

    const existing = await client.fetch(
      `*[_type == "tool" && _id == $id][0]._id`,
      { id },
    );

    if (!existing) {
      return responseError("Tool not found.", 404);
    }

    await client.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete tool:", error);
    return responseError("Could not delete tool.", 500);
  }
}
