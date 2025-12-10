"use client";

import { StatCard } from "@/components/ui/stat-card";

export function GlobalStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₦5,247,700",
      valueClassName: "text-green-500",
    },
    {
      title: "Platform Commission",
      value: "₦262,385",
      valueClassName: "text-blue-500",
    },
    {
      title: "Total Withdrawals",
      value: "₦858,300",
      valueClassName: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          title={stat.title}
          value={stat.value}
          valueClassName={stat.valueClassName}
          className="shadow-sm border-gray-100"
        />
      ))}
    </div>
  );
}
