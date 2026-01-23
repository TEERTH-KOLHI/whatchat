"use client";
import { Search, Filter, Download, MoreHorizontal, User } from 'lucide-react';

const CUSTOMERS = [
    { id: 1, name: "Alice Smith", phone: "+1 555-0101", tags: ["Lead", "Interested"], joinDate: "Jan 12, 2024", status: "Active" },
    { id: 2, name: "Bob Jones", phone: "+44 20 7123 4567", tags: ["Customer"], joinDate: "Jan 10, 2024", status: "Active" },
    { id: 3, name: "Charlie Brown", phone: "+91 98765 43210", tags: ["Pending"], joinDate: "Jan 08, 2024", status: "Inactive" },
    { id: 4, name: "David Wilson", phone: "+1 555-0102", tags: ["Lead"], joinDate: "Jan 05, 2024", status: "Active" },
];

export default function CustomersPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>Manage Subscribers</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="action-btn">
                        <Download size={16} style={{ marginRight: '0.5rem' }} /> Export
                    </button>
                    <button className="primary-btn">+ Add Subscriber</button>
                </div>
            </div>

            <div className="card-container">
                <div className="table-controls">
                    <div className="search-box">
                        <Search size={18} color="#9ca3af" />
                        <input type="text" placeholder="Search subscribers..." />
                    </div>
                    <button className="action-btn">
                        <Filter size={16} /> Filter
                    </button>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Tags</th>
                            <th>Joined</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CUSTOMERS.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div className="avatar small"><User size={16} /></div>
                                        <span style={{ fontWeight: 500 }}>{customer.name}</span>
                                    </div>
                                </td>
                                <td>{customer.phone}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                                        {customer.tags.map(tag => (
                                            <span key={tag} className="tag-badge">{tag}</span>
                                        ))}
                                    </div>
                                </td>
                                <td>{customer.joinDate}</td>
                                <td>
                                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="icon-btn"><MoreHorizontal size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
