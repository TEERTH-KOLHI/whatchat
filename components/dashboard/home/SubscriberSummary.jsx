"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react'; // Using icon as placeholder for Whatsapp/Socials

export default function SubscriberSummary() {
    return (
        <div className="summary-card" style={{ height: '100%', marginBottom: 0 }}>
            <div className="card-header">
                Subscriber Summary <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>(last 7 days)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Whatsapp Column - Green */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            backgroundColor: '#00c896', // Bright Green
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Gain</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            backgroundColor: '#0e7490', // Darker Teal/Green
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Sum</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            backgroundColor: '#00c896', // Bright Green
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Gain</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            backgroundColor: '#0e7490', // Darker Teal/Green
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Sum</div>
                        </div>
                    </div>
                </div>

                {/* Orange Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', // Orange/Red Gradient
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Drop</div>
                        </div>
                    </div>
                    {/* Spacer for visual alignment matching image */}
                    <div style={{ height: '48px' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', // Orange/Red Gradient
                            borderRadius: '12px',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>0</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Drop</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
