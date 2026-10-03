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

export async function createSkill(formData: FormData) {
  const supabase = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);

  if (!name) {
    throw new Error("Skill name is required");
  }

  if (!category) {
    throw new Error("Skill category is required");
  }

  if (Number.isNaN(displayOrder) || displayOrder < 0) {
    throw new Error("Display order must be a non-negative number");
  }

  const { error } = await supabase.from("skills").insert({
    name,
    category,
    description: description || null,
    display_order: displayOrder,
  });

  if (error) {
    throw new Error(`Failed to create skill: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/skills");
}

export async function updateSkill(
  id: string,
  formData: FormData
) {
  const supabase = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const displayOrder = Number(formData.get("display_order") ?? 0);

  if (!id) {
    throw new Error("Skill ID is required");
  }

  if (!name) {
    throw new Error("Skill name is required");
  }

  if (!category) {
    throw new Error("Skill category is required");
  }

  if (Number.isNaN(displayOrder) || displayOrder < 0) {
    throw new Error("Display order must be a non-negative number");
  }

  const { error } = await supabase
    .from("skills")
    .update({
      name,
      category,
      description: description || null,
      display_order: displayOrder,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update skill: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/skills");
}

export async function deleteSkill(id: string) {
  const supabase = await requireAdmin();

  if (!id) {
    throw new Error("Skill ID is required");
  }

  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to delete skill: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/skills");
}