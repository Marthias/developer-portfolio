import { getPublicSkills } from "@/lib/data/skills";
import SkillCard from "./SkillCard";

export default async function SkillsSection() {
  const skills = await getPublicSkills();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider">
            Technical Skills
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Technologies & Skills
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Technologies, tools, and software engineering
            concepts I work with.
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-500">
            No skills available yet.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}