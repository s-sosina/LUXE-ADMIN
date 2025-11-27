import { NextResponse } from "next/server";
import { MOCK_TRANSACTIONS } from "@/lib/data/mock-user-transaction";

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Transactions API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/transactions?page={page}&limit={limit}
 *
 * Expected Response Format (matching Figma design):
 * {
 *   transactions: [
 *     {
 *       id: string,
 *       type: "tour_earnings" | "withdrawal",
 *       date: string (ISO date),
 *       description: string,
 *       tourName?: string (for tour_earnings),
 *       tourCost?: number (for tour_earnings),
 *       platformCommission?: number (5% of tour cost),
 *       guideReceives?: number (tourCost - commission),
 *       bankAccount?: string (for withdrawals, e.g., "GTBank account 4727286789"),
 *       amount: number,
 *       status: "completed" | "pending" | "failed"
 *     }
 *   ],
 *   pagination: { currentPage, totalPages, totalItems, itemsPerPage }
 * }
 *
 * SQL Query for Tour Earnings:
 * SELECT
 *   t.id, 'tour_earnings' as type, t.created_at as date,
 *   CONCAT('Payment from ', tour.title, ' booking (Tourist: ', tourist.name, ')') as description,
 *   tour.title as tourName,
 *   booking.amount as tourCost,
 *   booking.amount * 0.05 as platformCommission,
 *   booking.amount * 0.95 as guideReceives,
 *   booking.amount * 0.95 as amount,
 *   t.status
 * FROM transactions t
 * JOIN bookings booking ON t.booking_id = booking.id
 * JOIN tours tour ON booking.tour_id = tour.id
 * JOIN users tourist ON booking.user_id = tourist.id
 * WHERE t.recipient_id = $userId AND t.type = 'earning'
 *
 * SQL Query for Withdrawals:
 * SELECT
 *   t.id, 'withdrawal' as type, t.created_at as date,
 *   CONCAT('Payout to ', bank.bank_name, ' account ', bank.account_number) as description,
 *   t.amount, t.status
 * FROM transactions t
 * JOIN bank_accounts bank ON t.bank_account_id = bank.id
 * WHERE t.user_id = $userId AND t.type = 'withdrawal'
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
  // Filter transactions by userId
  const mockTransactions = MOCK_TRANSACTIONS.filter((txn) => txn.userId === id);

  const totalItems = mockTransactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedTransactions = mockTransactions.slice(
    startIndex,
    startIndex + limit
  );

  return NextResponse.json({
    transactions: paginatedTransactions,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
    },
  });
}
