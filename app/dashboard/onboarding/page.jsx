"use client";
import { CheckCircle2, Circle } from 'lucide-react';

const STEPS = [
    { id: 1, title: "Create your account", desc: "You've successfully signed up!", completed: true },
    { id: 2, title: "Connect WhatsApp", desc: "Link your phone number to start sending messages.", completed: false },
    { id: 3, title: "Import Contacts", desc: "Upload your existing customer list.", completed: false },
    { id: 4, title: "Create your first Bot", desc: "Set up a welcome flow for new users.", completed: false },
];

export default function OnboardingPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Getting Started</div>

            <div className="card-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Welcome to WhatChat!</h2>
                    <p style={{ color: '#6b7280' }}>Complete these steps to get the most out of the platform.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {STEPS.map((step) => (
                        <div key={step.id} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: step.completed ? '#f0fdf9' : 'white', opacity: step.completed ? 0.8 : 1 }}>
                            <div style={{ color: step.completed ? '#10b981' : '#d1d5db' }}>
                                {step.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 0.25rem 0', textDecoration: step.completed ? 'line-through' : 'none' }}>{step.title}</h4>
                                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{step.desc}</p>
                            </div>
                            {!step.completed && (
                                <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                                    <button className="action-btn" style={{ background: '#19877b', color: 'white', border: 'none' }}>Start</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
