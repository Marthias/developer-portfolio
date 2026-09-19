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