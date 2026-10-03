import Link from "next/link";

import { getAdminEducation } from "@/lib/data/education";
import DeleteEducationButton from "@/components/admin/education/DeleteEducationButton";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default async function AdminEducationPage() {
  const education = await getAdminEducation();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Portfolio content
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Education
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your academic background and educational journey.
          </p>
        </div>

        <Link
          href="/admin/dashboard/education/new"
          className="shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          + New Education
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border">
        {education.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No education records have been added yet.
            </p>

            <Link
              href="/admin/dashboard/education/new"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Add your first education record
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {education.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-[minmax(0,1fr)_90px_70px] sm:items-center sm:gap-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">
                      {item.qualification}
                    </h3>
                  </div>

                  <p className="mt-1 font-medium">
                    {item.institution}
                    {item.location
                      ? ` · ${item.location}`
                      : ""}
                  </p>

                  {item.field_of_study && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.field_of_study}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    {formatDate(item.start_date)} –{" "}
                    {item.end_date
                      ? formatDate(item.end_date)
                      : "Present"}
                  </p>

                  {item.description && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  )}
                </div>

                <Link
                  href={`/admin/dashboard/education/${item.id}/edit`}
                  className="text-sm font-medium underline"
                >
                  Edit
                </Link>

                <DeleteEducationButton
                  id={item.id}
                  name={`${item.qualification} at ${item.institution}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}