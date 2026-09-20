import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getAdminProjects } from "@/lib/data/projects";
import DeleteProjectButton from "@/components/projects/DeleteProjectButton";




export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/admin/login");
  }

  const userId = data.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  const projects = await getAdminProjects();

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Projects
            </h1>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Manage the projects displayed throughout your portfolio.
            </p>
          </div>

          <Link
            href="/admin/dashboard/projects/new"
            className="rounded-lg border px-5 py-3 text-sm font-medium"
          >
            + New Project
          </Link>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border">
          {projects.length === 0 ? (
            <div className="p-8">
              <p className="text-gray-500">
                No projects found.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {projects.map((project) => (

                <div
                  key={project.id}
                  className="flex items-center justify-between gap-6 p-6"
                >


                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold">
                      {project.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {project.short_description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border px-3 py-1">
                        {project.status}
                      </span>

                      {project.featured && (
                        <span className="rounded-full border px-3 py-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={`/admin/dashboard/projects/${project.id}/edit`}
                    className="shrink-0 rounded-lg border px-4 py-2 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  
                  <DeleteProjectButton
                    projectId={project.id}
                    projectTitle={project.title}
                  />
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}