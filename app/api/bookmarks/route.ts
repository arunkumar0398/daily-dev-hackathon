import { NextResponse } from 'next/server';
import { fetchDailyDevData } from '@/lib/dailydev';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or malformed Authorization header' }, { status: 401 });
  }

  const token = authHeader.substring(7);
  if (!token) {
    return NextResponse.json({ error: 'Empty token provided' }, { status: 401 });
  }

  try {
    const data = await fetchDailyDevData(token);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch bookmarks' }, { status: 500 });
  }
}
