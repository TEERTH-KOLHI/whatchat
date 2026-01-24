"use client";
import React, { useState } from 'react';
import {
    Package, Download, Search, Filter, ShoppingCart, MessageCircle,
    Facebook, Instagram, Bot, CreditCard, BarChart3, Zap, CheckCircle2
} from 'lucide-react';

const ADDONS = [
    {
        id: 1,
        name: "Facebook Poster",
        desc: "Auto-post text, image, link, video to Facebook Pages & Groups.",
        price: "$19/mo",
        icon: Facebook,
        color: "#1877f2",
        status: "active", // active, installed, available
        version: "2.1.0"
    },
    {
        id: 2,
        name: "Instagram Auto Reply",
        desc: "Automatically reply to comments and mentions on Instagram.",
        price: "$25/mo",
        icon: Instagram,
        color: "#E1306C",
        status: "available",
        version: "1.5.3"
    },
    {
        id: 3,
        name: "Sms Broadcasting",
        desc: "Send bulk SMS to your subscribers via Twilio/Nexmo.",
        price: "Free",
        icon: MessageCircle,
        color: "#10b981",
        status: "installed",
        version: "3.0.1"
    },
    {
        id: 4,
        name: "WooCommerce Connection",
        desc: "Sync products and recover abandoned carts automatically.",
        price: "$39/mo",
        icon: ShoppingCart,
        color: "#965df4",
        status: "available",
        version: "4.2.0"
    },
    {
        id: 5,
        name: "Stripe Payments",
        desc: "Collect payments directly within WhatsApp chat flow.",
        price: "$29/mo",
        icon: CreditCard,
        color: "#635bff",
        status: "active",
        version: "2.0.0"
    },
    {
        id: 6,
        name: "Advanced Analytics",
        desc: "Detailed reports on subscriber growth and message delivery.",
        price: "$15/mo",
        icon: BarChart3,
        color: "#f59e0b",
        status: "available",
        version: "1.2.0"
    },
    {
        id: 7,
        name: "AI Content Generator",
        desc: "Generate reply templates using OpenAI GPT-4.",
        price: "$49/mo",
        icon: Zap,
        color: "#ef4444",
        status: "available",
        version: "1.0.0"
    },
    {
        id: 8,
        name: "Bot Template Manager",
        desc: "Import/Export bot flows and manage templates.",
        price: "Free",
        icon: Bot,
        color: "#3b82f6",
        status: "installed",
        version: "1.1.5"
    }
];

export default function AddonManagerPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, installed, available

    const filteredAddons = ADDONS.filter(addon => {
        const matchesSearch = addon.name.toLowerCase().includes(search.toLowerCase()) ||
            addon.desc.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'installed'
                ? (addon.status === 'installed' || addon.status === 'active')
                : addon.status === 'available';

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Addon Manager</h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>Manage and install extensions for WhatChat.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="search-box" style={{ width: '250px' }}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search addons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: '2rem',
                borderBottom: '1px solid #e5e7eb',
                marginBottom: '2rem'
            }}>
                {['all', 'installed', 'available'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        style={{
                            padding: '0.75rem 0',
                            background: 'none',
                            border: 'none',
                            borderBottom: filter === tab ? '2px solid #111827' : '2px solid transparent',
                            color: filter === tab ? '#111827' : '#6b7280',
                            fontWeight: filter === tab ? '600' : '400',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            fontSize: '0.95rem'
                        }}
                    >
                        {tab} ({
                            tab === 'all' ? ADDONS.length :
                                tab === 'installed' ? ADDONS.filter(a => a.status !== 'available').length :
                                    ADDONS.filter(a => a.status === 'available').length
                        })
                    </button>
                ))}
            </div>

            {/* Addons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {filteredAddons.map((addon) => (
                    <div key={addon.id} className="card-hover-effect" style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '10px',
                                    backgroundColor: `${addon.color}15`, // 10% opacity bg
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: addon.color
                                }}>
                                    <addon.icon size={24} />
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    backgroundColor: addon.price === 'Free' ? '#dcfce7' : '#f3f4f6',
                                    color: addon.price === 'Free' ? '#166534' : '#374151'
                                }}>
                                    {addon.price}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                                {addon.name}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                                {addon.desc}
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>v{addon.version}</span>

                            {addon.status === 'active' ? (
                                <button style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'white',
                                    border: '1px solid #e5e7eb',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    color: '#059669',
                                    fontWeight: '500',
                                    cursor: 'default'
                                }}>
                                    <CheckCircle2 size={16} /> Active
                                </button>
                            ) : addon.status === 'installed' ? (
                                <button className="action-btn" style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                    background: '#111827',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px'
                                }}>
                                    Activate
                                </button>
                            ) : (
                                <button className="action-btn" style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                    background: '#f3f4f6',
                                    color: '#374151',
                                    border: 'none',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <Download size={16} /> Install
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
