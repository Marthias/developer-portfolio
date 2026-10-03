import { createClient } from "@/lib/supabase/server";

export async function getPublicCertifications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certifications")
    .select(`
      id,
      name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
      description
    `)
    .order("issue_date", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch certifications: ${error.message}`
    );
  }

  return data;
}

export async function getAdminCertifications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certifications")
    .select(`
      id,
      name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
      description
    `)
    .order("issue_date", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch admin certifications: ${error.message}`
    );
  }

  return data;
}

export async function getAdminCertificationById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certifications")
    .select(`
      id,
      name,
      issuing_organization,
      issue_date,
      expiry_date,
      credential_id,
      credential_url,
      description
    `)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(
      `Failed to fetch admin certification: ${error.message}`
    );
  }

  return data;
}