import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

function responseError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function authorized() {
  return verifyCmsSession();
}

const BRAND_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  description,
  "logoId": logo.asset->_id,
  "logoUrl": logo.asset->url
`;

export async function GET() {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const brands = await client.fetch(
      `*[_type == "brand"] | order(name asc) {
        ${BRAND_FIELDS}
      }`,
    );

    return NextResponse.json({ brands });
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return responseError("Could not load brands.", 500);
  }
}

export async function POST(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const body = await request.json();

    const { name, slug, description = "", logoId } = body;

    if (!name?.trim() || !slug?.trim()) {
      return responseError("Brand name and slug are required.");
    }

    const existing = await client.fetch(
      `*[_type == "brand" && slug.current == $slug][0]._id`,
      {
        slug: slug.trim(),
      },
    );

    if (existing) {
      return responseError("A brand with this slug already exists.");
    }

    const document = {
      _type: "brand",
      name: name.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
      },
      description: description.trim(),
      ...(logoId
        ? {
            logo: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: logoId,
              },
            },
          }
        : {}),
    };

    const created = await client.create(document);

    return NextResponse.json({
      success: true,
      id: created._id,
    });
  } catch (error) {
    console.error("Failed to create brand:", error);
    return responseError("Could not create brand.", 500);
  }
}

export async function PATCH(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const body = await request.json();

    const { id, name, slug, description = "", logoId } = body;

    if (!id || !name?.trim() || !slug?.trim()) {
      return responseError("Brand ID, name and slug are required.");
    }

    const existing = await client.fetch(
      `*[_type == "brand" && _id == $id][0]._id`,
      { id },
    );

    if (!existing) {
      return responseError("Brand not found.", 404);
    }

    const duplicate = await client.fetch(
      `*[
        _type == "brand"
        && slug.current == $slug
        && _id != $id
      ][0]._id`,
      {
        slug: slug.trim(),
        id,
      },
    );

    if (duplicate) {
      return responseError("A brand with this slug already exists.");
    }

    const patch = client.patch(id).set({
      name: name.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
      },
      description: description.trim(),
    });

    if (logoId) {
      patch.set({
        logo: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: logoId,
          },
        },
      });
    }

    await patch.commit();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to update brand:", error);
    return responseError("Could not update brand.", 500);
  }
}

export async function DELETE(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return responseError("Brand ID is required.");
    }

    const projectCount = await client.fetch(
      `count(*[
        _type == "project"
        && brand._ref == $id
      ])`,
      { id },
    );

    if (projectCount > 0) {
      return responseError(
        `This brand cannot be deleted because it is used by ${projectCount} project${
          projectCount === 1 ? "" : "s"
        }.`,
      );
    }

    await client.delete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete brand:", error);
    return responseError("Could not delete brand.", 500);
  }
}
