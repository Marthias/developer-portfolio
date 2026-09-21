"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";



type CreateProjectInput = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "planned" | "in_progress" | "completed" | "archived";
  featured: boolean;
};

type UpdateProjectInput = CreateProjectInput & {
  technologyIds: string[];
};



export async function createProject(input: CreateProjectInput) {
  const supabase = await createClient();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("You must be authenticated.");
  }

  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error("You are not authorized to perform this action.");
  }



  const { data, error } = await supabase
    .from("projects")
    .insert({
      title: input.title,
      slug: input.slug,
      short_description: input.shortDescription,
      description: input.description,
      github_url: input.githubUrl || null,
      live_url: input.liveUrl || null,
      status: input.status,
      featured: input.featured,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create project: ${error.message}`);
  }

  revalidatePath("/admin/dashboard/projects");
  revalidatePath("/");

  return data;
}

export async function updateProject(
  id: string,
  input: CreateProjectInput
) {
  const supabase = await createClient();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("You must be authenticated.");
  }

  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error(
      "You are not authorized to perform this action."
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      title: input.title,
      slug: input.slug,
      short_description: input.shortDescription,
      description: input.description,
      github_url: input.githubUrl || null,
      live_url: input.liveUrl || null,
      status: input.status,
      featured: input.featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Failed to update project: ${error.message}`
    );
  }

    const { error: deleteTechnologiesError } = await supabase
    .from("project_technologies")
    .delete()
    .eq("project_id", id);

  if (deleteTechnologiesError) {
    throw new Error(
      `Failed to clear project technologies: ${deleteTechnologiesError.message}`
    );
  }

  if (input.technologyIds.length > 0) {
    const projectTechnologyRows = input.technologyIds.map(
      (technologyId) => ({
        project_id: id,
        technology_id: technologyId,
      })
    );

    const { error: insertTechnologiesError } =
      await supabase
        .from("project_technologies")
        .insert(projectTechnologyRows);

    if (insertTechnologiesError) {
      throw new Error(
        `Failed to update project technologies: ${insertTechnologiesError.message}`
      );
    }
  }


  revalidatePath("/admin/dashboard/projects");
  revalidatePath("/");
  revalidatePath(`/projects/${data.slug}`);

  return data;

}



export async function deleteProject(id: string) {
  const supabase = await createClient();

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("You must be authenticated.");
  }

  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error(
      "You are not authorized to perform this action."
    );
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete project: ${error.message}`
    );
  }

  revalidatePath("/admin/dashboard/projects");
  revalidatePath("/");

  return { success: true };
}