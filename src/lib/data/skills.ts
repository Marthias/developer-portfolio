import { createClient } from "@/lib/supabase/server";

export async function getPublicSkills() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("skills")
    .select(`
      id,
      name,
      category,
      description,
      display_order
    `)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch skills: ${error.message}`);
  }

  return data;
}