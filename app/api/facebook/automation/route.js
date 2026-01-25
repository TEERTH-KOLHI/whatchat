
import { NextResponse } from 'next/server';
import { getFacebookPosts, updateAutoReplyConfig } from '@/lib/db';

export async function GET() {
    const posts = getFacebookPosts();
    return NextResponse.json({ posts });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.postId) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        // config contains { enabled: boolean, replyText: string }
        const updatedConfig = updateAutoReplyConfig(body.postId, body.config);

        return NextResponse.json({ success: true, config: updatedConfig });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
    }
}
