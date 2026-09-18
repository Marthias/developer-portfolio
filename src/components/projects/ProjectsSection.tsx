import { getPublicProjects } from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";

export default async function ProjectsSection() {
  const projects = await getPublicProjects();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider">
            Portfolio
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Featured Projects
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            A selection of systems and applications built
            throughout my software engineering journey.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-500">
            No projects available yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}