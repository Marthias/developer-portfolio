"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactFormState = {
  success: boolean;
  error: string | null;
};

export async function submitContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Name, email, and message are required.",
    };
  }

  if (!email.includes("@")) {
    return {
      success: false,
      error: "Please provide a valid email address.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("messages").insert({
    name,
    email,
    subject: subject || null,
    message,
  });

  if (error) {
    console.error("Failed to submit contact message:", error);

    return {
      success: false,
      error: "Something went wrong while sending your message.",
    };
  }

  return {
    success: true,
    error: null,
  };
}

export async function toggleMessageReadStatus(
  id: string,
  isRead: boolean
) {
  const supabase = await createClient();

  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

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
    throw new Error("You are not authorized to modify messages.");
  }

  const { error } = await supabase
    .from("messages")
    .update({
      is_read: isRead,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update message: ${error.message}`
    );
  }
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();

  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

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
    throw new Error("You are not authorized to delete messages.");
  }

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete message: ${error.message}`
    );
  }
}