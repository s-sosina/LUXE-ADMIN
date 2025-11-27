import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/data/mock-user-details";



// BACKEND INTEGRATION NOTES:
// =========================
//
// DATABASE SCHEMA REQUIRED:
// CREATE TABLE users (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   phone VARCHAR(50),
//   role VARCHAR(50) NOT NULL CHECK (role IN ('tour-guide', 'traveler')),
//   status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
//   avatar_url TEXT,
//   is_verified BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );
//
// CREATE INDEX idx_users_role ON users(role);
// CREATE INDEX idx_users_status ON users(status);
// CREATE INDEX idx_users_email ON users(email);
// CREATE INDEX idx_users_name ON users USING gin(to_tsvector('english', name));

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "all";
  const status = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // BACKEND: Replace with actual database query
  //
  // SQL Query Example:
  // const query = `
  //   SELECT
  //     id,
  //     name,
  //     email,
  //     phone,
  //     role,
  //     status,
  //     avatar_url as avatar,
  //     is_verified as "isVerified",
  //     created_at as "dateJoined"
  //   FROM users
  //   WHERE
  //     ($1 = '' OR name ILIKE '%' || $1 || '%' OR email ILIKE '%' || $1 || '%' OR phone ILIKE '%' || $1 || '%')
  //     AND ($2 = 'all' OR role = $2)
  //     AND ($3 = 'all' OR status = $3)
  //   ORDER BY created_at DESC
  //   LIMIT 50
  // `
  // const users = await db.query(query, [search, role, status])

  // Mock data from shared source
  const mockUsers = Object.values(MOCK_USERS).map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    dateJoined: user.dateJoined,
    avatar: user.avatar,
    isVerified: user.isVerified,
  }));

  // Filter mock data based on query params
  let filteredUsers = mockUsers;

  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)
    );
  }

  if (role !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  if (status !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.status === status);
  }

  const totalItems = filteredUsers.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return NextResponse.json({
    users: paginatedUsers,
    totalItems,
    currentPage: page,
    totalPages: Math.ceil(totalItems / limit),
    itemsPerPage: limit,
  });
}
