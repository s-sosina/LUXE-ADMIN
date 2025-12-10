import { NextResponse } from "next/server";

export async function GET() {
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    total: 8,
    pending: 3,
    active: 3,
    completed: 1,
    paused: 1,
  });
}
