"use client";

import { useActionState } from "react";
import Link from "next/link";

import { createSkill } from "@/lib/actions/skills";

type SkillFormState = {
  error?: string;
};

const initialState: SkillFormState = {};

export default function SkillForm() {
  const [state, formAction, pending] = useActionState<
    SkillFormState,
    FormData
  >(async (_previousState, formData) => {
    try {
      await createSkill(formData);

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
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Skill name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="e.g. TypeScript"
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium"
        >
          Category
        </label>

        <input
          id="category"
          name="category"
          type="text"
          required
          placeholder="e.g. programming"
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />

        <p className="mt-2 text-xs text-gray-500">
          Examples: programming, frontend, backend, database,
          devops, tools, concepts.
        </p>
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
          rows={4}
          placeholder="Briefly describe your experience with this skill."
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="display_order"
          className="block text-sm font-medium"
        >
          Display order
        </label>

        <input
          id="display_order"
          name="display_order"
          type="number"
          min="0"
          defaultValue="0"
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
        />

        <p className="mt-2 text-xs text-gray-500">
          Lower numbers appear first.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Saving..." : "Create Skill"}
        </button>

        <Link
          href="/admin/dashboard/skills"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}