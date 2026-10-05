import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { verifyCmsSession } from "@/lib/cms-auth";

export const runtime = "nodejs";

const PROJECT_FIELDS = `
  _id,
  title,
  slug,
  category,
  year,
  description,
  featured,
  "brand": brand->{_id, name, "slug": slug.current},
  "coverImage": coverImage.asset->_id,
  "coverImageUrl": coverImage.asset->url,
  "gallery": gallery[]{
    "id": asset->_id,
    "url": asset->url
  }
`;

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
    const [projects, brands] = await Promise.all([
      client.fetch(
        `*[_type == "project"] | order(_createdAt desc) { ${PROJECT_FIELDS} }`,
      ),
      client.fetch(
        `*[_type == "brand"] | order(name asc) {
          _id,
          name,
          "slug": slug.current
        }`,
      ),
    ]);

    return NextResponse.json({ projects, brands });
  } catch (error) {
    console.error("Failed to fetch CMS projects:", error);
    return responseError("Could not load projects.", 500);
  }
}

export async function POST(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const body = await request.json();

    const {
      title,
      slug,
      brandId,
      category,
      year,
      description,
      coverImageId,
      galleryIds = [],
      featured = false,
    } = body;

    if (
      !title?.trim() ||
      !slug?.trim() ||
      !brandId ||
      !category ||
      !coverImageId
    ) {
      return responseError(
        "Title, slug, brand, category and cover image are required.",
      );
    }

    const brand = await client.fetch(
      `*[_type == "brand" && _id == $brandId][0]._id`,
      { brandId },
    );

    if (!brand) {
      return responseError("Please select an existing brand.");
    }

    const document = {
      _type: "project",
      title: title.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
      },
      brand: {
        _type: "reference",
        _ref: brandId,
      },
      category,
      year: year ? Number(year) : undefined,
      description: description || "",
      coverImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: coverImageId,
        },
      },
      gallery: galleryIds.map((id) => ({
        _type: "image",
        asset: {
          _type: "reference",
          _ref: id,
        },
      })),
      featured: Boolean(featured),
    };

    const created = await client.create(document);

    return NextResponse.json({
      success: true,
      id: created._id,
    });
  } catch (error) {
    console.error("Failed to create project:", error);
    return responseError("Could not create project.", 500);
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
      title,
      slug,
      brandId,
      category,
      year,
      description,
      coverImageId,
      galleryIds = [],
      featured = false,
    } = body;

    if (!id || !title?.trim() || !slug?.trim() || !brandId || !category) {
      return responseError("Required project details are missing.");
    }

    const existing = await client.fetch(
      `*[_type == "project" && _id == $id][0]{
        _id,
        coverImage
      }`,
      { id },
    );

    if (!existing) {
      return responseError("Project not found.", 404);
    }

    const brand = await client.fetch(
      `*[_type == "brand" && _id == $brandId][0]._id`,
      { brandId },
    );

    if (!brand) {
      return responseError("Please select an existing brand.");
    }

    const patch = client.patch(id).set({
      title: title.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
      },
      brand: {
        _type: "reference",
        _ref: brandId,
      },
      category,
      year: year ? Number(year) : null,
      description: description || "",
      gallery: galleryIds.map((assetId) => ({
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      })),
      featured: Boolean(featured),
    });

    if (coverImageId) {
      patch.set({
        coverImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: coverImageId,
          },
        },
      });
    }

    await patch.commit();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to update project:", error);
    return responseError("Could not update project.", 500);
  }
}

export async function DELETE(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized", 401);
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return responseError("Project ID is required.");
    }

    await client.delete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return responseError("Could not delete project.", 500);
  }
}
