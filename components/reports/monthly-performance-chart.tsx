"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, memo } from "react";

interface MonthlyData {
  name: string;
  bookings: number;
  revenue: number;
}

interface MonthlyPerformanceChartProps {
  data: MonthlyData[];
}

// Move formatCurrency outside to prevent recreation
const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(2)}M`;
  }
  return `₦${(amount / 1000).toFixed(1)}K`;
};

export const MonthlyPerformanceChart = memo(function MonthlyPerformanceChart({
  data,
}: MonthlyPerformanceChartProps) {
  // Pre-process all data in one memo
  const processedData = useMemo(() => {
    if (!data.length) return [];

    const maxBookings = Math.max(...data.map((d) => d.bookings));

    return data.map((item) => ({
      name: item.name,
      bookings: item.bookings,
      formattedBookings: `${item.bookings} bookings`,
      formattedRevenue: formatCurrency(item.revenue),
      percentage: maxBookings > 0 ? (item.bookings / maxBookings) * 100 : 0,
    }));
  }, [data]);

  // Early return for empty data
  if (!processedData.length) {
    return (
      <Card className="col-span-4 border shadow-sm">
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 border shadow-sm">
      <CardHeader className="pb-8">
        <CardTitle className="text-lg font-semibold">
          Monthly Performance
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Bookings and revenue trends over the past 10 months
        </CardDescription>
      </CardHeader>
      <CardContent style={{ contain: "content" }}>
        <div className="space-y-8">
          {processedData.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="grid grid-cols-[80px_1fr] gap-4 items-center sm:grid-cols-[100px_1fr]"
            >
              <div className="text-sm font-medium text-muted-foreground">
                {item.name}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">
                    {item.formattedBookings}
                  </span>
                  <span className="font-bold text-orange-500">
                    {item.formattedRevenue}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-300 ease-out"
                    style={{
                      width: `${item.percentage}%`,
                      transform: `translateX(${item.percentage - 100}%)`,
                      willChange: "transform, width",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
