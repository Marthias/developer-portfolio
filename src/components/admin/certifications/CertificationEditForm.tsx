"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { updateCertification } from "@/lib/actions/certifications";

type Certification = {
  id: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  description: string | null;
};

type FormState = {
  error?: string;
};

type CertificationEditFormProps = {
  certification: Certification;
};

const initialState: FormState = {};

export default function CertificationEditForm({
  certification,
}: CertificationEditFormProps) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<
    FormState,
    FormData
  >(
    async (_previousState, formData) => {
      try {
        await updateCertification(certification.id, formData);

        router.push("/admin/dashboard/certifications");
        router.refresh();

        return {};
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Certification Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={certification.name}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="issuing_organization"
          className="mb-2 block text-sm font-medium"
        >
          Issuing Organization
        </label>

        <input
          id="issuing_organization"
          name="issuing_organization"
          type="text"
          required
          defaultValue={certification.issuing_organization}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="issue_date"
            className="mb-2 block text-sm font-medium"
          >
            Issue Date
          </label>

          <input
            id="issue_date"
            name="issue_date"
            type="date"
            required
            defaultValue={certification.issue_date}
            className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label
            htmlFor="expiry_date"
            className="mb-2 block text-sm font-medium"
          >
            Expiry Date
          </label>

          <input
            id="expiry_date"
            name="expiry_date"
            type="date"
            defaultValue={certification.expiry_date ?? ""}
            className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
          />

          <p className="mt-1 text-xs text-gray-500">
            Leave blank if the certification does not expire.
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="credential_id"
          className="mb-2 block text-sm font-medium"
        >
          Credential ID
        </label>

        <input
          id="credential_id"
          name="credential_id"
          type="text"
          defaultValue={certification.credential_id ?? ""}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="credential_url"
          className="mb-2 block text-sm font-medium"
        >
          Credential URL
        </label>

        <input
          id="credential_url"
          name="credential_url"
          type="url"
          defaultValue={certification.credential_url ?? ""}
          className="w-full rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />

        <p className="mt-1 text-xs text-gray-500">
          Optional link where the certification can be verified.
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={certification.description ?? ""}
          className="w-full resize-y rounded-lg border bg-transparent px-4 py-2.5 outline-none focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "Saving..." : "Update Certification"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/dashboard/certifications")
          }
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}