"use client";

import { Card } from "@/components/ui/card";
import { Users, MapPin, Calendar, Wallet, TrendingUp } from "lucide-react";
import useSWR from "swr";
import { getMetrics } from "@/lib/services";
import { Metric } from "@/lib/data/mock-metrics";

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  MapPin,
  Calendar,
  Wallet,
};

interface MetricsCardsProps {
  period: string;
}

export function MetricsCards({ period }: MetricsCardsProps) {
  const {
    data: metrics,
    isLoading,
    error,
  } = useSWR<Metric[]>(["metrics", period], () => getMetrics(period), {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  if (isLoading) return <MetricsSkeleton />;
  if (error || !metrics)
    return <div className="text-red-500">Failed to load metrics.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {metrics.map((metric, index) => {
        const IconComponent = ICON_MAP[metric.icon] || Users;

        return (
          <Card
            key={index}
            // MATCHED: rounded-2xl, border-gray-100, subtle shadow
            className="p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-lg transition-all duration-200"
          >
            {/* Header: Label and Icon */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[15px] font-medium text-gray-500 ">
                {metric.label}
              </p>

              {/* MATCHED: Perfect circle centering */}
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${metric.iconBg}`}
              >
                <div className={metric.iconColor}>
                  <IconComponent className="h-6 w-6" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Value and Trend */}
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                {metric.value}
              </h3>

              {/* MATCHED: Green text with 'from last month' in gray */}
              <div className="flex items-center gap-1.5 pt-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold text-gray-400">
                  {metric.change}
                </span>
                {/* <span className="text-sm text-gray-400 font-normal">
                  from last month
                </span> */}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Card
          key={i}
          className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm animate-pulse"
        >
          <div className="flex justify-between mb-4">
            <div className="h-4 w-20 bg-gray-100 rounded" />
            <div className="h-12 w-12 bg-gray-100 rounded-full" />
          </div>
          <div className="space-y-3">
            <div className="h-8 w-24 bg-gray-100 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
