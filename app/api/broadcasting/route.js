
import { NextResponse } from 'next/server';
import { getCampaigns, addCampaign } from '@/lib/db';

export async function GET() {
    const campaigns = getCampaigns();
    return NextResponse.json({ campaigns });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.message) {
            return NextResponse.json({ error: 'Name and Message are required' }, { status: 400 });
        }

        // Simulate campaign creation
        const newCampaign = addCampaign({
            name: body.name,
            message: body.message,
            segment: 'All Subscribers',
        });

        return NextResponse.json({ success: true, campaign: newCampaign });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }
}
