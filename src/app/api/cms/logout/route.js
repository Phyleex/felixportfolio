import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.redirect(
    new URL("/cms/login", request.url),
    303,
  );

  response.cookies.set("leex_cms_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return response;
}
