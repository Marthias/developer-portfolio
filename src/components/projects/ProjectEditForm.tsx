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
};

export default function ProjectEditForm({
  project,
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

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await updateProject(project.id, form);

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