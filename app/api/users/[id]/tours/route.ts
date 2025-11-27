import { NextResponse } from "next/server";
import { MOCK_TOURS } from "@/lib/data/mock-user-tour";

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Tours API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/tours?page={page}&limit={limit}
 *
 * Database Schema Required:
 * - tours.id (UUID, PRIMARY KEY)
 * - tours.creator_id (UUID, FOREIGN KEY -> users.id)
 * - tours.title (VARCHAR)
 * - tours.location (VARCHAR)
 * - tours.image_url (VARCHAR)
 * - tours.start_date (DATE)
 * - tours.end_date (DATE)
 * - tours.duration (VARCHAR, e.g., "7 days 6 Nights")
 * - tours.price (DECIMAL)
 * - tours.status (ENUM: 'active', 'completed', 'cancelled', 'draft')
 * - tours.created_at (TIMESTAMP)
 *
 * SQL Query:
 * SELECT
 *   t.id, t.title, t.location, t.image_url as image,
 *   t.start_date as startDate, t.end_date as endDate,
 *   t.duration, t.price, t.status,
 *   COUNT(b.id) as bookingsCount
 * FROM tours t
 * LEFT JOIN bookings b ON b.tour_id = t.id
 * WHERE t.creator_id = $userId
 * GROUP BY t.id
 * ORDER BY t.created_at DESC
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
  const limit = Number.parseInt(searchParams.get("limit") || "5");

  // MOCK DATA - Replace with actual database query
  // Filter tours by creatorId (userId)
  const mockTours = MOCK_TOURS.filter((tour) => tour.creatorId === id);

  const totalItems = mockTours.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedTours = mockTours.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    tours: paginatedTours,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  });
}
