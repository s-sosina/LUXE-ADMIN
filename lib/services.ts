import { Metric, MOCK_METRICS, delay } from "@/lib/data/mock-metrics";
import {
  MOCK_ACTIVITIES,
  MOCK_TOP_TOURS,
  type Activity,
  type TopTour,
} from "@/lib/data/mock-dashboard";

// Toggle this to switch between Mock and Real mode easily
// In 2025, we usually use an Environment Variable for this:
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === "true" || true;

export async function getMetrics(period: string): Promise<Metric[]> {
  if (USE_MOCK_DATA) {
    // Simulate a tiny network delay for realism, or 0 for instant speed
    await delay(0);

    if (period === "last-quarter") {
      return MOCK_METRICS["last-quarter"];
    }

    if (period === "this-year") {
      return MOCK_METRICS["this-year"];
    }

    return MOCK_METRICS[period] || MOCK_METRICS["default"];
  }

  // REAL BACKEND IMPLEMENTATION (When ready)
  try {
    const res = await fetch(`/api/metrics?period=${period}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (error) {
    console.error(error);
    // Fallback to default mock data so the UI never breaks
    return MOCK_METRICS["default"];
  }
}
// ==================== RECENT ACTIVITIES ====================
export async function getRecentActivities(page: number = 1, limit: number = 8): Promise<{ activities: Activity[], pagination: { page: number, limit: number, total: number, totalPages: number } }> {
  if (USE_MOCK_DATA) {
    await new Promise((r) => setTimeout(r, 400));
    const total = MOCK_ACTIVITIES.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const activities = MOCK_ACTIVITIES.slice(startIndex, endIndex);
    return {
      activities,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  const res = await fetch(`/api/activities?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch activities");
  return res.json();
}

// ==================== TOP TOURS ====================
export async function getTopTours(limit = 10): Promise<TopTour[]> {
  if (USE_MOCK_DATA) {
    await new Promise((r) => setTimeout(r, 500));
    return MOCK_TOP_TOURS.slice(0, limit); // ← NOW PROPERLY IMPORTED
  }

  const res = await fetch(`/api/dashboard/top-tours?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch top tours");
  return res.json();
}