import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "Portal",
  description: "Welcome to Portal",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 min-h-screen font-sans"
        style={{ fontFamily: 'var(--font-geist-questrial)' }}
      >
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
        <Toaster richColors position="top-center" duration={3000} />
      </body>
    </html>
  );
}
