"use client";
import { Plus, GitBranch, MessageSquare, Zap, Settings } from 'lucide-react';

export default function BotManagerPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Bot Manager</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> Create New Flow</button>
            </div>

            <div className="card-grid">
                <div className="summary-card" style={{ flex: 1 }}>
                    <div className="card-header">Bot Analytics</div>
                    <div style={{ height: '150px', background: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                        Analytics Chart Placeholder
                    </div>
                </div>
            </div>

            <h3 style={{ margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>Active Flows</h3>
            <div className="automation-grid">
                {/* Reusing automation card style */}
                <div className="automation-card">
                    <div className="automation-header">
                        <div className="icon-box default-bg"><GitBranch size={20} /></div>
                        <div className="status-badge active">Active</div>
                    </div>
                    <h3>Main Welcome Flow</h3>
                    <p className="automation-type">Flow Builder</p>
                    <div className="automation-actions">
                        <button className="action-btn">Edit Flow</button>
                        <button className="action-btn"><Settings size={16} /></button>
                    </div>
                </div>

                <div className="automation-card">
                    <div className="automation-header">
                        <div className="icon-box ai-bg"><Zap size={20} /></div>
                        <div className="status-badge active">Active</div>
                    </div>
                    <h3>GPT Support Agent</h3>
                    <p className="automation-type">AI Agent</p>
                    <div className="automation-actions">
                        <button className="action-btn">Configure AI</button>
                        <button className="action-btn"><Settings size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
