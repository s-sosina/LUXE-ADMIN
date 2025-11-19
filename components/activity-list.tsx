// components/dashboard/ActivityList.tsx
import { ActivityItem } from "@/components/activity-item";

interface Activity {
  id: string;
  userName: string;
  action: string;
  tourName?: string;
  timestamp: string;
}

interface ActivityListProps {
  activities: Activity[];
  isLoading: boolean;
}

export function ActivityList({ activities, isLoading }: ActivityListProps) {
  if (isLoading) {
    return <ActivitySkeleton />;
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-gray-500">
        No recent activity
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 divide-y divide-gray-100">
      {activities.map((activity) => (
        <div key={activity.id} className="py-4 first:pt-0 last:pb-0">
          <ActivityItem {...activity} />
        </div>
      ))}
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="border-t border-gray-100 divide-y divide-gray-100 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="py-4 first:pt-0 last:pb-0">
          <div className="flex items-start gap-3">
            <div className="mt-2 w-2.5 h-2.5 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-4/5" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
