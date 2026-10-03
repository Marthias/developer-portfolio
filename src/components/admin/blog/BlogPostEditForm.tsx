"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "@/lib/actions/blog";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
};

type FormState = {
  error?: string;
};

type BlogPostEditFormProps = {
  post: BlogPost;
};

const initialState: FormState = {};

export default function BlogPostEditForm({
  post,
}: BlogPostEditFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    FormState,
    FormData
  >(
    async (_previousState, formData) => {
      try {
        await updateBlogPost(post.id, formData);

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
          defaultValue={post.title}
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
          defaultValue={post.slug}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          Lowercase letters, numbers, and hyphens only.
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
          defaultValue={post.excerpt ?? ""}
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
          defaultValue={post.content}
          className="w-full resize-y rounded-lg border bg-transparent px-4 py-2.5 font-mono text-sm outline-none focus:ring-2"
        />
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
          defaultValue={post.cover_image_url ?? ""}
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
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
          defaultValue={post.status}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <p className="mt-1 text-xs text-gray-500">
          Only published posts appear on the public blog.
        </p>
      </div>

      {post.published_at && (
        <div className="rounded-lg border p-4 text-sm">
          <p className="font-medium">Originally published</p>
          <p className="mt-1 text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(post.published_at))}
          </p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Saving..." : "Update Post"}
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