"use client"
import { useState } from "react";
import { UserToursTab } from "@/components/users/users-tours-tab";
import { UserTransactionsTab } from "@/components/users/user-transaction-tab";
import { UserReviewsTab } from "@/components/users/user-reviews-tab";



interface UserDetailsTabsProps {
  userId: string;
  userRole: "traveler" | "tour-guide" | "admin";
  userStatus: "active" | "inactive" | "suspended";
  isVerified: boolean;
}

export function UserDetailsTab({
  userId,
  userRole,
  userStatus,
  isVerified,
}: UserDetailsTabsProps) {
  const getAvailableTabs = ({ userRole, userStatus, isVerified }: UserDetailsTabsProps) => {
    // Tour Guide (verified) - show all tabs
    if (userRole === "tour-guide" && isVerified) {
      return ["tours", "transactions", "reviews"] as const;
    }
    // Traveler (active) - show only transactions
    if (userRole === "traveler" && userStatus === "active") {
      return ["transactions"] as const;
    }
    // Default fallback - show transactions only
    return ["tours"] as const;
  };

  const availableTabs = getAvailableTabs({ userId, userRole, userStatus, isVerified });
  const [activeTab, setActiveTab] = useState<
    "tours" | "transactions" | "reviews"
  >(availableTabs[0]);

  const tabLabels = {
    tours: "Tours",
    transactions: "Transactions",
    reviews: "Reviews",
  };
  return (
    <main>
      {/* Tab Buttons - Only show if more than one tab available */}
      <div className="inline-flex bg-gray-100 rounded-full p-1 mb-6">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "tours" && <UserToursTab userId={userId} />}
      {activeTab === "transactions" && <UserTransactionsTab userId={userId} />}
      {activeTab === "reviews" && <UserReviewsTab userId={userId} />}
    </main>
  );
}
