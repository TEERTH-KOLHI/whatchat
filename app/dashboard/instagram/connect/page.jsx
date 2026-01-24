"use client";
import React from 'react';
import { Smartphone, RefreshCw, Instagram } from 'lucide-react';

export default function InstagramConnectPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Connect Instagram</div>

            <div className="card-container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '80px', height: '80px',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.5rem', color: 'white'
                    }}>
                        <Instagram size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Connect your Instagram Business Profile</h3>
                    <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '500px', lineHeight: '1.6' }}>
                        Connect your Instagram Professional account to manage DMs, automate replies, and grow your audience.
                    </p>
                </div>

                <div className="summary-card" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Prerequisites</h4>
                    <ul style={{ textAlign: 'left', color: '#4b5563', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ minWidth: '20px', color: '#16a34a' }}>✓</div>
                            Your Instagram account must be a <strong>Professional Account</strong> (Business or Creator).
                        </li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ minWidth: '20px', color: '#16a34a' }}>✓</div>
                            Your Instagram account must be connected to a <strong>Facebook Page</strong>.
                        </li>
                    </ul>

                    <button style={{
                        width: '100%',
                        backgroundColor: '#1877f2', // Facebook Blue (since it connects via FB)
                        color: 'white',
                        border: 'none',
                        padding: '0.9rem',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        login with Facebook
                    </button>
                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                        You will be redirected to Facebook to authorize the connection.
                    </p>
                </div>
            </div>
        </div>
    );
}
