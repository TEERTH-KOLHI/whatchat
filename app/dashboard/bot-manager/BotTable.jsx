"use client";
import React, { useState, useEffect } from 'react';
import { GitBranch, Zap, MoreVertical, Edit, Trash2, Power } from 'lucide-react';

export default function BotTable({ refreshTrigger }) {
    const [flows, setFlows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBots();
    }, [refreshTrigger]);

    const fetchBots = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bots');
            const data = await res.json();
            setFlows(data.bots || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this bot?')) return;
        try {
            const res = await fetch(`/api/bots/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFlows(prev => prev.filter(b => b.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            const res = await fetch(`/api/bots/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setFlows(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading && flows.length === 0) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading bots...</div>;
    }

    return (
        <div className="card-container" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#374151' }}>All Bot Flows</h3>
                <div className="search-box" style={{ width: '250px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Search flows..." />
                </div>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{ paddingLeft: '1.5rem' }}>Flow Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Last Activity</th>
                        <th style={{ paddingRight: '1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flows.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                                No bots found. Create one to get started.
                            </td>
                        </tr>
                    )}
                    {flows.map((flow) => {
                        const Icon = flow.type === 'Flow Builder' ? GitBranch : Zap;
                        const iconBg = flow.type === 'Flow Builder' ? '#eff6ff' : '#f0fdf4';
                        const iconColor = flow.type === 'Flow Builder' ? '#3b82f6' : '#22c55e';

                        return (
                            <tr key={flow.id}>
                                <td style={{ paddingLeft: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '8px',
                                            backgroundColor: iconBg,
                                            color: iconColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Icon size={18} />
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#1f2937' }}>{flow.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{flow.type}</span>
                                </td>
                                <td>
                                    <span className={`status-badge ${flow.status === 'Active' ? 'active' : flow.status === 'Inactive' ? 'inactive' : 'pending'}`}
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            backgroundColor: flow.status === 'Active' ? '#dcfce7' : flow.status === 'Inactive' ? '#f3f4f6' : '#fef3c7',
                                            color: flow.status === 'Active' ? '#166534' : flow.status === 'Inactive' ? '#4b5563' : '#d97706'
                                        }}>
                                        {flow.status}
                                    </span>
                                </td>
                                <td style={{ color: '#6b7280', fontSize: '0.9rem' }}>{flow.lastActive}</td>
                                <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button className="icon-btn" title="Edit" style={{ color: '#4b5563', padding: '0.4rem' }}>
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleToggleStatus(flow.id, flow.status)}
                                            className="icon-btn"
                                            title="Toggle Status"
                                            style={{ color: flow.status === 'Active' ? '#22c55e' : '#9ca3af', padding: '0.4rem', cursor: 'pointer' }}
                                        >
                                            <Power size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(flow.id)}
                                            className="icon-btn"
                                            title="Delete"
                                            style={{ color: '#ef4444', padding: '0.4rem', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}
