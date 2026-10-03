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
  input: UpdateProjectInput
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

export async function uploadProjectMedia(formData: FormData) {
  const supabase = await createClient();

  // 1. Verify authentication
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("You must be authenticated.");
  }

  // 2. Verify admin authorization
  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error(
      "You are not authorized to upload project media."
    );
  }

  // 3. Get form values
  const projectId = formData.get("projectId");
  const file = formData.get("file");
  const altText = formData.get("altText");
  const displayOrder = formData.get("displayOrder");

  // 4. Validate project ID
  if (
    typeof projectId !== "string" ||
    !projectId
  ) {
    throw new Error("A valid project ID is required.");
  }

  // 5. Validate file
  if (!(file instanceof File)) {
    throw new Error("Please select a file.");
  }

  if (file.size === 0) {
    throw new Error("The selected file is empty.");
  }

  // 6. Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Only JPEG, PNG, and WebP images are allowed."
    );
  }

  // 7. Validate file size
  const maxFileSize = 5 * 1024 * 1024;

  if (file.size > maxFileSize) {
    throw new Error(
      "Image must be smaller than 5 MB."
    );
  }

  // 8. Validate display order
  const parsedDisplayOrder = Number(
    displayOrder ?? 0
  );

  if (
    !Number.isInteger(parsedDisplayOrder) ||
    parsedDisplayOrder < 0
  ) {
    throw new Error(
      "Display order must be a non-negative integer."
    );
  }

  // 9. Verify the project exists
  const { data: project, error: projectError } =
    await supabase
      .from("projects")
      .select("id, slug")
      .eq("id", projectId)
      .single();

  if (projectError || !project) {
    throw new Error("Project not found.");
  }

  // 10. Generate a safe storage path
  const fileExtension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${fileExtension}`;

  const storagePath = `projects/${project.slug}/${fileName}`;

  // 11. Upload file to Supabase Storage
  const { error: uploadError } =
    await supabase.storage
      .from("project-media")
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      });

  if (uploadError) {
    throw new Error(
      `Failed to upload media: ${uploadError.message}`
    );
  }

  // 12. Generate public URL
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("project-media")
    .getPublicUrl(storagePath);

  // 13. Save media metadata
  const { data: media, error: mediaError } =
    await supabase
      .from("project_media")
      .insert({
        project_id: projectId,
        media_type: "image",
        url: publicUrl,
        alt_text:
          typeof altText === "string" && altText.trim()
            ? altText.trim()
            : null,
        display_order: parsedDisplayOrder,
      })
      .select()
      .single();

  if (mediaError) {
    // Clean up the uploaded file if database insertion fails.
    await supabase.storage
      .from("project-media")
      .remove([storagePath]);

    throw new Error(
      `Failed to save media metadata: ${mediaError.message}`
    );
  }

  // 14. Revalidate affected pages
  revalidatePath(
    `/admin/dashboard/projects/${projectId}/edit`
  );

  revalidatePath(
    `/projects/${project.slug}`
  );

  revalidatePath("/");

  return media;
}

export async function deleteProjectMedia(mediaId: string) {
  const supabase = await createClient();

  // 1. Verify authentication
  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    throw new Error("You must be authenticated.");
  }

  // 2. Verify admin authorization
  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

  if (profileError || profile?.role !== "admin") {
    throw new Error(
      "You are not authorized to delete project media."
    );
  }

  // 3. Find the media record
  const { data: media, error: mediaFetchError } =
    await supabase
      .from("project_media")
      .select(`
        id,
        project_id,
        url,
        projects (
          slug
        )
      `)
      .eq("id", mediaId)
      .single();

  if (mediaFetchError || !media) {
    throw new Error("Project media not found.");
  }

  // 4. Extract the Storage path from the public URL
  const storageMarker =
    "/storage/v1/object/public/project-media/";

  const markerIndex = media.url.indexOf(storageMarker);

  if (markerIndex === -1) {
    throw new Error(
      "Unable to determine the Storage path for this media."
    );
  }

  const storagePath = decodeURIComponent(
    media.url.substring(
      markerIndex + storageMarker.length
    )
  );

  // 5. Delete the Storage object
  const { error: storageDeleteError } =
    await supabase.storage
      .from("project-media")
      .remove([storagePath]);

  if (storageDeleteError) {
    throw new Error(
      `Failed to delete media file: ${storageDeleteError.message}`
    );
  }

  // 6. Delete the database record
  const { error: databaseDeleteError } =
    await supabase
      .from("project_media")
      .delete()
      .eq("id", mediaId);

  if (databaseDeleteError) {
    throw new Error(
      `Media file was deleted, but its database record could not be removed: ${databaseDeleteError.message}`
    );
  }

  // 7. Revalidate affected pages
  const project = Array.isArray(media.projects)
    ? media.projects[0]
    : media.projects;

  if (project?.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  revalidatePath(
    `/admin/dashboard/projects/${media.project_id}/edit`
  );

  revalidatePath("/");

  return {
    success: true,
  };
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