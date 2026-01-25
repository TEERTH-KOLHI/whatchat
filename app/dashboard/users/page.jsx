"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronDown, MoreHorizontal, User, Trash2, X } from 'lucide-react';

export default function UserManagerPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Agent', status: 'Active', package: 'Basic', expiry: '' });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async () => {
        if (!newUser.name || !newUser.email) {
            alert("Name and Email are required");
            return;
        }

        setCreating(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
            if (res.ok) {
                setShowModal(false);
                setNewUser({ name: '', email: '', role: 'Agent', status: 'Active', package: 'Basic', expiry: '' });
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to create user");
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem', position: 'relative' }}>

            {/* Create Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Create New User</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text" placeholder="Full Name"
                                value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                style={{ padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                            <input
                                type="email" placeholder="Email Address"
                                value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                style={{ padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            />
                            <select
                                value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                style={{ padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            >
                                <option value="Agent">Agent</option>
                                <option value="Admin">Admin</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                            <select
                                value={newUser.status} onChange={e => setNewUser({ ...newUser, status: e.target.value })}
                                style={{ padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <button
                                onClick={handleCreateUser}
                                disabled={creating}
                                className="primary-btn"
                                style={{ justifyContent: 'center' }}
                            >
                                {creating ? 'Creating...' : 'Create User'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>User Manager</h1>
                    <button
                        onClick={() => setShowModal(true)}
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
                        <div style={{ flex: 1.5, position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search Name or Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                                    border: '1px solid #10b981',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: '#374151'
                                }}
                            />
                            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#10b981' }} />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f0f9ff' }}>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>#</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Name</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Email</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Role</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Status</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Created</th>
                                <th style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>Loading users...</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No users found.</td></tr>
                            ) : (
                                filteredUsers.map((u, i) => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '1rem' }}>{i + 1}</td>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{u.name}</td>
                                        <td style={{ padding: '1rem', color: '#6b7280' }}>{u.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600',
                                                background: u.role === 'Admin' ? '#fee2e2' : '#e0f2fe',
                                                color: u.role === 'Admin' ? '#991b1b' : '#075985'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '600',
                                                background: u.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                                                color: u.status === 'Active' ? '#166534' : '#6b7280'
                                            }}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>{u.created}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}
                                                title="Delete User"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
