import { redirect } from "next/navigation";
import { verifyCmsSession } from "@/lib/cms-auth";
import BrandsManager from "./BrandsManager";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  if (!(await verifyCmsSession())) {
    redirect("/cms/login");
  }

  return <BrandsManager />;
}
