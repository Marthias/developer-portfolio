type EducationCardProps = {
  education: {
    id: string;
    institution: string;
    qualification: string;
    field_of_study: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
    description: string | null;
  };
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function EducationCard({
  education,
}: EducationCardProps) {
  const startDate = formatDate(education.start_date);

  const endDate = education.end_date
    ? formatDate(education.end_date)
    : "Present";

  return (
    <article className="rounded-xl border p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {education.qualification}
          </h3>

          <p className="mt-1 font-medium">
            {education.institution}
          </p>

          {education.field_of_study && (
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {education.field_of_study}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500">
          {startDate} — {endDate}
        </p>
      </div>

      {education.location && (
        <p className="mt-4 text-sm text-gray-500">
          {education.location}
        </p>
      )}

      {education.description && (
        <p className="mt-4 whitespace-pre-line text-gray-600 dark:text-gray-400">
          {education.description}
        </p>
      )}
    </article>
  );
}