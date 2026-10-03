import { notFound } from "next/navigation";
import BlogPostEditForm from "@/components/admin/blog/BlogPostEditForm";
import { getAdminBlogPostById } from "@/lib/data/blog";

type EditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;

  const post = await getAdminBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Blog Post
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update the article content and publication status.
        </p>
      </div>

      <BlogPostEditForm post={post} />
    </div>
  );
}