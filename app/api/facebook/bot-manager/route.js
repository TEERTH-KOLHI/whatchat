
import { NextResponse } from 'next/server';
import { getFacebookBots, addFacebookBot, updateFacebookBot, deleteFacebookBot } from '@/lib/db';

export async function GET() {
    const bots = getFacebookBots();
    return NextResponse.json({ bots });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.triggerKeywords) {
            return NextResponse.json({ error: 'Name and Trigger Keywords are required' }, { status: 400 });
        }

        // type is either 'Text Trigger' or 'Flow'
        const newBot = addFacebookBot({
            name: body.name,
            triggerKeywords: body.triggerKeywords,
            type: body.type || 'Text Trigger',
            reply: body.reply || 'Auto-reply message'
        });

        return NextResponse.json({ success: true, bot: newBot });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateFacebookBot(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, bot: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update bot' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteFacebookBot(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete bot' }, { status: 500 });
    }
}
