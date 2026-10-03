import { createClient } from "@/lib/supabase/server";

export async function getAdminMessages() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      name,
      email,
      subject,
      message,
      is_read,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch admin messages: ${error.message}`
    );
  }

  return data;
}