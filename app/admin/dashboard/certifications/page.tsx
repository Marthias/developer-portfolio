import Link from "next/link";
import { getAdminCertifications } from "@/lib/data/certifications";
import DeleteCertificationButton from "@/components/admin/certifications/DeleteCertificationButton";

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function CertificationsAdminPage() {
  const certifications = await getAdminCertifications();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your professional certifications and credentials.
          </p>
        </div>

        <Link
          href="/admin/dashboard/certifications/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          Add Certification
        </Link>
      </div>

      {certifications.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-gray-500">
            No certifications have been added yet.
          </p>

          <Link
            href="/admin/dashboard/certifications/new"
            className="mt-4 inline-block text-sm font-medium underline"
          >
            Add your first certification
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <div className="divide-y">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="grid grid-cols-1 items-center gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_140px_90px_70px] sm:gap-6"
              >
                <div className="min-w-0">
                  <h2 className="font-semibold">
                    {certification.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {certification.issuing_organization}
                  </p>

                  {certification.credential_id && (
                    <p className="mt-2 truncate text-xs text-gray-500">
                      Credential ID: {certification.credential_id}
                    </p>
                  )}
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Issued</p>
                  <p className="mt-1">
                    {formatDate(certification.issue_date)}
                  </p>
                </div>

                <div className="text-sm">
                  <p className="text-gray-500">Expires</p>
                  <p className="mt-1">
                    {certification.expiry_date
                      ? formatDate(certification.expiry_date)
                      : "No expiry"}
                  </p>
                </div>

                <div className="flex gap-2 sm:justify-end">
                  <Link
                    href={`/admin/dashboard/certifications/${certification.id}/edit`}
                    className="text-sm font-medium underline"
                  >
                    Edit
                  </Link>

                  <DeleteCertificationButton
                    id={certification.id}
                    name={certification.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}