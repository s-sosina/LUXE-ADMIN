// src/lib/data/mock-metrics.ts

export interface Metric {
  label: string;
  value: string;
  change: string;
  icon: "Users" | "MapPin" | "Calendar" | "Wallet"; // Strict typing for icons
  iconBg: string;
  iconColor: string;
}

// Centralized Mock Data Dictionary
export const MOCK_METRICS: Record<string, Metric[]> = {
  "last-quarter": [
    {
      label: "Total Users",
      value: "320",
      change: "+8% from previous quarter",
      icon: "Users",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Tours",
      value: "15",
      change: "+5% from previous quarter",
      icon: "MapPin",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Bookings",
      value: "580",
      change: "+18% from previous quarter",
      icon: "Calendar",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Revenue",
      value: "₦6.2M",
      change: "+15% from previous quarter",
      icon: "Wallet",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ],
  "this-year": [
    {
      label: "Total Users",
      value: "1,245",
      change: "+45% from last year",
      icon: "Users",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Tours",
      value: "22",
      change: "+25% from last year",
      icon: "MapPin",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Bookings",
      value: "2,890",
      change: "+52% from last year",
      icon: "Calendar",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Revenue",
      value: "₦28.5M",
      change: "+48% from last year",
      icon: "Wallet",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ],
  default: [
    {
      label: "Total Users",
      value: "385",
      change: "+15% from last month",
      icon: "Users",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Tours",
      value: "18",
      change: "+12% from last month",
      icon: "MapPin",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Bookings",
      value: "742",
      change: "+23% from last month",
      icon: "Calendar",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Revenue",
      value: "₦8.45M",
      change: "+22% from last month",
      icon: "Wallet",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ],
};

// Helper to simulate DB delay (Optional, keeps it realistic)
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
