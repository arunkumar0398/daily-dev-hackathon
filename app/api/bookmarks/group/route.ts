import { NextResponse } from 'next/server';
import { groupArticlesIntoSprints } from '@/lib/sprint-engine';

export async function POST(request: Request) {
  try {
    const { bookmarks } = await request.json();
    if (!bookmarks || !Array.isArray(bookmarks)) {
      return NextResponse.json({ error: 'Missing or invalid bookmarks array' }, { status: 400 });
    }

    const sprints = groupArticlesIntoSprints(bookmarks);
    return NextResponse.json({ sprints });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to group bookmarks into sprints' }, { status: 500 });
  }
}
