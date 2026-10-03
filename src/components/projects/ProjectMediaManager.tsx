"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { uploadProjectMedia } from "@/lib/actions/projects";

type ProjectMediaManagerProps = {
  projectId: string;
};

export default function ProjectMediaManager({
  projectId,
}: ProjectMediaManagerProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!file) {
      setErrorMessage("Please select an image.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("projectId", projectId);
      formData.append("file", file);
      formData.append("altText", altText);
      formData.append("displayOrder", displayOrder);

      await uploadProjectMedia(formData);

      setFile(null);
      setAltText("");
      setDisplayOrder("0");

      setSuccessMessage(
        "Project media uploaded successfully."
      );

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload media."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border p-6"
    >
      <div>
        <h3 className="text-base font-semibold">
          Upload New Media
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Upload an image to this project.
        </p>
      </div>

      {/* File */}
      <div>
        <label
          htmlFor="media-file"
          className="block text-sm font-medium"
        >
          Image
        </label>

        <input
          id="media-file"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) =>
            setFile(event.target.files?.[0] ?? null)
          }
          className="mt-2 block w-full text-sm"
        />

        <p className="mt-2 text-xs text-gray-500">
          JPEG, PNG, or WebP. Maximum size: 5 MB.
        </p>
      </div>

      {/* Alt text */}
      <div>
        <label
          htmlFor="media-alt-text"
          className="block text-sm font-medium"
        >
          Alt Text
        </label>

        <input
          id="media-alt-text"
          type="text"
          value={altText}
          onChange={(event) =>
            setAltText(event.target.value)
          }
          placeholder="Describe the image"
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />

        <p className="mt-2 text-xs text-gray-500">
          Used to describe the image for accessibility.
        </p>
      </div>

      {/* Display order */}
      <div>
        <label
          htmlFor="media-display-order"
          className="block text-sm font-medium"
        >
          Display Order
        </label>

        <input
          id="media-display-order"
          type="number"
          min="0"
          value={displayOrder}
          onChange={(event) =>
            setDisplayOrder(event.target.value)
          }
          className="mt-2 w-full rounded-lg border px-4 py-3 outline-none"
        />

        <p className="mt-2 text-xs text-gray-500">
          Lower numbers appear first.
        </p>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="rounded-lg border border-red-300 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="rounded-lg border border-green-300 p-4 text-sm text-green-600">
          {successMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="rounded-lg border px-5 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading
          ? "Uploading..."
          : "Upload Media"}
      </button>
    </form>
  );
}