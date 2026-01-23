"use client";
import { Send, Calendar, Clock, Plus, FileText } from 'lucide-react';

export default function BroadcastingPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Broadcasting</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> New Component</button>
            </div>

            <div className="stats-row" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Sent</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>12,450</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Delivered</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>98.2%</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Read Rate</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>64.5%</div>
                </div>
            </div>

            <div className="card-container">
                <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <div style={{ padding: '1rem', borderBottom: '2px solid #19877b', color: '#19877b', fontWeight: 500 }}>Campaign History</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Scheduled</div>
                    <div style={{ padding: '1rem', color: '#6b7280', cursor: 'pointer' }}>Templates</div>
                </div>

                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                        <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '8px', color: '#047857' }}><Send size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>Black Friday Promo</h4>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Sent to 2,400 subscribers • Nov 24, 2024</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="status-badge active">Completed</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>92% Open Rate</div>
                        </div>
                    </div>

                    <div className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                        <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#1d4ed8' }}><Calendar size={20} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>Weekly Newsletter</h4>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Scheduled for 500 subscribers • Tomorrow, 10:00 AM</div>
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
