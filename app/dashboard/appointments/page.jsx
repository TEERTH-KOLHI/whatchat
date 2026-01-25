"use client";
import React, { useState, useEffect } from 'react';
import { Video, ChevronDown, Search, Plus, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';

export default function AppointmentPage() {
    // Campaigns State
    const [campaigns, setCampaigns] = useState([]);
    const [loadingCampaigns, setLoadingCampaigns] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCampaignName, setNewCampaignName] = useState('');
    const [creating, setCreating] = useState(false);

    // Bookings State
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [bookingSearch, setBookingSearch] = useState('');
    const [bookingPage, setBookingPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('All');
    const mockBookingPageSize = 5;

    useEffect(() => {
        fetchCampaigns();
        fetchBookings();
    }, []);

    const fetchCampaigns = async () => {
        setLoadingCampaigns(true);
        try {
            const res = await fetch('/api/appointments/campaigns');
            const data = await res.json();
            setCampaigns(data.campaigns || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCampaigns(false);
        }
    };

    const fetchBookings = async () => {
        setLoadingBookings(true);
        try {
            const res = await fetch('/api/appointments/bookings');
            const data = await res.json();
            setBookings(data.bookings || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingBookings(false);
        }
    };

    const handleCreateCampaign = async () => {
        if (!newCampaignName) return;
        setCreating(true);
        try {
            const res = await fetch('/api/appointments/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCampaignName })
            });
            if (res.ok) {
                setNewCampaignName('');
                setIsModalOpen(false);
                fetchCampaigns();
                fetchBookings(); // Seeds bookings
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteCampaign = async (id) => {
        if (!confirm('Are you sure? This will delete the campaign and its bookings.')) return;
        try {
            await fetch(`/api/appointments/campaigns?id=${id}`, { method: 'DELETE' });
            fetchCampaigns();
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    const handleTogglePublic = async (camp) => {
        try {
            await fetch('/api/appointments/campaigns', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: camp.id, updates: { isPublic: !camp.isPublic } })
            });
            fetchCampaigns();
        } catch (err) {
            console.error(err);
        }
    };


    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            await fetch('/api/appointments/bookings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: bookingId, updates: { status: newStatus } })
            });
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    // Bookings Pagination & Search
    const filteredBookings = bookings.filter(b => {
        const matchesSearch = b.bookingUniqueId.toLowerCase().includes(bookingSearch.toLowerCase()) ||
            b.buyer.toLowerCase().includes(bookingSearch.toLowerCase());
        const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalBookingPages = Math.ceil(filteredBookings.length / mockBookingPageSize);
    const paginatedBookings = filteredBookings.slice((bookingPage - 1) * mockBookingPageSize, bookingPage * mockBookingPageSize);

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem', position: 'relative' }}>
            {/* Modal Overlay */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ margin: 0 }}>New Appointment System</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <input
                            type="text"
                            placeholder="System Name (e.g. Dr. Smith Clinic)"
                            value={newCampaignName}
                            onChange={(e) => setNewCampaignName(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
                        />
                        <button
                            onClick={handleCreateCampaign}
                            disabled={creating}
                            style={{ width: '100%', padding: '0.8rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                            {creating ? 'Creating...' : 'Create System'}
                        </button>
                    </div>
                </div>
            )}

            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>WhatsApp Appointment System</h1>
                    <Video size={24} color="#f97316" />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
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

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Public</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: '700' }}>Updated at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {loadingCampaigns ? 'Loading...' : 'No appointment systems found.'}
                                    </td>
                                </tr>
                            ) : (
                                campaigns.map((camp) => (
                                    <tr key={camp.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', fontWeight: '500' }}>{camp.name}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button
                                                onClick={() => handleTogglePublic(camp)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: camp.isPublic ? '#10b981' : '#9ca3af' }}
                                                title="Toggle Visibility"
                                            >
                                                {camp.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button
                                                onClick={() => handleDeleteCampaign(camp.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.85rem', color: '#6b7280' }}>{camp.updatedAt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* SECTION 2: Appointment Requests */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Appointment Requests</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your appointment requests</p>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid #f3f4f6', borderRadius: '4px', color: '#374151', fontSize: '0.9rem', background: '#f9fafb' }}>
                            <option value="All">Any Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div style={{ flex: 1.5, minWidth: '200px' }}>
                        <input
                            type="text"
                            placeholder="Search Bookings..."
                            value={bookingSearch}
                            onChange={(e) => setBookingSearch(e.target.value)}
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

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1500px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Booking ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>System</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Buyer</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Amount</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Schedule Time</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {loadingBookings ? 'Loading bookings...' : 'No bookings found.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedBookings.map(book => (
                                    <tr key={book.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{book.bookingUniqueId}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{book.campaignName}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', fontWeight: '500' }}>
                                            {book.buyer}<br />
                                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{book.phoneNumber}</span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{book.currency} {book.amount}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '10px',
                                                background: book.status === 'Confirmed' ? '#dcfce7' : (book.status === 'Cancelled' ? '#fee2e2' : '#e0f2fe'),
                                                color: book.status === 'Confirmed' ? '#166534' : (book.status === 'Cancelled' ? '#991b1b' : '#0369a1'),
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>{book.scheduleTime}</td>
                                        <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                            {book.status !== 'Confirmed' && (
                                                <button onClick={() => handleUpdateStatus(book.id, 'Confirmed')} title="Confirm" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#10b981' }}><Save size={16} /></button>
                                            )}
                                            {book.status !== 'Cancelled' && (
                                                <button onClick={() => handleUpdateStatus(book.id, 'Cancelled')} title="Cancel" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><X size={16} /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {filteredBookings.length > 0 ? (bookingPage - 1) * mockBookingPageSize + 1 : 0} - {Math.min(bookingPage * mockBookingPageSize, filteredBookings.length)} of {filteredBookings.length}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                            disabled={bookingPage === 1}
                            onClick={() => setBookingPage(p => Math.max(1, p - 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: bookingPage === 1 ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: bookingPage === 1 ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Previous
                        </button>
                        <button
                            disabled={bookingPage === totalBookingPages || totalBookingPages === 0}
                            onClick={() => setBookingPage(p => Math.min(totalBookingPages, p + 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: (bookingPage === totalBookingPages || totalBookingPages === 0) ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: (bookingPage === totalBookingPages || totalBookingPages === 0) ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
