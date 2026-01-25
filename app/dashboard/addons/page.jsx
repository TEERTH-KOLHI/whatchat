"use client";
import React, { useState, useEffect } from 'react';
import {
    Package, Download, Search, Filter, ShoppingCart, MessageCircle,
    Facebook, Instagram, Bot, CreditCard, BarChart3, Zap, CheckCircle2
} from 'lucide-react';

// Static Icon Map (cannot be sent via JSON API)
const ICON_MAP = {
    Facebook, Instagram, MessageCircle, ShoppingCart, CreditCard, BarChart3, Zap, Bot
};

export default function AddonManagerPage() {
    const [addons, setAddons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all, installed, available
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchAddons();
    }, []);

    const fetchAddons = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/addons');
            const data = await res.json();
            setAddons(data.addons || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        setProcessingId(id);
        try {
            const res = await fetch('/api/addons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (res.ok) {
                // Optimistic update
                setAddons(prev => prev.map(a => a.id === id ? { ...a, status } : a));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setProcessingId(null);
        }
    };

    const filteredAddons = addons.filter(addon => {
        const matchesSearch = addon.name.toLowerCase().includes(search.toLowerCase()) ||
            addon.desc.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all'
            ? true
            : filter === 'installed'
                ? (addon.status === 'installed' || addon.status === 'active')
                : addon.status === 'available';

        return matchesSearch && matchesFilter;
    });

    const getIcon = (iconName) => {
        const IconComponent = ICON_MAP[iconName] || Package;
        return IconComponent;
    };

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
                            loading ? '...' :
                                tab === 'all' ? addons.length :
                                    tab === 'installed' ? addons.filter(a => a.status !== 'available').length :
                                        addons.filter(a => a.status === 'available').length
                        })
                    </button>
                ))}
            </div>

            {/* Addons Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Loading addons...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {filteredAddons.map((addon) => {
                        const Icon = getIcon(addon.icon);
                        const isProcessing = processingId === addon.id;

                        return (
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
                                            <Icon size={24} />
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
                                        <button
                                            onClick={() => handleUpdateStatus(addon.id, 'installed')}
                                            disabled={isProcessing}
                                            style={{
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
                                                cursor: 'pointer'
                                            }}>
                                            {isProcessing ? '...' : <><CheckCircle2 size={16} /> Active</>}
                                        </button>
                                    ) : addon.status === 'installed' ? (
                                        <button
                                            className="action-btn"
                                            onClick={() => handleUpdateStatus(addon.id, 'active')}
                                            disabled={isProcessing}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.85rem',
                                                background: '#111827',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer'
                                            }}>
                                            {isProcessing ? 'Activating...' : 'Activate'}
                                        </button>
                                    ) : (
                                        <button
                                            className="action-btn"
                                            onClick={() => handleUpdateStatus(addon.id, 'installed')}
                                            disabled={isProcessing}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.85rem',
                                                background: '#f3f4f6',
                                                color: '#374151',
                                                border: 'none',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                cursor: 'pointer'
                                            }}>
                                            {isProcessing ? 'Installing...' : <><Download size={16} /> Install</>}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
