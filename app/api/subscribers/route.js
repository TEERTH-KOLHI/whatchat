
import { NextResponse } from 'next/server';
import { getSubscribers, addSubscriber } from '@/lib/db';

export async function GET() {
    const subscribers = getSubscribers();
    return NextResponse.json({ subscribers });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.phone) {
            return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
        }

        // Default labels if none provided
        const labels = body.labels || ['New'];

        const newSub = addSubscriber({
            name: body.name,
            phone: body.phone,
            labels
        });

        return NextResponse.json({ success: true, subscriber: newSub });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to add subscriber' }, { status: 500 });
    }
}
