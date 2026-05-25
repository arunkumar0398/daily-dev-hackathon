import { NextResponse } from 'next/server';
import { generateAITasks } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { articles } = await request.json();
    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({ error: 'Missing or invalid articles array' }, { status: 400 });
    }

    const tasks = await generateAITasks(articles);
    return NextResponse.json({ tasks });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to generate tasks' }, { status: 500 });
  }
}
