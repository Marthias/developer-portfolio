import Link from "next/link";
import { getAdminBlogPosts } from "@/lib/data/blog";
import DeleteBlogPostButton from "@/components/admin/blog/DeleteBlogPostButton";

function formatDate(date: string | null) {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStatusClasses(status: string) {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400";

    case "draft":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400";

    case "archived":
      return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-400";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function BlogAdminPage() {
  const posts = await getAdminBlogPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage articles, drafts, and published content.
          </p>
        </div>

        <Link
          href="/admin/dashboard/blog/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          Add Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-gray-500">
            No blog posts have been created yet.
          </p>

          <Link
            href="/admin/dashboard/blog/new"
            className="mt-4 inline-block text-sm font-medium underline"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="divide-y">
            {posts.map((post) => (
              <div
                key={post.id}
                className="grid grid-cols-1 items-center gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_110px_110px_160px] sm:gap-6"
              >
                <div className="min-w-0">
                  <h2 className="truncate font-semibold">
                    {post.title}
                  </h2>

                  <p className="mt-1 truncate text-sm text-gray-600 dark:text-gray-400">
                    /blog/{post.slug}
                  </p>

                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses(
                      post.status
                    )}`}
                  >
                    {post.status}
                  </span>
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Published</p>

                  <p className="mt-1">
                    {formatDate(post.published_at)}
                  </p>
                </div>

                <div className="flex gap-4 sm:justify-end">
                  <Link
                    href={`/admin/dashboard/blog/${post.id}/edit`}
                    className="text-sm font-medium underline"
                  >
                    Edit
                  </Link>

                  <DeleteBlogPostButton
                    id={post.id}
                    title={post.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}