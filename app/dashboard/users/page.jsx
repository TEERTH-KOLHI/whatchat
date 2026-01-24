"use client";
import React from 'react';
import { Plus, Search, ChevronDown, MoreHorizontal, User } from 'lucide-react';

export default function UserManagerPage() {
    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Header Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>User Manager</h1>
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
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>List of subscribed users & team members</p>
            </div>

            {/* Main Card */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>

                {/* Filters Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '600px' }}>
                        {/* Package/Role Select */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <select style={{
                                width: '100%',
                                padding: '0.6rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                appearance: 'none',
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}>
                                <option>Any Package/Role</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                        </div>

                        {/* Status Select */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <select style={{
                                width: '100%',
                                padding: '0.6rem 1rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '4px',
                                appearance: 'none',
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}>
                                <option>Status</option>
                            </select>
                            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                        </div>

                        {/* Search Input */}
                        <div style={{ flex: 1.5, position: 'relative' }}>
                            {/* The mock shows a cursor pipe | and green border logic likely on focus, keep simple standard for now but match placeholder */}
                            <input
                                type="text"
                                placeholder="Search & Enter..."
                                style={{
                                    width: '100%',
                                    padding: '0.6rem 1rem',
                                    border: '1px solid #10b981', // Green border as hinted
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: '#374151'
                                }}
                            />
                        </div>
                    </div>

                    {/* Options Button */}
                    <button style={{
                        padding: '0.6rem 1rem',
                        border: '1px solid #e5e7eb',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        color: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        Options <ChevronDown size={14} />
                    </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>
                                    <div style={{ width: '30px', height: '16px', background: '#e5e7eb', borderRadius: '10px', position: 'relative' }}>
                                        <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                                    </div>
                                </th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>User ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Avatar</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Package/Role</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Role</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Expiry date</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Phone Verified</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Created at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Last IP</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Last Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={14} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.95rem' }}>
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem' }}>
                    <select style={{
                        padding: '0.4rem 0.8rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '4px',
                        color: '#374151',
                        backgroundColor: 'white',
                        fontSize: '0.9rem'
                    }}>
                        <option>25</option>
                        <option>50</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>0 - 0 of 0</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{
                                padding: '0.4rem 0.8rem',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                borderRadius: '4px',
                                color: '#9ca3af',
                                cursor: 'not-allowed',
                                fontSize: '0.9rem'
                            }}>Previous</button>
                            <button style={{
                                padding: '0.4rem 0.8rem',
                                border: '1px solid #e5e7eb',
                                backgroundColor: 'white',
                                borderRadius: '4px',
                                color: '#9ca3af',
                                cursor: 'not-allowed',
                                fontSize: '0.9rem'
                            }}>Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
