"use client";
import { Plus, User, Mail, Shield } from 'lucide-react';

const USERS = [
    { id: 1, name: "Admin User", email: "admin@whatchat.com", role: "Owner", status: "Active" },
    { id: 2, name: "Support Team", email: "support@whatchat.com", role: "Agent", status: "Active" },
];

export default function UserManagerPage() {
    return (
        <div className="dashboard-page">
            <div className="page-header-row">
                <div className="page-title" style={{ marginBottom: 0 }}>User Manager</div>
                <button className="primary-btn"><Plus size={18} style={{ marginRight: '0.5rem' }} /> Invite User</button>
            </div>

            <div className="card-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {USERS.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div className="avatar small"><User size={16} /></div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="tag-badge">{user.role}</span></td>
                                <td><span className="status-badge active">{user.status}</span></td>
                                <td><button className="action-btn">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
