export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Marthias Kaseka. All rights reserved.
        </p>
      </div>
    </footer>
  );
}