type CertificationCardProps = {
  certification: {
    id: string;
    name: string;
    issuing_organization: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    description: string | null;
  };
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function CertificationCard({
  certification,
}: CertificationCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {certification.name}
          </h3>

          <p className="mt-1 font-medium">
            {certification.issuing_organization}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          Issued {formatDate(certification.issue_date)}
        </p>
      </div>

      {certification.expiry_date && (
        <p className="mt-3 text-sm text-gray-500">
          Expires {formatDate(certification.expiry_date)}
        </p>
      )}

      {certification.credential_id && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Credential ID: {certification.credential_id}
        </p>
      )}

      {certification.description && (
        <p className="mt-4 whitespace-pre-line text-gray-600 dark:text-gray-400">
          {certification.description}
        </p>
      )}

      {certification.credential_url && (
        <div className="mt-5">
          <a
            href={certification.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Verify Credential
          </a>
        </div>
      )}
    </article>
  );
}