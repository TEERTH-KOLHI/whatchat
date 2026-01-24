"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data to match the image (flat 0 values)
const data = [
    { name: '25 Dec', whatsapp: 0, meta: 0 },
    { name: '27 Dec', whatsapp: 0, meta: 0 },
    { name: '29 Dec', whatsapp: 0, meta: 0 },
    { name: '31 Dec', whatsapp: 0, meta: 0 },
    { name: '02 Jan', whatsapp: 0, meta: 0 },
    { name: '04 Jan', whatsapp: 0, meta: 0 },
    { name: '06 Jan', whatsapp: 0, meta: 0 },
    { name: '08 Jan', whatsapp: 0, meta: 0 },
    { name: '10 Jan', whatsapp: 0, meta: 0 },
    { name: '12 Jan', whatsapp: 0, meta: 0 },
    { name: '14 Jan', whatsapp: 0, meta: 0 },
    { name: '16 Jan', whatsapp: 0, meta: 0 },
    { name: '18 Jan', whatsapp: 0, meta: 0 },
    { name: '20 Jan', whatsapp: 0, meta: 0 },
    { name: '22 Jan', whatsapp: 0, meta: 0 },
    { name: '24 Jan', whatsapp: 0, meta: 0 },
];

export default function SubscriberGrowthChart() {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <div className="card-header" style={{ marginBottom: '0' }}>
                Subscriber Growth <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>(last 30 days)</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: -20,
                        bottom: 55,
                    }}
                >
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        tickMargin={10}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        domain={[0, 1.0]}
                        ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
                        tick={{ fontSize: 11, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    {/* Custom vertical line placeholder if needed, usually a ReferenceLine, but sticking to basics first */}
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="whatsapp"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }}
                        activeDot={{ r: 5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="meta"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            {/* Legend built manually to match style if recharts legend is hard to customize exactly */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '-30px', paddingLeft: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>Whatsapp</span>
                    </div>
                    <div style={{ backgroundColor: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>0</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
                        <span style={{ fontSize: '0.9rem', color: '#374151' }}>Meta</span>
                    </div>
                    <div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>0</div>
                </div>
            </div>
        </div>
    );
}
