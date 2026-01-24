"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    CheckCircle2, Circle, ArrowRight, MessageCircle, Bot, Users, Radio,
    Play, ChevronRight, Check
} from 'lucide-react';

const STEPS = [
    {
        id: 1,
        title: "Connect WhatsApp",
        subtitle: "Link your business phone number",
        desc: "The first step to automation is connecting your WhatsApp Business API number. This allows WhatChat to send and receive messages on your behalf.",
        why: "Without this connection, bots and broadcasts cannot function.",
        href: "/dashboard/connect",
        icon: MessageCircle,
        color: "#25d366",
        completed: true
    },
    {
        id: 2,
        title: "Create First Bot",
        subtitle: "Automate your replies",
        desc: "Set up a simple auto-reply or a complex chatbot flow. Bots handle customer queries 24/7 without manual intervention.",
        why: "Save time by automating responses to common questions instantly.",
        href: "/dashboard/bot-manager",
        icon: Bot,
        color: "#3b82f6",
        completed: false
    },
    {
        id: 3,
        title: "Import Contacts",
        subtitle: "Build your audience",
        desc: "Upload your existing customer list (CSV/Excel) to the subscriber manager. You can tag and segment them for better targeting.",
        why: "A segmented list leads to higher conversion rates for broadcasts.",
        href: "/dashboard/customers",
        icon: Users,
        color: "#8b5cf6",
        completed: false
    },
    {
        id: 4,
        title: "Send Broadcast",
        subtitle: "Launch your campaign",
        desc: "Create and send your first marketing campaign to your imported contacts. Track delivery and read rates in real-time.",
        why: "Re-engage your customers and drive sales with targeted messages.",
        href: "/dashboard/broadcasting",
        icon: Radio,
        color: "#f59e0b",
        completed: false
    },
];

export default function OnboardingPage() {
    const [activeStepId, setActiveStepId] = useState(2); // Default to first incomplete step (2 in this mock)

    // Calculate progress
    const completedSteps = STEPS.filter(s => s.completed).length;
    const progress = Math.round((completedSteps / STEPS.length) * 100);

    const activeStep = STEPS.find(s => s.id === activeStepId) || STEPS[0];

    return (
        <div className="dashboard-page" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <div className="page-title" style={{ marginBottom: '1rem' }}>Onboarding Guide</div>

            <div style={{
                flex: 1,
                display: 'flex',
                gap: '2rem',
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                {/* Left Panel: Vertical Stepper */}
                <div style={{ width: '320px', borderRight: '1px solid #f3f4f6', paddingRight: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progress}%`, background: '#19877b', transition: 'all 0.4s' }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {STEPS.map((step, index) => {
                            const isActive = step.id === activeStepId;
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStepId(step.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        background: isActive ? '#f0fdfa' : 'transparent',
                                        border: isActive ? '1px solid #ccfbf1' : '1px solid transparent',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '24px', height: '24px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: step.completed ? '#10b981' : (isActive ? '#19877b' : '#e5e7eb'),
                                        color: 'white',
                                        flexShrink: 0
                                    }}>
                                        {step.completed ? <Check size={14} strokeWidth={3} /> : <span style={{ fontSize: '12px', fontWeight: '600' }}>{index + 1}</span>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '500', color: isActive ? '#19877b' : '#374151' }}>
                                            {step.title}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{step.completed ? 'Completed' : (step.id === 2 ? 'In Progress' : 'Pending')}</div>
                                    </div>
                                    {isActive && <ChevronRight size={16} color="#19877b" />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel: Content */}
                <div style={{ flex: 1, paddingLeft: '1rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: `${activeStep.color}15`,
                            color: activeStep.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            <activeStep.icon size={40} />
                        </div>

                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                            {activeStep.title}
                        </h2>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#6b7280', marginBottom: '1.5rem' }}>
                            {activeStep.subtitle}
                        </h3>

                        <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '1rem', marginBottom: '1.5rem' }}>
                            {activeStep.desc}
                        </p>

                        <div style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${activeStep.color}`,
                            textAlign: 'left',
                            width: '100%',
                            marginBottom: '2rem'
                        }}>
                            <span style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>💡 Why is this important?</span>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>{activeStep.why}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                            <Link href={activeStep.href} style={{ flex: 1 }}>
                                <button className="action-btn" style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1rem',
                                    background: activeStep.color,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                }}>
                                    {activeStep.completed ? 'Manage Settings' : 'Start Setup'} <ArrowRight size={18} />
                                </button>
                            </Link>
                            {/* Optional formatting for 'Skip' or next items */}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid #f3f4f6', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.9rem' }}>
                        <span>Step {activeStepId} of {STEPS.length}</span>
                        <div style={{ display: 'flex', gap: '1rem', cursor: 'pointer' }}>
                            {activeStepId > 1 && <span onClick={() => setActiveStepId(activeStepId - 1)}>&larr; Previous</span>}
                            {activeStepId < STEPS.length && <span style={{ color: '#111827' }} onClick={() => setActiveStepId(activeStepId + 1)}>Next Step &rarr;</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
