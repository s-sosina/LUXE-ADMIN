// app/api/metrics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MOCK_METRICS, delay } from "@/lib/data/mock-metrics";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const period = searchParams.get("period") || "default";

  // Simulate database latency
  await delay(0);

  const data = MOCK_METRICS[period] || MOCK_METRICS["default"];

  return NextResponse.json(data);
}
