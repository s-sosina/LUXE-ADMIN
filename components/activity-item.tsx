// components/dashboard/ActivityItem.tsx
"use client";
import { formatDistanceToNowStrict } from "date-fns";

interface ActivityItemProps {
  userName: string;
  action: string;
  tourName?: string;
  timestamp: string;
}

export function ActivityItem({
  userName,
  action,
  tourName,
  timestamp,
}: ActivityItemProps) {
  const timeAgo = formatTimestamp(timestamp);

  return (
    <div className="flex items-start gap-3">
      <div className="mt-2 w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-900">{userName}</span>{" "}
          <span>{action}</span>
          {tourName && (
            <>
              {" "}
              <span className="font-semibold text-gray-900">{tourName}</span>
            </>
          )}
        </p>
        <p className="text-xs font-medium text-gray-400 mt-1.5">{timeAgo}</p>
      </div>
    </div>
  );
}

function formatTimestamp(timestamp: string) {
  const raw = formatDistanceToNowStrict(new Date(timestamp), {
    addSuffix: true,
  });
  return raw
    .replace("minutes", "mins")
    .replace("minute", "min")
    .replace("hours", "hrs")
    .replace("hour", "hr");
}
