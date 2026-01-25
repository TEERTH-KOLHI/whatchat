
import { NextResponse } from 'next/server';
import { getManagedUsers, createManagedUser, deleteManagedUser } from '@/lib/db';

export async function GET() {
    const users = getManagedUsers();
    return NextResponse.json({ users });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const newUser = createManagedUser(body);
        return NextResponse.json({ success: true, user: newUser });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        deleteManagedUser(id);
        return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
}
