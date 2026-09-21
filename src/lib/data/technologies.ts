import { createClient } from "@/lib/supabase/server";

export async function getTechnologies() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("technologies")
    .select(`
      id,
      name,
      category,
      icon,
      website_url
    `)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(
      `Failed to fetch technologies: ${error.message}`
    );
  }

  return data;
}