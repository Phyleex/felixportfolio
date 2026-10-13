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
    "url": asset->url,
    "type": select(
      asset->_type == "sanity.fileAsset" => "video",
      "image"
    ),
    "mimeType": asset->mimeType
  }
`;

function responseError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function authorized() {
  return verifyCmsSession();
}

async function validateBrand(brandId) {
  if (!brandId) return true;

  const brand = await client.fetch(
    `*[_type == "brand" && _id == $brandId][0]._id`,
    { brandId },
  );

  return Boolean(brand);
}

function normalizeGallery(galleryItems, galleryIds) {
  // Backward compatibility with the existing image-only form.
  if (!Array.isArray(galleryItems)) {
    return (Array.isArray(galleryIds) ? galleryIds : []).map((id) => ({
      id,
      type: "image",
    }));
  }

  return galleryItems.map((item) => ({
    id: typeof item === "string" ? item : item.id,
    type: typeof item === "string" ? "image" : item.type || "image",
  }));
}

function buildGallery(galleryItems) {
  return galleryItems.map(({ id, type }) => ({
    _type: type === "video" ? "file" : "image",
    asset: {
      _type: "reference",
      _ref: id,
    },
  }));
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
      galleryItems,
      featured = false,
    } = body;

    if (!title?.trim() || !slug?.trim() || !category || !coverImageId) {
      return responseError(
        "Title, slug, category and cover image are required.",
      );
    }

    if (!(await validateBrand(brandId))) {
      return responseError("Please select an existing brand.");
    }

    const normalizedGallery = normalizeGallery(galleryItems, galleryIds);

    const invalidGalleryItem = normalizedGallery.some(
      (item) =>
        !item.id || !["image", "video"].includes(item.type),
    );

    if (invalidGalleryItem) {
      return responseError("One or more gallery items are invalid.");
    }

    const document = {
      _type: "project",
      title: title.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
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
      gallery: buildGallery(normalizedGallery),
      featured: Boolean(featured),
    };

    if (brandId) {
      document.brand = {
        _type: "reference",
        _ref: brandId,
      };
    }

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
      galleryItems,
      featured = false,
    } = body;

    if (!id || !title?.trim() || !slug?.trim() || !category) {
      return responseError("Required project details are missing.");
    }

    const existing = await client.fetch(
      `*[_type == "project" && _id == $id][0]{ _id, coverImage }`,
      { id },
    );

    if (!existing) {
      return responseError("Project not found.", 404);
    }

    if (!(await validateBrand(brandId))) {
      return responseError("Please select an existing brand.");
    }

    const normalizedGallery = normalizeGallery(galleryItems, galleryIds);

    const invalidGalleryItem = normalizedGallery.some(
      (item) =>
        !item.id || !["image", "video"].includes(item.type),
    );

    if (invalidGalleryItem) {
      return responseError("One or more gallery items are invalid.");
    }

    const patch = client.patch(id).set({
      title: title.trim(),
      slug: {
        _type: "slug",
        current: slug.trim(),
      },
      category,
      year: year ? Number(year) : null,
      description: description || "",
      gallery: buildGallery(normalizedGallery),
      featured: Boolean(featured),
    });

    if (brandId) {
      patch.set({
        brand: {
          _type: "reference",
          _ref: brandId,
        },
      });
    } else {
      patch.unset(["brand"]);
    }

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

    return NextResponse.json({ success: true });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return responseError("Could not delete project.", 500);
  }
}
