"use client";

import { useQuery } from "@tanstack/react-query";
import { RankingCard } from "@/components/reports/ranking-cards";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchRankings() {
  const response = await fetch("/api/reports/rankings");
  if (!response.ok) throw new Error("Failed to fetch rankings");
  return response.json();
}

export function PerformanceRankings() {
  const { data, isLoading } = useQuery({
    queryKey: ["reports", "rankings"],
    queryFn: fetchRankings,
    refetchInterval: 5000, // Poll every 5 seconds for real-time updates
  });

  const topGuides = data?.topGuides || [];
  const topLocations = data?.topLocations || [];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-12">
      <RankingCard
        title="Top Performing Guides"
        description="Based on total revenue generated"
        items={topGuides}
        type="guides"
      />
      <RankingCard
        title="Top Locations"
        description="Most popular destinations"
        items={topLocations}
        type="locations"
      />
    </div>
  );
}
