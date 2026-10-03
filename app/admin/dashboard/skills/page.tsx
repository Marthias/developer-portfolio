import Link from "next/link";

import { getAdminSkills } from "@/lib/data/skills";
import DeleteSkillButton from "@/components/admin/skills/DeleteSkillButton";

export default async function AdminSkillsPage() {
  const skills = await getAdminSkills();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Portfolio content
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Skills
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage the technologies, tools, and software engineering
            concepts displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/dashboard/skills/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          + New Skill
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border">
        {skills.length === 0 ? (
            
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No skills have been added yet.
            </p>

            <Link
              href="/admin/dashboard/skills/new"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Add your first skill
            </Link>
          </div>
        ) : (
          <div className="divide-y">


    {skills.map((skill) => (
  <div
    key={skill.id}
    className="grid grid-cols-1 items-center gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_60px_80px] sm:gap-6"
  >
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-semibold">
          {skill.name}
        </h3>

        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-400">
          {skill.category}
        </span>
      </div>

      {skill.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {skill.description}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Display order: {skill.display_order}
      </p>
    </div>

    <Link
      href={`/admin/dashboard/skills/${skill.id}/edit`}
      className="text-sm font-medium underline"
    >
      Edit
    </Link>

    <DeleteSkillButton
      id={skill.id}
      name={skill.name}
    />
  </div>
))}


          </div>
        )}
      </div>
    </div>
  );
}