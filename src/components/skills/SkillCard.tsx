type SkillCardProps = {
  skill: {
    id: string;
    name: string;
    category: string;
    description: string | null;
    display_order: number;
  };
};

export default function SkillCard({
  skill,
}: SkillCardProps) {
  return (
    <article className="rounded-xl border p-5">
      <h3 className="text-lg font-semibold">
        {skill.name}
      </h3>

      <p className="mt-1 text-sm capitalize text-gray-500">
        {skill.category.replace("_", " ")}
      </p>

      {skill.description && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {skill.description}
        </p>
      )}
    </article>
  );
}