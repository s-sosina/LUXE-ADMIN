"use client";
import { useEffect, useState } from "react";
import {
  MapPin,
  CreditCard,
  Star,
  Ticket,
  Wallet,
  MessageSquare,
} from "lucide-react";
// import { cn } from "@/lib/utils"
import { StatCard } from "@/components/ui/stat-card";

interface UserStats {
  toursCreated: number;
  totalEarnings: number;
  averageRating: number | null;
  totalBookings: number;
  totalSpent: number;
  totalReviews: number;
}
interface UserStatsGridProps {
  userId: string;
}

export function UserStats({ userId }: UserStatsGridProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/users/${userId}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user stats:", err);
        setLoading(false);
      });
  }, [userId]);
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;
  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Tours Created"
          value={stats.toursCreated}
          icon={MapPin}
          iconClassName="bg-orange-50 text-orange-500"
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          icon={CreditCard}
          iconClassName="bg-green-50 text-green-500"
          valueClassName="text-green-600"
        />
        <StatCard
          title="Average Rating"
          value="-"
          icon={Star}
          iconClassName="bg-yellow-50 text-yellow-500"
          showStar={true}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Ticket}
          iconClassName="bg-blue-50 text-blue-500"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(stats.totalSpent)}
          icon={Wallet}
          iconClassName="bg-purple-50 text-purple-500"
          valueClassName="text-purple-600"
        />
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews}
          icon={MessageSquare}
          iconClassName="bg-gray-50 text-gray-500"
        />
      </div>
    </div>
  );
}
