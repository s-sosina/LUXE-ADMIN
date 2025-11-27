import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "../components/app-layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxe Admin Panel - Dashboard Overview",
  description: "Elevate your escape with Luxe tour management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
