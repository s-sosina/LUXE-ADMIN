import { NextResponse } from "next/server";

// BACKEND INTEGRATION NOTES:
// =========================
//
// This endpoint returns user metrics for the dashboard
//
// EXPECTED SQL QUERIES:
//
// 1. Total Users:
// SELECT COUNT(*) as total_users FROM users;
//
// 2. Active Users:
// SELECT COUNT(*) as active_users FROM users WHERE status = 'active';
//
// 3. Tour Guides:
// SELECT COUNT(*) as tour_guides FROM users WHERE role = 'tour-guide';
//
// 4. Travellers:
// SELECT COUNT(*) as travellers FROM users WHERE role = 'traveler';
//
// You can combine all queries into one for efficiency:
// SELECT
//   COUNT(*) as total_users,
//   COUNT(*) FILTER (WHERE status = 'active') as active_users,
//   COUNT(*) FILTER (WHERE role = 'tour-guide') as tour_guides,
//   COUNT(*) FILTER (WHERE role = 'traveler') as travellers
// FROM users;

export async function GET() {
  // BACKEND: Replace with actual database query
  // const metrics = await db.query(`
  //   SELECT
  //     COUNT(*) as total_users,
  //     COUNT(*) FILTER (WHERE status = 'active') as active_users,
  //     COUNT(*) FILTER (WHERE role = 'tour-guide') as tour_guides,
  //     COUNT(*) FILTER (WHERE role = 'traveler') as travellers
  //   FROM users
  // `)

  // Mock data
  const metrics = {
    totalUsers: 122,
    activeUsers: 114,
    tourGuides: 38,
    travellers: 82,
  };

  return NextResponse.json(metrics);
}
