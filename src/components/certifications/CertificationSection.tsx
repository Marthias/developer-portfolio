import { getPublicCertifications } from "@/lib/data/certifications";
import CertificationCard from "./CertificationCard";

export default async function CertificationSection() {
  const certifications = await getPublicCertifications();

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider">
            Certifications
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Professional Certifications
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Certifications and professional credentials that
            complement my academic and practical experience.
          </p>
        </div>

        {certifications.length === 0 ? (
          <p className="text-gray-500">
            No certifications available yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((certification) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}