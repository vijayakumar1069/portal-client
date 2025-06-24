import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "sonner";



export const metadata: Metadata = {
  title: "Portal",
  description: "Welcome to Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      style={{ fontFamily: 'var(--font-geist-questrial)' }}
      >
        {children}
        <Toaster richColors position="top-center" duration={3000} />
      </body>
    </html>
  );
}
