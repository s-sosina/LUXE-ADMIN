import { NextRequest, NextResponse } from "next/server";

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

  // Mock data
  const mockUsers = [
    {
      id: "1",
      name: "Jason Chapel",
      email: "jasonchapel97@gmail.com",
      phone: "+234 812 345 2661",
      role: "tour-guide",
      status: "active",
      dateJoined: "2025-10-14T12:24:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarahj@gmail.com",
      phone: "+234 812 345 2661",
      role: "traveler",
      status: "active",
      dateJoined: "2025-10-14T12:24:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "3",
      name: "Angela Abdul",
      email: "angieabdul@rocketmail.com",
      phone: "+234 812 345 2661",
      role: "tour-guide",
      status: "active",
      dateJoined: "2025-10-14T12:24:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "4",
      name: "Shalli Oniel",
      email: "shalli.oniel@gmail.com",
      phone: "+234 812 345 2661",
      role: "traveler",
      status: "pending",
      dateJoined: "2025-10-14T12:24:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    {
      id: "5",
      name: "Michael Chen",
      email: "michael.chen@gmail.com",
      phone: "+234 812 345 2662",
      role: "tour-guide",
      status: "active",
      dateJoined: "2025-10-13T10:15:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "6",
      name: "Emma Wilson",
      email: "emma.wilson@gmail.com",
      phone: "+234 812 345 2663",
      role: "traveler",
      status: "active",
      dateJoined: "2025-10-12T14:30:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    {
      id: "7",
      name: "David Brown",
      email: "david.brown@gmail.com",
      phone: "+234 812 345 2664",
      role: "tour-guide",
      status: "inactive",
      dateJoined: "2025-10-11T09:45:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "8",
      name: "Lisa Garcia",
      email: "lisa.garcia@gmail.com",
      phone: "+234 812 345 2665",
      role: "traveler",
      status: "active",
      dateJoined: "2025-10-10T16:20:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "9",
      name: "Robert Taylor",
      email: "robert.taylor@gmail.com",
      phone: "+234 812 345 2666",
      role: "tour-guide",
      status: "pending",
      dateJoined: "2025-10-09T11:10:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    {
      id: "10",
      name: "Jennifer Lee",
      email: "jennifer.lee@gmail.com",
      phone: "+234 812 345 2667",
      role: "traveler",
      status: "active",
      dateJoined: "2025-10-08T13:25:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "11",
      name: "James Anderson",
      email: "james.anderson@gmail.com",
      phone: "+234 812 345 2668",
      role: "tour-guide",
      status: "active",
      dateJoined: "2025-10-07T15:40:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    {
      id: "12",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@gmail.com",
      phone: "+234 812 345 2669",
      role: "traveler",
      status: "inactive",
      dateJoined: "2025-10-06T12:55:00Z",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
  ];

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
