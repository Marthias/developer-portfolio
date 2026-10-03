import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminExperienceById } from "@/lib/data/experience";
import ExperienceEditForm from "@/components/admin/experience/ExperienceEditForm";

type EditExperiencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;

  const experience = await getAdminExperienceById(id);

  if (!experience) {
    notFound();
  }

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
          Edit Experience
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update the details of this experience.
        </p>
      </div>

      <ExperienceEditForm experience={experience} />
    </div>
  );
}