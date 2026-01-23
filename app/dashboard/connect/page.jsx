"use client";
import { QrCode, Smartphone, RefreshCw, CheckCircle } from 'lucide-react';

export default function ConnectWhatsAppPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Connect WhatsApp</div>

            <div className="card-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#166534' }}>
                        <Smartphone size={40} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Link your WhatsApp Number</h2>
                    <p style={{ color: '#6b7280' }}>Scan the QR code below with your WhatsApp mobile app to connect.</p>
                </div>

                <div className="qr-section" style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '2rem', display: 'inline-block', marginBottom: '2rem' }}>
                    <QrCode size={200} />
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <RefreshCw size={14} /> Refreshing in 14s
                    </div>
                </div>

                <div className="steps" style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>How to connect?</h3>
                    <ol style={{ paddingLeft: '1.25rem', color: '#4b5563', lineHeight: '1.6' }}>
                        <li>Open WhatsApp on your phone</li>
                        <li>Go to <strong>Settings</strong> {'>'} <strong>Linked Devices</strong></li>
                        <li>Tap on <strong>Link a Device</strong></li>
                        <li>Point your phone to this screen to capture the code</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
