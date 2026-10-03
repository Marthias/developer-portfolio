import Link from "next/link";

import { getPublicProjects } from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";

export default async function ProjectsPage() {
  const projects = await getPublicProjects();

  const normalizedProjects = projects.map((project) => ({
    ...project,
    project_technologies: (project.project_technologies ?? []).map((item) => ({
      ...item,
      technologies: Array.isArray(item.technologies)
        ? item.technologies[0] ?? null
        : item.technologies ?? null,
    })),
  }));

  return (
    <main className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-wider">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Projects
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            A collection of software systems and applications I have
            designed and built throughout my software engineering journey.
          </p>
        </div>

        {normalizedProjects.length === 0 ? (
          <div className="rounded-xl border p-8">
            <p className="text-gray-500">
              No projects available yet.
            </p>

            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {normalizedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}