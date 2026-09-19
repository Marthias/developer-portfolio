import { createClient } from "@/lib/supabase/server";

export async function getPublishedBlogPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image_url,
      published_at
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch blog posts: ${error.message}`
    );
  }

  return data;
}

export async function getPublishedBlogPostBySlug(
  slug: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      published_at
    `)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(
      `Failed to fetch blog post: ${error.message}`
    );
  }

  return data;
}