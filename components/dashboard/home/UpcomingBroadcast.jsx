"use client";

import React from 'react';
import { Frown, Check } from 'lucide-react';

export default function UpcomingBroadcast() {
    return (
        <div className="summary-card" style={{ height: '100%', marginBottom: 0, position: 'relative', overflow: 'hidden' }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2', // Light red/pink
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '20px',
                paddingRight: '20px'
            }}>
                <Check color="white" size={40} strokeWidth={4} style={{ opacity: 1 }} />
            </div>

            <div className="card-header" style={{ position: 'relative', zIndex: 1 }}>
                Upcoming Broadcast
                <div style={{ fontSize: '0.85rem', color: '#19877b', marginTop: '0.2rem', fontWeight: 'bold' }}>Next 7 days</div>
            </div>

            <p style={{ color: '#1f2937', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
                Scheduled upcoming broadcast campaigns
            </p>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                marginTop: '1rem'
            }}>
                <Frown size={48} strokeWidth={1.5} style={{ marginBottom: '1rem', color: '#4b5563' }} />
                <div style={{ textAlign: 'center', fontSize: '0.9rem', maxWidth: '200px' }}>
                    You do not have any broadcast scheduled.
                </div>
            </div>
        </div>
    );
}
