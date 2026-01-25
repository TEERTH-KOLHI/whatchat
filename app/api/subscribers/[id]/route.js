
import { NextResponse } from 'next/server';
import { deleteSubscriber } from '@/lib/db';

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        deleteSubscriber(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
    }
}
