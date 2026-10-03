import { createClient } from "@/lib/supabase/server";

export async function getPublicExperience() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experience")
    .select(`
      id,
      company,
      role,
      location,
      employment_type,
      start_date,
      end_date,
      description
    `)
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch experience: ${error.message}`);
  }

  return data;
}

export async function getAdminExperience() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experience")
    .select(`
      id,
      company,
      role,
      location,
      employment_type,
      start_date,
      end_date,
      description
    `)
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch admin experience: ${error.message}`
    );
  }

  return data;
}

export async function getAdminExperienceById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("experience")
    .select(`
      id,
      company,
      role,
      location,
      employment_type,
      start_date,
      end_date,
      description
    `)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(
      `Failed to fetch admin experience: ${error.message}`
    );
  }

  return data;
}