
import { NextResponse } from 'next/server';
import { getOrders, updateOrder } from '@/lib/db';

export async function GET() {
    const orders = getOrders();
    return NextResponse.json({ orders });
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateOrder(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, order: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
