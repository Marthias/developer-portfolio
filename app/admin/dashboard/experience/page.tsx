import Link from "next/link";

import { getAdminExperience } from "@/lib/data/experience";
import DeleteExperienceButton from "@/components/admin/experience/DeleteExperienceButton";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatEmploymentType(type: string) {
  return type
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default async function AdminExperiencePage() {
  const experience = await getAdminExperience();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Portfolio content
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Experience
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your professional experience, internships,
            freelance work, and other opportunities.
          </p>
        </div>

        <Link
          href="/admin/dashboard/experience/new"
          className="shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          + New Experience
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border">
        {experience.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No experience has been added yet.
            </p>

            <Link
              href="/admin/dashboard/experience/new"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Add your first experience
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {experience.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-[minmax(0,1fr)_90px_70px] sm:items-center sm:gap-6"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">
                      {item.role}
                    </h3>

                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-900 dark:text-gray-400">
                      {formatEmploymentType(
                        item.employment_type
                      )}
                    </span>
                  </div>

                  <p className="mt-1 font-medium">
                    {item.company}
                    {item.location
                      ? ` · ${item.location}`
                      : ""}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {formatDate(item.start_date)} –{" "}
                    {item.end_date
                      ? formatDate(item.end_date)
                      : "Present"}
                  </p>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={`/admin/dashboard/experience/${item.id}/edit`}
                  className="text-sm font-medium underline"
                >
                  Edit
                </Link>

                <DeleteExperienceButton
                  id={item.id}
                  name={`${item.role} at ${item.company}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}