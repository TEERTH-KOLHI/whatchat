
import { NextResponse } from 'next/server';
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../../lib/db';

export async function GET() {
    const notifications = getNotifications();
    return NextResponse.json({ notifications });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { action, id } = body;

        if (action === 'mark_read' && id) {
            markNotificationRead(id);
            return NextResponse.json({ success: true });
        } else if (action === 'mark_all_read') {
            markAllNotificationsRead();
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
