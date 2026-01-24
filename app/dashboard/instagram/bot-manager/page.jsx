"use client";
import React from 'react';
import { Plus } from 'lucide-react';
import BotStats from '../../bot-manager/BotStats';
import BotTable from '../../bot-manager/BotTable';

export default function InstagramBotManagerPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <div className="page-title" style={{ marginBottom: '0.25rem' }}>Instagram Bot Manager</div>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage your Instagram DM automation flows</p>
                </div>
                <button className="primary-btn" style={{
                    backgroundColor: '#c32aa3', // Instagram Pink
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

            <div style={{ padding: '1.5rem', background: '#fdf2f8', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #fbcfe8', color: '#be185d' }}>
                Showing Instagram specific bot statistics and flows.
            </div>

            <BotStats />

            <BotTable />
        </div>
    );
}
