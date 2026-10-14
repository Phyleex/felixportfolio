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

function normalizeSubServices(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      _type: "subService",
      _key: item._key || crypto.randomUUID().replace(/-/g, ""),
      title: String(item.title || "").trim(),
    }))
    .filter((item) => item.title);
}

function validateService(body, isUpdate = false) {
  if (isUpdate && !body.id) {
    return "Service ID is required.";
  }

  if (!body.title?.trim()) {
    return "Service title is required.";
  }

  if (!body.description?.trim()) {
    return "Service description is required.";
  }

  const order = Number(body.order);

  if (!Number.isInteger(order) || order < 0) {
    return "Display order must be a non-negative integer.";
  }

  const number = String(body.number || "").trim();

  if (!number) {
    return "Display number is required.";
  }

  return null;
}

const SERVICE_FIELDS = `
  _id,
  title,
  number,
  description,
  order,
  isVisible,
  "subServices": subServices[]{
    _key,
    title
  },
  _createdAt,
  _updatedAt
`;

export async function GET() {
  if (!(await authorized())) {
    return responseError("Unauthorized.", 401);
  }

  try {
    const services = await client.fetch(
      `*[_type == "service"] | order(order asc, _createdAt asc) {
        ${SERVICE_FIELDS}
      }`,
    );

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Failed to fetch CMS services:", error);
    return responseError("Could not load services.", 500);
  }
}

export async function POST(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized.", 401);
  }

  try {
    const body = await request.json();
    const validationError = validateService(body);

    if (validationError) {
      return responseError(validationError);
    }

    const document = {
      _type: "service",
      title: body.title.trim(),
      number: String(body.number).trim(),
      description: body.description.trim(),
      order: Number(body.order),
      isVisible: body.isVisible !== false,
      subServices: normalizeSubServices(body.subServices),
    };

    const created = await client.create(document);

    return NextResponse.json(
      {
        success: true,
        id: created._id,
        message: "Service created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create CMS service:", error);
    return responseError("Could not create service.", 500);
  }
}

export async function PATCH(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized.", 401);
  }

  try {
    const body = await request.json();
    const validationError = validateService(body, true);

    if (validationError) {
      return responseError(validationError);
    }

    const existing = await client.fetch(
      `*[_type == "service" && _id == $id][0]._id`,
      { id: body.id },
    );

    if (!existing) {
      return responseError("Service not found.", 404);
    }

    await client
      .patch(body.id)
      .set({
        title: body.title.trim(),
        number: String(body.number).trim(),
        description: body.description.trim(),
        order: Number(body.order),
        isVisible: body.isVisible !== false,
        subServices: normalizeSubServices(body.subServices),
      })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (error) {
    console.error("Failed to update CMS service:", error);
    return responseError("Could not update service.", 500);
  }
}

export async function DELETE(request) {
  if (!(await authorized())) {
    return responseError("Unauthorized.", 401);
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return responseError("Service ID is required.");
    }

    const existing = await client.fetch(
      `*[_type == "service" && _id == $id][0]._id`,
      { id },
    );

    if (!existing) {
      return responseError("Service not found.", 404);
    }

    await client.delete(id);

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("Failed to delete CMS service:", error);
    return responseError("Could not delete service.", 500);
  }
}
