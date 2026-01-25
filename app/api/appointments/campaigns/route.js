
import { NextResponse } from 'next/server';
import { getAppointmentCampaigns, addAppointmentCampaign, updateAppointmentCampaign, deleteAppointmentCampaign } from '@/lib/db';

export async function GET() {
    const campaigns = getAppointmentCampaigns();
    return NextResponse.json({ campaigns });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        // account mocked
        const newCampaign = addAppointmentCampaign({
            name: body.name,
            account: body.account || 'Default Account'
        });

        return NextResponse.json({ success: true, campaign: newCampaign });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateAppointmentCampaign(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, campaign: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteAppointmentCampaign(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
    }
}
