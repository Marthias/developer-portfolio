import { notFound } from "next/navigation";
import { getPublishedBlogPostBySlug } from "@/lib/data/blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-20">
      <article className="mx-auto max-w-3xl">

        {/* Article Header */}
        <header>
          <p className="text-sm font-medium uppercase tracking-wider">
            Article
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            {post.title}
          </h1>

          {post.published_at && (
            <p className="mt-4 text-sm text-gray-500">
              Published {formatDate(post.published_at)}
            </p>
          )}

          {post.excerpt && (
            <p className="mt-8 text-xl leading-8 text-gray-600 dark:text-gray-400">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="mt-10">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full rounded-xl border object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <section className="mt-10">
          <div className="whitespace-pre-line text-lg leading-8 text-gray-700 dark:text-gray-300">
            {post.content}
          </div>
        </section>

        {/* Back to Blog */}
        <div className="mt-12">
          <a
            href="/blog"
            className="inline-block rounded-lg border px-5 py-3 text-sm font-medium"
          >
            ← Back to Blog
          </a>
        </div>

      </article>
    </main>
  );
}