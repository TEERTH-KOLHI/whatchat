
import { NextResponse } from 'next/server';
import { triggerWebhookEvent } from '@/lib/db';

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'Workflow ID required' }, { status: 400 });
        }

        const updated = triggerWebhookEvent(body.id);
        if (!updated) {
            return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, workflow: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to trigger event' }, { status: 500 });
    }
}
