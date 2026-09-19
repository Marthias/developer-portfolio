type BlogCardProps = {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
  };
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border">
      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-6">
        {post.published_at && (
          <p className="text-sm text-gray-500">
            {formatDate(post.published_at)}
          </p>
        )}

        <h2 className="mt-2 text-xl font-semibold">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
        )}

        <a
          href={`/blog/${post.slug}`}
          className="mt-5 inline-block rounded-lg border px-4 py-2 text-sm font-medium"
        >
          Read Article
        </a>
      </div>
    </article>
  );
}