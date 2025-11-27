import { NextResponse } from "next/server";
import { MOCK_REVIEWS } from "@/lib/data/mock-user-review";

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Reviews API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/reviews?page={page}&limit={limit}
 *
 * Expected Response (matching Figma design):
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
 * SQL Query (for tour guides - reviews received):
 * SELECT
 *   r.id, r.rating, r.comment, t.title as tourTitle,
 *   u.name as reviewerName, u.avatar_url as reviewerAvatar,
 *   r.created_at as date
 * FROM reviews r
 * JOIN tours t ON r.tour_id = t.id
 * JOIN users u ON r.reviewer_id = u.id
 * WHERE t.creator_id = $userId
 * ORDER BY r.created_at DESC
 * LIMIT $limit OFFSET ($page - 1) * $limit
 *
 * =============================================================================
 */

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "10");

  // MOCK DATA - Replace with actual database query
  // Filter reviews by recipient (userId)
  const mockReviews = MOCK_REVIEWS.filter((review) => review.userId === id);

  const totalItems = mockReviews.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedReviews = mockReviews.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    reviews: paginatedReviews,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  });
}
