
import { NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile, getUsageStats } from '@/lib/db';

export async function GET() {
    const profile = getUserProfile();
    const usage = getUsageStats();
    return NextResponse.json({ profile, usage });
}

export async function POST(request) {
    try {
        const body = await request.json();
        const updatedProfile = updateUserProfile(body);
        return NextResponse.json({ success: true, profile: updatedProfile });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
