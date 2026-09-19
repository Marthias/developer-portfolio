import { notFound } from "next/navigation";
// using native <img> to avoid next/image runtime issues
import { getPublicProjectBySlug } from "@/lib/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Project heading */}
        <p className="text-sm font-medium uppercase tracking-wider">
          Project
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          {project.title}
        </h1>

        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
          {project.short_description}
        </p>

        {/* Project media */}
        {project.project_media.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">
              Project Media
            </h2>

            <div className="mt-6 space-y-6">
              {project.project_media.map((media) => {
                if (media.media_type === "image") {
                  return (
                    <img
                      key={media.id}
                      src={media.url}
                      alt={media.alt_text ?? project.title}
                      className="w-full rounded-xl border object-cover"
                    />
                  );
                }

                if (media.media_type === "video") {
                  return (
                    <video
                      key={media.id}
                      src={media.url}
                      controls
                      className="w-full rounded-xl border"
                    >
                      Your browser does not support video playback.
                    </video>
                  );
                }

                return null;
              })}
            </div>
          </section>
        )}

        {/* Technologies */}
       {project.project_technologies.map((item) => {
  const technology = item.technologies[0];

  if (!technology) {
    return null;
  }

  return (
    <span
      key={technology.id}
      className="rounded-full border px-4 py-2"
    >
      {technology.name}
    </span>
  );
})}

        {/* Description */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            About the project
          </h2>

          <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
            {project.description}
          </p>
        </section>

        {/* Project links */}
        <div className="mt-10 flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-5 py-3"
            >
              View on GitHub
            </a>
          )}

          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border px-5 py-3"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </main>
  );
}