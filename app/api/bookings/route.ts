import { NextResponse } from "next/server";
import { BOOKINGS } from "@/lib/data/mock-bookings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search")?.toLowerCase() || "";
  const status = searchParams.get("status") || "all";

  let filteredBookings = [...BOOKINGS];

  // Filtering
  if (status !== "all") {
    filteredBookings = filteredBookings.filter((b) => b.status === status);
  }

  // Searching
  if (search) {
    filteredBookings = filteredBookings.filter(
      (b) =>
        b.id.toLowerCase().includes(search) ||
        b.tourName.toLowerCase().includes(search) ||
        b.userName.toLowerCase().includes(search) ||
        b.guideName.toLowerCase().includes(search)
    );
  }

  // Calculate Stats (from the full filtered list or overall list depending on requirement.
  // Usually stats are global or based on current filters. Let's do global stats for simplicity,
  // but if the design implies 'filtered view stats', we could do that.
  // The image usually shows global stats cards. Let's calculate global stats.)
  const totalBookings = BOOKINGS.length;
  const upcomingBytes = BOOKINGS.filter((b) => b.status === "upcoming").length;
  const completedBytes = BOOKINGS.filter(
    (b) => b.status === "completed"
  ).length;
  const revenue = BOOKINGS.reduce((acc, curr) => acc + curr.amount, 0);

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedBookings = filteredBookings.slice(start, end);

  return NextResponse.json({
    bookings: paginatedBookings,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredBookings.length / limit),
      totalItems: filteredBookings.length,
      itemsPerPage: limit,
    },
    stats: {
      totalBookings,
      upcoming: upcomingBytes,
      completed: completedBytes,
      revenue,
    },
  });
}