"use client";
import React, { useState, useEffect } from 'react';
import { Send, Calendar, Clock, Plus, Facebook, CheckCircle, X } from 'lucide-react';

export default function FacebookBroadcastingPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('History'); // History, Scheduled

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/facebook/broadcasting');
            const data = await res.json();
            setCampaigns(data.campaigns || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCampaign = async () => {
        if (!newName || !newMessage) {
            alert("Name and Message are required");
            return;
        }
        setCreating(true);
        try {
            const res = await fetch('/api/facebook/broadcasting', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    message: newMessage,
                    scheduledFor: scheduleTime || null
                })
            });
            if (res.ok) {
                setShowModal(false);
                setNewName('');
                setNewMessage('');
                setScheduleTime('');
                fetchCampaigns();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    // Calculate Stats
    const totalSent = campaigns.reduce((acc, curr) => acc + (curr.stats?.sent || 0), 0);
    // Mock Delivery Rate (average of delivered / sent) - simplified for demo
    const deliveredCount = campaigns.reduce((acc, curr) => acc + (curr.stats?.delivered || 0), 0);
    const deliveryRate = totalSent > 0 ? ((deliveredCount / totalSent) * 100).toFixed(1) + '%' : '0%';
    // Mock Open Rate 
    const validOpenRates = campaigns.filter(c => c.stats?.openRate).map(c => parseInt(c.stats.openRate));
    const avgOpenRate = validOpenRates.length > 0 ? (validOpenRates.reduce((a, b) => a + b, 0) / validOpenRates.length).toFixed(1) + '%' : '0%';


    // Filter Logic
    const filteredCampaigns = campaigns.filter(c => {
        if (activeTab === 'History') return c.status === 'Completed';
        if (activeTab === 'Scheduled') return c.status === 'Scheduled';
        return true;
    });

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            {/* New Campaign Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '500px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Create Broadcast Campaign</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Campaign Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. Summer Sale Announcement"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Message</label>
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Enter your broadcast message..."
                                rows={4}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px', resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Schedule (Optional)</label>
                            <input
                                type="datetime-local"
                                value={scheduleTime}
                                onChange={(e) => setScheduleTime(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Leave blank to send immediately.</p>
                        </div>

                        <button
                            onClick={handleCreateCampaign}
                            disabled={creating}
                            style={{ width: '100%', padding: '0.8rem', background: '#1877f2', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            {creating ? 'Creating...' : 'Create Campaign'}
                        </button>
                    </div>
                </div>
            )}

            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                    <h1 className="page-title" style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Facebook Broadcasting</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage your Facebook Messenger broadcast campaigns</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="primary-btn"
                    style={{
                        background: '#1877f2',
                        borderColor: '#1877f2',
                        color: 'white',
                        border: 'none',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}>
                    <Plus size={18} /> New Campaign
                </button>
            </div>

            <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '0', marginBottom: '15px' }}>
                <div className="summary-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Total Sent</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#111827' }}>{totalSent.toLocaleString()}</div>
                </div>
                <div className="summary-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Delivery Rate</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10b981' }}>{deliveryRate}</div>
                </div>
                <div className="summary-card" style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.5rem' }}>Avg Open Rate</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#3b82f6' }}>{avgOpenRate}</div>
                </div>
            </div>

            <div className="card-container" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '0', overflow: 'hidden' }}>
                <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    <div
                        onClick={() => setActiveTab('History')}
                        style={{ padding: '1rem 1.5rem', borderBottom: activeTab === 'History' ? '2px solid #1877f2' : 'none', color: activeTab === 'History' ? '#1877f2' : '#6b7280', fontWeight: 500, cursor: 'pointer' }}>
                        Campaign History
                    </div>
                    <div
                        onClick={() => setActiveTab('Scheduled')}
                        style={{ padding: '1rem 1.5rem', borderBottom: activeTab === 'Scheduled' ? '2px solid #1877f2' : 'none', color: activeTab === 'Scheduled' ? '#1877f2' : '#6b7280', fontWeight: 500, cursor: 'pointer' }}>
                        Scheduled
                    </div>
                </div>

                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem' }}>
                    {filteredCampaigns.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                            {loading ? 'Loading campaigns...' : 'No campaigns found in this tab.'}
                        </div>
                    ) : (
                        filteredCampaigns.map(camp => (
                            <div key={camp.id} className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                                <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#1877f2' }}>
                                    {camp.status === 'Scheduled' ? <Calendar size={20} /> : <Facebook size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: '#1f2937' }}>{camp.name}</h4>
                                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                        {camp.status === 'Scheduled' ? (
                                            `Scheduled for ${new Date(camp.scheduledFor).toLocaleString()}`
                                        ) : (
                                            `Sent to ${camp.recipients?.toLocaleString()} recipients • ${camp.createdAt}`
                                        )}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#4b5563', marginTop: '0.2rem', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        "{camp.message}"
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="status-badge" style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        background: camp.status === 'Completed' ? '#dcfce7' : '#eff6ff',
                                        color: camp.status === 'Completed' ? '#166534' : '#1d4ed8'
                                    }}>
                                        {camp.status}
                                    </div>
                                    {camp.status === 'Completed' && (
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>{camp.stats.openRate} Open Rate</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
