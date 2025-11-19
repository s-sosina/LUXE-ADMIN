import { NextRequest, NextResponse } from 'next/server';
import { MOCK_ACTIVITIES, type Activity } from '@/lib/data/mock-dashboard';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '8', 10);

  const total = MOCK_ACTIVITIES.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const activities = MOCK_ACTIVITIES.slice(startIndex, endIndex);

  return NextResponse.json({
    activities,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}