import { NextResponse } from "next/server"
import { MOCK_STATS } from "@/lib/data/mock-stats"


/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Stats API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/stats
 *
 * SQL Queries Required:
 *
 * For Tour Guides:
 * ----------------
 * -- Tours Created
 * SELECT COUNT(*) as toursCreated FROM tours WHERE creator_id = $userId
 *
 * -- Total Earnings
 * SELECT COALESCE(SUM(amount), 0) as totalEarnings
 * FROM transactions
 * WHERE recipient_id = $userId AND type = 'earning' AND status = 'completed'
 *
 * -- Average Rating
 * SELECT AVG(rating) as averageRating
 * FROM reviews r
 * JOIN tours t ON r.tour_id = t.id
 * WHERE t.creator_id = $userId
 *
 * -- Total Bookings (received)
 * SELECT COUNT(*) as totalBookings
 * FROM bookings b
 * JOIN tours t ON b.tour_id = t.id
 * WHERE t.creator_id = $userId
 *
 * -- Total Reviews (received)
 * SELECT COUNT(*) as totalReviews
 * FROM reviews r
 * JOIN tours t ON r.tour_id = t.id
 * WHERE t.creator_id = $userId
 *
 * For Travelers:
 * --------------
 * -- Total Bookings (made)
 * SELECT COUNT(*) as totalBookings FROM bookings WHERE user_id = $userId
 *
 * -- Total Spent
 * SELECT COALESCE(SUM(amount), 0) as totalSpent
 * FROM transactions
 * WHERE user_id = $userId AND type = 'payment' AND status = 'completed'
 *
 * -- Total Reviews (written)
 * SELECT COUNT(*) as totalReviews FROM reviews WHERE reviewer_id = $userId
 *
 * =============================================================================
 */

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params

  // MOCK DATA - Replace with actual database queries
  const mockStats = MOCK_STATS[id] || {
    toursCreated: 1,
    totalEarnings: 0,
    averageRating: null,
    totalBookings: 0,
    totalSpent: 0,
    totalReviews: 0,
  }

  return NextResponse.json(mockStats)
}
