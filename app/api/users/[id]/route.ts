import { NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/data/mock-user-details";


/**
 * =============================================================================
 * BACKEND REQUIREMENTS: Single User API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]
 *
 * Database Schema Required:
 * - users.id (UUID, PRIMARY KEY)
 * - users.name (VARCHAR)
 * - users.email (VARCHAR, UNIQUE)
 * - users.phone (VARCHAR)
 * - users.avatar_url (VARCHAR, nullable)
 * - users.role (ENUM: 'tour-guide', 'traveler')
 * - users.status (ENUM: 'active', 'inactive', 'suspended')
 * - users.is_verified (BOOLEAN)
 * - users.created_at (TIMESTAMP)
 * - users.last_login_at (TIMESTAMP)
 * - users.last_tour_created_at (TIMESTAMP, nullable)
 * - users.nin (VARCHAR, nullable - National ID Number)
 *
 * SQL Query:
 * SELECT
 *   id, name, email, phone, avatar_url as avatar,
 *   role, status, is_verified as isVerified,
 *   created_at as dateJoined, last_login_at as lastLogin,
 *   last_tour_created_at as lastTourCreated, nin
 * FROM users
 * WHERE id = $userId
 *
 * =============================================================================
 */

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  // MOCK DATA - Replace with actual database query
  const user = MOCK_USERS[id];

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  return NextResponse.json(user);
}
