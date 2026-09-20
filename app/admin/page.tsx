import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    redirect("/admin/login");
  }

  const userId = data.claims.sub;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-wider">
          Administration
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome back. Manage your portfolio content from here.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage portfolio projects.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage technical skills.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Experience</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage professional experience.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Education</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage academic background.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Certifications
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage certifications.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">Blog</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage blog articles.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}