import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_REPORT_STATS,
  MOCK_MONTHLY_PERFORMANCE,
  FALLBACK_REPORT_STATS,
} from "@/lib/data/mock-report-stats";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "this-month";

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Get stats for the requested period
    const stats = MOCK_REPORT_STATS[period] || FALLBACK_REPORT_STATS;

    return NextResponse.json({
      success: true,
      data: {
        stats,
        monthlyPerformance: MOCK_MONTHLY_PERFORMANCE,
      },
    });
  } catch (error) {
    console.error("Error fetching report stats:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch report statistics",
      },
      { status: 500 }
    );
  }
}
