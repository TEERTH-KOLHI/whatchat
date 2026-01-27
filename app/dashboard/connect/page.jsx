"use client";
import { useState } from 'react';
import { Facebook, CheckCircle, AlertCircle, MessageCircle, Phone, Link as LinkIcon, Copy } from 'lucide-react';
import FacebookSDK from '@/components/FacebookSDK';

export default function ConnectWhatsAppPage() {
    const [status, setStatus] = useState('disconnected'); // disconnected, connecting, connected
    const [error, setError] = useState(null);
    const [wabaData, setWabaData] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    // Form state for Manual Connection
    const [manualId, setManualId] = useState('');
    const [manualToken, setManualToken] = useState('');

    const launchWhatsAppSignup = () => {
        if (!window.FB) {
            setError("Facebook SDK not loaded. Please disable ad blockers.");
            return;
        }

        setStatus('connecting');

        // Advanced Access / Tech Provider Flow
        window.FB.login(
            function (response) {
                if (response.authResponse) {
                    const accessToken = response.authResponse.accessToken;
                    console.log('Access Token:', accessToken);
                    // Simulate backend registration success
                    setTimeout(() => {
                        setStatus('connected');
                        setWabaData({
                            name: 'My Business WABA',
                            id: '1234567890'
                        });
                    }, 1500);
                } else {
                    setStatus('disconnected');
                    setError('User cancelled login or did not fully authorize.');
                }
            },
            {
                scope: 'whatsapp_business_management, whatsapp_business_messaging',
                extras: {
                    feature: 'whatsapp_embedded_signup',
                }
            }
        );
    };

    const handleManualConnect = () => {
        // Placeholder for manual connection logic
        console.log("Connect manually:", manualId, manualToken);
    };

    if (status === 'connected') {
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
                            Your WhatsApp Business Account is successfully connected.
                        </p>
                        {wabaData && (
                            <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'left' }}>
                                <div style={{ fontWeight: '600' }}>Name: {wabaData.name}</div>
                                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>ID: {wabaData.id}</div>
                            </div>
                        )}
                        <button
                            onClick={() => setStatus('disconnected')}
                            className="danger-btn"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            <FacebookSDK />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>

                {/* Left Card: Recommended */}
                <div style={{
                    backgroundColor: 'white', borderRadius: '8px', padding: '2.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                        Connect WhatsApp Business (Recommended)
                    </h2>
                    <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '2rem', fontWeight: '400' }}>
                        One Click Business Integration
                    </p>

                    {!showOptions ? (
                        <button
                            onClick={() => setShowOptions(true)}
                            style={{
                                backgroundColor: '#00d775', // WhatsApp Green
                                color: 'white', border: 'none', borderRadius: '4px', padding: '0.6rem 1.5rem',
                                fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            <MessageCircle size={18} />
                            Connect WhatsApp
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem', width: '100%', marginBottom: '2rem' }}>
                            <button
                                onClick={launchWhatsAppSignup}
                                style={{
                                    flex: 1, padding: '1rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                    background: 'linear-gradient(to bottom, #dbeafe, #bfdbfe)', // Light blue gradient
                                    color: '#1e3a8a', fontWeight: '600', fontSize: '0.7rem',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minWidth: '200px', lineHeight: '1.4'
                                }}
                            >
                                <MessageCircle size={18} />
                                <span>Connect WhatsApp With<br />Catalog Permission</span>
                            </button>

                            <button
                                onClick={launchWhatsAppSignup}
                                style={{
                                    flex: 1, padding: '1rem', border: 'none', borderRadius: '6px', cursor: 'pointer',
                                    background: 'linear-gradient(to bottom, #fef3c7, #fde68a)', // Yellow gradient
                                    color: '#78350f', fontWeight: '600', fontSize: '0.7rem',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minWidth: '200px', lineHeight: '1.4'
                                }}
                            >
                                <MessageCircle size={18} />
                                <span>Connect WhatsApp<br />Without Catalog Permission</span>
                            </button>
                        </div>
                    )}

                    <ul style={{ textAlign: 'left', color: '#4b5563', fontSize: '0.8rem', lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.4rem' }}>The seamless integration will open in a pop-up. Make sure your browser is not blocking pop-ups.</li>
                        <li style={{ marginBottom: '0.4rem' }}>You will be asked to provide a phone number for WhatsApp Business integration. We strongly recommend using a new phone number.</li>
                        <li>However, if you already have a WhatsApp account associated with that number, back up your WhatsApp data and then delete that account.</li>
                    </ul>

                    {error && (
                        <div style={{
                            marginTop: '1.5rem', color: '#dc2626', fontSize: '0.8rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}
                </div>

                {/* Right Card: Alternative */}
                <div style={{
                    backgroundColor: 'white', borderRadius: '8px', padding: '2.5rem',
                    boxShadow: 'none', border: 'none', // Removed outer shadow/border
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                            Connect WhatsApp Business (Alternative)
                        </h2>
                        <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: '400' }}>
                            Connect your WhatsApp account
                        </p>
                    </div>

                    {/* Inner Card */}
                    <div style={{
                        backgroundColor: 'white', borderRadius: '12px', padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6',
                        width: '100%'
                    }}>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '500', color: '#22c55e', fontSize: '1.1rem' }}>WhatsApp</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                                Alternative account connection
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', alignItems: 'center' }}>
                            {/* Big Icon */}
                            <div style={{ paddingLeft: '1rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', borderRadius: '50%',
                                    border: '4px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#22c55e'
                                }}>
                                    <Phone size={40} fill="currentColor" strokeWidth={0} />
                                </div>
                            </div>

                            {/* Form */}
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>
                                    Business Account ID + Access Token
                                </label>
                                <input
                                    type="text"
                                    placeholder="WhatsApp Business Account ID"
                                    value={manualId}
                                    onChange={(e) => setManualId(e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px',
                                        marginBottom: '1rem', fontSize: '0.85rem', outline: 'none', color: '#6b7280'
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Access Token"
                                    value={manualToken}
                                    onChange={(e) => setManualToken(e.target.value)}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px',
                                        fontSize: '0.85rem', outline: 'none', color: '#6b7280'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div style={{
                            borderTop: '1px dashed #e5e7eb', // Dashed border
                            padding: '2rem 0 1rem 0', marginBottom: '1.5rem',
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem',
                            fontSize: '0.85rem'
                        }}>
                            <div>
                                <div style={{ color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>Webhook Callback URL</div>
                                <div style={{ color: '#10b981', wordBreak: 'break-all' }}>https://app.whatchimp.com/webhook/whatsapp-webhook</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>Verify Token</div>
                                <div style={{ color: '#6b7280' }}>8450385012773603920</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>Privacy Policy URL</div>
                                <div style={{ color: '#10b981', wordBreak: 'break-all' }}>https://app.whatchimp.com/policy/privacy</div>
                            </div>
                            <div>
                                <div style={{ color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>Terms of Service URL</div>
                                <div style={{ color: '#10b981', wordBreak: 'break-all' }}>https://app.whatchimp.com/policy/terms</div>
                            </div>
                        </div>

                        <button
                            onClick={handleManualConnect}
                            style={{
                                backgroundColor: '#00d775', // WhatsApp Green-ish
                                color: 'white', border: 'none', borderRadius: '4px', padding: '0.6rem 2rem',
                                fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            <LinkIcon size={16} />
                            Connect
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
