import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import SiteShell from "@/components/layout/SiteShell";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Marthias Kaseka | Software Developer",
    template: "%s | Marthias Kaseka",
  },
  description:
    "Marthias Kaseka is a software developer building practical software systems and exploring modern software engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}