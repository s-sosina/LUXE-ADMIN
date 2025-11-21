// app/(dashboard)/users/components/user-metrics-cards.tsx

import { userMetricsCards } from "@/lib/data/mock-user-metrics";
import type { LucideIcon } from "lucide-react";

export  function UserMetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {userMetricsCards.map((card) => {
        const Icon: LucideIcon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {card.title}
              </span>
              <div className={`p-3 rounded-full ${card.iconBgColor}`}>
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>
            </div>

            <div className={`text-3xl font-bold ${card.textColor}`}>
              {card.value.toLocaleString()} {/* Nice comma formatting: 1,234 */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
