"use client";
import React from 'react';
import { Send, Calendar, Clock, Plus, Facebook } from 'lucide-react';

export default function FacebookBroadcastingPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                <div className="page-title" style={{ marginBottom: 0 }}>Facebook Broadcasting</div>
                <button className="primary-btn" style={{ background: '#1877f2', borderColor: '#1877f2' }}><Plus size={18} style={{ marginRight: '0.5rem' }} /> New Campaign</button>
            </div>

            <div className="stats-row" style={{ display: 'flex', gap: '1rem', marginTop: '0', marginBottom: '15px' }}>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Sent</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>5,200</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Delivered</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>99.5%</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Open Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>88.2%</div>
                </div>
            </div>

            <div className="card-container">
                <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <div style={{ padding: '1rem', borderBottom: '2px solid #1877f2', color: '#1877f2', fontWeight: 500 }}>Campaign History</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Scheduled</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Templates</div>
                </div>

                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                        <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#1877f2' }}><Facebook size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>Fall Season Promo</h4>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Sent to 1,200 subscribers • Oct 10, 2024</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="status-badge active" style={{ background: '#dcfce7', color: '#166534' }}>Completed</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>88% Open Rate</div>
                        </div>
                    </div>

                    <div className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                        <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#1877f2' }}><Calendar size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>Product Launch</h4>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Scheduled for 2,000 subscribers • Next Monday, 09:00 AM</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="status-badge" style={{ background: '#eff6ff', color: '#1d4ed8' }}>Scheduled</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
