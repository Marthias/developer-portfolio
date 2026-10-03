"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/lib/actions/blog";

type DeleteBlogPostButtonProps = {
  id: string;
  title: string;
};

export default function DeleteBlogPostButton({
  id,
  title,
}: DeleteBlogPostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteBlogPost(id);

      router.refresh();
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete blog post."
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
      className="text-sm font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}