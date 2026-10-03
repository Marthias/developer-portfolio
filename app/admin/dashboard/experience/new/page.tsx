import Link from "next/link";

import ExperienceForm from "@/components/admin/experience/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/experience"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to Experience
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          Portfolio content
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Add Experience
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add a professional role, internship, freelance engagement,
          or other experience.
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}