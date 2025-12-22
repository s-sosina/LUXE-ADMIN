"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map as MapIcon, Download, FileText } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { MonthlyPerformanceChart } from "@/components/reports/monthly-performance-chart";
import { PerformanceRankings } from "@/components/reports/performance-rankings";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ReportStats {
  totalBookings: number;
  revenue: number;
  newUsers: number;
  newTours: number;
  trends: {
    bookings: string;
    revenue: string;
    users: string;
    tours: string;
  };
}

interface MonthlyPerformance {
  name: string;
  bookings: number;
  revenue: number;
}

interface ReportStatsResponse {
  success: boolean;
  data: {
    stats: ReportStats;
    monthlyPerformance: MonthlyPerformance[];
  };
}

const formatCurrency = (amount: number): string => {
  if (!amount || amount <= 0) return "₦0";
  return amount >= 1000000
    ? `₦${(amount / 1000000).toFixed(1)}M`
    : `₦${(amount / 1000).toFixed(1)}K`;
};

const fetchReportStats = async (
  period: string
): Promise<ReportStatsResponse> => {
  const res = await fetch(`/api/reports/stats?period=${period}`);
  if (!res.ok) throw new Error("Failed to fetch report stats");
  return res.json();
};

const PageHeader = () => (
  <div>
    <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
    <p className="text-muted-foreground">
      Platform insights and performance metrics
    </p>
  </div>
);

export default function ReportsPage() {
  const [period, setPeriod] = useState("this-month");

  const {
    data: reportData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reports", "stats", period],
    queryFn: () => fetchReportStats(period),
    staleTime: 30000,
  });

  const stats = reportData?.data?.stats;
  const monthlyPerformance = reportData?.data?.monthlyPerformance ?? [];

  if (isLoading) {
    return (
      <main className="flex flex-col gap-6">
        <PageHeader />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </main>
    );
  }

  if (isError || !stats) {
    return (
      <main className="flex flex-col gap-6">
        <PageHeader />
        <div className="flex items-center justify-center p-8 border rounded-lg bg-card">
          <p className="text-muted-foreground">
            Failed to load reports. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  
 const statCards = [
    { title: "Total Bookings", value: stats.totalBookings, icon: MapIcon, trend: stats.trends.bookings },
    { title: "Revenue", value: formatCurrency(stats.revenue), icon: MapIcon, trend: stats.trends.revenue },
    { title: "New Users", value: stats.newUsers, icon: MapIcon, trend: stats.trends.users },
    { title: "New Tours", value: stats.newTours, icon: MapIcon, trend: stats.trends.tours },
  ];
  

  return (
    <main className="flex flex-col gap-6">
      <PageHeader />

      <div className="flex items-center justify-between border rounded-lg p-4 bg-card">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ title, value, icon, trend }) => (
          <StatCard
            key={title}
            title={title}
            value={value}
            icon={icon}
            iconClassName="bg-green-50 text-green-600 dark:bg-green-900/20"
            trend={{ value: trend, label: "from last month" }}
          />
        ))}
      </div>

      <MonthlyPerformanceChart data={monthlyPerformance} />

      <PerformanceRankings />
    </main>
  );
}
