import Link from "next/link";

const adminNavigation = [
  { label: "Overview", href: "/admin/dashboard" },
  { label: "Projects", href: "/admin/dashboard/projects" },
  { label: "Skills", href: "/admin/dashboard/skills" },
  { label: "Experience", href: "/admin/dashboard/experience" },
  { label: "Education", href: "/admin/dashboard/education" },
  { label: "Certifications", href: "/admin/dashboard/certifications" },
  { label: "Blog", href: "/admin/dashboard/blog" },
  { label: "Messages", href: "/admin/dashboard/messages" },
];


export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="w-64 border-r p-6">
          <div className="mb-8">
            <Link
              href="/admin/dashboard"
              className="text-lg font-bold"
            >
              Admin Dashboard
            </Link>

            <p className="mt-1 text-sm text-gray-500">
              Portfolio management
            </p>
          </div>

          <nav className="space-y-2">
            {adminNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t pt-6">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              ← View public site
            </Link>
          </div>
        </aside>

        <section className="flex-1">
          <header className="border-b px-8 py-5">
            <div>
              <p className="text-sm text-gray-500">
                Portfolio CMS
              </p>

              <h1 className="text-lg font-semibold">
                Administration
              </h1>
            </div>
          </header>

          <main className="px-8 py-8">
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}