
import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/db';

export async function GET(request, { params }) {
    const { id } = params;
    const messages = getMessages(id);
    return NextResponse.json({ messages });
}

export async function POST(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        if (!body.text) {
            return NextResponse.json({ error: 'Text required' }, { status: 400 });
        }

        const newMessage = addMessage(id, body.text, 'agent');
        return NextResponse.json({ success: true, message: newMessage });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
