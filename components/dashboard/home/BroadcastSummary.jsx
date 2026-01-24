"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function BroadcastSummary() {
    return (
        <div className="summary-card" style={{
            height: '100%',
            marginBottom: 0,
            backgroundColor: '#334155', // Dark background like previous header
            color: 'white',
            padding: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header Section - Darker Gray */}
            <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                    Broadcast Summary <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>(last 7 days)</span>
                </div>
            </div>

            {/* Content Section - Overlapping style */}
            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '-2rem' }}>

                {/* Sent Card - Dark Blue */}
                <div style={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                }}>
                    <MessageCircle size={24} />
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Sent</div>
                </div>

                {/* Pending Card - Light/White */}
                <div style={{
                    background: 'linear-gradient(to bottom, #e2e8f0, #f8fafc)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#475569' // Dark text for light card
                }}>
                    <MessageCircle size={24} color="#cbd5e1" />
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Pending</div>
                </div>

            </div>
        </div>
    );
}
