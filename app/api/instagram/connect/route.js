
import { NextResponse } from 'next/server';
import { getInstagramAccounts, addInstagramAccount, deleteInstagramAccount } from '@/lib/db';

export async function GET() {
    const accounts = getInstagramAccounts();
    return NextResponse.json({ accounts });
}

export async function POST(request) {
    try {
        // Mocking the OAuth flow result here
        // In reality, this would exchange an OAuth code for an access token

        // We will receive selected account details or generate a mock one
        const body = await request.json().catch(() => ({}));

        // Mock Data if not provided
        const accountData = {
            username: body.username || 'my_insta_brand',
            profilePic: body.profilePic || 'https://via.placeholder.com/50?text=IG',
            followers: body.followers || Math.floor(Math.random() * 10000)
        };

        const newAccount = addInstagramAccount(accountData);

        if (!newAccount) {
            return NextResponse.json({ error: 'Account already connected' }, { status: 400 });
        }

        return NextResponse.json({ success: true, account: newAccount });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to connect account' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteInstagramAccount(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to disconnect account' }, { status: 500 });
    }
}
