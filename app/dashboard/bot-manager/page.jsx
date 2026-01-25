"use client";
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import BotStats from './BotStats';
import BotTable from './BotTable';

export default function BotManagerPage() {
    const [showModal, setShowModal] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [newBotName, setNewBotName] = useState('');
    const [newBotType, setNewBotType] = useState('Flow Builder');
    const [creating, setCreating] = useState(false);

    const handleCreateBot = async () => {
        if (!newBotName) return;
        setCreating(true);
        try {
            const res = await fetch('/api/bots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newBotName, type: newBotType })
            });
            if (res.ok) {
                setShowModal(false);
                setNewBotName('');
                setRefreshTrigger(prev => prev + 1);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <div className="page-title" style={{ marginBottom: '0.25rem' }}>Bot Manager</div>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage your chat flows and AI agents</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="primary-btn"
                    style={{
                        backgroundColor: '#19877b',
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

            <BotStats />

            <BotTable refreshTrigger={refreshTrigger} />

            {/* Simple Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Create New Bot</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Bot Name</label>
                            <input
                                type="text"
                                value={newBotName}
                                onChange={(e) => setNewBotName(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                                placeholder="e.g. Welcome Helper"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Type</label>
                            <select
                                value={newBotType}
                                onChange={(e) => setNewBotType(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            >
                                <option value="Flow Builder">Flow Builder</option>
                                <option value="AI Agent">AI Agent</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1rem', background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            <button
                                onClick={handleCreateBot}
                                disabled={creating}
                                style={{ padding: '0.6rem 1rem', background: '#19877b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: creating ? 0.7 : 1 }}
                            >
                                {creating ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
