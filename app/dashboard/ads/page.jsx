"use client";
import { Plus, Megaphone, TrendingUp, MousePointer, Eye } from 'lucide-react';

export default function WhatsAppAdsPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>WhatsApp Ads</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> Create Ad</button>
            </div>

            <div className="stats-row" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <div style={{ background: '#ecfdf5', padding: '0.4rem', borderRadius: '6px', color: '#059669' }}><Eye size={16} /></div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Impressions</div>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>45.2K</div>
                    <div style={{ fontSize: '0.8rem', color: '#10b981' }}>+12% vs last week</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <div style={{ background: '#eff6ff', padding: '0.4rem', borderRadius: '6px', color: '#2563eb' }}><MousePointer size={16} /></div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Clicks</div>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1,205</div>
                    <div style={{ fontSize: '0.8rem', color: '#10b981' }}>+5% vs last week</div>
                </div>
                <div className="summary-card" style={{ flex: 1, marginBottom: 0 }}>
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <div style={{ background: '#fef3c7', padding: '0.4rem', borderRadius: '6px', color: '#d97706' }}><MessageSquare size={16} /></div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Conversations</div>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>340</div>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444' }}>-2% vs last week</div>
                </div>
            </div>

            <div className="card-container">
                <h3>Active Campaigns</h3>
                <div className="campaign-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div className="campaign-item" style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: '1px solid #f3f4f6', borderRadius: '8px', gap: '1rem' }}>
                        <div style={{ width: '80px', height: '60px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Megaphone size={20} color="#9ca3af" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 0.25rem 0' }}>Fall Collection Promo</h4>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>Running on Facebook & Instagram</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="status-badge active">Active</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>$124.50 spent</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { MessageSquare } from 'lucide-react'; // Added missing import
