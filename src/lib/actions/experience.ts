"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();

  const claimsResult = await supabase.auth.getClaims();
  const claims = claimsResult.data?.claims ?? null;

  if (!claims?.sub) {
    throw new Error("Unauthorized");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", claims.sub)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error("Forbidden");
  }

  return supabase;
}

const validEmploymentTypes = [
  "full_time",
  "part_time",
  "internship",
  "contract",
  "freelance",
  "volunteer",
] as const;

function getExperienceFormData(formData: FormData) {
  const company = String(formData.get("company") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = String(
    formData.get("employment_type") ?? ""
  ).trim();
  const startDate = String(
    formData.get("start_date") ?? ""
  ).trim();
  const endDate = String(
    formData.get("end_date") ?? ""
  ).trim();
  const description = String(
    formData.get("description") ?? ""
  ).trim();

  if (!company) {
    throw new Error("Company is required");
  }

  if (!role) {
    throw new Error("Role is required");
  }

  if (!employmentType) {
    throw new Error("Employment type is required");
  }

  if (!validEmploymentTypes.includes(
    employmentType as (typeof validEmploymentTypes)[number]
  )) {
    throw new Error("Invalid employment type");
  }

  if (!startDate) {
    throw new Error("Start date is required");
  }

  if (!description) {
    throw new Error("Description is required");
  }

  if (endDate && endDate < startDate) {
    throw new Error(
      "End date cannot be earlier than the start date"
    );
  }

  return {
    company,
    role,
    location: location || null,
    employment_type: employmentType,
    start_date: startDate,
    end_date: endDate || null,
    description,
  };
}

export async function createExperience(formData: FormData) {
  const supabase = await requireAdmin();

  const experience = getExperienceFormData(formData);

  const { error } = await supabase
    .from("experience")
    .insert(experience);

  if (error) {
    throw new Error(
      `Failed to create experience: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/experience");
}

export async function updateExperience(
  id: string,
  formData: FormData
) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Experience ID is required");
  }

  const experience = getExperienceFormData(formData);

  const { error } = await supabase
    .from("experience")
    .update(experience)
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update experience: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/experience");
}

export async function deleteExperience(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Experience ID is required");
  }

  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete experience: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/experience");
}