export const MOCK_USERS: Record<
  string,
  {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    role: "tour-guide" | "traveler";
    status: "active" | "inactive" | "suspended";
    isVerified: boolean;
    dateJoined: string;
    lastLogin: string;
    lastTourCreated: string | null;
    nin: string | null;
  }
> = {
  // Tour Guide - Active & Verified
  usr_001: {
    id: "usr_001",
    name: "Jason Chapel",
    email: "jasonchapel97@gmail.com",
    phone: "+234 802 234 6252",
    avatar: "/jason-chapel-profile-photo.jpg",
    role: "tour-guide",
    status: "active",
    isVerified: true,
    dateJoined: "2025-10-14T00:24:00Z",
    lastLogin: "2025-11-04T09:42:00Z",
    lastTourCreated: "2025-09-11T16:02:00Z",
    nin: "73638292720",
  },
  // Traveler - Active & Unverified
  usr_002: {
    id: "usr_002",
    name: "Sarah Johnson",
    email: "sarahj@gmail.com",
    phone: "+234 812 345 2661",
    avatar: "/sarah-johnson-female-traveler.jpg",
    role: "traveler",
    status: "active",
    isVerified: false,
    dateJoined: "2025-10-14T00:24:00Z",
    lastLogin: "2025-11-20T14:30:00Z",
    lastTourCreated: null,
    nin: null,
  },
  usr_003: {
    id: "usr_003",
    name: "Angela Abdul",
    email: "angieabdul@rocketmail.com",
    phone: "+234 803 111 2222",
    avatar: "/avatars/angela-abdul.jpg",
    role: "tour-guide" as const,
    status: "active" as const,
    isVerified: true,
    dateJoined: "2025-09-20T10:15:00Z",
    lastLogin: "2025-11-26T18:22:00Z",
    lastTourCreated: null,
    nin: "88765432109",
  },
  usr_004: {
    id: "usr_004",
    name: "Shalli Oniel",
    email: "shalli.oniel@gmail.com",
    phone: "+234 906 777 8888",
    avatar: "/avatars/shalli-oniel.jpg",
    role: "traveler" as const,
    // status: "pending" as const,
    status: "active" as const,
    isVerified: false,
    dateJoined: "2025-11-01T08:30:00Z",
    // lastLogin: null,
    lastLogin: "2025-11-26T18:22:00Z",
    lastTourCreated: null,

    nin: null,
  },
  usr_005: {
    id: "usr_005",
    name: "Michael Okafor",
    email: "mike.okafor@example.com",
    phone: "+234 701 234 5678",
    avatar: "/avatars/michael-okafor.jpg",
    role: "tour-guide" as const,
    status: "inactive" as const,
    isVerified: true,
    dateJoined: "2025-08-10T14:20:00Z",
    lastLogin: "2025-10-01T12:00:00Z",
    lastTourCreated: null,
    nin: "11223344556",
  },
};
