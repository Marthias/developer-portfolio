import { getPublicExperience } from "@/lib/data/experience";
import ExperienceCard from "./ExperienceCard";

export default async function ExperienceSection() {
  const experience = await getPublicExperience();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider">
            Experience
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Professional Journey
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            My professional experience, internships, freelance
            work, and other software development opportunities.
          </p>
        </div>

        {experience.length === 0 ? (
          <p className="text-gray-500">
            No experience available yet.
          </p>
        ) : (
          <div className="space-y-6">
            {experience.map((item) => (
              <ExperienceCard
                key={item.id}
                experience={item}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}