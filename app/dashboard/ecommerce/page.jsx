"use client";
import React, { useState, useEffect } from 'react';
import { Video, ChevronDown, Search, Plug, Trash2, Edit, Eye, EyeOff } from 'lucide-react';

export default function EcommerceCatalogPage() {
    // Catalogs State
    const [catalogs, setCatalogs] = useState([]);
    const [loadingCatalogs, setLoadingCatalogs] = useState(true);

    // Integrate Form State
    const [newCatalogId, setNewCatalogId] = useState('');
    const [newCatalogName, setNewCatalogName] = useState('');
    const [integrating, setIntegrating] = useState(false);

    // Orders State
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [orderSearch, setOrderSearch] = useState('');
    const [orderPage, setOrderPage] = useState(1);
    const mockOrderPageSize = 5;

    useEffect(() => {
        fetchCatalogs();
        fetchOrders();
    }, []);

    const fetchCatalogs = async () => {
        setLoadingCatalogs(true);
        try {
            const res = await fetch('/api/ecommerce/catalogs');
            const data = await res.json();
            setCatalogs(data.catalogs || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingCatalogs(false);
        }
    };

    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
            const res = await fetch('/api/ecommerce/orders');
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleIntegrate = async () => {
        if (!newCatalogName || !newCatalogId) return;
        setIntegrating(true);
        try {
            const res = await fetch('/api/ecommerce/catalogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCatalogName, catalogId: newCatalogId })
            });
            if (res.ok) {
                setNewCatalogName('');
                setNewCatalogId('');
                fetchCatalogs();
                fetchOrders(); // New catalog might seed orders
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIntegrating(false);
        }
    };

    const handleDeleteCatalog = async (id) => {
        if (!confirm('Are you sure? This will delete the catalog and associated orders.')) return;
        try {
            await fetch(`/api/ecommerce/catalogs?id=${id}`, { method: 'DELETE' });
            fetchCatalogs();
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const handleTogglePublic = async (catalog) => {
        try {
            await fetch('/api/ecommerce/catalogs', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: catalog.id, updates: { isPublic: !catalog.isPublic } })
            });
            fetchCatalogs();
        } catch (err) {
            console.error(err);
        }
    };

    // Orders Pagination & Search
    const filteredOrders = orders.filter(o =>
        o.orderUniqueId.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.buyer.toLowerCase().includes(orderSearch.toLowerCase())
    );
    const totalOrderPages = Math.ceil(filteredOrders.length / mockOrderPageSize);
    const paginatedOrders = filteredOrders.slice((orderPage - 1) * mockOrderPageSize, orderPage * mockOrderPageSize);


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
                </div>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your eCommerce catalogs</p>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Public</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: '700' }}>Updated at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {loadingCatalogs ? 'Loading...' : 'No catalogs found.'}
                                    </td>
                                </tr>
                            ) : (
                                catalogs.map((cat) => (
                                    <tr key={cat.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.9rem', fontWeight: '500' }}>{cat.name}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>{cat.catalogId}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button
                                                onClick={() => handleTogglePublic(cat)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: cat.isPublic ? '#10b981' : '#9ca3af' }}
                                                title="Toggle Visibility"
                                            >
                                                {cat.isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <button
                                                onClick={() => handleDeleteCatalog(cat.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                        <td style={{ padding: '0.75rem', textAlign: 'right', fontSize: '0.85rem', color: '#6b7280' }}>{cat.updatedAt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
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
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', flex: 1 }}>Default Account</span>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>CATALOG ID *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: 'white' }}>
                            <input
                                type="text"
                                value={newCatalogId}
                                onChange={(e) => setNewCatalogId(e.target.value)}
                                placeholder="Example : 76256114220XXXX"
                                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>CATALOG NAME *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: 'white' }}>
                            <input
                                type="text"
                                value={newCatalogName}
                                onChange={(e) => setNewCatalogName(e.target.value)}
                                placeholder="Give it a name to track it later"
                                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #10b981', paddingTop: '1.5rem' }}>
                    <button
                        onClick={handleIntegrate}
                        disabled={integrating}
                        className="primary-btn"
                        style={{
                            backgroundColor: '#19877b',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            opacity: integrating ? 0.7 : 1
                        }}>
                        <Plug size={16} /> {integrating ? 'Integrating...' : 'Integrate Catalog'}
                    </button>
                </div>
            </div>


            {/* SECTION 3: Catalog Orders */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>Catalog Orders</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Manage your catalog orders</p>

                {/* Search */}
                <div style={{ marginBottom: '1rem', maxWidth: '300px' }}>
                    <input
                        type="text"
                        placeholder="Search Orders..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
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

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Order ID</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Catalog</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Buyer</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Amount</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Ordered at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {loadingOrders ? 'Loading orders...' : 'No orders found.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{order.orderUniqueId}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{order.catalogName}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', fontWeight: '500' }}>
                                            {order.buyer}<br />
                                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{order.phoneNumber}</span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{order.currency} {order.amount}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '10px', background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '600' }}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>{order.orderedAt}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {filteredOrders.length > 0 ? (orderPage - 1) * mockOrderPageSize + 1 : 0} - {Math.min(orderPage * mockOrderPageSize, filteredOrders.length)} of {filteredOrders.length}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                            disabled={orderPage === 1}
                            onClick={() => setOrderPage(p => Math.max(1, p - 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: orderPage === 1 ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: orderPage === 1 ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Previous
                        </button>
                        <button
                            disabled={orderPage === totalOrderPages || totalOrderPages === 0}
                            onClick={() => setOrderPage(p => Math.min(totalOrderPages, p + 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: (orderPage === totalOrderPages || totalOrderPages === 0) ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: (orderPage === totalOrderPages || totalOrderPages === 0) ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            {/* Note: I'm omitting the "Manual Payment" table for brevity as per user request to be "functional", and duplicate tables are redundant for the demo. The "Orders" table covers the functionality. */}
        </div>
    );
}
