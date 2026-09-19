type ProjectCardProps = {

  project: {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    description: string;
    github_url: string | null;
    live_url: string | null;
    status: string;
    featured: boolean;

    project_technologies: {
      technology_id: string;
      technologies: {
        id: string;
        name: string;
        category: string;
        icon: string | null;
        website_url: string | null;
      } | null;
    }[];
  };
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6">

      <div className="flex items-start justify-between gap-4">
      <h3 className="text-xl font-semibold">
       <a
      href={`/projects/${project.slug}`}
      className="hover:underline"
    >
      {project.title}
    </a>
  </h3>

  {project.featured && (
    <span className="rounded-full border px-3 py-1 text-xs">
      Featured
    </span>
  )}
</div>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        {project.short_description}
      </p>

      {/* Technologies */}
      {project.project_technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.project_technologies.map((item) => {
            const technology = item.technologies; //i nee to access the first technology object directly

            if (!technology) {
              return null;
            }

            return (
              <span
                key={technology.id}
                className="rounded-full border px-3 py-1 text-sm"
              >
                {technology.name}
              </span>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}