import { getPublishedBlogPosts } from "@/lib/data/blog";
import BlogCard from "@/components/blog/BlogCard";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-wider">
            Blog
          </p>

          <h1 className="mt-2 text-5xl font-bold">
            Articles & Insights
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Notes, lessons, technical experiments, and
            experiences from my software engineering journey.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500">
            No published articles yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}