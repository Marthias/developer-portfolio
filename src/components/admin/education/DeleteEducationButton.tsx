"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteEducation } from "@/lib/actions/education";

type DeleteEducationButtonProps = {
  id: string;
  name: string;
};

export default function DeleteEducationButton({
  id,
  name,
}: DeleteEducationButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteEducation(id);

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete education."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}