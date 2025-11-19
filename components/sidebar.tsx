'use client'
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  MapPin,
  Calendar,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Verification", href: "/verification", icon: ShieldCheck },
  { name: "Tours", href: "/tours", icon: MapPin },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Financial", href: "/financial", icon: Wallet },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];
export function Sidebar() {
     const pathname = usePathname();
    return (
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo  */}
        <div className="p-6  border-gray-200 flex justify-center items-center">
          <Image 
            src="/luxe_logo.png" 
            alt="Luxe Tours Logo" 
            width={150} 
            height={150}
        
          />
        </div>
        {/* User Profile  */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-orange-600">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@luxe.com
              </p>
            </div>
          </div>
        </div>
        {/* Navigations  */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Logout  */}
        <div className="p-12 border-t border-gray-200">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
    );
}