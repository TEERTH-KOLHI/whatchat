"use client";
import React from 'react';
import { GitBranch, Zap, MoreVertical, Edit, Trash2, Power } from 'lucide-react';

export default function BotTable() {
    // Mock data
    const flows = [
        { id: 1, name: 'Welcome Message', type: 'Flow Builder', status: 'Active', lastActive: '2 mins ago', icon: GitBranch, iconBg: '#eff6ff', iconColor: '#3b82f6' },
        { id: 2, name: 'Lead Qualification', type: 'AI Agent', status: 'Active', lastActive: '1 hour ago', icon: Zap, iconBg: '#f0fdf4', iconColor: '#22c55e' },
        { id: 3, name: 'Out of Office', type: 'Flow Builder', status: 'Inactive', lastActive: '2 days ago', icon: GitBranch, iconBg: '#eff6ff', iconColor: '#3b82f6' },
        { id: 4, name: 'Product Support', type: 'AI Agent', status: 'Active', lastActive: '5 hours ago', icon: Zap, iconBg: '#f0fdf4', iconColor: '#22c55e' },
        { id: 5, name: 'Feedback Collection', type: 'Flow Builder', status: 'Draft', lastActive: '1 week ago', icon: GitBranch, iconBg: '#eff6ff', iconColor: '#3b82f6' },
    ];

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
                    {flows.map((flow) => (
                        <tr key={flow.id}>
                            <td style={{ paddingLeft: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        backgroundColor: flow.iconBg,
                                        color: flow.iconColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <flow.icon size={18} />
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
                                    <button className="icon-btn" title="Toggle Status" style={{ color: flow.status === 'Active' ? '#22c55e' : '#9ca3af', padding: '0.4rem' }}>
                                        <Power size={16} />
                                    </button>
                                    <button className="icon-btn" title="Delete" style={{ color: '#ef4444', padding: '0.4rem' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Simple Pagination */}
            <div className="tx-footer" style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f3f4f6' }}>
                <div className="page-info">Showing 1-5 of 12</div>
                <div className="page-btns">
                    <button className="page-btn disabled">Previous</button>
                    <button className="page-btn">Next</button>
                </div>
            </div>
        </div>
    );
}
