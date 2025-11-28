"use client";

import { StatCard } from "@/components/ui/stat-card";
import {
  MapPin,
  CreditCard,
  Star,
  Users,
  Wallet,
  MessageSquare,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query"


/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Stats API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/stats
 *
 * Expected Response:
 * {
 *   toursCreated: number,        // Count of tours created by this user (tour guides)
 *   totalEarnings: number,       // Total earnings in Naira (tour guides)
 *   averageRating: number | null,// Average rating from reviews (null if no reviews)
 *   totalBookings: number,       // Total bookings made (travelers) or received (tour guides)
 *   totalSpent: number,          // Total amount spent in Naira (travelers)
 *   totalReviews: number         // Total reviews written or received
 * }
 *
 * SQL Queries Required:
 *
 * For Tour Guides:
 * - toursCreated: SELECT COUNT(*) FROM tours WHERE creator_id = $userId
 * - totalEarnings: SELECT COALESCE(SUM(amount), 0) FROM transactions
 *                  WHERE recipient_id = $userId AND type = 'earning'
 * - averageRating: SELECT AVG(rating) FROM reviews WHERE tour_guide_id = $userId
 * - totalBookings: SELECT COUNT(*) FROM bookings b
 *                  JOIN tours t ON b.tour_id = t.id WHERE t.creator_id = $userId
 * - totalReviews: SELECT COUNT(*) FROM reviews WHERE tour_guide_id = $userId
 *
 * For Travelers:
 * - totalBookings: SELECT COUNT(*) FROM bookings WHERE user_id = $userId
 * - totalSpent: SELECT COALESCE(SUM(amount), 0) FROM transactions
 *               WHERE user_id = $userId AND type = 'payment'
 * - totalReviews: SELECT COUNT(*) FROM reviews WHERE reviewer_id = $userId
 *
 * =============================================================================
 */

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
  userRole: "tour-guide" | "traveler";
  isVerified: boolean;
}

export function UserStats({
  userId,
  userRole,
  isVerified,
}: UserStatsGridProps) {
  const { data: stats, isLoading } = useQuery<UserStats>({
    queryKey: ["user-stats", userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/stats`)
      if (!res.ok) throw new Error("Failed to fetch user stats")
      return res.json()
    }
  })

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  if (isLoading) {
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

  // Show simplified stats for Travelers OR Unverified users (even if they are Tour Guides)
  if (userRole === "traveler" || !isVerified) {
    return (
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Users}
          iconClassName="bg-blue-50 text-blue-500"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(stats.totalSpent)}
          icon={Wallet}
          iconClassName="bg-green-50 text-green-500"
          valueClassName="text-orange-500"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Tours Created"
          value={stats.toursCreated}
          icon={MapPin}
          iconClassName="bg-red-50 text-red-500"
        />
        <StatCard
          title="Total Earnings"
          value={formatCurrency(stats.totalEarnings)}
          icon={CreditCard}
          iconClassName="bg-green-50 text-green-500"
          valueClassName="text-orange-500"
        />
        <StatCard
          title="Average Rating"
          value={
            stats.averageRating !== null
              ? `${stats.averageRating.toFixed(1)}`
              : "-"
          }
          icon={Star}
          iconClassName="bg-yellow-50 text-yellow-500"
          valueClassName="flex items-center gap-2"
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Users}
          iconClassName="bg-blue-50 text-blue-500"
        />
        <StatCard
          title="Total Spent"
          value={formatCurrency(stats.totalSpent)}
          icon={Wallet}
          iconClassName="bg-green-50 text-green-500"
          valueClassName="text-orange-500"
        />
        <StatCard
          title="Total Reviews"
          value={stats.totalReviews}
          icon={MessageSquare}
          iconClassName="bg-purple-50 text-purple-500"
        />
      </div>
    </div>
  );
}


