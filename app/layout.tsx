import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Work Order Auditor",
  description: "Upload work order reports and get categorized summaries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
