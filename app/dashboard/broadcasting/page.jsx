"use client";
import { useState, useEffect } from 'react';
import { Eye, Download, Trash2, Send, Plus, Search, ChevronLeft, ChevronRight, FileText, X, Activity, Users, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import '@/styles/dashboard.css';

export default function BroadcastingPage() {
    // Mock data for the design - in a real app this would likely come from an API
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            name: "24 Hour Campaign",
            status: "Completed",
            targeted: 1,
            sent: { count: 1, percentage: 100 },
            delivered: { count: 1, percentage: 100 },
            opened: { count: 1, percentage: 100 },
            unreached: { count: 0, percentage: 0 },
            scheduledAt: "17th Nov 24 02:21 +5:30"
        },
        {
            id: 2,
            name: "Test Marketing Campaign",
            status: "Completed",
            targeted: 1,
            sent: { count: 1, percentage: 100 },
            delivered: { count: 0, percentage: 0 },
            opened: { count: 0, percentage: 0 },
            unreached: { count: 1, percentage: 100 },
            scheduledAt: "17th Nov 24 02:00 +5:30"
        },
        {
            id: 3,
            name: "TestGopu",
            status: "Completed",
            targeted: 1,
            sent: { count: 1, percentage: 100 },
            delivered: { count: 1, percentage: 100 },
            opened: { count: 1, percentage: 100 },
            unreached: { count: 0, percentage: 0 },
            scheduledAt: "12th Nov 24 13:22 +5:30"
        }
    ]);

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleViewReport = (campaign) => {
        setSelectedCampaign(campaign);
        setShowReportModal(true);
    };

    return (
        <div className="dashboard-page">
            {/* Header */}
            <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#1a1a1a' }}>WhatsApp Broadcasting</h1>
                    <button className="primary-btn" style={{
                        background: '#e5e7eb', color: '#1f2937', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem'
                    }}>
                        <Plus size={16} fill="black" /> Create
                    </button>
                </div>
                <div>
                    <button className="secondary-btn" style={{ background: '#e5e7eb', color: '#1f2937', border: 'none', padding: '0.6rem 1rem', borderRadius: '4px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} fill='#1f2937' /> WP Content Automator Plugin
                    </button>
                </div>
            </div>
            <p style={{ color: '#9ca3af', marginTop: '-10px', marginBottom: '20px', fontSize: '0.95rem' }}>List of bot broadcasting campaigns</p>


            {/* Content Card */}
            <div className="card-container" style={{ padding: '1.5rem', borderRadius: '4px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>

                {/* Filters */}
                <div className="filter-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <select className="form-select" style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#4b5563' }}>
                            <option>WhatChat By GrowMeOrganic (+15557100844)</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <select className="form-select" style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#4b5563' }}>
                            <option>Select Status</option>
                            <option>Completed</option>
                            <option>Pending</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#4b5563', outline: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table className="broadcast-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', fontSize: '0.9rem', color: '#1f2937', fontWeight: '700', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>#</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Campaign Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Targeted</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Sent</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Delivered</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Opened</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Unreached</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Scheduled at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((camp) => (
                                <tr key={camp.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem' }}>{camp.id}</td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{camp.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                                            <span>{camp.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleViewReport(camp)}
                                                className="action-btn"
                                                style={{ padding: '6px', background: '#19877b', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
                                                title="View"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button className="action-btn" style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#6b7280' }} title="Download">
                                                <Download size={16} />
                                            </button>
                                            <button className="action-btn" style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#6b7280' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                            {/* Only show resend if needed, keeping simple for now based on screenshot icons */}
                                            {camp.id === 2 && (
                                                <button className="action-btn" style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#6b7280' }} title="Resend">
                                                    <Send size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{camp.targeted}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#10b981' }}>{camp.sent.count}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>{camp.sent.percentage}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <span style={{ fontWeight: 'bold', color: camp.delivered.percentage > 0 ? '#10b981' : '#10b981' }}>{camp.delivered.count}</span>
                                            <span style={{ fontSize: '0.75rem', color: camp.delivered.percentage > 0 ? '#10b981' : '#10b981' }}>{camp.delivered.percentage}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>{camp.opened.count}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>{camp.opened.percentage}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                            <span style={{ fontWeight: 'bold', color: '#9ca3af' }}>{camp.unreached.count}</span>
                                            <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{camp.unreached.percentage}%</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.85rem', color: '#1f2937', fontWeight: '600' }}>{camp.scheduledAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: 'none', paddingTop: '0' }}>
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
                            Showing 1 to 3 of 3 entries
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button disabled style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: '#f3f4f6', borderRadius: '4px', cursor: 'not-allowed', color: '#9ca3af' }}>Previous</button>
                            <button style={{ padding: '0.4rem 0.8rem', border: 'none', background: '#19877b', borderRadius: '4px', cursor: 'pointer', color: 'white' }}>1</button>
                            <button disabled style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: '#f3f4f6', borderRadius: '4px', cursor: 'not-allowed', color: '#9ca3af' }}>Next</button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Campaign Report Modal */}
            {showReportModal && selectedCampaign && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
                }}>
                    <div style={{
                        backgroundColor: '#f9fafb', borderRadius: '8px', width: '900px', maxWidth: '95vw',
                        height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                    }}>
                        {/* Modal Header */}
                        <div style={{ background: 'white', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold' }}>Campaign Report</h3>
                            <button
                                onClick={() => setShowReportModal(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>

                            {/* Top Stats Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                {/* Status Card */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                    <div style={{ color: '#19877b' }}><Activity size={24} /></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#00d0c2', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>Status</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>
                                            <span style={{ width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                                            {selectedCampaign.status}
                                        </div>
                                    </div>
                                </div>
                                {/* Targeted Card */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                    <div style={{ color: '#00d0c2' }}><Users size={24} /></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#00d0c2', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>Targeted</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#00d0c2' }}>1.0060K</div>
                                    </div>
                                </div>
                                {/* Message Count Card */}
                                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
                                    <div style={{ color: '#00d0c2' }}><MessageSquare size={24} /></div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ color: '#00d0c2', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '500' }}>Message Count</div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#00d0c2' }}>1</div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Stats Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                                {/* Sent */}
                                <div style={{ background: 'white', padding: '1.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: '#10b981' }}><Send size={24} /></div>
                                    <div>
                                        <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>Sent</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#374151' }}>1006</span>
                                            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>100%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Delivered */}
                                <div style={{ background: 'white', padding: '1.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: '#10b981' }}><CheckCircle size={24} /></div>
                                    <div>
                                        <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '600' }}>Delivered</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#baeccf' }}>922</span>
                                            <span style={{ fontSize: '0.8rem', color: '#baeccf' }}>92%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Opened */}
                                <div style={{ background: 'white', padding: '1.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: '#f59e0b' }}><Eye size={24} /></div>
                                    <div>
                                        <div style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '600' }}>Opened</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fcd34d' }}>813</span>
                                            <span style={{ fontSize: '0.8rem', color: '#fcd34d' }}>81%</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Unreached */}
                                <div style={{ background: 'white', padding: '1.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ color: '#9ca3af' }}><Clock size={24} /></div>
                                    <div>
                                        <div style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: '600' }}>Unreached</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#6b7280' }}>56</span>
                                            <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>6%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logs Section */}
                            <div style={{ marginBottom: '1rem', width: '250px' }}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none' }}
                                />
                            </div>

                            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ background: '#f3f4f6', color: '#1f2937', fontWeight: '700', borderBottom: '1px solid #e5e7eb' }}>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>#</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#10b981' }}>Chat ID</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Name</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Status</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Sent at</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Delivered at</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Opened at</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Failed at</th>
                                            <th style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>Response</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { id: 1, chatId: '919500588159', name: 'ranaa', status: 'Delivered', sentAt: '21st Oct 24 07:01', deliveredAt: '21st Oct 24 07:01', openedAt: null, failedAt: null },
                                            { id: 2, chatId: '918219561496', name: 'pparasram04', status: 'Delivered', sentAt: '21st Oct 24 07:01', deliveredAt: '21st Oct 24 07:01', openedAt: null, failedAt: null },
                                            { id: 3, chatId: '917678801676', name: 'lakhansoni7388', status: 'Read', sentAt: '21st Oct 24 07:01', deliveredAt: '21st Oct 24 07:01', openedAt: '24th Oct 24 10:44', failedAt: null },
                                            { id: 4, chatId: '919780986366', name: 'Sharma', status: 'Read', sentAt: '21st Oct 24 07:01', deliveredAt: '21st Oct 24 07:35', openedAt: '21st Oct 24 07:42', failedAt: null },
                                        ].map((log) => (
                                            <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                                <td style={{ padding: '0.75rem 1rem' }}>{log.id}</td>
                                                <td style={{ padding: '0.75rem 1rem', color: '#10b981' }}>{log.chatId}</td>
                                                <td style={{ padding: '0.75rem 1rem' }}>{log.name}</td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{log.status}</td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.85rem' }}>{log.sentAt}</td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.85rem' }}>{log.deliveredAt}</td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                                    {log.openedAt ? <span style={{ fontSize: '0.85rem' }}>{log.openedAt}</span> : <X size={16} fill="black" stroke="white" style={{ background: 'black', borderRadius: '50%' }} />}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                                                    {log.failedAt ? <span>{log.failedAt}</span> : <X size={16} fill="black" stroke="white" style={{ background: 'black', borderRadius: '50%' }} />}
                                                </td>
                                                <td style={{ padding: '0.75rem 1rem' }}></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
