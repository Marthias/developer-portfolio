"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { updateProject } from "@/lib/actions/projects";

type ProjectEditFormProps = {
  project: {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    description: string;
    github_url: string | null;
    live_url: string | null;
    status:
      | "planned"
      | "in_progress"
      | "completed"
      | "archived";
    featured: boolean;
  };

  technologies: {
    id: string;
    name: string;
    category: string;
    icon: string | null;
    website_url: string | null;
  }[];

  projectTechnologies: {
    technology_id: string;
    technologies: {
      id: string;
      name: string;
      category: string;
      icon: string | null;
      website_url: string | null;
    }[];
  }[];
};

export default function ProjectEditForm({
  project,
  technologies,
  projectTechnologies,
}: ProjectEditFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    title: project.title,
    slug: project.slug,
    shortDescription: project.short_description,
    description: project.description,
    githubUrl: project.github_url ?? "",
    liveUrl: project.live_url ?? "",
    status: project.status,
    featured: project.featured,
  });

  const [selectedTechnologyIds, setSelectedTechnologyIds] =
  useState<string[]>(
    projectTechnologies.map(
      (item) => item.technology_id
    )
  );

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleTechnology(technologyId: string) {
  setSelectedTechnologyIds((current) => {
    if (current.includes(technologyId)) {
      return current.filter(
        (id) => id !== technologyId
      );
    }

    return [...current, technologyId];
  });
}

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      //await updateProject(project.id, form);
        await updateProject(project.id, {
          ...form,
          technologyIds: selectedTechnologyIds,
        });

      router.push("/admin/dashboard/projects");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium"
        >
          Title
        </label>

        <input
          id="title"
          value={form.title}
          onChange={(event) =>
            updateField("title", event.target.value)
          }
          required
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium"
        >
          Slug
        </label>

        <input
          id="slug"
          value={form.slug}
          onChange={(event) =>
            updateField("slug", event.target.value)
          }
          required
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />

        <p className="mt-2 text-sm text-gray-500">
          Used in the public project URL.
        </p>
      </div>

      <div>
        <label
          htmlFor="shortDescription"
          className="block text-sm font-medium"
        >
          Short Description
        </label>

        <textarea
          id="shortDescription"
          value={form.shortDescription}
          onChange={(event) =>
            updateField(
              "shortDescription",
              event.target.value
            )
          }
          required
          rows={3}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          value={form.description}
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          required
          rows={8}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium"
        >
          GitHub URL
        </label>

        <input
          id="githubUrl"
          type="url"
          value={form.githubUrl}
          onChange={(event) =>
            updateField("githubUrl", event.target.value)
          }
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="liveUrl"
          className="block text-sm font-medium"
        >
          Live URL
        </label>

        <input
          id="liveUrl"
          type="url"
          value={form.liveUrl}
          onChange={(event) =>
            updateField("liveUrl", event.target.value)
          }
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          value={form.status}
          onChange={(event) =>
            updateField(
              "status",
              event.target.value as typeof form.status
            )
          }
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        >
          <option value="planned">Planned</option>
          <option value="in_progress">
            In Progress
          </option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(event) =>
            updateField(
              "featured",
              event.target.checked
            )
          }
        />

        <span className="text-sm font-medium">
          Featured project
        </span>
      </label>

      <div>
  <div className="mb-3">
    <h2 className="text-sm font-medium">
      Technologies
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Select the technologies used by this project.
    </p>
  </div>

  <div className="grid gap-3 sm:grid-cols-2">
    {technologies.map((technology) => {
      const isSelected =
        selectedTechnologyIds.includes(technology.id);

      return (
        <label
          key={technology.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-4"
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() =>
              toggleTechnology(technology.id)
            }
          />

          <div>
            <p className="font-medium">
              {technology.name}
            </p>

            <p className="text-xs text-gray-500">
              {technology.category}
            </p>
          </div>
        </label>
      );
    })}
  </div>
</div>

      {errorMessage && (
        <div className="rounded-lg border border-red-300 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg border px-6 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}