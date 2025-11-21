import { Users, UserCheck, MapPin, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface UserMetrics {
  title: string;
  value: number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  textColor: string;
}

export const userMetricsCards: UserMetrics[] = [
  {
    title: "Total Users",
    value: 122, // ← Replace with real data later
    icon: Users,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    textColor: "text-foreground",
  },
  {
    title: "Active Users",
    value: 114,
    icon: UserCheck,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
    textColor: "text-green-600",
  },
  {
    title: "Tour Guides",
    value: 38,
    icon: MapPin,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    textColor: "text-orange-600",
  },
  {
    title: "Travellers",
    value: 82,
    icon: Plane,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    textColor: "text-purple-600",
  },
];
