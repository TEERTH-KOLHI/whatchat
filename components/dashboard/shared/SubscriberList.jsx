"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Download, Search, Filter, User, MoreHorizontal, Facebook, Instagram, Trash2, X } from 'lucide-react';

export default function SubscriberList({ title, platform = 'whatsapp' }) {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/subscribers');
            const data = await res.json();
            setSubscribers(data.subscribers || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSubscriber = async () => {
        if (!newName || !newPhone) return;
        setAdding(true);
        try {
            const res = await fetch('/api/subscribers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, phone: newPhone, labels: ['New'] })
            });
            if (res.ok) {
                setShowModal(false);
                setNewName('');
                setNewPhone('');
                fetchSubscribers();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this subscriber?')) return;
        try {
            const res = await fetch(`/api/subscribers/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setSubscribers(prev => prev.filter(s => s.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.phone && sub.phone.includes(searchQuery))
    );

    const getPlatformIcon = () => {
        if (platform === 'facebook') return <Facebook size={16} />;
        if (platform === 'instagram') return <Instagram size={16} />;
        return <User size={16} />;
    };

    const getPlatformColor = () => {
        if (platform === 'facebook') return '#1877f2';
        if (platform === 'instagram') return '#E1306C';
        return '#6b7280'; // Default gray for WhatsApp User icon (as per original design)
    };

    const getPlatformBg = () => {
        if (platform === 'facebook') return '#eff6ff';
        if (platform === 'instagram') return '#fce7f3';
        return 'white'; // WhatsApp assumed white or border
    };

    const getPlatformBorder = () => {
        if (platform === 'whatsapp') return '1px solid #e5e7eb';
        return 'none';
    }

    const getContactField = (sub) => {
        if (platform === 'facebook') return sub.fb_id;
        if (platform === 'instagram') return sub.insta_id;
        return sub.phone;
    };

    const getContactHeader = () => {
        if (platform === 'facebook') return 'Facebook ID';
        if (platform === 'instagram') return 'Handle';
        return 'Phone Number';
    };

    const primaryColor = platform === 'facebook' ? '#1877f2' : (platform === 'instagram' ? '#c32aa3' : 'white'); // Button bg
    const primaryText = platform === 'whatsapp' ? '#374151' : 'white';
    const primaryBorder = platform === 'whatsapp' ? '1px solid #d1d5db' : 'none';

    return (
        <div className="dashboard-page" style={{ paddingBottom: '2rem', position: 'relative' }}>
            {/* Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{title}</h1>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="secondary-btn" style={{
                        backgroundColor: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}>
                        <Download size={16} /> Export
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="secondary-btn"
                        style={{
                            backgroundColor: primaryColor === 'white' ? 'white' : primaryColor,
                            border: primaryBorder,
                            color: primaryText,
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                        <Plus size={16} /> {platform === 'whatsapp' ? 'Add Subscriber' : 'Sync Subscribers'}
                    </button>
                </div>
            </div>

            <div className="card-container" style={{ padding: '0', overflow: 'hidden', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                {/* Table Controls Header */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
                    <div className="search-box" style={{ width: '320px', position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search subscribers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem 0.6rem 2.75rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                color: '#374151',
                                backgroundColor: '#fff',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        color: '#374151',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{getContactHeader()}</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tags</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Joined</th>
                            <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                            <th style={{ textAlign: 'center', padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubscribers.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                                    {loading ? 'Loading...' : 'No subscribers found.'}
                                </td>
                            </tr>
                        )}
                        {filteredSubscribers.map((sub) => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            width: '32px', height: '32px',
                                            background: getPlatformBg(),
                                            border: getPlatformBorder(),
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: getPlatformColor()
                                        }}>
                                            {getPlatformIcon()}
                                        </div>
                                        <span style={{ fontWeight: '500', color: '#374151' }}>{sub.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#6b7280', fontWeight: '500' }}>
                                    {getContactField(sub)}
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {sub.labels && sub.labels.map((label, i) => (
                                            <span key={i} style={{
                                                backgroundColor: '#f3f4f6',
                                                color: '#4b5563',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}>
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: '#6b7280' }}>{sub.joined}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ color: sub.status === 'Active' ? '#166534' : '#9ca3af', fontWeight: '500' }}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', marginLeft: '0.5rem' }}
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Subscriber Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '2rem', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Add Subscriber</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Full Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                                placeholder="e.g. Jane Doe"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Phone Number</label>
                            <input
                                type="text"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                                placeholder="e.g. +1 555 123 4567"
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1rem', background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            <button
                                onClick={handleAddSubscriber}
                                disabled={adding}
                                style={{ padding: '0.6rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: adding ? 0.7 : 1 }}
                            >
                                {adding ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
