
import { NextResponse } from 'next/server';
import { getFacebookCampaigns, addFacebookCampaign } from '@/lib/db';

export async function GET() {
    const campaigns = getFacebookCampaigns();
    return NextResponse.json({ campaigns });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.message) {
            return NextResponse.json({ error: 'Name and Message are required' }, { status: 400 });
        }

        const newCampaign = addFacebookCampaign({
            name: body.name,
            message: body.message,
            scheduledFor: body.scheduledFor || null
        });

        return NextResponse.json({ success: true, campaign: newCampaign });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }
}
