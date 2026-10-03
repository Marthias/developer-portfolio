import { notFound } from "next/navigation";
import CertificationEditForm from "@/components/admin/certifications/CertificationEditForm";
import { getAdminCertificationById } from "@/lib/data/certifications";

type EditCertificationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCertificationPage({
  params,
}: EditCertificationPageProps) {
  const { id } = await params;

  const certification = await getAdminCertificationById(id);

  if (!certification) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Certification
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update the certification and credential information.
        </p>
      </div>

      <CertificationEditForm certification={certification} />
    </div>
  );
}