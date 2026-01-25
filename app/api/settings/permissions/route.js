
import { NextResponse } from 'next/server';
import { getRolePermissions, updateRolePermissions } from '@/lib/db';

export async function GET() {
    const permissions = getRolePermissions();
    return NextResponse.json({ permissions });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const updated = updateRolePermissions(body);
        return NextResponse.json({ success: true, permissions: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update permissions' }, { status: 500 });
    }
}
