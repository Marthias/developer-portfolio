import Link from "next/link";

import SkillForm from "@/components/admin/skills/SkillForm";

export default function NewSkillPage() {
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
          Add Skill
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add a technology, tool, or software engineering concept
          to your portfolio.
        </p>
      </div>

      <SkillForm />
    </div>
  );
}