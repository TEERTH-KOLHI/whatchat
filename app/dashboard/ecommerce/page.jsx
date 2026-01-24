"use client";
import React from 'react';
import { Video, ChevronDown, Search, Plug, Plus } from 'lucide-react';

export default function EcommerceCatalogPage() {
    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>WhatsApp eCommerce Catalog</h1>
                    <Video size={24} color="#f97316" />
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>Integrate and manage your WhatsApp catalogs</p>
            </div>

            {/* SECTION 1: Catalog Manager */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Catalog Manager</h3>
                    <button style={{
                        backgroundColor: '#f3f4f6',
                        color: '#1f2937',
                        border: 'none',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        New Catalog
                    </button>
                </div>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your eCommerce catalogs</p>

                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#9ca3af', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Any WhatsApp Account</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#9ca3af', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Any Status</span>
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
                                border: '1px solid #e5e7eb',
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
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Image</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Public</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Settings</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: '700' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        Updated at <ChevronDown size={12} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>0 - 0 of 0</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Previous</button>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Next</button>
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                        <option>10</option>
                    </select>
                </div>
            </div>


            {/* SECTION 2: Integrate New Catalog */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Integrate New Catalog</h3>
                <p style={{ margin: '0 0 2rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Integrate your catalog to WhatChat</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>WHATSAPP ACCOUNT *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: 'white' }}>
                            <div style={{ width: '16px', height: '16px', background: '#e5e7eb', borderRadius: '50%', marginRight: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', flex: 1 }}>Select WhatsApp Account</span>
                            <ChevronDown size={14} color="#9ca3af" />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>CATALOG ID *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: 'white' }}>
                            <div style={{ width: '24px', height: '24px', background: '#e5e7eb', marginRight: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#6b7280' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            </div>
                            <input type="text" placeholder="Example : 76256114220XXXX" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>CATALOG NAME *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: 'white' }}>
                            <div style={{ width: '12px', height: '12px', background: '#6b7280', borderRadius: '50%', marginRight: '0.5rem', marginLeft: '0.5rem' }}></div>
                            <input type="text" placeholder="Give it a name to track it later" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }} />
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #10b981', paddingTop: '1.5rem' }}>
                    <button className="primary-btn" style={{
                        backgroundColor: '#19877b',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <Plug size={16} /> Integrate Catalog
                    </button>
                </div>
            </div>


            {/* SECTION 3: Catalog Orders */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Catalog Orders</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your catalog orders</p>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Any Catalog</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Any Status</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                        <div style={{ flex: 1.5, position: 'relative' }}>
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
                        cursor: 'pointer'
                    }}>
                        Options <ChevronDown size={14} />
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Order ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Order Unique ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Phone Number</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Buyer</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Amount</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Currency</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Ordered at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Updated at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Reminder Sent at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Shipping Address</th>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>0 - 0 of 0</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Previous</button>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Next</button>
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                        <option>10</option>
                    </select>
                </div>
            </div>

            {/* SECTION 4: Catalog Orders (Manual Payment) */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Catalog Orders (Manual Payment)</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your catalog orders (Manual Payment)</p>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Any Catalog</span>
                            <ChevronDown size={14} />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px', position: 'relative' }}>
                        <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Any Status</span>
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
                                border: '1px solid #e5e7eb', // Plain border for this input in mock
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                color: '#374151'
                            }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Buyer</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Amount</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Currency</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Attachment</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Ordered at <ChevronDown size={12} />
                                    </div>
                                </th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Additional Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={10} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>0 - 0 of 0</span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Previous</button>
                        <button style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: 'white', borderRadius: '4px', color: '#9ca3af', fontSize: '0.85rem' }}>Next</button>
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                    <select style={{ padding: '0.3rem 0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                        <option>10</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
