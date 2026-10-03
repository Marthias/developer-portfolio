import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Marthias Kaseka about software development, projects, and collaboration.",
};

export default function ContactPage() {
  return (
    <main className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <section>
          <p className="text-sm font-medium uppercase tracking-wider">
            Get in touch
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Let&apos;s talk.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Whether you have a project idea, an opportunity, or simply want
            to connect, feel free to send me a message.
          </p>
        </section>

        <section>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}