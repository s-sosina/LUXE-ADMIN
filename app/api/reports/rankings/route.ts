import { NextResponse } from "next/server";
import { MOCK_TOP_GUIDES, MOCK_TOP_LOCATIONS } from "@/lib/data/mock-top_guides_location";

export const dynamic = "force-dynamic";

export async function GET() {
  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    topGuides: MOCK_TOP_GUIDES,
    topLocations: MOCK_TOP_LOCATIONS,
  });
}
