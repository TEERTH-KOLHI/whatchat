"use client";
import React from 'react';
import { Video, ChevronDown, Search, Plus } from 'lucide-react';

export default function AppointmentPage() {
    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>WhatsApp Appointment System</h1>
                    <Video size={24} color="#f97316" />
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
                        New Appointment
                    </button>
                </div>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>Manage your WhatsApp appointments</p>
            </div>

            {/* SECTION 1: Appointment Manager */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Appointment Manager</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your appointment campaigns</p>

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
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Image</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Public</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Message Templates</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: '700' }}>Updated at</th>
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


            {/* SECTION 2: Appointment Requests */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Appointment Requests</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your appointment requests</p>

                {/* Filters */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{ padding: '0.6rem 1rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Any Appointment</span>
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
                                    border: '1px solid #e5e7eb', // Plain border for this input in mock
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
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1500px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Booking ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Booking Unique ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Appointment</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Phone Number</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Buyer</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Amount</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Currency</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Schedule Time</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Booked at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Updated at</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Payment Method</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Remind at</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={15} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
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
