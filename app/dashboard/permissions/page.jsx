"use client";
import { Shield } from 'lucide-react';

const PERMISSIONS = [
    { module: "Dashboard", admin: true, agent: true, viewer: true },
    { module: "Conversations", admin: true, agent: true, viewer: false },
    { module: "Customers", admin: true, agent: true, viewer: true },
    { module: "Bot Manager", admin: true, agent: false, viewer: false },
    { module: "Broadcasting", admin: true, agent: false, viewer: false },
    { module: "Settings", admin: true, agent: false, viewer: false },
];

export default function UserPermissionsPage() {
    return (
        <div className="dashboard-page">
            <div className="page-title">Role Permissions</div>

            <div className="card-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Module Access</th>
                            <th style={{ textAlign: 'center' }}>Admin</th>
                            <th style={{ textAlign: 'center' }}>Agent</th>
                            <th style={{ textAlign: 'center' }}>Viewer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PERMISSIONS.map((perm, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 500 }}>{perm.module}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <input type="checkbox" checked={perm.admin} readOnly />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <input type="checkbox" checked={perm.agent} readOnly />
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <input type="checkbox" checked={perm.viewer} readOnly />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                    <button className="primary-btn">Save Permissions</button>
                </div>
            </div>
        </div>
    );
}
