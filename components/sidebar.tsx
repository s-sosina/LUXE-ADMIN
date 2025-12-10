"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronLeft,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Constants
const MIN_WIDTH = 80;
const MAX_WIDTH = 400;
const COLLAPSE_THRESHOLD = 150;
const DEFAULT_EXPANDED_WIDTH = 256; // w-64

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Verification", href: "/verification", icon: ShieldCheck },
  { name: "Tours", href: "/tours", icon: MapPin },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Financial", href: "/financial", icon: Wallet },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_EXPANDED_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const isCollapsed = sidebarWidth < COLLAPSE_THRESHOLD;

  // Handle mouse move during drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, startWidthRef.current + deltaX)
    );
    setSidebarWidth(newWidth);
  }, []);

  // Handle mouse up to end drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  // Setup and cleanup mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Start drag handler
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startXRef.current = e.clientX;
      startWidthRef.current = sidebarWidth;
      setIsDragging(true);
    },
    [sidebarWidth]
  );

  // Toggle collapse/expand
  const toggleCollapse = useCallback(() => {
    setSidebarWidth(isCollapsed ? DEFAULT_EXPANDED_WIDTH : MIN_WIDTH);
  }, [isCollapsed]);

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col relative h-screen",
          isDragging ? "" : "transition-all duration-300"
        )}
      >
        {/* Resize Handle */}
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute right-0 top-0 h-full w-2 cursor-ew-resize z-40 group",
            "hover:bg-orange-200/50 transition-colors",
            isDragging && "bg-orange-300/50"
          )}
        >
          {/* Visual grip indicator */}
          <div
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 h-8 w-4 flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden",
              isDragging && "opacity-100"
            )}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Minimize Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-3 top-10 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm z-50 hover:bg-gray-100 hidden sm:flex",
            isDragging ? "" : "transition-all duration-300"
          )}
          onClick={toggleCollapse}
        >
          {isCollapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>

        {/* Logo */}
        <div
          className={cn(
            "p-6 transition-opacity duration-200",
            isCollapsed ? "items-center px-4" : "",
            isDragging ? "pointer-events-none" : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                {/* Logo Icon */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="relative h-8 w-8">
                    <span className="font-bold text-3xl italic tracking-tighter">
                      L
                    </span>
                    <div className="absolute top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full" />
                  </div>
                </div>

                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold italic tracking-tight text-black">
                      Luxe
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest -mt-1">
                      Elevate your escape
                    </span>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={10}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Luxe</span>
                  <span className="text-xs text-gray-500">
                    Elevate your escape
                  </span>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* User Profile */}
        <div
          className={cn(
            "px-6 py-4 transition-opacity duration-200",
            isCollapsed ? "px-2" : "",
            isDragging ? "pointer-events-none" : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-3",
                  isCollapsed ? "justify-center flex-col" : ""
                )}
              >
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      admin@luxe.com
                    </p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={10}>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Admin User</span>
                  <span className="text-xs text-gray-500">admin@luxe.com</span>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 px-4 py-2 overflow-y-auto transition-opacity duration-200",
            isDragging ? "pointer-events-none" : ""
          )}
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1",
                          isActive
                            ? "bg-orange-50 text-orange-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          isCollapsed ? "justify-center px-2" : ""
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-orange-500" : "text-gray-500"
                          )}
                        />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right" sideOffset={10}>
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div
          className={cn(
            "p-4 border-t border-gray-100 mt-auto transition-opacity duration-200",
            isDragging ? "pointer-events-none" : ""
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors",
                  isCollapsed ? "justify-center" : ""
                )}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>Log out</span>}
              </button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={10}>
                Log out
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}
