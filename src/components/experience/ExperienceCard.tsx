type ExperienceCardProps = {
  experience: {
    id: string;
    company: string;
    role: string;
    location: string | null;
    employment_type: string;
    start_date: string;
    end_date: string | null;
    description: string;
  };
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  const startDate = formatDate(experience.start_date);

  const endDate = experience.end_date
    ? formatDate(experience.end_date)
    : "Present";

  return (
    <article className="rounded-xl border p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {experience.role}
          </h3>

          <p className="mt-1 font-medium">
            {experience.company}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          {startDate} — {endDate}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
        <span className="rounded-full border px-3 py-1">
          {experience.employment_type.replace("_", " ")}
        </span>

        {experience.location && (
          <span className="rounded-full border px-3 py-1">
            {experience.location}
          </span>
        )}
      </div>

      <p className="mt-4 whitespace-pre-line text-gray-600 dark:text-gray-400">
        {experience.description}
      </p>
    </article>
  );
}