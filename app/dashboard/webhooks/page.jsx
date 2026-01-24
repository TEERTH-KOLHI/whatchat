"use client";
import React from 'react';
import { Plus, Search, ChevronDown, Video, FileText } from 'lucide-react';

export default function WebhookWorkflowPage() {
    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>WhatsApp Webhook (in-bound) Workflow</h1>
                    <Video size={24} color="#f97316" /> {/* Orange video icon as seen in mockup */}
                    <button style={{
                        backgroundColor: '#e5e7eb',
                        color: '#111827',
                        border: 'none',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        <div style={{ background: '#000', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Plus size={10} color="white" />
                        </div>
                        Create
                    </button>
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>Create and manage your WhatsApp webhook workflows</p>
            </div>

            {/* Section 1: Your Workflows */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>Your Workflows</h3>
                    <button style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #10b981', // Green border
                        color: '#10b981',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}>
                        <div style={{ background: '#10b981', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>@</div>
                        Workflow Report
                    </button>
                </div>

                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        {/* Placeholder for "Any Status" - using simple select/div for layout */}
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #f3f4f6', borderRadius: '4px', color: '#9ca3af', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
                            <span>Any Status</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #f3f4f6', borderRadius: '4px', color: '#9ca3af', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
                            <span>Any Verification</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                    <div style={{ flex: 1.5, minWidth: '200px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search & Enter..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 1rem',
                                border: '1px solid #10b981',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                color: '#374151'
                            }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Workflow</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Template</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Verified</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Targeted</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Processed</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Delivered</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Opened</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Failed</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Skipped</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Unreached</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Last Called at</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={14} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Minimal Pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>0 - 0 of 0</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Previous</button>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Next</button>
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                        <option>5</option>
                    </select>
                </div>
            </div>

            {/* Section 2: Workflow Details */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Workflow Details</h3>
                <p style={{ margin: '0 0 2rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Send WhatsApp template message based on data received from 3rd party webhook call</p>

                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Workflow Details</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>WORKFLOW NAME</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ width: '12px', height: '12px', background: '#6b7280', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                            <input type="text" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>WHATSAPP ACCOUNT *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ marginRight: '0.5rem' }}>
                                {/* WhatsApp icon placeholder */}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#9ca3af', flex: 1 }}>Select WhatsApp Account</span>
                            <ChevronDown size={14} color="#9ca3af" />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>MESSAGE TEMPLATE *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ marginRight: '0.5rem', color: '#6b7280' }}>
                                <FileText size={16} />
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#9ca3af', flex: 1 }}>SELECT TEMPLATE</span>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #10b981', paddingTop: '1.5rem' }}>
                    <button className="primary-btn" style={{
                        backgroundColor: '#19877b',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        Create Workflow
                    </button>
                </div>

            </div>
        </div>
    );
}
