'use client'
import { Sidebar } from "@/components/sidebar";
import { usePathname } from "next/navigation";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isUserDetails = pathname.startsWith('/users/') && pathname !== '/users';

  return (
    <div className={`min-h-screen bg-[#f5f5f5] ${isUserDetails ? '' : 'flex'}`}>
      {!isUserDetails && <Sidebar />}
      <main className={`${isUserDetails ? '' : 'flex-1'} p-6`}>
        <div className={`${isUserDetails ? '' : 'max-w-7xl'}`}>{children}</div>
      </main>
    </div>
  );
}