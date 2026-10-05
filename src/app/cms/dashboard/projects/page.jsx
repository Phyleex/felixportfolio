import { redirect } from "next/navigation";
import { verifyCmsSession } from "@/lib/cms-auth";
import ProjectsManager from "./ProjectsManager";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const isAuthenticated = await verifyCmsSession();

  if (!isAuthenticated) {
    redirect("/cms/login");
  }

  return <ProjectsManager />;
}
