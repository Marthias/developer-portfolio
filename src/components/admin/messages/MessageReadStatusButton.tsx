"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toggleMessageReadStatus } from "@/lib/actions/messages";

type MessageReadStatusButtonProps = {
  messageId: string;
  isRead: boolean;
};

export default function MessageReadStatusButton({
  messageId,
  isRead,
}: MessageReadStatusButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    try {
      await toggleMessageReadStatus(messageId, !isRead);
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
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isPending
        ? "Updating..."
        : isRead
          ? "Mark as unread"
          : "Mark as read"}
    </button>
  );
}