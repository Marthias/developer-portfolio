"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/actions/blog";

type FormState = {
  error?: string;
};

const initialState: FormState = {};

export default function BlogPostForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    FormState,
    FormData
  >(
    async (_previousState, formData) => {
      try {
        await createBlogPost(formData);

        router.push("/admin/dashboard/blog");
        router.refresh();

        return {};
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction} className="max-w-4xl space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. What I Learned Building My Portfolio"
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium"
        >
          Slug
        </label>

        <input
          id="slug"
          name="slug"
          type="text"
          required
          placeholder="what-i-learned-building-my-portfolio"
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          Use lowercase letters, numbers, and hyphens only.
        </p>
      </div>

      <div>
        <label
          htmlFor="excerpt"
          className="mb-2 block text-sm font-medium"
        >
          Excerpt
        </label>

        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          placeholder="A short summary of the article..."
          className="w-full resize-y rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium"
        >
          Content
        </label>

        <textarea
          id="content"
          name="content"
          rows={16}
          required
          placeholder="Write your article here..."
          className="w-full resize-y rounded-lg border bg-transparent px-4 py-2.5 font-mono text-sm outline-none focus:ring-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          For now, article content is stored as plain text.
        </p>
      </div>

      <div>
        <label
          htmlFor="cover_image_url"
          className="mb-2 block text-sm font-medium"
        >
          Cover Image URL
        </label>

        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          Optional. Image upload will be added later.
        </p>
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue="draft"
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <p className="mt-1 text-xs text-gray-500">
          Published posts appear on the public blog.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Saving..." : "Save Post"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/dashboard/blog")}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}