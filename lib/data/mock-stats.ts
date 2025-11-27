export const MOCK_STATS: Record<
  string,
  {
    toursCreated: number;
    totalEarnings: number;
    averageRating: number | null;
    totalBookings: number;
    totalSpent: number;
    totalReviews: number;
  }
> = {
  usr_001: {
    toursCreated: 1,
    totalEarnings: 0,
    averageRating: null,
    totalBookings: 0,
    totalSpent: 0,
    totalReviews: 0,
  },
  usr_002: {
    toursCreated: 0,
    totalEarnings: 0,
    averageRating: null,
    totalBookings: 5,
    totalSpent: 450000,
    totalReviews: 2,
  },
};
