// components/dashboard/RecentActivitySection.tsx
"use client";

import { CardTitle } from "@/components/ui/card";
import { Pagination } from "./pagination-component";
import { useEffect, useState } from "react";
import { getRecentActivities } from "@/lib/services";
import { ActivityList } from "@/components/activity-list";
import { Activity } from "@/lib/data/mock-dashboard";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function RecentActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchActivities = async (page: number) => {
    setLoading(true);
    try {
      const data = await getRecentActivities(page, 8);
      setActivities(data.activities);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(1);
  }, []);

  // Pagination logic moved to reusable component

  return (
    <div className="px-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <CardTitle className="text-[15px] font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
      </div>
      <ActivityList activities={activities} isLoading={loading} />
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        itemLabel="activities"
        onPageChange={fetchActivities}
        loading={loading}
      />
    </div>
  );
}
