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
  };
};

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {project.title}
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