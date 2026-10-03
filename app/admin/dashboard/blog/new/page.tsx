import BlogPostForm from "@/components/admin/blog/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Create Blog Post
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Write and publish an article for your portfolio.
        </p>
      </div>

      <BlogPostForm />
    </div>
  );
}