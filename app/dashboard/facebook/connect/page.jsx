"use client";
import React, { useState, useEffect } from 'react';
import { Facebook, Trash2, CheckCircle, Settings, X, Plus } from 'lucide-react';

const MOCK_AVATARS = [
    "https://ui-avatars.com/api/?name=Tech+Store&background=0D8ABC&color=fff",
    "https://ui-avatars.com/api/?name=My+Brand&background=random",
    "https://ui-avatars.com/api/?name=Local+Shop&background=random"
];

const MOCK_PAGES = [
    { name: "Global Tech Store", pageId: "10554238910", followers: 12500, picture: MOCK_AVATARS[0] },
    { name: "My Personal Brand", pageId: "33214567890", followers: 850, picture: MOCK_AVATARS[1] },
    { name: "The Local Coffee Shop", pageId: "99887766554", followers: 3200, picture: MOCK_AVATARS[2] }
];

export default function FacebookConnectPage() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Config State
    const [appId, setAppId] = useState('');
    const [appSecret, setAppSecret] = useState('');
    const [configSaved, setConfigSaved] = useState(false);

    // Connection Flow State
    const [isConnecting, setIsConnecting] = useState(false); // Auth loading
    const [showPageModal, setShowPageModal] = useState(false);
    const [selectedPageIdx, setSelectedPageIdx] = useState(null);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/facebook/connect');
            const data = await res.json();
            setPages(data.pages || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfig = () => {
        if (!appId || !appSecret) {
            alert("Please enter both App ID and App Secret.");
            return;
        }
        setConfigSaved(true);
    };

    const handleStartConnect = async () => {
        if (!configSaved) {
            alert("Please save your configuration first.");
            return;
        }
        setIsConnecting(true);
        // Simulate OAuth / Login Popup delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsConnecting(false);
        setShowPageModal(true);
    };

    const handleConfirmConnect = async () => {
        if (selectedPageIdx === null) return;

        const pageToConnect = MOCK_PAGES[selectedPageIdx];

        try {
            const res = await fetch('/api/facebook/connect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pageToConnect)
            });

            if (res.ok) {
                setShowPageModal(false);
                setSelectedPageIdx(null);
                fetchPages();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to connect page');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to connect.');
        }
    };

    const handleDisconnect = async (id) => {
        if (!confirm('Are you sure you want to disconnect this page?')) return;
        try {
            await fetch(`/api/facebook/connect?id=${id}`, { method: 'DELETE' });
            fetchPages();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem', position: 'relative' }}>

            {/* Modal: Select Page */}
            {showPageModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '0', borderRadius: '8px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0 }}>Select Facebook Page</h3>
                            <button onClick={() => setShowPageModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <p style={{ marginTop: 0, fontSize: '0.9rem', color: '#6b7280' }}>Select which page you want to connect to WhatChat.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                {MOCK_PAGES.map((page, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedPageIdx(idx)}
                                        style={{
                                            padding: '0.8rem',
                                            border: `2px solid ${selectedPageIdx === idx ? '#1877f2' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            cursor: 'pointer',
                                            backgroundColor: selectedPageIdx === idx ? '#eff6ff' : 'white'
                                        }}
                                    >
                                        <img src={page.picture} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{page.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ID: {page.pageId}</div>
                                        </div>
                                        {selectedPageIdx === idx && (
                                            <div style={{ marginLeft: 'auto', color: '#1877f2' }}><CheckCircle size={20} /></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '1rem 1.5rem', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                onClick={() => setShowPageModal(false)}
                                style={{ padding: '0.6rem 1.2rem', background: 'white', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmConnect}
                                disabled={selectedPageIdx === null}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    background: selectedPageIdx === null ? '#93c5fd' : '#1877f2',
                                    color: 'white', border: 'none', borderRadius: '4px', cursor: selectedPageIdx === null ? 'not-allowed' : 'pointer', fontWeight: '500'
                                }}>
                                Connect Page
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="page-title" style={{ marginBottom: '2rem' }}>Facebook Integration</h1>

            {/* Config Section */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Settings size={20} color="#4b5563" />
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>App Configuration</h3>
                </div>
                {!configSaved ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>App ID</label>
                            <input
                                type="text"
                                value={appId}
                                onChange={(e) => setAppId(e.target.value)}
                                placeholder="1234567890"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>App Secret</label>
                            <input
                                type="password"
                                value={appSecret}
                                onChange={(e) => setAppSecret(e.target.value)}
                                placeholder="••••••••••••••••"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                        </div>
                        <button
                            onClick={handleSaveConfig}
                            style={{
                                padding: '0.6rem 1.5rem', backgroundColor: '#111827', color: 'white', border: 'none',
                                borderRadius: '4px', height: '42px', cursor: 'pointer', fontWeight: '500'
                            }}>
                            Save
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px dashed #d1d5db' }}>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700' }}>App ID</span>
                                <div style={{ fontWeight: '500', color: '#374151' }}>{appId}</div>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700' }}>App Secret</span>
                                <div style={{ fontWeight: '500', color: '#374151' }}>••••••••••••••</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setConfigSaved(false)}
                            style={{ color: '#4b5563', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {/* Pages Section */}
            {pages.length > 0 ? (
                <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Connected Pages</h3>
                        <button
                            onClick={handleStartConnect}
                            disabled={isConnecting}
                            style={{
                                backgroundColor: '#1877f2',
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
                                    <Plus size={16} /> Connect Another Page
                                </>
                            )}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {pages.map(page => (
                            <div key={page.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={page.picture} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem', fontWeight: '600' }}>{page.name}</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>ID: {page.pageId} • {page.followers.toLocaleString()} followers</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#10b981' }}>
                                        <CheckCircle size={12} /> Connected
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDisconnect(page.id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.5rem' }}
                                    title="Disconnect Page"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '40vh'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        maxWidth: '600px',
                        width: '100%',
                        border: '1px solid #e5e7eb',
                        opacity: configSaved ? 1 : 0.5,
                        pointerEvents: configSaved ? 'auto' : 'none'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#1877f2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            <Facebook size={40} color="white" fill="white" />
                        </div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                            Connect your Facebook Page
                        </h2>

                        <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                            Connect your business page to manage comments, posts, and messenger conversations directly from WhatChat.
                        </p>

                        <button style={{
                            backgroundColor: '#1877f2',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 2rem',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                            opacity: isConnecting ? 0.7 : 1
                        }}
                            onClick={handleStartConnect}
                            disabled={isConnecting}
                        >
                            {isConnecting ? 'Authenticating...' : 'Connect with Facebook'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
