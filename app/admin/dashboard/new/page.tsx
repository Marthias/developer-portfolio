import Link from "next/link";

import ProjectCreateForm from "@/components/projects/ProjectCreateForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <Link
            href="/admin/dashboard/projects"
            className="text-sm text-gray-500 hover:underline"
          >
            ← Back to Projects
          </Link>

          <p className="mt-8 text-sm font-medium uppercase tracking-wider">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Create Project
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Add a project to your portfolio.
          </p>
        </div>

        <ProjectCreateForm />
      </div>
    </main>
  );
}