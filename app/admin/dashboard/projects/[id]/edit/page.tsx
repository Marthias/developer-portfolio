import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import {
  getAdminProjectById,
  getProjectTechnologies,
} from "@/lib/data/projects";

import { getTechnologies } from "@/lib/data/technologies";

import { createClient } from "@/lib/supabase/server";

import ProjectEditForm from "@/components/projects/ProjectEditForm";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/admin/login");
  }

  const userId = data.claims.sub;

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  const project = await getAdminProjectById(id);

  if (!project) {
    notFound();
  }




const projectTechnologies =
  await getProjectTechnologies(id); // Fetch the technologies associated with the project

const technologies = await getTechnologies();




  return (
    <main className="min-h-screen px-6 py-20">

      <div className="mx-auto max-w-3xl">

        <Link
          href="/admin/dashboard/projects"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Projects
        </Link>

        <div className="mb-10 mt-8">
          <p className="text-sm font-medium uppercase tracking-wider">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Edit Project
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Update the information for {project.title}.
          </p>
        </div>

        <ProjectEditForm
              project={project}
              technologies={technologies}
              projectTechnologies={projectTechnologies}
        />
      </div>
    </main>
  );
}