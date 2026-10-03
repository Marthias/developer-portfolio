"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteMessage } from "@/lib/actions/messages";

type DeleteMessageButtonProps = {
  messageId: string;
};

export default function DeleteMessageButton({
  messageId,
}: DeleteMessageButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsPending(true);

    try {
      await deleteMessage(messageId);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}