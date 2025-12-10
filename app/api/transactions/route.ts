import { NextResponse } from "next/server";
import { MOCK_TRANSACTIONS } from "@/lib/data/mock-transaction";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "10");

  // Return ALL transactions for global view
  const totalItems = MOCK_TRANSACTIONS.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const paginatedTransactions = MOCK_TRANSACTIONS.slice(
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
