
import { NextResponse } from 'next/server';
import { getAds, addAd } from '@/lib/db';

export async function GET() {
    const ads = getAds();
    return NextResponse.json({ ads });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.budget) {
            return NextResponse.json({ error: 'Name and Budget are required' }, { status: 400 });
        }

        const newAd = addAd({
            name: body.name,
            platform: body.platform || 'Facebook & Instagram',
            budget: body.budget,
        });

        return NextResponse.json({ success: true, ad: newAd });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
    }
}
