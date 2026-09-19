import ProjectsSection from "../src/components/projects/ProjectsSection";

export default function Home() {
  return (
    <main>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider">
            Software Developer
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Building software that solves real problems.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Welcome to my developer portfolio. Explore my
            projects, technical skills, experience, and
            software engineering journey.
          </p>
        </div>
      </section>

      <ProjectsSection />
    </main>
  );
}