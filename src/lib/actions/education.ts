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

function getEducationFormData(formData: FormData) {
  const institution = String(
    formData.get("institution") ?? ""
  ).trim();

  const qualification = String(
    formData.get("qualification") ?? ""
  ).trim();

  const fieldOfStudy = String(
    formData.get("field_of_study") ?? ""
  ).trim();

  const location = String(
    formData.get("location") ?? ""
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

  if (!institution) {
    throw new Error("Institution is required");
  }

  if (!qualification) {
    throw new Error("Qualification is required");
  }

  if (!startDate) {
    throw new Error("Start date is required");
  }

  if (endDate && endDate < startDate) {
    throw new Error(
      "End date cannot be earlier than the start date"
    );
  }

  return {
    institution,
    qualification,
    field_of_study: fieldOfStudy || null,
    location: location || null,
    start_date: startDate,
    end_date: endDate || null,
    description: description || null,
  };
}

export async function createEducation(formData: FormData) {
  const supabase = await requireAdmin();

  const education = getEducationFormData(formData);

  const { error } = await supabase
    .from("education")
    .insert(education);

  if (error) {
    throw new Error(
      `Failed to create education: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/education");
}

export async function updateEducation(
  id: string,
  formData: FormData
) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Education ID is required");
  }

  const education = getEducationFormData(formData);

  const { error } = await supabase
    .from("education")
    .update(education)
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update education: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/education");
}

export async function deleteEducation(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Education ID is required");
  }

  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete education: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/education");
}