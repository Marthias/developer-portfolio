import { createClient } from "@/lib/supabase/server";

export async function getAdminDashboardStats() {
  const supabase = await createClient();

  const [
    projectsResult,
    featuredProjectsResult,
    unreadMessagesResult,
    publishedPostsResult,
    recentMessagesResult,
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("featured", true),

    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),

    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),

    supabase
      .from("messages")
      .select(`
        id,
        name,
        email,
        subject,
        message,
        is_read,
        created_at
      `)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (projectsResult.error) {
    throw new Error(
      `Failed to fetch project count: ${projectsResult.error.message}`
    );
  }

  if (featuredProjectsResult.error) {
    throw new Error(
      `Failed to fetch featured project count: ${featuredProjectsResult.error.message}`
    );
  }

  if (unreadMessagesResult.error) {
    throw new Error(
      `Failed to fetch unread message count: ${unreadMessagesResult.error.message}`
    );
  }

  if (publishedPostsResult.error) {
    throw new Error(
      `Failed to fetch published post count: ${publishedPostsResult.error.message}`
    );
  }

  if (recentMessagesResult.error) {
    throw new Error(
      `Failed to fetch recent messages: ${recentMessagesResult.error.message}`
    );
  }

  return {
    totalProjects: projectsResult.count ?? 0,
    featuredProjects: featuredProjectsResult.count ?? 0,
    unreadMessages: unreadMessagesResult.count ?? 0,
    publishedPosts: publishedPostsResult.count ?? 0,
    recentMessages: recentMessagesResult.data ?? [],
  };
}