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