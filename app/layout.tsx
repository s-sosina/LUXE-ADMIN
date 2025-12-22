import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppLayout } from "../components/app-layout";
import { Providers } from "@/app/provider";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader
          color="#f97316"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #f97316,0 0 5px #f97316"
        />
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
