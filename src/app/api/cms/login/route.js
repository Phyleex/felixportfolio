import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  const password = process.env.CMS_PASSWORD;
  const secret = process.env.CMS_SECRET;

  if (!password || !secret) {
    return NextResponse.json(
      { error: "CMS authentication is not configured." },
      { status: 500 },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const submitted = body?.password;

  if (typeof submitted !== "string" || submitted.length > 1024) {
    return NextResponse.json({ error: "Invalid password." }, { status: 400 });
  }

  const expectedHash = createHmac("sha256", secret).update(password).digest();

  const submittedHash = createHmac("sha256", secret).update(submitted).digest();

  if (!timingSafeEqual(expectedHash, submittedHash)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 8;
  const payload = `admin:${expires}`;

  const signature = createHmac("sha256", secret).update(payload).digest("hex");

  const response = NextResponse.json({ success: true });

  response.cookies.set("leex_cms_session", `${payload}:${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
