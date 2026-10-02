import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export async function verifyCmsSession() {
  const secret = process.env.CMS_SECRET;

  if (!secret) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("leex_cms_session")?.value;

  if (!session) {
    return false;
  }

  const parts = session.split(":");

  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresValue, signature] = parts;

  if (role !== "admin") {
    return false;
  }

  if (!/^\d+$/.test(expiresValue)) {
    return false;
  }

  if (!/^[a-f0-9]{64}$/i.test(signature)) {
    return false;
  }

  const expires = Number(expiresValue);

  if (!Number.isSafeInteger(expires)) {
    return false;
  }

  if (expires <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = `${role}:${expiresValue}`;

  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest();

  const providedSignature = Buffer.from(signature, "hex");

  if (
    expectedSignature.length !== providedSignature.length ||
    !timingSafeEqual(expectedSignature, providedSignature)
  ) {
    return false;
  }

  return true;
}
