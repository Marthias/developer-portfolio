import Link from "next/link";

import { getAdminDashboardStats } from "@/lib/data/dashboard";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wider">
          Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Manage and monitor the content that powers your portfolio.
        </p>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          label="Total Projects"
          value={stats.totalProjects}
          href="/admin/dashboard/projects"
        />

        <DashboardCard
          label="Featured Projects"
          value={stats.featuredProjects}
          href="/admin/dashboard/projects"
        />

        <DashboardCard
          label="Unread Messages"
          value={stats.unreadMessages}
          href="/admin/dashboard/messages"
        />

        <DashboardCard
          label="Published Posts"
          value={stats.publishedPosts}
          href="/blog"
        />
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Recent Messages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              The latest messages received through your portfolio.
            </p>
          </div>

          <Link
            href="/admin/dashboard/messages"
            className="text-sm font-medium underline"
          >
            View all
          </Link>
        </div>

        {stats.recentMessages.length === 0 ? (
          <div className="rounded-xl border p-8">
            <p className="text-gray-500">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentMessages.map((message) => (
              <article
                key={message.id}
                className="rounded-xl border p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {message.subject || "No subject"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {message.name} · {message.email}
                    </p>
                  </div>

                  <span className="rounded-full border px-3 py-1 text-xs">
                    {message.is_read ? "Read" : "Unread"}
                  </span>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {message.message}
                </p>

                <p className="mt-4 text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="mt-5 flex flex-wrap gap-4">
          <Link
            href="/admin/dashboard/new"
            className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            + New Project
          </Link>

          <Link
            href="/admin/dashboard/messages"
            className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            View Messages
          </Link>
        </div>
      </section>
    </div>
  );
}

type DashboardCardProps = {
  label: string;
  value: number;
  href: string;
};

function DashboardCard({
  label,
  value,
  href,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="rounded-xl border p-6 transition hover:-translate-y-0.5 hover:bg-gray-50 dark:hover:bg-gray-900"
    >
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </Link>
  );
}