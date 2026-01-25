"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, ChevronDown, Video, FileText, Play, Trash2, Edit, Download } from 'lucide-react';

export default function WebhookWorkflowPage() {
    const [workflows, setWorkflows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Form State
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState('');
    const [template, setTemplate] = useState('welcome_message');
    const [creating, setCreating] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/webhooks');
            const data = await res.json();
            setWorkflows(data.webhooks || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveWorkflow = async () => {
        if (!name) return;
        setCreating(true);

        try {
            if (editingId) {
                // Update
                const res = await fetch('/api/webhooks', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, updates: { name, template } })
                });
                if (res.ok) {
                    setEditingId(null);
                    setName('');
                    setTemplate('welcome_message');
                    fetchWorkflows();
                }
            } else {
                // Create
                const res = await fetch('/api/webhooks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, template })
                });
                if (res.ok) {
                    setName('');
                    fetchWorkflows();
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    const handleEdit = (wf) => {
        setEditingId(wf.id);
        setName(wf.name);
        setTemplate(wf.template);
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this workflow?')) return;
        try {
            await fetch(`/api/webhooks?id=${id}`, { method: 'DELETE' });
            fetchWorkflows();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSimulateTrigger = async (id) => {
        try {
            const res = await fetch('/api/webhooks/trigger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                fetchWorkflows();
                alert('Webhook event simulated successfully!');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "ID,Name,Template,Status,Processed\n"
            + workflows.map(e => `${e.id},${e.name},${e.template},${e.status},${e.stats?.processed}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "workflow_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const scroll2Form = () => {
        setEditingId(null);
        setName('');
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // Filtering & Pagination
    const filteredWorkflows = workflows.filter(wf => {
        const matchesSearch = wf.name.toLowerCase().includes(searchTerm.toLowerCase()) || wf.template.includes(searchTerm);
        const matchesStatus = filterStatus === 'All' || wf.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
    const paginatedWorkflows = filteredWorkflows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="dashboard-page" style={{ paddingBottom: '3rem' }}>
            {/* Page Header */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h1 className="page-title" style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>WhatsApp Webhook (in-bound) Workflow</h1>
                    <Video size={24} color="#f97316" />
                    <button
                        onClick={scroll2Form}
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
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>Create and manage your WhatsApp webhook workflows</p>
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0fdfa', border: '1px dashed #10b981', borderRadius: '4px', fontSize: '0.8rem', color: '#047857' }}>
                    <strong>Callback URL:</strong> https://whatchat.com/api/webhooks/whatsapp <br />
                    <strong>Verify Token:</strong> whatchat_verify_123
                </div>
            </div>

            {/* Section 1: Your Workflows */}
            <div className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>Your Workflows</h3>
                    <button
                        onClick={handleReport}
                        style={{
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
                        <Download size={14} />
                        Workflow Report
                    </button>
                </div>

                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem', border: '1px solid #f3f4f6', borderRadius: '4px', color: '#374151', fontSize: '0.9rem', background: '#f9fafb' }}>
                            <option value="All">Any Status</option>
                            <option value="Running">Running</option>
                            <option value="Stopped">Stopped</option>
                        </select>
                    </div>

                    <div style={{ flex: 1.5, minWidth: '200px' }}>
                        <input
                            type="text"
                            placeholder="Search & Enter..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Actions</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Processed</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Delivered</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Failed</th>
                                <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700' }}>Last Called</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedWorkflows.length === 0 ? (
                                <tr>
                                    <td colSpan={9} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                                        {loading ? 'Loading workflows...' : 'No workflows found.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedWorkflows.map((wf, idx) => (
                                    <tr key={wf.id} style={{ borderBottom: '1px solid #f9fafb' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', fontWeight: '500' }}>{wf.name}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{wf.template}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '10px', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: '600' }}>
                                                {wf.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleSimulateTrigger(wf.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#2563eb' }}
                                                title="Simulate Event"
                                            >
                                                <Play size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(wf)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563' }}
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(wf.id)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem' }}>{wf.stats?.processed}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#10b981' }}>{wf.stats?.delivered}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#ef4444' }}>{wf.stats?.failed}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>{wf.lastCalled || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', gap: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {filteredWorkflows.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredWorkflows.length)} of {filteredWorkflows.length}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: currentPage === 1 ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: currentPage === 1 ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Previous
                        </button>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            style={{
                                padding: '0.4rem 0.8rem', border: '1px solid #e5e7eb', background: (currentPage === totalPages || totalPages === 0) ? '#f3f4f6' : 'white',
                                borderRadius: '4px', color: (currentPage === totalPages || totalPages === 0) ? '#d1d5db' : '#374151', fontSize: '0.85rem', cursor: 'pointer'
                            }}>
                            Next
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        style={{ padding: '0.3rem 0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', color: '#6b7280', fontSize: '0.85rem' }}>
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                    </select>
                </div>
            </div>

            {/* Section 2: Create Workflow */}
            <div ref={formRef} className="card-container" style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#111827' }}>
                    {editingId ? 'Edit Workflow' : 'Create Workflow'}
                </h3>
                <p style={{ margin: '0 0 2rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>Send WhatsApp template message based on data received from 3rd party webhook call</p>

                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#374151' }}>Workflow Details</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>WORKFLOW NAME</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ width: '12px', height: '12px', background: '#6b7280', borderRadius: '50%', marginRight: '0.5rem' }}></div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Order Confirmation"
                                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.9rem' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>WHATSAPP ACCOUNT *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ marginRight: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            </div>
                            <span style={{ fontSize: '0.9rem', color: '#9ca3af', flex: 1 }}>Default Account</span>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase' }}>MESSAGE TEMPLATE *</label>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.5rem', background: '#f9fafb' }}>
                            <div style={{ marginRight: '0.5rem', color: '#6b7280' }}>
                                <FileText size={16} color="#6b7280" />
                            </div>
                            <select
                                value={template}
                                onChange={(e) => setTemplate(e.target.value)}
                                style={{ border: 'none', background: 'transparent', flex: 1, outline: 'none', color: '#374151', fontSize: '0.9rem', cursor: 'pointer' }}
                            >
                                <option value="welcome_message">Welcome Message</option>
                                <option value="order_confirmed">Order Confirmed</option>
                                <option value="shipping_update">Shipping Update</option>
                                <option value="out_of_office">Out of Office</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #10b981', paddingTop: '1.5rem' }}>
                    <button
                        onClick={handleSaveWorkflow}
                        disabled={creating}
                        className="primary-btn"
                        style={{
                            backgroundColor: '#19877b',
                            border: 'none',
                            padding: '0.6rem 1.5rem',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            opacity: creating ? 0.7 : 1,
                            cursor: 'pointer'
                        }}>
                        {creating ? 'Saving...' : (editingId ? 'Update Workflow' : 'Create Workflow')}
                    </button>
                    {editingId && (
                        <button
                            onClick={() => { setEditingId(null); setName(''); }}
                            style={{
                                marginLeft: '1rem',
                                backgroundColor: 'transparent',
                                border: '1px solid #e5e7eb',
                                padding: '0.6rem 1.5rem',
                                borderRadius: '4px',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                cursor: 'pointer'
                            }}>
                            Cancel
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
