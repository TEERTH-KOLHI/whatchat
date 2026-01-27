"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Briefcase, ArrowUpDown, CloudDownload, CloudUpload, Shuffle, Trash2, User } from 'lucide-react';

export default function WhatsAppSubscriberManager() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const optionsRef = useRef(null);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const res = await fetch('/api/subscribers');
                const data = await res.json();
                setSubscribers(data.subscribers || []);
            } catch (error) {
                console.error("Failed to fetch subscribers:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubs();

        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setIsOptionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const enrichedSubscribers = subscribers.map(sub => ({
        ...sub,
        subscriberId: `${sub.phone}-54147`,
        updatedAt: sub.joined || '14th Aug 24 17:54',
        name: sub.name || 'Unknown'
    }));

    const filtered = enrichedSubscribers.filter(sub =>
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone?.includes(searchTerm)
    );

    // Mock header toggle function
    const HeaderToggle = () => (
        <div style={{
            width: '32px', height: '18px', backgroundColor: '#e5e7eb', borderRadius: '10px',
            position: 'relative', cursor: 'pointer'
        }}>
            <div style={{
                width: '14px', height: '14px', backgroundColor: 'white', borderRadius: '50%',
                position: 'absolute', top: '2px', left: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }} />
        </div>
    );

    // Sort Icon component to match the double arrow or up/down look
    const SortIcon = () => (
        <ArrowUpDown size={12} style={{ color: '#9ca3af', marginLeft: '6px' }} />
    );

    const OptionItem = ({ icon: Icon, label, danger }) => (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem',
            cursor: 'pointer', fontSize: '0.8rem', color: danger ? '#ef4444' : '#374151',
            borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.1s'
        }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
            <Icon size={16} />
            <span style={{ fontWeight: '500' }}>{label}</span>
        </div>
    );

    return (
        <div className="dashboard-page" style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            {/* Top Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', margin: 0 }}>
                    WhatsApp Subscriber Manager
                </h1>
                <button style={{
                    display: 'flex', alignItems: 'center', gap: '0.25rem',
                    padding: '0.25rem 0.75rem', backgroundColor: '#e9eaf2', color: '#1f2937', // Light purple-ish gray
                    border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer'
                }}>
                    Manage <ChevronDown size={14} />
                </button>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: '0 0 1.5rem 0' }}>
                Manager your bot subscribers, labels and custom fields
            </p>

            {/* Main Content Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '6px', border: '1px solid #f3f4f6', boxShadow: 'none' }}> {/* Removed heavy shadow to match flat look */}

                {/* Filters Toolbar */}
                <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', width: '100%' }}>

                        {/* Group 1: Dropdowns */}
                        {/* GrowMeOrganic */}
                        <div style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '180px' }}>
                            <select style={{
                                width: '100%', appearance: 'none', padding: '0 12px', height: '36px',
                                border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: 'white',
                                color: '#374151', fontSize: '0.75rem', cursor: 'pointer', lineHeight: 'normal'
                            }}>
                                <option>GrowMeOrganic (+145095...</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>

                        {/* Select Label */}
                        <div style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '180px' }}>
                            <select style={{
                                width: '100%', appearance: 'none', padding: '0 12px', height: '36px',
                                border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: 'white',
                                color: '#374151', fontSize: '0.75rem', cursor: 'pointer', lineHeight: 'normal'
                            }}>
                                <option>Select Label</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>

                        {/* Select Status */}
                        <div style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '180px' }}>
                            <select style={{
                                width: '100%', appearance: 'none', padding: '0 12px', height: '36px',
                                border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: 'white',
                                color: '#374151', fontSize: '0.75rem', cursor: 'pointer', lineHeight: 'normal'
                            }}>
                                <option>Select Status</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>

                        {/* Select Sequence */}
                        <div style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '180px' }}>
                            <select style={{
                                width: '100%', appearance: 'none', padding: '0 12px', height: '36px',
                                border: '1px solid #e5e7eb', borderRadius: '4px', backgroundColor: 'white',
                                color: '#374151', fontSize: '0.75rem', cursor: 'pointer', lineHeight: 'normal'
                            }}>
                                <option>Select Sequence</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
                        </div>

                        {/* Search Input */}
                        <div style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '180px' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%', padding: '0 12px', height: '36px',
                                    border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.75rem', outline: 'none',
                                    color: '#374151'
                                }}
                            />
                        </div>

                        <div style={{ position: 'relative', marginLeft: 'auto' }} ref={optionsRef}>
                            <button
                                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0 16px', height: '36px', border: '1px solid #e5e7eb', borderRadius: '4px',
                                    backgroundColor: 'white', color: '#111827', fontSize: '0.75rem', cursor: 'pointer',
                                    fontWeight: '500', minWidth: '100px', justifyContent: 'center'
                                }}>
                                Options <ChevronDown size={14} style={{ color: '#111827' }} />
                            </button>

                            {/* Dropdown Menu */}
                            {isOptionsOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', right: 0, marginTop: '4px',
                                    backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 50, minWidth: '220px',
                                    overflow: 'hidden'
                                }}>
                                    <OptionItem icon={CloudDownload} label="Download(all) as CSV" />
                                    <OptionItem icon={CloudUpload} label="Import Subscribers" />
                                    <OptionItem icon={Briefcase} label="Create Subscriber" />
                                    <OptionItem icon={User} label="Assign Label" />
                                    <OptionItem icon={Shuffle} label="Assign Sequence" />
                                    <div style={{ borderTop: '0px solid #f3f4f6' }}> {/* Border handled by items */}
                                        <OptionItem icon={Trash2} label="Delete Subscriber" danger />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #f3f4f6' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left', width: '50px', color: '#111827', fontWeight: '700', fontSize: '0.8rem' }}>#</th>
                            <th style={{ padding: '1rem', textAlign: 'left', width: '60px' }}>
                                <HeaderToggle />
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Phone Number</div>
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Subscriber ID <SortIcon /></div>
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Name <SortIcon /></div>
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>Updated at <SortIcon /></div>
                            </th>
                            <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: '700', color: '#111827' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        )}
                        {!loading && filtered.length === 0 && (
                            <tr><td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No subscribers found.</td></tr>
                        )}
                        {filtered.map((sub, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '1.25rem 1rem', fontWeight: '500', color: '#111827', fontSize: '0.8rem' }}>{index + 1}</td>
                                <td style={{ padding: '1.25rem 1rem' }}>
                                    <HeaderToggle />
                                </td>
                                <td style={{ padding: '1.25rem 1rem', color: '#111827', fontSize: '0.8rem', fontWeight: '500' }}>{sub.phone}</td>
                                <td style={{ padding: '1.25rem 1rem', color: '#111827', fontSize: '0.8rem', fontWeight: '500' }}>{sub.subscriberId}</td>
                                <td style={{ padding: '1.25rem 1rem', color: '#111827', fontSize: '0.8rem', fontWeight: '500' }}>{sub.name}</td>
                                <td style={{ padding: '1.25rem 1rem', color: '#111827', fontSize: '0.8rem', fontWeight: '500' }}>{sub.updatedAt}</td>
                                <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                                    <button style={{
                                        background: '#e9eaf2', border: 'none', borderRadius: '4px', width: '32px', height: '32px',
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        color: '#6b7280'
                                    }}>
                                        <Briefcase size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
