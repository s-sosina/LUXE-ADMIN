"use client";

import { useEffect, useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Reviews API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/reviews?page={page}&limit={limit}
 *
 * Expected Response:
 * {
 *   reviews: [
 *     {
 *       id: string,
 *       rating: number (1-5),
 *       comment: string,
 *       tourTitle: string,
 *       reviewerName: string,
 *       reviewerAvatar: string | null,
 *       date: string (ISO date)
 *     }
 *   ],
 *   pagination: { currentPage, totalPages, totalItems, itemsPerPage }
 * }
 *
 * =============================================================================
 */

interface Review {
  id: string;
  rating: number;
  comment: string;
  tourTitle: string;
  reviewerName: string;
  reviewerAvatar: string | null;
  date: string;
}

interface ReviewsResponse {
  reviews: Review[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface UserReviewsTabProps {
  userId: string;
}

export function UserReviewsTab({ userId }: UserReviewsTabProps) {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    startTransition(() => {
      fetch(`/api/users/${userId}/reviews?page=${currentPage}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          console.error("Error fetching reviews:", err);
        });
    });
  }, [userId, currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-100"
            }`}
          />
        ))}
      </div>
    );
  };

  if (!data) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">
            Loading reviews...
          </p>
        </CardContent>
      </Card>
    );
  }

  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  };
  const reviews = data?.reviews || [];
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews & Ratings</CardTitle>
        <CardDescription>Customer reviews from completed tours</CardDescription>
      </CardHeader>
      <CardContent className={isPending ? "opacity-50 transition-opacity" : ""}>
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No reviews found
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-5 border rounded-xl">
                {/* Reviewer info and stars row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.reviewerAvatar || undefined} />
                      <AvatarFallback className="text-muted-foreground">
                        {review.reviewerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.reviewerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(review.date)}
                      </p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>

                {/* Review comment */}
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {review.comment}
                </p>

                {/* Tour reference */}
                <p className="text-sm text-muted-foreground">
                  Tour: {review.tourTitle}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-6">
        <p className="text-sm text-muted-foreground">
          Showing {pagination.totalItems > 0 ? startItem : 0} to {endItem} of{" "}
          {pagination.totalItems} review
          {pagination.totalItems !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isPending}
            className="gap-1"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {pagination.currentPage} of {pagination.totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={currentPage >= pagination.totalPages || isPending}
            className="gap-1"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
