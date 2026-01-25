
import { NextResponse } from 'next/server';
import { getBookings, updateBooking } from '@/lib/db';

export async function GET() {
    const bookings = getBookings();
    return NextResponse.json({ bookings });
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateBooking(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, booking: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}
