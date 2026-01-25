"use client";
import { useState, useEffect } from 'react';
import { Send, Calendar, Clock, Plus, FileText, X } from 'lucide-react';

export default function BroadcastingPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [newName, setNewName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/broadcasting');
            const data = await res.json();
            setCampaigns(data.campaigns || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSendBroadcast = async () => {
        if (!newName || !newMessage) return;
        setSending(true);
        try {
            const res = await fetch('/api/broadcasting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, message: newMessage })
            });
            if (res.ok) {
                setShowModal(false);
                setNewName('');
                setNewMessage('');
                fetchCampaigns();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    }

    // Calculate aggregated stats
    const totalSent = campaigns.reduce((acc, curr) => acc + (curr.stats?.sent || 0), 0);
    // Simple average for demo purposes
    const avgDelivered = campaigns.length > 0 ? (campaigns.reduce((acc, curr) => acc + (curr.stats?.delivered || 0), 0) / campaigns.length).toFixed(1) : 0;
    const avgRead = campaigns.length > 0 ? (campaigns.reduce((acc, curr) => acc + (curr.stats?.read || 0), 0) / campaigns.length).toFixed(1) : 0;

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            <div className="page-header-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                <div className="page-title" style={{ marginBottom: 0 }}>Broadcasting</div>
                <button
                    onClick={() => setShowModal(true)}
                    className="primary-btn"
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#19877b', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '500' }}>
                    <Plus size={18} /> New Broadcast
                </button>
            </div>

            <div className="stats-row" style={{ display: 'flex', gap: '1rem', marginTop: '0', marginBottom: '15px' }}>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0, background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Sent</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalSent.toLocaleString()}</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0, background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Delivered</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{avgDelivered}%</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0, background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Read Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>{avgRead}%</div>
                </div>
            </div>

            <div className="card-container" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <div style={{ padding: '1rem', borderBottom: '2px solid #19877b', color: '#19877b', fontWeight: 500 }}>Campaign History</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Scheduled</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Templates</div>
                </div>

                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                    {campaigns.length === 0 && (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                            {loading ? 'Loading campaigns...' : 'No campaigns found. Start a new broadcast!'}
                        </div>
                    )}
                    {campaigns.map((camp) => (
                        <div key={camp.id} className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                            <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', color: '#047857' }}><Send size={20} /></div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>{camp.name}</h4>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{camp.message.substring(0, 50)}{camp.message.length > 50 ? '...' : ''} • {camp.sentAt}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="status-badge active" style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: '#dcfce7', color: '#166534' }}>{camp.status}</div>
                                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>{camp.stats?.read}% Read Rate</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* New Broadcast Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', width: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>New Broadcast</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Campaign Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                                placeholder="e.g. Summer Sale Announcement"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Message</label>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '100px', fontFamily: 'inherit' }}
                                placeholder="Type your message here..."
                            />
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>This message will be sent to all active subscribers.</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1rem', background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            <button
                                onClick={handleSendBroadcast}
                                disabled={sending}
                                style={{ padding: '0.6rem 1rem', background: '#19877b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: sending ? 0.7 : 1 }}
                            >
                                {sending ? 'Sending...' : 'Send Broadcast'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
