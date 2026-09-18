import { createClient } from "@/lib/supabase/server";

export async function getPublicProjects() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      slug,
      short_description,
      description,
      github_url,
      live_url,
      status,
      featured,
      created_at,
      updated_at,
      project_media (
        id,
        media_type,
        url,
        alt_text,
        display_order
      ),
      project_technologies (
        technology_id,
        technologies (
          id,
          name,
          category,
          icon,
          website_url
        )
      )
    `)
    .in("status", ["completed", "in_progress"])
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return data;
}