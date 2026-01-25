
import { NextResponse } from 'next/server';
import { getConversations } from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get('channel');

    let conversations = getConversations();

    if (channel) {
        conversations = conversations.filter(c => c.channel === channel);
    }

    return NextResponse.json({ conversations });
}
