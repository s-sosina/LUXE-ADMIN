// components/dashboard/RecentActivitySection.tsx
"use client";

import { CardTitle } from "@/components/ui/card";
import { Pagination } from "./pagination-component";
import { useState } from "react";
import { ActivityList } from "@/components/activity-list";
import { Activity } from "@/lib/data/mock-dashboard";
import { keepPreviousData, useQuery } from "@tanstack/react-query"

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function RecentActivitySection() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery<{ activities: Activity[], pagination: PaginationData }>({
    queryKey: ["activities", currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/activities?page=${currentPage}&limit=8`)
      if (!res.ok) {
        throw new Error("Failed to fetch activities")
      }
      return res.json()
    },
    placeholderData: keepPreviousData,
  })

  const activities = data?.activities || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="px-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <CardTitle className="text-[15px] font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
      </div>
      <ActivityList activities={activities} isLoading={isLoading} />
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        itemLabel="activities"
        onPageChange={setCurrentPage}
        loading={isLoading}
      />
    </div>
  );
}
