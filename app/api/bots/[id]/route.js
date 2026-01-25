
import { NextResponse } from 'next/server';
import { updateBot, deleteBot } from '@/lib/db';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const updated = updateBot(id, body);
        if (!updated) {
            return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, bot: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update bot' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        deleteBot(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete bot' }, { status: 500 });
    }
}
