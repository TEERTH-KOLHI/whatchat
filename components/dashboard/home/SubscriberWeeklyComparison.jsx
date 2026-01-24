"use client";

import React from 'react';

export default function SubscriberWeeklyComparison() {
    const size = 200;
    const strokeWidth = 15;
    const center = size / 2;
    const radius = size / 2 - strokeWidth * 2;
    const circumference = 2 * Math.PI * radius;
    // 0% progress for now as per design
    const progress = 0;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="card-header">
                Subscriber Weekly<br />Comparison
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: size, height: size }}>
                    {/* Shadow/Outer Ring */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '15px solid #f3f4f6'
                    }}></div>

                    {/* SVG Ring */}
                    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                            stroke="#e5e7eb"
                            cx={center}
                            cy={center}
                            r={radius}
                            strokeWidth={strokeWidth}
                            fill="transparent"
                        />
                        <circle
                            stroke="#3b82f6"
                            cx={center}
                            cy={center}
                            r={radius}
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Center Text */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{ color: '#0ea5e9', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Subscribers</div>
                        <div style={{ fontSize: '2.5rem', fontWeight: '500', color: '#1f2937' }}>0</div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <div style={{ fontWeight: '600', color: '#1f2937' }}>From last Week</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6b7280' }}>-</div>
                </div>
            </div>
        </div>
    );
}
