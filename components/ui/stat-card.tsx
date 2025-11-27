import type { LucideIcon } from "lucide-react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    label: string
  }
  className?: string
  iconClassName?: string
  valueClassName?: string
  showStar?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconClassName,
  valueClassName,
  showStar,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-xl border border-gray-100 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("p-2.5 rounded-lg", iconClassName)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-gray-500 text-sm font-medium">{title}</span>
      </div>

      <div className="space-y-1">
        <div className={cn("text-3xl font-bold", valueClassName || "text-gray-900")}>
          {showStar ? (
            <div className="flex items-center gap-2">
              <span>{value}</span>
              <Star className="w-7 h-7 fill-orange-500 text-orange-500" />
            </div>
          ) : (
            value
          )}
        </div>

        {trend && (
          <div className="flex items-center text-xs font-medium">
            <span
              className={cn(
                trend.value.includes("+")
                  ? "text-green-500"
                  : "text-red-500",
                "mr-1",
              )}
            >
              {trend.value.includes("+") ? "↗" : "↘"} {trend.value}
            </span>
            <span className="text-gray-400">{trend.label}</span>
          </div>
        )}
      </div>
      </div>
   
  )
}

