"use client";
import React from 'react';
import { Search, Filter, Settings, Instagram } from 'lucide-react';

export default function InstagramAutomationPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <div className="page-title" style={{ marginBottom: '0.25rem' }}>Comment Automation</div>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Auto-reply to comments on your Instagram posts</p>
                </div>
            </div>

            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div className="search-box" style={{ width: '320px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.75rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                color: '#374151',
                                backgroundColor: '#fff'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        color: '#374151',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <th style={{ textAlign: 'left', padding: '1rem', width: '80px' }}>Thumbnail</th>
                            <th style={{ textAlign: 'left', padding: '1rem' }}>Post Description</th>
                            <th style={{ textAlign: 'center', padding: '1rem' }}>Likes</th>
                            <th style={{ textAlign: 'center', padding: '1rem' }}>Comments</th>
                            <th style={{ textAlign: 'center', padding: '1rem' }}>Auto-Reply</th>
                            <th style={{ textAlign: 'right', padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2].map((i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f9fafb' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ width: '60px', height: '60px', background: '#fce7f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Instagram size={24} color="#E1306C" />
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', maxWidth: '300px' }}>
                                    <div style={{ fontWeight: '500', color: '#1f2937' }}>Loving this new vibe! 📸 #summer</div>
                                    <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>Posted on Oct {12 + i}, 2024</div>
                                </td>
                                <td style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                                    {500 * i}
                                </td>
                                <td style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                                    {25 * i}
                                </td>
                                <td style={{ textAlign: 'center', padding: '1rem' }}>
                                    <div style={{
                                        display: 'inline-flex', padding: '0.25rem 0.75rem', borderRadius: '999px',
                                        background: i === 1 ? '#dcfce7' : '#f3f4f6',
                                        color: i === 1 ? '#166534' : '#6b7280',
                                        fontSize: '0.8rem', fontWeight: '500'
                                    }}>
                                        {i === 1 ? 'Enabled' : 'Disabled'}
                                    </div>
                                </td>
                                <td style={{ textAlign: 'right', padding: '1rem' }}>
                                    <button style={{
                                        background: 'white', border: '1px solid #d1d5db', padding: '0.4rem 0.8rem',
                                        borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', color: '#374151',
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem'
                                    }}>
                                        <Settings size={14} /> Configure
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
