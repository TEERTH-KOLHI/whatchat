"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Zap, MessageSquare, Trash2, Power, X, Instagram } from 'lucide-react';

export default function InstagramBotManagerPage() {
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(true);

    // Create Modal State
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState('');
    const [newKeyword, setNewKeyword] = useState('');
    const [newReply, setNewReply] = useState('');
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchBots();
    }, []);

    const fetchBots = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/instagram/bot-manager');
            const data = await res.json();
            setBots(data.bots || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBot = async () => {
        if (!newName || !newKeyword) {
            alert("Name and Keyword are required");
            return;
        }
        setCreating(true);
        try {
            const res = await fetch('/api/instagram/bot-manager', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    triggerKeywords: newKeyword,
                    reply: newReply || 'Thanks for the DM! Check our bio.',
                    type: 'DM Auto-Reply'
                })
            });
            if (res.ok) {
                setShowModal(false);
                setNewName('');
                setNewKeyword('');
                setNewReply('');
                fetchBots();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this bot?')) return;
        try {
            await fetch(`/api/instagram/bot-manager?id=${id}`, { method: 'DELETE' });
            fetchBots();
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleStatus = async (bot) => {
        const newStatus = bot.status === 'Active' ? 'Inactive' : 'Active';
        try {
            await fetch('/api/instagram/bot-manager', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: bot.id, updates: { status: newStatus } })
            });
            fetchBots();
        } catch (err) {
            console.error(err);
        }
    };

    // Stats
    const activeBots = bots.filter(b => b.status === 'Active').length;
    const totalTriggers = bots.length;

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem', position: 'relative' }}>

            {/* Create Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '450px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Create Instagram DM Bot</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Bot Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. Influencer Collab Reply"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Trigger Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="e.g. collab, partnership, business"
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Reply Message</label>
                            <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Thanks for reaching out! Please email us at..."
                                rows={3}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            onClick={handleCreateBot}
                            disabled={creating}
                            style={{ width: '100%', padding: '0.8rem', background: '#c32aa3', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            {creating ? 'Creating...' : 'Create Bot'}
                        </button>
                    </div>
                </div>
            )}

            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title" style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Instagram Bot Manager</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage your Instagram DM automation flows</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="primary-btn"
                    style={{
                        backgroundColor: '#c32aa3',
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
                    <Plus size={18} /> Create New Flow
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Bots</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{activeBots}</div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Triggers</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{totalTriggers}</div>
                </div>
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem' }}>DMs Handled</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>0</div>
                </div>
            </div>

            {/* Table */}
            <div className="card-container" style={{ padding: '0', overflow: 'hidden', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>All Bot Flows</h3>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9fafb' }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Bot Name</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Keywords</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bots.length === 0 ? (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                    {loading ? 'Loading bots...' : 'No bots found. Create one to get started.'}
                                </td>
                            </tr>
                        ) : (
                            bots.map(bot => (
                                <tr key={bot.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#fce7f3', color: '#be185d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Zap size={16} />
                                            </div>
                                            <span style={{ fontWeight: '500', color: '#1f2937' }}>{bot.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {bot.triggerKeywords}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: bot.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                                            color: bot.status === 'Active' ? '#166534' : '#4b5563'
                                        }}>
                                            {bot.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleToggleStatus(bot)}
                                                title={bot.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                style={{ color: bot.status === 'Active' ? '#22c55e' : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                                            >
                                                <Power size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bot.id)}
                                                title="Delete"
                                                style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
