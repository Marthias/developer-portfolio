import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminEducationById } from "@/lib/data/education";
import EducationEditForm from "@/components/admin/education/EducationEditForm";

type EditEducationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEducationPage({
  params,
}: EditEducationPageProps) {
  const { id } = await params;

  const education = await getAdminEducationById(id);

  if (!education) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/dashboard/education"
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to Education
        </Link>

        <p className="mt-6 text-sm text-gray-500">
          Portfolio content
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Edit Education
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Update this academic record.
        </p>
      </div>

      <EducationEditForm education={education} />
    </div>
  );
}