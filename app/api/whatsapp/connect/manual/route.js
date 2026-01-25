
import { NextResponse } from 'next/server';
import { updateDb } from '../../../../../lib/db';

export async function POST(request) {
    try {
        const { businessId, accessToken } = await request.json();

        if (!businessId || !accessToken) {
            return NextResponse.json(
                { error: 'Business ID and Access Token are required' },
                { status: 400 }
            );
        }

        // Simulare validation (in a real app, you'd call WhatsApp API to verify)
        // For now, we accept anything and save it.

        updateDb({
            whatsapp: {
                type: 'manual',
                businessId,
                accessToken,
                connectedAt: new Date().toISOString(),
                status: 'connected'
            }
        });

        return NextResponse.json({ success: true, message: 'Connected successfully' });
    } catch (error) {
        console.error('Manual connection error:', error);
        return NextResponse.json(
            { error: 'Failed to connect' },
            { status: 500 }
        );
    }
}
