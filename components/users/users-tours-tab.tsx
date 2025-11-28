"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination-component";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Eye,
} from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query"

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Tours API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/tours?page={page}&limit={limit}
 *
 * Expected Response:
 * {
 *   tours: [
 *     {
 *       id: string,
 *       title: string,
 *       location: string,
 *       image: string,
 *       startDate: string (ISO date),
 *       endDate: string (ISO date),
 *       duration: string (e.g., "7 days 6 Nights"),
 *       bookingsCount: number,
 *       price: number,
 *       status: "active" | "completed" | "cancelled" | "draft"
 *     }
 *   ],
 *   pagination: {
 *     currentPage: number,
 *     totalPages: number,
 *     totalItems: number,
 *     itemsPerPage: number
 *   }
 * }
 *
 * =============================================================================
 */

interface Tour {
  id: string;
  title: string;
  location: string;
  image: string;
  startDate: string;
  endDate: string;
  duration: string;
  bookingsCount: number;
  price: number;
  status: "active" | "completed" | "cancelled" | "draft";
}

interface ToursResponse {
  tours: Tour[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface UserToursTabProps {
  userId: string;
}

export function UserToursTab({ userId }: UserToursTabProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery<ToursResponse>({
    queryKey: ["user-tours", userId, currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/tours?page=${currentPage}&limit=5`)
      if (!res.ok) throw new Error("Failed to fetch tours")
      return res.json()
    },
    placeholderData: keepPreviousData,
  })

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatDay = (date: Date) => {
      const day = date.getDate();
      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
          ? "rd"
          : "th";
      return `${day}${suffix}`;
    };

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const year = end.getFullYear();

    return `${startMonth} ${formatDay(start)} - ${endMonth} ${formatDay(
      end
    )} ${year}`;
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-transparent border border-green-500 text-green-500 hover:bg-transparent font-medium">
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-transparent border border-gray-500 text-gray-600 hover:bg-transparent font-medium">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-transparent border border-red-500 text-red-500 hover:bg-transparent font-medium">
            Cancelled
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-transparent border border-gray-400 text-gray-500 hover:bg-transparent font-medium">
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const tours = data?.tours || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  };

  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <p className="text-center text-gray-500">Loading tours...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900">Tours Created</h3>
        <p className="text-sm text-gray-500">
          All tours created by this tour guide
        </p>
      </div>

      {tours.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No tours found</p>
      ) : (
        <div className="space-y-4">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="flex gap-6 p-4 border border-gray-200 rounded-xl"
            >
              {/* Tour Image - Left side */}
              <div className="relative w-[200px] h-[140px] rounded-lg overflow-hidden shrink-0">
                <Image
                  src={
                    tour.image ||
                    "/placeholder.svg?height=140&width=200&query=tour destination nigeria"
                  }
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Tour Details - Middle */}
              <div className="flex-1 min-w-0 py-1">
                <h4 className="font-semibold text-gray-900 text-lg mb-3">
                  {tour.title}
                </h4>

                <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{tour.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDateRange(tour.startDate, tour.endDate)}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{tour.duration}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>
                      {tour.bookingsCount} booking
                      {tour.bookingsCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-lg border-gray-300 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>

              {/* Price & Status - Right side */}
              <div className="flex flex-col items-end justify-between py-1 shrink-0">
                <p className="text-xl font-bold text-orange-500">
                  {formatCurrency(tour.price)}
                </p>
                {getStatusBadge(tour.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
        itemLabel={pagination.totalItems === 1 ? "tour" : "tours"}
        onPageChange={setCurrentPage}
        loading={isLoading}
        className="mt-6 pt-4 px-0 py-0 bg-transparent"
      />
    </div>
  );
}
