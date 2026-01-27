"use client";
import { useState } from 'react';
import {
    Plus, Search, MoreHorizontal, RefreshCw, Eye, Download, Trash2,
    Bot, Sparkles, Send, MessageSquare, Repeat, Settings, ChevronDown
} from 'lucide-react';
import TemplateModal from './TemplateModal';
import '@/styles/dashboard.css';

export default function BotManagerPage() {
    const [selectedBot, setSelectedBot] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [templateSearch, setTemplateSearch] = useState('');
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [activeOption, setActiveOption] = useState('Message Template');

    const createOptions = [
        "General Template",
        "WP Template",
        "Carousel Media Template",
        "Carousel Product Template",
        "Default Template"
    ];

    const bots = [
        { id: 1, name: "WhatChat By GrowMeOrganic", phone: "+1 555-710-0844" },
        { id: 2, name: "GrowMeOrganic", phone: "+1 450-954-5086" },
        { id: 3, name: "GrowMeOrganic Support", phone: "+91 79772 75656" }
    ];

    const templates = [
        { id: 132139, name: "neha_secondmessage", sub: "(Custom)", type: "text", status: "Approved", updatedAt: "24th Dec 24 15:30" },
        { id: 131877, name: "komalhellotime", sub: "(Custom)", type: "text", status: "Approved", updatedAt: "23rd Dec 24 17:37" },
        { id: 129762, name: "image_personal", sub: "(Custom)", type: "media", status: "Approved", updatedAt: "14th Dec 24 18:59" },
        { id: 129428, name: "komal_hello_intro", sub: "(Custom)", type: "text", status: "Approved", updatedAt: "13th Dec 24 16:19" },
        { id: 129429, name: "test", sub: "", type: "", status: "", updatedAt: "21st Dec" },
        { id: 129430, name: "Test Chatbot", sub: "", type: "", status: "", updatedAt: "21st Dec" },
        { id: 129431, name: "Meeting Reminder Confirm Acknowledgement", sub: "", type: "", status: "", updatedAt: "12th Dec" },
        { id: 129432, name: "Find Gender", sub: "", type: "", status: "", updatedAt: "11th Dec" },
        { id: 129433, name: "WhatChat Demo", sub: "", type: "", status: "", updatedAt: "22nd Nov" },
    ];

    const menuOptions = [
        { label: "Bot Reply", icon: Bot, color: '#10b981' },
        { label: "AI Assistant", icon: Sparkles, color: '#10b981' },
        { label: "Broadcast Template", icon: Send, color: '#10b981' },
        { label: "Chat Widget", icon: MessageSquare, color: '#10b981' },
        { label: "Sequence", icon: Repeat, color: '#10b981' },
        { label: "Input Flow", icon: Repeat, color: '#10b981' }, // Placeholder icon
        { label: "Whatsapp Flows", icon: Repeat, color: '#10b981' }, // Placeholder icon
        { label: "Message Template", icon: Repeat, color: '#10b981' }, // Placeholder icon
        { label: "WC/Shopify Automation", icon: Repeat, color: '#10b981' }, // Placeholder icon
        { label: "Out-bound Webhook", icon: Repeat, color: '#10b981' }, // Placeholder icon
        { label: "Action Buttons", icon: Repeat, color: '#10b981' }, // Placeholder icon
    ];

    const renderContent = () => {
        if (activeOption === 'Message Template') {
            return (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '250px' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={templateSearch}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button style={{ padding: '0.6rem 1rem', border: '1px solid #10b981', borderRadius: '4px', background: 'white', color: '#10b981', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <RefreshCw size={16} /> Sync Template
                            </button>
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => setShowCreateMenu(!showCreateMenu)}
                                    style={{ padding: '0.6rem 1rem', border: 'none', borderRadius: '4px', background: '#1a1a1a', color: 'white', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                                >
                                    <Plus size={16} /> Create <ChevronDown size={14} />
                                </button>
                                {showCreateMenu && (
                                    <div style={{
                                        position: 'absolute', top: '100%', right: 0, marginTop: '5px',
                                        backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '4px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        zIndex: 50, minWidth: '220px', overflow: 'hidden'
                                    }}>
                                        {createOptions.map((opt, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    padding: '0.75rem 1rem',
                                                    fontSize: '0.9rem',
                                                    color: '#374151',
                                                    cursor: 'pointer',
                                                    borderBottom: i < createOptions.length - 1 ? '1px solid #f3f4f6' : 'none',
                                                    backgroundColor: 'white'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                                onClick={() => {
                                                    setShowCreateMenu(false);
                                                    setShowTemplateModal(true);
                                                }}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#1f2937', fontWeight: '700' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>#</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Template Name</th>
                                    <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Updated at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map((tmpl, idx) => (
                                    <tr key={tmpl.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '1rem' }}>{idx + 1}</td>
                                        <td style={{ padding: '1rem' }}>{tmpl.id}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '500', color: '#1f2937' }}>{tmpl.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{tmpl.sub}</div>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#6b7280' }}>
                                            {tmpl.type === 'media' ? 'media' : ''}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{tmpl.status}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                                                <button className="action-btn" style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }} title="View">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="action-btn" style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }} title="Download">
                                                    <Settings size={16} />
                                                </button>
                                                <button className="action-btn" style={{ padding: '4px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }} title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#1f2937' }}>
                                            {tmpl.updatedAt}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#1f2937' }}>
                            Show
                            <select style={{ padding: '0.3rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            entries
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                            <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                                Showing 1 to 10 of 21 entries
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: '#f9fafb', borderRadius: '4px', cursor: 'pointer', color: '#6b7280' }}>Previous</button>
                                <button style={{ padding: '0.4rem 0.8rem', border: 'none', background: '#19877b', borderRadius: '4px', cursor: 'pointer', color: 'white' }}>1</button>
                                <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', cursor: 'pointer', color: '#374151' }}>2</button>
                                <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', cursor: 'pointer', color: '#374151' }}>3</button>
                                <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', cursor: 'pointer', color: '#374151' }}>Next</button>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{activeOption}</div>
                    <p>Settings for {activeOption} will appear here.</p>
                </div>
            );
        }
    };

    return (
        <div className="dashboard-page">
            <div className="page-header-row" style={{ marginBottom: '1rem' }}>
                <div>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a' }}>WhatsApp Bot Manager</h1>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage your WhatsApp bot</p>
                </div>
            </div>

            <div className="bot-manager-layout" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

                {/* Column 1: Bots List */}
                <div style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden', minHeight: '600px' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Bots</span>
                            <div className="search-box" style={{ width: '140px', padding: '0.4rem', background: '#f9fafb' }}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ fontSize: '0.8rem', background: 'transparent' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        {bots.map(bot => (
                            <div
                                key={bot.id}
                                onClick={() => setSelectedBot(bot.id)}
                                style={{
                                    padding: '1rem',
                                    cursor: 'pointer',
                                    backgroundColor: selectedBot === bot.id ? '#f3f4f6' : 'white',
                                    borderLeft: selectedBot === bot.id ? '3px solid #1a1a1a' : '3px solid transparent',
                                    borderBottom: '1px solid #f3f4f6'
                                }}
                            >
                                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{bot.name}</div>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{bot.phone}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 2: Options */}
                <div style={{ width: '280px', flexShrink: 0 }}>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>{bots.find(b => b.id === selectedBot)?.name}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {menuOptions.map((opt, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveOption(opt.label)}
                                style={{
                                    background: activeOption === opt.label ? '#f0fdf4' : 'white',
                                    padding: '1.25rem',
                                    borderRadius: '8px',
                                    border: activeOption === opt.label ? '1px solid #10b981' : '1px solid #e5e7eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ color: opt.color }}><opt.icon size={32} /></div>
                                <div>
                                    <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>{opt.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                                        Change Settings
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column 3: Template Settings */}
                <div style={{ flex: 1, background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '1.5rem', minHeight: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{activeOption} Settings</h3>
                        <button style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            Options <ChevronDown size={14} />
                        </button>
                    </div>

                    {renderContent()}


                </div>

            </div>

            <TemplateModal isOpen={showTemplateModal} onClose={() => setShowTemplateModal(false)} />
        </div>
    );
}
