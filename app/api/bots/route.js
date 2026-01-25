
import { NextResponse } from 'next/server';
import { getBots, addBot } from '@/lib/db';

export async function GET() {
    const bots = getBots();
    return NextResponse.json({ bots });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.type) {
            return NextResponse.json({ error: 'Name and Type are required' }, { status: 400 });
        }

        const newBot = addBot({
            name: body.name,
            type: body.type,
            status: 'Active', // Default status
            lastActive: 'Just now'
        });

        return NextResponse.json({ success: true, bot: newBot });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
    }
}
