"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RankingItem {
  name: string;
  tours: number;
  bookings: number;
  revenue: number;
}

interface RankingCardProps {
  title: string;
  description: string;
  items: RankingItem[];
  type: "guides" | "locations";
}

export function RankingCard({
  title,
  description,
  items,
  type,
}: RankingCardProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(2)}M`;
    }
    return `₦${(amount / 1000).toFixed(2)}K`;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  type === "guides"
                    ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20"
                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/20"
                )}
              >
                {index + 1}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.tours} tours • {item.bookings} bookings
                  </p>
                </div>
                <div className="text-sm font-bold text-orange-500">
                  {formatCurrency(item.revenue)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
