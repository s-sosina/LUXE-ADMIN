import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
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
        <div className="flex min-h-screen bg-[#f5f5f5]">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}