import { StatCard } from "@/components/ui/stat-card";
import { Calendar, CheckCircle2, CircleDollarSign, Clock } from "lucide-react";

interface BookingStatsProps {
  stats: {
    totalBookings: number;
    upcoming: number;
    completed: number;
    revenue: number;
  };
}

export function BookingStats({ stats }: BookingStatsProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    return `₦${(amount / 1000).toFixed(1)}K`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Bookings"
        value={stats.totalBookings}
        icon={Calendar}
        iconClassName="bg-gray-100 text-gray-600"
      />
      <StatCard
        title="Upcoming"
        value={stats.upcoming}
        icon={Clock}
        iconClassName="bg-blue-100 text-blue-600"
        valueClassName="text-blue-600"
      />
      <StatCard
        title="Completed"
        value={stats.completed}
        icon={CheckCircle2}
        iconClassName="bg-green-100 text-green-600"
        valueClassName="text-green-600"
      />
      <StatCard
        title="Revenue"
        value={formatCurrency(stats.revenue)}
        icon={CircleDollarSign}
        iconClassName="bg-orange-100 text-orange-600"
        valueClassName="text-orange-600"
      />
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function BookingStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-8 w-[60px]" />
            </div>
          </div>
        ))}
    </div>
  );
}
