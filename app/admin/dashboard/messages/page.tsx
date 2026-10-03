import { redirect } from "next/navigation";
import MessageReadStatusButton from "@/components/admin/messages/MessageReadStatusButton";
import DeleteMessageButton from "@/components/admin/messages/DeleteMessageButton";

import { createClient } from "@/lib/supabase/server";
import { getAdminMessages } from "@/lib/data/messages";

export default async function AdminMessagesPage() {
  const supabase = await createClient();

  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

  if (claimsError || !claimsData?.claims?.sub) {
    redirect("/admin/login");
  }

  const userId = claimsData.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  const messages = await getAdminMessages();

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Messages
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Messages submitted through your portfolio contact form.
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-xl border p-8">
            <p className="text-gray-500">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="rounded-xl border p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {message.subject || "No subject"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {message.name} · {message.email}
                    </p>
                  </div>

                  <span className="rounded-full border px-3 py-1 text-xs">
                    {message.is_read ? "Read" : "Unread"}
                  </span>
                </div>

                <p className="mt-5 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                  {message.message}
                </p>

               <p className="mt-5 text-xs text-gray-500">
              {new Date(message.created_at).toLocaleString()}
              </p>

             <div className="mt-5">

              <MessageReadStatusButton messageId={message.id}
                                       isRead={message.is_read}
               />

              <DeleteMessageButton messageId={message.id} />
              
            </div>

              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}