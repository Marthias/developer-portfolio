import { getPublicEducation } from "@/lib/data/education";
import EducationCard from "./EducationCard";

export default async function EducationSection() {
  const education = await getPublicEducation();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider">
            Education
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Academic Background
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            My academic background and educational journey.
          </p>
        </div>

        {education.length === 0 ? (
          <p className="text-gray-500">
            No education records available yet.
          </p>
        ) : (
          <div className="space-y-6">
            {education.map((item) => (
              <EducationCard
                key={item.id}
                education={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}