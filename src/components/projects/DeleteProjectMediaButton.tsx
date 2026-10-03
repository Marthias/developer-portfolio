"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteProjectMedia } from "@/lib/actions/projects";

type DeleteProjectMediaButtonProps = {
  mediaId: string;
};

export default function DeleteProjectMediaButton({
  mediaId,
}: DeleteProjectMediaButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this media? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage("");
    setIsDeleting(true);

    try {
      await deleteProjectMedia(mediaId);

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete media."
      );

      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-lg border border-red-400 px-4 py-2 text-sm font-medium text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting
          ? "Deleting..."
          : "Delete"}
      </button>

      {errorMessage && (
        <p className="mt-2 text-xs text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
}