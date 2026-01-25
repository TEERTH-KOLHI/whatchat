
import { NextResponse } from 'next/server';
import { getWebhooks, addWebhook, updateWebhook, deleteWebhook } from '@/lib/db';

export async function GET() {
    const webhooks = getWebhooks();
    return NextResponse.json({ webhooks });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.template) {
            return NextResponse.json({ error: 'Name and Template are required' }, { status: 400 });
        }

        const newWorkflow = addWebhook({
            name: body.name,
            template: body.template,
            account: body.account || 'Default Account'
        });

        return NextResponse.json({ success: true, workflow: newWorkflow });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create workflow' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateWebhook(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, workflow: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update workflow' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteWebhook(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete workflow' }, { status: 500 });
    }
}
