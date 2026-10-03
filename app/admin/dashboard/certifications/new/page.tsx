import CertificationForm from "@/components/admin/certifications/CertificationForm";

export default function NewCertificationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Add Certification
        </h1>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Add a professional certification or credential to your
          portfolio.
        </p>
      </div>

      <CertificationForm />
    </div>
  );
}