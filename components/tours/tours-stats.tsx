import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

interface TourStatsData {
  total: number;
  pending: number;
  active: number;
  completed: number;
  paused: number;
}

export function TourStats() {
  const { data, isLoading } = useQuery<TourStatsData>({
    queryKey: ["tour-stats"],
    queryFn: async () => {
      const res = await fetch("/api/tours/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const stats = [
    {
      title: "Total Tours",
      value: data?.total ?? 0,
    },
    {
      title: "Pending Review",
      value: data?.pending ?? 0,
      valueClassName: "text-amber-600",
    },
    {
      title: "Active Tours",
      value: data?.active ?? 0,
      valueClassName: "text-green-600",
    },
    {
      title: "Completed",
      value: data?.completed ?? 0,
      valueClassName: "text-blue-600",
    },
    {
      title: "Paused",
      value: data?.paused ?? 0,
      valueClassName: "text-gray-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white h-[104px] p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center"
          >
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          valueClassName={stat.valueClassName}
          className="flex flex-col items-center justify-center gap-2 transition-shadow hover:shadow-md"
        />
      ))}
    </div>
  );
}
