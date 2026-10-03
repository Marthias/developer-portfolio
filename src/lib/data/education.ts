import { createClient } from "@/lib/supabase/server";

export async function getPublicEducation() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select(`
      id,
      institution,
      qualification,
      field_of_study,
      location,
      start_date,
      end_date,
      description
    `)
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch education: ${error.message}`);
  }

  return data;
}

export async function getAdminEducation() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select(`
      id,
      institution,
      qualification,
      field_of_study,
      location,
      start_date,
      end_date,
      description
    `)
    .order("start_date", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch admin education: ${error.message}`
    );
  }

  return data;
}

export async function getAdminEducationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select(`
      id,
      institution,
      qualification,
      field_of_study,
      location,
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
      `Failed to fetch admin education: ${error.message}`
    );
  }

  return data;
}