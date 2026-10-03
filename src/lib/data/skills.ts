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

export async function getAdminSkills() {
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
    throw new Error(`Failed to fetch admin skills: ${error.message}`);
  }

  return data;
}

export async function getAdminSkillById(id: string) {
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
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(`Failed to fetch admin skill: ${error.message}`);
  }

  return data;
}