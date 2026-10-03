"use client";

import { useActionState } from "react";

import {
  submitContactMessage,
  type ContactFormState,
} from "@/lib/actions/messages";

const initialState: ContactFormState = {
  success: false,
  error: null,
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    initialState
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:ring-2"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:ring-2"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium"
        >
          Subject
        </label>

        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-2 w-full rounded-lg border bg-transparent px-4 py-3 outline-none focus:ring-2"
          placeholder="What would you like to talk about?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium"
        >
          Message
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y rounded-lg border bg-transparent px-4 py-3 outline-none focus:ring-2"
          placeholder="Write your message..."
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-500">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="text-sm text-green-500">
          Your message has been sent successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}