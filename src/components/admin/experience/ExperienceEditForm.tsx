"use client";

import Link from "next/link";
import { useActionState } from "react";

import { updateExperience } from "@/lib/actions/experience";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  employment_type: string;
  start_date: string;
  end_date: string | null;
  description: string;
};

type ExperienceEditFormProps = {
  experience: Experience;
};

type ExperienceFormState = {
  error?: string;
};

const initialState: ExperienceFormState = {};

const employmentTypes = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "volunteer", label: "Volunteer" },
];

export default function ExperienceEditForm({
  experience,
}: ExperienceEditFormProps) {
  const [state, formAction, pending] = useActionState<
    ExperienceFormState,
    FormData
  >(async (_previousState, formData) => {
    try {
      await updateExperience(experience.id, formData);

      return {};
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      };
    }
  }, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium"
        >
          Company / Organization
        </label>

        <input
          id="company"
          name="company"
          type="text"
          required
          defaultValue={experience.company}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium"
        >
          Role
        </label>

        <input
          id="role"
          name="role"
          type="text"
          required
          defaultValue={experience.role}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium"
        >
          Location
        </label>

        <input
          id="location"
          name="location"
          type="text"
          defaultValue={experience.location ?? ""}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="employment_type"
          className="block text-sm font-medium"
        >
          Employment Type
        </label>

        <select
          id="employment_type"
          name="employment_type"
          required
          defaultValue={experience.employment_type}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        >
          {employmentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="start_date"
            className="block text-sm font-medium"
          >
            Start Date
          </label>

          <input
            id="start_date"
            name="start_date"
            type="date"
            required
            defaultValue={experience.start_date}
            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label
            htmlFor="end_date"
            className="block text-sm font-medium"
          >
            End Date
          </label>

          <input
            id="end_date"
            name="end_date"
            type="date"
            defaultValue={experience.end_date ?? ""}
            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />

          <p className="mt-2 text-xs text-gray-500">
            Leave empty if this experience is ongoing.
          </p>
        </div>
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
          name="description"
          rows={6}
          required
          defaultValue={experience.description}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>

        <Link
          href="/admin/dashboard/experience"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}