"use client";
import React, { useState, useEffect } from 'react';
import { Smartphone, RefreshCw, Instagram, Trash2, CheckCircle, Plus, X } from 'lucide-react';

const MOCK_ACCOUNTS = [
    { username: "brand_official", profilePic: "https://ui-avatars.com/api/?name=Brand+Official&background=E4405F&color=fff", followers: 15400 },
    { username: "support_daily", profilePic: "https://ui-avatars.com/api/?name=Support+Daily&background=random", followers: 3200 },
    { username: "marketing_guru", profilePic: "https://ui-avatars.com/api/?name=Marketing+Guru&background=random", followers: 8900 }
];

export default function InstagramConnectPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConnecting, setIsConnecting] = useState(false);
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [selectedAccountIdx, setSelectedAccountIdx] = useState(null);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/instagram/connect');
            const data = await res.json();
            setAccounts(data.accounts || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStartConnect = async () => {
        setIsConnecting(true);
        // Simulate OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsConnecting(false);
        setShowAccountModal(true);
    };

    const handleConfirmConnect = async () => {
        if (selectedAccountIdx === null) return;

        const accountToConnect = MOCK_ACCOUNTS[selectedAccountIdx];

        try {
            const res = await fetch('/api/instagram/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accountToConnect)
            });

            if (res.ok) {
                setShowAccountModal(false);
                setSelectedAccountIdx(null);
                fetchAccounts();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to connect account');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect.');
        }
    };

    const handleDisconnect = async (id) => {
        if (!confirm('Are you sure you want to disconnect this account?')) return;
        try {
            await fetch(`/api/instagram/connect?id=${id}`, { method: 'DELETE' });
            fetchAccounts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            {/* Modal: Select Account */}
            {showAccountModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '0', borderRadius: '8px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Select Instagram Professional Account</h3>
                            <button onClick={() => setShowAccountModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ marginTop: 0, fontSize: '0.9rem', color: '#6b7280' }}>Select which Instagram account you want to connect to WhatChat. Ensure it is a Business or Creator account.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                {MOCK_ACCOUNTS.map((acc, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedAccountIdx(idx)}
                                        style={{
                                            padding: '0.8rem',
                                            border: `2px solid ${selectedAccountIdx === idx ? '#E4405F' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            cursor: 'pointer',
                                            backgroundColor: selectedAccountIdx === idx ? '#fff1f2' : 'white'
                                        }}
                                    >
                                        <img src={acc.profilePic} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>@{acc.username}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{acc.followers.toLocaleString()} followers</div>
                                        </div>
                                        {selectedAccountIdx === idx && (
                                            <div style={{ marginLeft: 'auto', color: '#E4405F' }}><CheckCircle size={20} /></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                onClick={() => setShowAccountModal(false)}
                                style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmConnect}
                                disabled={selectedAccountIdx === null}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    background: selectedAccountIdx === null ? '#fca5a5' : '#E4405F',
                                    color: 'white', border: 'none', borderRadius: '4px', cursor: selectedAccountIdx === null ? 'not-allowed' : 'pointer', fontWeight: '500'
                                }}>
                                Connect Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="page-title">Connect Instagram</div>

            {accounts.length > 0 ? (
                <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Connected Accounts</h3>
                        <button
                            onClick={handleStartConnect}
                            disabled={isConnecting}
                            style={{
                                backgroundColor: '#E4405F',
                                color: 'white',
                                border: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}>
                            {isConnecting ? (
                                <span>Authenticating...</span>
                            ) : (
                                <>
                                    <Plus size={16} /> <span>Connect Another</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {accounts.map(acc => (
                            <div key={acc.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    padding: '2px',
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    borderRadius: '50%', display: 'flex'
                                }}>
                                    <img src={acc.profilePic} alt="" style={{ width: '46px', height: '46px', borderRadius: '50%', border: '2px solid white' }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', fontWeight: '600' }}>@{acc.username}</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>Professional Account • {acc.followers.toLocaleString()} followers</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
                                        <CheckCircle size={12} /> Connected
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDisconnect(acc.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.5rem' }}
                                    title="Disconnect Account"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
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
                            transition: 'all 0.2s',
                            opacity: isConnecting ? 0.7 : 1
                        }}
                            onClick={handleStartConnect}
                            disabled={isConnecting}
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            {isConnecting ? 'Connecting...' : 'Login with Facebook'}
                        </button>
                        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#9ca3af' }}>
                            You will be redirected to Facebook to authorize the connection.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
