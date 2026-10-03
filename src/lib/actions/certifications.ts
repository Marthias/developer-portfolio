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

function getCertificationFormData(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const issuingOrganization = formData
    .get("issuing_organization")
    ?.toString()
    .trim();
  const issueDate = formData.get("issue_date")?.toString().trim();
  const expiryDate = formData.get("expiry_date")?.toString().trim();
  const credentialId = formData.get("credential_id")?.toString().trim();
  const credentialUrl = formData.get("credential_url")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!name) {
    throw new Error("Certification name is required.");
  }

  if (!issuingOrganization) {
    throw new Error("Issuing organization is required.");
  }

  if (!issueDate) {
    throw new Error("Issue date is required.");
  }

  if (expiryDate && expiryDate < issueDate) {
    throw new Error("Expiry date cannot be earlier than issue date.");
  }

  return {
    name,
    issuing_organization: issuingOrganization,
    issue_date: issueDate,
    expiry_date: expiryDate || null,
    credential_id: credentialId || null,
    credential_url: credentialUrl || null,
    description: description || null,
  };
}

export async function createCertification(formData: FormData) {
  const supabase = await requireAdmin();

  const certification = getCertificationFormData(formData);

  const { error } = await supabase
    .from("certifications")
    .insert(certification);

  if (error) {
    throw new Error(
      `Failed to create certification: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/certifications");
}

export async function updateCertification(
  id: string,
  formData: FormData
) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Certification ID is required.");
  }

  const certification = getCertificationFormData(formData);

  const { error } = await supabase
    .from("certifications")
    .update(certification)
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update certification: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/certifications");
  revalidatePath(`/admin/dashboard/certifications/${id}/edit`);
}

export async function deleteCertification(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Certification ID is required.");
  }

  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete certification: ${error.message}`
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/certifications");
}