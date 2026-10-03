"use client";

import Link from "next/link";
import { useActionState } from "react";

import { updateEducation } from "@/lib/actions/education";

type Education = {
  id: string;
  institution: string;
  qualification: string;
  field_of_study: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  description: string | null;
};

type EducationEditFormProps = {
  education: Education;
};

type EducationFormState = {
  error?: string;
};

const initialState: EducationFormState = {};

export default function EducationEditForm({
  education,
}: EducationEditFormProps) {
  const [state, formAction, pending] = useActionState<
    EducationFormState,
    FormData
  >(async (_previousState, formData) => {
    try {
      await updateEducation(education.id, formData);

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
          htmlFor="institution"
          className="block text-sm font-medium"
        >
          Institution
        </label>

        <input
          id="institution"
          name="institution"
          type="text"
          required
          defaultValue={education.institution}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="qualification"
          className="block text-sm font-medium"
        >
          Qualification
        </label>

        <input
          id="qualification"
          name="qualification"
          type="text"
          required
          defaultValue={education.qualification}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="field_of_study"
          className="block text-sm font-medium"
        >
          Field of Study
        </label>

        <input
          id="field_of_study"
          name="field_of_study"
          type="text"
          defaultValue={education.field_of_study ?? ""}
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
          defaultValue={education.location ?? ""}
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
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
            defaultValue={education.start_date}
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
            defaultValue={education.end_date ?? ""}
            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />

          <p className="mt-2 text-xs text-gray-500">
            Leave empty if you are currently studying here.
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
          defaultValue={education.description ?? ""}
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
          href="/admin/dashboard/education"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}