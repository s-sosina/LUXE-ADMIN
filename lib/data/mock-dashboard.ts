export interface Activity {
  id: string;
  type: "booking" | "review" | "tour-created" | "user-registered";
  userName: string;
  userAvatar?: string;
  tourName?: string;
  action: string;
  timestamp: string; // ISO string
  amount?: number;
  rating?: number;
}

export interface TopTour {
  id: string;
  name: string;
  bookings: number;
  revenue: string;
  rating: number;
}

// Activities
export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "booking",
    userName: "Olivia Martin",
    userAvatar: "/avatars/olivia.jpg",
    tourName: "Santorini Sunset Cruise",
    action: "booked a tour",
    timestamp: "2025-11-19T14:23:00.000Z",
    amount: 1299,
  },
  {
    id: "2",
    type: "review",
    userName: "Jackson Lee",
    userAvatar: "/avatars/jackson.jpg",
    tourName: "Dubai Desert Safari",
    action: "left a 5-star review",
    timestamp: "2025-11-19T12:15:00.000Z",
    rating: 5,
  },
  {
    id: "3",
    type: "tour-created",
    userName: "Admin",
    tourName: "Northern Lights Adventure",
    action: "created a new tour",
    timestamp: "2025-11-19T10:40:00.000Z",
  },
  {
    id: "4",
    type: "booking",
    userName: "Isabella Nguyen",
    userAvatar: "/avatars/isabella.jpg",
    tourName: "Bali Temple & Rice Terraces",
    action: "booked a private tour",
    timestamp: "2025-11-18T18:55:00.000Z",
    amount: 2450,
  },
  {
    id: "5",
    type: "user-registered",
    userName: "William Kim",
    userAvatar: "/avatars/william.jpg",
    action: "joined Luxe Tours",
    timestamp: "2025-11-18T16:20:00.000Z",
  },
  {
    id: "6",
    type: "review",
    userName: "Sofia Davis",
    userAvatar: "/avatars/sofia.jpg",
    tourName: "Santorini Sunset Cruise",
    action: "left a glowing review",
    timestamp: "2025-11-18T14:10:00.000Z",
    rating: 5,
  },
  {
    id: "7",
    type: "booking",
    userName: "Michael Chen",
    userAvatar: "/avatars/michael.jpg",
    tourName: "Machu Picchu Express",
    action: "booked for 4 people",
    timestamp: "2025-11-18T11:30:00.000Z",
    amount: 5600,
  },
  {
    id: "8",
    type: "tour-created",
    userName: "Emma Wilson",
    userAvatar: "/avatars/emma.jpg",
    tourName: "Tokyo Food & Culture Walk",
    action: "published a new tour",
    timestamp: "2025-11-17T09:45:00.000Z",
  },
  {
    id: "9",
    type: "booking",
    userName: "Lucas Brown",
    userAvatar: "/avatars/lucas.jpg",
    tourName: "Galápagos Island Explorer",
    action: "reserved adventure tour",
    timestamp: "2025-11-17T08:00:00.000Z",
    amount: 8200,
  },
  {
    id: "10",
    type: "review",
    userName: "Ava Johnson",
    userAvatar: "/avatars/ava.jpg",
    tourName: "Tokyo Food & Culture Walk",
    action: "left a 4-star review",
    timestamp: "2025-11-16T18:15:00.000Z",
    rating: 4,
  },
  {
    id: "11",
    type: "user-registered",
    userName: "Elijah Perez",
    userAvatar: "/avatars/elijah.jpg",
    action: "signed up as a guide",
    timestamp: "2025-11-16T17:09:00.000Z",
  },
  {
    id: "12",
    type: "booking",
    userName: "Charlotte Smith",
    userAvatar: "/avatars/charlotte.jpg",
    tourName: "Dubai Desert Safari",
    action: "booked overnight safari",
    timestamp: "2025-11-16T15:47:00.000Z",
    amount: 4200,
  },
  {
    id: "13",
    type: "review",
    userName: "Noah Carter",
    userAvatar: "/avatars/noah.jpg",
    tourName: "Bali Temple & Rice Terraces",
    action: "gave a 3-star rating",
    timestamp: "2025-11-16T13:16:00.000Z",
    rating: 3,
  },
  {
    id: "14",
    type: "booking",
    userName: "Amelia White",
    userAvatar: "/avatars/amelia.jpg",
    tourName: "Northern Lights Adventure",
    action: "booked for anniversary",
    timestamp: "2025-11-15T22:09:00.000Z",
    amount: 9950,
  },
  {
    id: "15",
    type: "tour-created",
    userName: "Lucas Brown",
    userAvatar: "/avatars/lucas.jpg",
    tourName: "Andes Mountains Trek",
    action: "added new trek",
    timestamp: "2025-11-15T18:35:00.000Z",
  },
  {
    id: "16",
    type: "user-registered",
    userName: "Liam Smith",
    userAvatar: "/avatars/liam.jpg",
    action: "created an organizer account",
    timestamp: "2025-11-15T15:12:00.000Z",
  },
  {
    id: "17",
    type: "review",
    userName: "Sophie Müller",
    userAvatar: "/avatars/sophie.jpg",
    tourName: "Galápagos Island Explorer",
    action: "shared a photo & 5-star review",
    timestamp: "2025-11-15T09:41:00.000Z",
    rating: 5,
  },
  {
    id: "18",
    type: "booking",
    userName: "Mateo Rossi",
    userAvatar: "/avatars/mateo.jpg",
    tourName: "Andes Mountains Trek",
    action: "booked solo trek",
    timestamp: "2025-11-14T13:28:00.000Z",
    amount: 11500,
  },
  {
    id: "19",
    type: "review",
    userName: "Chloe Dubois",
    userAvatar: "/avatars/chloe.jpg",
    tourName: "Machu Picchu Express",
    action: "left a poetic review",
    timestamp: "2025-11-14T11:19:00.000Z",
    rating: 4,
  },
  {
    id: "20",
    type: "booking",
    userName: "Daniel Evans",
    userAvatar: "/avatars/daniel.jpg",
    tourName: "Santorini Sunset Cruise",
    action: "gifted a tour",
    timestamp: "2025-11-14T08:58:00.000Z",
    amount: 2700,
  },
];

// Top Tours
export const MOCK_TOP_TOURS: TopTour[] = [
  {
    id: "1",
    name: "Santorini Sunset Cruise",
    bookings: 89,
    revenue: "₦42.3M",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dubai Desert Safari & Dinner",
    bookings: 76,
    revenue: "₦38.1M",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Bali Temple & Rice Terraces",
    bookings: 64,
    revenue: "₦35.7M",
    rating: 5.0,
  },
  {
    id: "4",
    name: "Northern Lights Adventure",
    bookings: 58,
    revenue: "₦31.2M",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Machu Picchu Full Day",
    bookings: 52,
    revenue: "₦29.8M",
    rating: 4.9,
  },
];
