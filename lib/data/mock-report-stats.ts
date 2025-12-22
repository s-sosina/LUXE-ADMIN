// Mock data for report statistics

export interface ReportStats {
  totalBookings: number;
  revenue: number;
  newUsers: number;
  newTours: number;
  trends: {
    bookings: string;
    revenue: string;
    users: string;
    tours: string;
  };
}

export interface MonthlyPerformance {
  name: string;
  bookings: number;
  revenue: number;
}

// Report stats by period
export const MOCK_REPORT_STATS: Record<string, ReportStats> = {
  "this-month": {
    totalBookings: 156,
    revenue: 12450000,
    newUsers: 48,
    newTours: 12,
    trends: {
      bookings: "+11.5%",
      revenue: "+12.3%",
      users: "+8.2%",
      tours: "+15.4%",
    },
  },
  "last-month": {
    totalBookings: 140,
    revenue: 11080000,
    newUsers: 44,
    newTours: 10,
    trends: {
      bookings: "+9.2%",
      revenue: "+10.1%",
      users: "+6.8%",
      tours: "+12.0%",
    },
  },
  "this-year": {
    totalBookings: 1842,
    revenue: 145600000,
    newUsers: 567,
    newTours: 89,
    trends: {
      bookings: "+45.2%",
      revenue: "+52.8%",
      users: "+38.5%",
      tours: "+62.1%",
    },
  },
};

// Monthly performance data for charts
export const MOCK_MONTHLY_PERFORMANCE: MonthlyPerformance[] = [
  { name: "Mar 2025", bookings: 89, revenue: 7120000 },
  { name: "Apr 2025", bookings: 102, revenue: 8160000 },
  { name: "May 2025", bookings: 118, revenue: 9440000 },
  { name: "Jun 2025", bookings: 95, revenue: 7600000 },
  { name: "Jul 2025", bookings: 134, revenue: 10720000 },
  { name: "Aug 2025", bookings: 156, revenue: 12480000 },
  { name: "Sep 2025", bookings: 142, revenue: 11360000 },
  { name: "Oct 2025", bookings: 168, revenue: 13440000 },
  { name: "Nov 2025", bookings: 145, revenue: 11600000 },
  { name: "Dec 2025", bookings: 156, revenue: 12450000 },
];

// Default/fallback stats
export const FALLBACK_REPORT_STATS: ReportStats = {
  totalBookings: 0,
  revenue: 0,
  newUsers: 0,
  newTours: 0,
  trends: {
    bookings: "+0%",
    revenue: "+0%",
    users: "+0%",
    tours: "+0%",
  },
};
