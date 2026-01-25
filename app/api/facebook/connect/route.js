
import { NextResponse } from 'next/server';
import { getFacebookPages, addFacebookPage, deleteFacebookPage } from '@/lib/db';

export async function GET() {
    const pages = getFacebookPages();
    return NextResponse.json({ pages });
}

export async function POST(request) {
    try {
        const body = await request.json();

        // In a real app, we would validate the accessToken or signedRequest here.
        // For this mock, we expect the frontend to send the "selected" page details.

        if (!body.name || !body.pageId) {
            return NextResponse.json({ error: 'Page details are required' }, { status: 400 });
        }

        const newPage = addFacebookPage({
            name: body.name,
            pageId: body.pageId,
            followers: body.followers || 0,
            picture: body.picture || 'https://via.placeholder.com/50?text=FB',
        });

        if (!newPage) {
            return NextResponse.json({ error: 'Page already connected' }, { status: 400 });
        }

        return NextResponse.json({ success: true, page: newPage });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to connect page' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteFacebookPage(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to disconnect page' }, { status: 500 });
    }
}
