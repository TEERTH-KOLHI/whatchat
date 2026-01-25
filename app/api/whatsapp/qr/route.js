
import { NextResponse } from 'next/server';
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import QRCode from 'qrcode';
import { updateDb } from '../../../../lib/db';
import path from 'path';
import fs from 'fs';

// Helper to keep the socket instance or state? 
// In Next.js dev mode, this might reload. For now, we create a new connection per request 
// wrapped in a way to stream updates.

export async function GET(request) {
    const encoder = new TextEncoder();

    // Create a TransformStream for SSE
    const customReadable = new ReadableStream({
        async start(controller) {
            const sendEvent = (data) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
            };

            try {
                // Auth state folder
                const authPath = path.join(process.cwd(), 'data', 'auth_info_baileys');
                if (!fs.existsSync(authPath)) {
                    fs.mkdirSync(authPath, { recursive: true });
                }

                const { state, saveCreds } = await useMultiFileAuthState(authPath);

                const sock = makeWASocket({
                    printQRInTerminal: false,
                    auth: state,
                });

                sock.ev.on('creds.update', saveCreds);

                sock.ev.on('connection.update', async (update) => {
                    const { connection, lastDisconnect, qr } = update;

                    if (qr) {
                        // Generate QR as Data URL
                        const qrUrl = await QRCode.toDataURL(qr);
                        sendEvent({ type: 'qr', qr: qrUrl });
                    }

                    if (connection === 'close') {
                        const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                        console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
                        if (!shouldReconnect) {
                            sendEvent({ type: 'error', message: 'Connection closed' });
                            controller.close(); // End stream
                        }
                    } else if (connection === 'open') {
                        console.log('opened connection');

                        // Save connected state to DB
                        const user = sock.user;
                        updateDb({
                            whatsapp: {
                                type: 'qr',
                                id: user?.id,
                                name: user?.name || 'WhatsApp User',
                                status: 'connected',
                                connectedAt: new Date().toISOString()
                            }
                        });

                        sendEvent({ type: 'success', user });
                        controller.close(); // Success, we can close the stream or keep it for status? Close is fine.
                    }
                });

                // Handle client disconnect to close socket? 
                // In a real stream, we'd listen for abort, but here we just let it run.

            } catch (err) {
                console.error("Socket error", err);
                sendEvent({ type: 'error', message: 'Internal Server Error' });
                controller.close();
            }
        }
    });

    return new NextResponse(customReadable, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
}
