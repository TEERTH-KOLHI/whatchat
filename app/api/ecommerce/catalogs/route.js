
import { NextResponse } from 'next/server';
import { getCatalogs, addCatalog, updateCatalog, deleteCatalog } from '@/lib/db';

export async function GET() {
    const catalogs = getCatalogs();
    return NextResponse.json({ catalogs });
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.catalogId) {
            return NextResponse.json({ error: 'Name and Catalog ID are required' }, { status: 400 });
        }

        // account is mocked from UI
        const newCatalog = addCatalog({
            name: body.name,
            catalogId: body.catalogId,
            account: body.account || 'Default Account'
        });

        return NextResponse.json({ success: true, catalog: newCatalog });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create catalog' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const updated = updateCatalog(body.id, body.updates);
        if (!updated) {
            return NextResponse.json({ error: 'Catalog not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, catalog: updated });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update catalog' }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        deleteCatalog(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete catalog' }, { status: 500 });
    }
}
