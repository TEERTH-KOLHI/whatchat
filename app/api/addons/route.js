
import { NextResponse } from 'next/server';
import { getAddons, updateAddonStatus } from '../../../lib/db';

export async function GET() {
    const addons = getAddons();
    return NextResponse.json({ addons });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'ID and Status required' }, { status: 400 });
        }

        const updated = updateAddonStatus(id, status);
        return NextResponse.json({ success: true, addon: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update addon' }, { status: 500 });
    }
}
