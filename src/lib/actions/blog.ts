"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const validStatuses = ["draft", "published", "archived"] as const;

type BlogStatus = (typeof validStatuses)[number];

async function requireAdmin() {
  const supabase = await createClient();

  const claimsResult = await supabase.auth.getClaims();
  const claims = claimsResult.data?.claims ?? null;

  if (!claims?.sub) {
    throw new Error("Unauthorized");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", claims.sub)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error("Forbidden");
  }

  return supabase;
}

function getBlogFormData(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const coverImageUrl = formData
    .get("cover_image_url")
    ?.toString()
    .trim();
  const status = formData.get("status")?.toString().trim();

  if (!title) {
    throw new Error("Title is required.");
  }

  if (!slug) {
    throw new Error("Slug is required.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      "Slug must contain only lowercase letters, numbers, and hyphens."
    );
  }

  if (!content) {
    throw new Error("Content is required.");
  }

  if (
    !status ||
    !validStatuses.includes(status as BlogStatus)
  ) {
    throw new Error("Invalid blog post status.");
  }

  return {
    title,
    slug,
    excerpt: excerpt || null,
    content,
    cover_image_url: coverImageUrl || null,
    status: status as BlogStatus,
  };
}

function getPublishedAt(
  status: BlogStatus,
  currentPublishedAt?: string | null
) {
  if (status === "published") {
    return currentPublishedAt ?? new Date().toISOString();
  }

  return null;
}

export async function createBlogPost(formData: FormData) {
  const supabase = await requireAdmin();

  const blogPost = getBlogFormData(formData);

  const { error } = await supabase
    .from("blog_posts")
    .insert({
      ...blogPost,
      published_at: getPublishedAt(blogPost.status),
    });

  if (error) {
    throw new Error(
      `Failed to create blog post: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/blog");
}

export async function updateBlogPost(
  id: string,
  formData: FormData
) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Blog post ID is required.");
  }

  const blogPost = getBlogFormData(formData);

  const { data: existingPost, error: existingPostError } =
    await supabase
      .from("blog_posts")
      .select("published_at")
      .eq("id", id)
      .single();

  if (existingPostError) {
    throw new Error(
      `Failed to fetch existing blog post: ${existingPostError.message}`
    );
  }

  const publishedAt = getPublishedAt(
    blogPost.status,
    existingPost.published_at
  );

  const { error } = await supabase
    .from("blog_posts")
    .update({
      ...blogPost,
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update blog post: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/blog");
  revalidatePath(`/admin/dashboard/blog/${id}/edit`);
}

export async function deleteBlogPost(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Blog post ID is required.");
  }

  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete blog post: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/blog");
}