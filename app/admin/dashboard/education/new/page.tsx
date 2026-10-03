import Link from "next/link";

import EducationForm from "@/components/admin/education/EducationForm";

export default function NewEducationPage() {
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
          Add Education
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Add an academic qualification or educational record.
        </p>
      </div>

      <EducationForm />
    </div>
  );
}