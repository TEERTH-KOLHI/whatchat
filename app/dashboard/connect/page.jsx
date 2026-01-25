"use client";
import { useState, useEffect, useRef } from 'react';
import { QrCode, Smartphone, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export default function ConnectWhatsAppPage() {
    const [status, setStatus] = useState({ connected: false, data: null });
    const [loading, setLoading] = useState(true);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [manualForm, setManualForm] = useState({ businessId: '', accessToken: '' });
    const [manualLoading, setManualLoading] = useState(false);
    const [error, setError] = useState(null);
    const eventSourceRef = useRef(null);

    useEffect(() => {
        fetchStatus();
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await fetch('/api/whatsapp/status');
            const data = await res.json();
            if (data.whatsapp && data.whatsapp.status === 'connected') {
                setStatus({ connected: true, data: data.whatsapp });
            } else {
                startQrStream();
            }
        } catch (err) {
            console.error('Failed to fetch status:', err);
        } finally {
            setLoading(false);
        }
    };

    const startQrStream = () => {
        if (eventSourceRef.current) eventSourceRef.current.close();

        const evtSource = new EventSource('/api/whatsapp/qr');
        eventSourceRef.current = evtSource;

        evtSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'qr') {
                    setQrCodeUrl(data.qr);
                } else if (data.type === 'success') {
                    setStatus({ connected: true, data: data.user });
                    evtSource.close();
                } else if (data.type === 'error') {
                    console.error('QR Stream Error:', data.message);
                }
            } catch (e) {
                console.error("Error parsing SSE", e);
            }
        };

        evtSource.onerror = (err) => {
            console.error('EventSource failed:', err);
            evtSource.close();
        };
    };

    const handleManualConnect = async () => {
        if (!manualForm.businessId || !manualForm.accessToken) {
            setError('Please fill in all fields');
            return;
        }
        setManualLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/whatsapp/connect/manual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(manualForm)
            });
            const data = await res.json();
            if (data.success) {
                setStatus({
                    connected: true,
                    data: { type: 'manual', businessId: manualForm.businessId }
                });
            } else {
                setError(data.error || 'Failed to connect');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setManualLoading(false);
        }
    };

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    if (status.connected) {
        return (
            <div className="dashboard-page">
                <div className="page-title">Connect WhatsApp</div>
                <div className="card-container" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
                    <div className="summary-card" style={{ padding: '3rem' }}>
                        <div style={{ color: '#22c55e', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <CheckCircle size={64} />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connected!</h2>
                        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                            Your WhatsApp account is successfully connected.
                            {status.data?.name && <span className="block mt-2 font-medium text-black">Connected as: {status.data.name}</span>}
                            {status.data?.businessId && <span className="block mt-2 font-medium text-black">Business ID: {status.data.businessId}</span>}
                        </p>
                        <button
                            onClick={async () => {
                                // Add a disconnect endpoint if needed, for now just simplistic client reset or manual DB clear
                                // In real app: call API to disconnect
                                alert("To disconnect, please clear the /frontend/data/db.json file manually for this demo.");
                            }}
                            style={{
                                backgroundColor: '#fee2e2',
                                color: '#ef4444',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '6px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="page-title">Connect WhatsApp</div>

            <div className="card-container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>

                {/* Row 1: Connection Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', textAlign: 'left', alignItems: 'stretch', marginBottom: '2rem' }}>

                    {/* Recommended Card */}
                    <div className="summary-card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Connect WhatsApp Business (Recommended)</h3>
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '2rem' }}>One Click Business Integration</p>

                        <button style={{
                            backgroundColor: '#00e676',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            marginBottom: '2rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            opacity: 0.7
                        }} onClick={() => alert("Please use the Alternative Method for manual API Key entry in this demo.")}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
                            Connect WhatsApp
                        </button>

                        <div style={{ textAlign: 'left', fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', marginTop: 'auto' }}>
                            <ul style={{ paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                                <li style={{ marginBottom: '0.5rem' }}>The seamless integration will open in a pop-up. Make sure your browser is not blocking pop-ups.</li>
                                <li style={{ marginBottom: '0.5rem' }}>You will be asked to provide a phone number for WhatsApp Business integration. We strongly recommend using a new phone number.</li>
                                <li>However, if you already have a WhatsApp account associated with that number, back up your WhatsApp data and then delete that account.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Alternative Card */}
                    <div className="summary-card" style={{ marginBottom: 0, height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Connect WhatsApp Business (Alternative)</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Connect your WhatsApp account</p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ color: '#22c55e', fontSize: '1.1rem', marginBottom: '0.5rem' }}>WhatsApp</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
                                <div style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                                Alternative account connection
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ color: '#86efac' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>Business Account ID + Access Token</label>
                                <input
                                    type="text"
                                    placeholder="WhatsApp Business Account ID"
                                    className="bg-transparent"
                                    style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', color: '#000' }}
                                    value={manualForm.businessId}
                                    onChange={(e) => setManualForm({ ...manualForm, businessId: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Access Token"
                                    className="bg-transparent"
                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '6px', outline: 'none', color: '#000' }}
                                    value={manualForm.accessToken}
                                    onChange={(e) => setManualForm({ ...manualForm, accessToken: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                        <div style={{ borderTop: '1px dashed #e5e7eb', paddingTop: '1.5rem', fontSize: '0.85rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ color: '#6b7280', marginBottom: '0.2rem' }}>Webhook Callback URL</div>
                                    <div style={{ color: '#0ea5e9', wordBreak: 'break-all' }}>https://app.whatchat.com/webhook/whatsapp-webhook</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', marginBottom: '0.2rem' }}>Verify Token</div>
                                    <div style={{ color: '#6b7280' }}>8450385012773603920</div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <div style={{ color: '#6b7280', marginBottom: '0.2rem' }}>Privacy Policy URL</div>
                                    <div style={{ color: '#0ea5e9', wordBreak: 'break-all' }}>https://app.whatchat.com/policy/privacy</div>
                                </div>
                                <div>
                                    <div style={{ color: '#6b7280', marginBottom: '0.2rem' }}>Terms of Service URL</div>
                                    <div style={{ color: '#0ea5e9', wordBreak: 'break-all' }}>https://app.whatchat.com/policy/terms</div>
                                </div>
                            </div>

                            <button
                                onClick={handleManualConnect}
                                disabled={manualLoading}
                                style={{
                                    backgroundColor: '#00e676',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '6px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: manualLoading ? 'not-allowed' : 'pointer',
                                    opacity: manualLoading ? 0.7 : 1
                                }}>
                                {manualLoading ? <RefreshCw className="animate-spin" size={16} /> : (
                                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                )}
                                {manualLoading ? 'Connecting...' : 'Connect'}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Row 2: QR and Steps split into two boxes side-by-side */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', textAlign: 'left', alignItems: 'stretch' }}>

                    {/* QR Code Card */}
                    <div className="summary-card" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#166534' }}>
                                <Smartphone size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>Link your WhatsApp Number</h3>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Scan the QR code below with your WhatsApp mobile app to connect.</p>
                        </div>

                        <div className="qr-section" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', display: 'inline-block', marginBottom: '1rem', minHeight: '230px', minWidth: '230px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {qrCodeUrl ? (
                                <img src={qrCodeUrl} alt="WhatsApp QR Code" style={{ width: '180px', height: '180px' }} />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <RefreshCw className="animate-spin text-gray-400 mb-2" size={32} />
                                    <span className="text-gray-400 text-sm">Generating QR...</span>
                                </div>
                            )}
                            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <RefreshCw size={14} /> Refreshing automatically
                            </div>
                        </div>
                    </div>

                    {/* How to Connect Card */}
                    <div className="summary-card" style={{ marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="steps" style={{ textAlign: 'left', padding: '0 1rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>How to connect?</h3>
                            <ol style={{ paddingLeft: '1.25rem', color: '#4b5563', lineHeight: '2.5', fontSize: '1rem' }}>
                                <li>Open WhatsApp on your phone</li>
                                <li>Go to <strong>Settings</strong> {'>'} <strong>Linked Devices</strong></li>
                                <li>Tap on <strong>Link a Device</strong></li>
                                <li>Point your phone to this screen to capture the code</li>
                            </ol>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

