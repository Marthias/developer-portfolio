import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminSkillById } from "@/lib/data/skills";
import SkillEditForm from "@/components/admin/skills/SkillEditForm";

type EditSkillPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSkillPage({
  params,
}: EditSkillPageProps) {
  const { id } = await params;

  const skill = await getAdminSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/skills"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to Skills
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          Portfolio content
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Edit Skill
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update the details of this skill.
        </p>
      </div>

      <SkillEditForm skill={skill} />
    </div>
  );
}