"use client";
import React from 'react';
import { GitBranch, Zap, Users, MessageSquare } from 'lucide-react';

export default function BotStats() {
    const stats = [
        { label: 'Total Flows', value: '12', icon: GitBranch, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Active Flows', value: '8', icon: Zap, color: '#22c55e', bg: '#f0fdf4' },
        { label: 'Total Subscribers', value: '1,234', icon: Users, color: '#8b5cf6', bg: '#f5f3ff' },
        { label: 'Messages Sent', value: '45.2k', icon: MessageSquare, color: '#f59e0b', bg: '#fffbeb' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {stats.map((stat, index) => (
                <div key={index} className="summary-card" style={{ marginBottom: 0, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: stat.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color
                    }}>
                        <stat.icon size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>{stat.value}</h3>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
