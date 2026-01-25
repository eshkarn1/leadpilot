import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadPilot",
  description: "AI lead generation and automation for modern teams."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
